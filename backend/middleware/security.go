package middleware

import (
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

// RateLimiter implementa rate limiting para prevenir ataques de fuerza bruta
type RateLimiter struct {
	visitors map[string]*Visitor
	mu       sync.RWMutex
	rate     int
	duration time.Duration
}

type Visitor struct {
	lastSeen  time.Time
	count     int
	blockedAt *time.Time
}

// NewRateLimiter crea un nuevo rate limiter
func NewRateLimiter(requestsPerMinute int) *RateLimiter {
	rl := &RateLimiter{
		visitors: make(map[string]*Visitor),
		rate:     requestsPerMinute,
		duration: time.Minute,
	}

	// Limpieza periódica de visitantes antiguos
	go rl.cleanupVisitors()

	return rl
}

// Middleware retorna el middleware de rate limiting
func (rl *RateLimiter) Middleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		ip := c.ClientIP()

		rl.mu.Lock()
		visitor, exists := rl.visitors[ip]

		if !exists {
			visitor = &Visitor{lastSeen: time.Now(), count: 1}
			rl.visitors[ip] = visitor
			rl.mu.Unlock()
			c.Next()
			return
		}

		// Verificar si está bloqueado
		if visitor.blockedAt != nil {
			if time.Since(*visitor.blockedAt) < 15*time.Minute {
				rl.mu.Unlock()
				c.JSON(http.StatusTooManyRequests, gin.H{
					"error":   "rate_limit_exceeded",
					"message": "Demasiados intentos. Intenta de nuevo en 15 minutos",
				})
				c.Abort()
				return
			}
			// Desbloquear después de 15 minutos
			visitor.blockedAt = nil
			visitor.count = 0
		}

		// Resetear contador si ha pasado el tiempo
		if time.Since(visitor.lastSeen) > rl.duration {
			visitor.count = 1
			visitor.lastSeen = time.Now()
		} else {
			visitor.count++
			visitor.lastSeen = time.Now()

			// Bloquear si excede el límite
			if visitor.count > rl.rate {
				now := time.Now()
				visitor.blockedAt = &now
				rl.mu.Unlock()
				c.JSON(http.StatusTooManyRequests, gin.H{
					"error":   "rate_limit_exceeded",
					"message": "Demasiados intentos. Intenta de nuevo más tarde",
				})
				c.Abort()
				return
			}
		}

		rl.mu.Unlock()
		c.Next()
	}
}

// cleanupVisitors limpia visitantes antiguos cada 5 minutos
func (rl *RateLimiter) cleanupVisitors() {
	ticker := time.NewTicker(5 * time.Minute)
	defer ticker.Stop()

	for range ticker.C {
		rl.mu.Lock()
		for ip, visitor := range rl.visitors {
			if time.Since(visitor.lastSeen) > 10*time.Minute && visitor.blockedAt == nil {
				delete(rl.visitors, ip)
			}
		}
		rl.mu.Unlock()
	}
}

// SecurityHeaders añade headers de seguridad a todas las respuestas
func SecurityHeaders() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Protección contra clickjacking
		c.Header("X-Frame-Options", "DENY")

		// Protección XSS
		c.Header("X-XSS-Protection", "1; mode=block")

		// Prevenir MIME sniffing
		c.Header("X-Content-Type-Options", "nosniff")

		// Referrer Policy
		c.Header("Referrer-Policy", "strict-origin-when-cross-origin")

		// Content Security Policy
		c.Header("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'")

		// Permissions Policy
		c.Header("Permissions-Policy", "geolocation=(), microphone=(), camera=()")

		// HSTS (solo para producción con HTTPS)
		// c.Header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")

		c.Next()
	}
}

// InputSanitization sanitiza inputs para prevenir SQL Injection y XSS
func InputSanitization() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Lista de patrones sospechosos
		suspiciousPatterns := []string{
			"<script",
			"javascript:",
			"onerror=",
			"onclick=",
			"onload=",
			"<iframe",
			"SELECT * FROM",
			"DROP TABLE",
			"INSERT INTO",
			"DELETE FROM",
			"UPDATE ",
			"UNION SELECT",
			"--",
			"';",
			"OR 1=1",
			"OR '1'='1",
		}

		// Verificar query parameters
		for key, values := range c.Request.URL.Query() {
			for _, value := range values {
				lowerValue := strings.ToLower(value)
				for _, pattern := range suspiciousPatterns {
					if strings.Contains(lowerValue, strings.ToLower(pattern)) {
						c.JSON(http.StatusBadRequest, gin.H{
							"error":   "invalid_input",
							"message": "Input contiene caracteres o patrones no permitidos",
							"field":   key,
						})
						c.Abort()
						return
					}
				}
			}
		}

		c.Next()
	}
}

// ValidateContentType valida que el Content-Type sea el esperado
func ValidateContentType(expectedType string) gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.Method == "POST" || c.Request.Method == "PUT" || c.Request.Method == "PATCH" {
			contentType := c.GetHeader("Content-Type")
			if !strings.HasPrefix(contentType, expectedType) {
				c.JSON(http.StatusUnsupportedMediaType, gin.H{
					"error":   "invalid_content_type",
					"message": "Content-Type debe ser " + expectedType,
				})
				c.Abort()
				return
			}
		}
		c.Next()
	}
}

// IPWhitelist permite solo IPs específicas (útil para endpoints admin)
func IPWhitelist(allowedIPs []string) gin.HandlerFunc {
	allowed := make(map[string]bool)
	for _, ip := range allowedIPs {
		allowed[ip] = true
	}

	return func(c *gin.Context) {
		clientIP := c.ClientIP()
		if !allowed[clientIP] {
			c.JSON(http.StatusForbidden, gin.H{
				"error":   "access_denied",
				"message": "IP no autorizada",
			})
			c.Abort()
			return
		}
		c.Next()
	}
}

// MaxBodySize limita el tamaño del body de la petición
func MaxBodySize(maxSize int64) gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.ContentLength > maxSize {
			c.JSON(http.StatusRequestEntityTooLarge, gin.H{
				"error":   "body_too_large",
				"message": "El tamaño del body excede el límite permitido",
			})
			c.Abort()
			return
		}
		c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, maxSize)
		c.Next()
	}
}
