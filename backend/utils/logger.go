package utils

import (
	"log"
	"os"
	"strings"
	"time"
)

type Logger struct {
	infoLog     *log.Logger
	errorLog    *log.Logger
	securityLog *log.Logger
}

var GlobalLogger *Logger

func init() {
	GlobalLogger = NewLogger()
}

// NewLogger crea una nueva instancia del logger
func NewLogger() *Logger {
	return &Logger{
		infoLog:     log.New(os.Stdout, "INFO: ", log.Ldate|log.Ltime|log.Lshortfile),
		errorLog:    log.New(os.Stderr, "ERROR: ", log.Ldate|log.Ltime|log.Lshortfile),
		securityLog: log.New(os.Stdout, "SECURITY: ", log.Ldate|log.Ltime|log.Lshortfile),
	}
}

// Info registra mensajes informativos
func (l *Logger) Info(message string) {
	l.infoLog.Println(sanitizeLogMessage(message))
}

// Error registra mensajes de error
func (l *Logger) Error(message string) {
	l.errorLog.Println(sanitizeLogMessage(message))
}

// Security registra eventos de seguridad importantes
func (l *Logger) Security(message string) {
	l.securityLog.Println(sanitizeLogMessage(message))
}

// LogFailedLogin registra intentos de login fallidos
func (l *Logger) LogFailedLogin(email, ip, reason string) {
	message := "Failed login attempt - Email: " + maskEmail(email) +
		" | IP: " + ip +
		" | Reason: " + reason +
		" | Time: " + time.Now().Format(time.RFC3339)
	l.securityLog.Println(message)
}

// LogSuccessfulLogin registra logins exitosos
func (l *Logger) LogSuccessfulLogin(userID uint, email, ip string) {
	message := "Successful login - UserID: " + string(rune(userID)) +
		" | Email: " + maskEmail(email) +
		" | IP: " + ip +
		" | Time: " + time.Now().Format(time.RFC3339)
	l.infoLog.Println(message)
}

// LogRegistration registra nuevos registros
func (l *Logger) LogRegistration(userID uint, email string) {
	message := "New user registration - UserID: " + string(rune(userID)) +
		" | Email: " + maskEmail(email) +
		" | Time: " + time.Now().Format(time.RFC3339)
	l.infoLog.Println(message)
}

// LogSuspiciousActivity registra actividad sospechosa
func (l *Logger) LogSuspiciousActivity(ip, userAgent, reason string) {
	message := "Suspicious activity detected - IP: " + ip +
		" | UserAgent: " + userAgent +
		" | Reason: " + reason +
		" | Time: " + time.Now().Format(time.RFC3339)
	l.securityLog.Println("🚨 " + message)
}

// LogRateLimitExceeded registra cuando se excede el rate limit
func (l *Logger) LogRateLimitExceeded(ip string) {
	message := "Rate limit exceeded - IP: " + ip +
		" | Time: " + time.Now().Format(time.RFC3339)
	l.securityLog.Println("⚠️  " + message)
}

// sanitizeLogMessage limpia mensajes de logs para evitar log injection
func sanitizeLogMessage(message string) string {
	// Remover saltos de línea y caracteres especiales
	message = strings.ReplaceAll(message, "\n", " ")
	message = strings.ReplaceAll(message, "\r", " ")
	message = strings.ReplaceAll(message, "\t", " ")
	return message
}

// maskEmail enmascara parcialmente un email para privacidad
func maskEmail(email string) string {
	parts := strings.Split(email, "@")
	if len(parts) != 2 {
		return "***@***"
	}

	username := parts[0]
	domain := parts[1]

	if len(username) <= 2 {
		return "**@" + domain
	}

	return username[:2] + "***@" + domain
}

// maskPhone enmascara un número de teléfono
func maskPhone(phone string) string {
	if len(phone) <= 4 {
		return "***"
	}
	return "***-***-" + phone[len(phone)-4:]
}
