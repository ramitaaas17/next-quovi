package main

import (
	"log"
	"os"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/tuusuario/quovi/handlers"
	"github.com/tuusuario/quovi/middleware"
	"github.com/tuusuario/quovi/repository"
	"github.com/tuusuario/quovi/services"
)

func main() {
	// Cargar variables de entorno
	err := godotenv.Load()
	if err != nil {
		log.Println("⚠️  No se encontró archivo .env, usando variables de entorno del sistema")
	}

	// Configuración de la base de datos
	dbUser := getEnv("DB_USER", "quovi_user")
	dbPassword := getEnv("DB_PASSWORD", "quovi_secret")
	dbHost := getEnv("DB_HOST", "db") // "db" para Docker, "localhost" para local
	dbPort := getEnv("DB_PORT", "3306")
	dbName := getEnv("DB_NAME", "quovi_db")

	// Construir DSN para MySQL
	dsn := dbUser + ":" + dbPassword + "@tcp(" + dbHost + ":" + dbPort + ")/" + dbName + "?charset=utf8mb4&parseTime=True&loc=Local"

	log.Println("🔌 Intentando conectar a la base de datos...")
	log.Printf("   Host: %s:%s", dbHost, dbPort)
	log.Printf("   Database: %s", dbName)

	// Inicializar base de datos
	dbManager := repository.New(dsn)

	// ✅ Verificar tablas (esperar a que MySQL termine de ejecutar los scripts)
	log.Println("⏳ Esperando a que la base de datos esté lista...")
	time.Sleep(2 * time.Second) // Pequeña pausa para asegurar que MySQL terminó

	if err := dbManager.VerificarTablas(); err != nil {
		log.Println("⚠️  Error verificando tablas:", err)
		log.Println("🔄 Reintentando en 5 segundos...")
		time.Sleep(5 * time.Second)

		// Segundo intento
		if err := dbManager.VerificarTablas(); err != nil {
			log.Fatalf("❌ No se pudo conectar a la base de datos: %v", err)
		}
	}

	// Inicializar servicios
	jwtSecret := getEnv("JWT_SECRET", "mi-secreto-super-seguro-cambiar-en-produccion")
	authService := services.NewAuthService(dbManager, jwtSecret)

	// Inicializar handlers
	authHandler := handlers.NewAuthHandler(authService)

	// Configurar Gin en modo release para producción
	if getEnv("ENVIRONMENT", "development") == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Configurar Gin
	router := gin.Default()

	// Middlewares de seguridad globales
	router.Use(middleware.SecurityHeaders())
	router.Use(middleware.InputSanitization())
	router.Use(middleware.MaxBodySize(5 * 1024 * 1024)) // 5MB máximo

	// Configurar CORS - Obtener origins desde variable de entorno
	corsOrigins := getCORSOrigins()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     corsOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Rutas públicas - API de autenticación
	api := router.Group("/api")
	{
		// Rate limiter para autenticación (5 intentos por minuto)
		authRateLimiter := middleware.NewRateLimiter(5)

		auth := api.Group("/auth")
		auth.Use(middleware.ValidateContentType("application/json"))
		auth.Use(authRateLimiter.Middleware())
		{
			auth.POST("/register", authHandler.Registrar)
			auth.POST("/login", authHandler.Login)
			auth.POST("/login/google", authHandler.LoginGoogle)
			auth.POST("/logout", authHandler.Logout)
		}

		// Rutas protegidas - requieren autenticación
		protected := api.Group("/")
		protected.Use(authHandler.VerificarToken)
		{
			// Aquí irán las rutas protegidas (perfil, favoritos, etc.)
			protected.GET("/perfil", func(c *gin.Context) {
				userID := c.GetUint("userID")
				c.JSON(200, gin.H{
					"message": "Ruta protegida",
					"userID":  userID,
				})
			})
		}
	}

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"service": "Quovi API",
			"version": "1.0.0",
		})
	})

	// Ruta raíz - Información de la API
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Bienvenido a Quovi API",
			"version": "1.0.0",
			"status":  "running",
			"endpoints": gin.H{
				"health": "GET /health",
				"auth": gin.H{
					"register":    "POST /api/auth/register",
					"login":       "POST /api/auth/login",
					"loginGoogle": "POST /api/auth/login/google",
					"logout":      "POST /api/auth/logout",
				},
				"protected": gin.H{
					"perfil": "GET /api/perfil (requiere token)",
				},
			},
			"documentation": "https://github.com/tuusuario/quovi",
		})
	})

	// Iniciar servidor
	port := getEnv("PORT", "8080")
	log.Printf("🚀 Servidor Quovi iniciado en puerto %s", port)
	log.Printf("🏥 Health check: http://localhost:%s/health", port)
	log.Printf("🔐 API Auth: http://localhost:%s/api/auth", port)

	if err := router.Run(":" + port); err != nil {
		log.Fatalf("❌ Error al iniciar servidor: %v", err)
	}
}

// getEnv obtiene una variable de entorno o retorna un valor por defecto
func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

// getCORSOrigins obtiene los orígenes permitidos para CORS
func getCORSOrigins() []string {
	corsOriginsStr := getEnv("CORS_ORIGINS", "http://localhost:3000,http://localhost:3001")
	// Separar por comas y limpiar espacios
	origins := strings.Split(corsOriginsStr, ",")
	for i, origin := range origins {
		origins[i] = strings.TrimSpace(origin)
	}
	return origins
}
