package utils

import (
	"fmt"
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

// Security registra eventos de seguridad
func (l *Logger) Security(message string) {
	l.securityLog.Println(sanitizeLogMessage(message))
}

// LogFailedLogin registra intentos fallidos de inicio de sesión
func (l *Logger) LogFailedLogin(email, ip, reason string) {
	message := fmt.Sprintf("Failed login - Email: %s | IP: %s | Reason: %s | Time: %s",
		maskEmail(email), ip, reason, time.Now().Format(time.RFC3339))
	l.securityLog.Println(message)
}

// LogSuccessfulLogin registra inicios de sesión exitosos
func (l *Logger) LogSuccessfulLogin(userID uint, email, ip string) {
	message := fmt.Sprintf("Successful login - UserID: %d | Email: %s | IP: %s | Time: %s",
		userID, maskEmail(email), ip, time.Now().Format(time.RFC3339))
	l.infoLog.Println(message)
}

// LogRegistration registra nuevos usuarios
func (l *Logger) LogRegistration(userID uint, email string) {
	message := fmt.Sprintf("New registration - UserID: %d | Email: %s | Time: %s",
		userID, maskEmail(email), time.Now().Format(time.RFC3339))
	l.infoLog.Println(message)
}

// LogSuspiciousActivity registra actividad sospechosa
func (l *Logger) LogSuspiciousActivity(ip, userAgent, reason string) {
	message := fmt.Sprintf("Suspicious activity - IP: %s | UserAgent: %s | Reason: %s | Time: %s",
		ip, userAgent, reason, time.Now().Format(time.RFC3339))
	l.securityLog.Println(message)
}

// LogRateLimitExceeded registra cuando se excede el límite de peticiones
func (l *Logger) LogRateLimitExceeded(ip string) {
	message := fmt.Sprintf("Rate limit exceeded - IP: %s | Time: %s",
		ip, time.Now().Format(time.RFC3339))
	l.securityLog.Println(message)
}

// sanitizeLogMessage limpia el mensaje para prevenir log injection
func sanitizeLogMessage(message string) string {
	message = strings.ReplaceAll(message, "\n", " ")
	message = strings.ReplaceAll(message, "\r", " ")
	message = strings.ReplaceAll(message, "\t", " ")
	return message
}

// maskEmail oculta parte del email por privacidad
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
