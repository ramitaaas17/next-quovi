package utils

import (
	"errors"
	"html"
	"regexp"
	"strings"
)

var (
	emailRegex = regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)
	phoneRegex = regexp.MustCompile(`^\+?[1-9]\d{1,14}$`)
	sqlRegex   = regexp.MustCompile(`(?i)(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT|JAVASCRIPT)`)
)

// ValidarEmail valida el formato de un email
func ValidarEmail(email string) error {
	if email == "" {
		return errors.New("el email es requerido")
	}

	email = strings.TrimSpace(strings.ToLower(email))

	if len(email) > 100 {
		return errors.New("el email es demasiado largo")
	}

	if !emailRegex.MatchString(email) {
		return errors.New("formato de email inválido")
	}

	// Verificar dominios sospechosos
	suspiciousDomains := []string{
		"tempmail", "throwaway", "guerrillamail", "10minutemail",
	}

	for _, domain := range suspiciousDomains {
		if strings.Contains(email, domain) {
			return errors.New("dominio de email no permitido")
		}
	}

	return nil
}

// ValidarTelefono valida el formato de un teléfono
func ValidarTelefono(phone string) error {
	if phone == "" {
		return errors.New("el teléfono es requerido")
	}

	// Limpiar espacios y guiones
	phone = strings.ReplaceAll(phone, " ", "")
	phone = strings.ReplaceAll(phone, "-", "")
	phone = strings.ReplaceAll(phone, "(", "")
	phone = strings.ReplaceAll(phone, ")", "")

	if !phoneRegex.MatchString(phone) {
		return errors.New("formato de teléfono inválido")
	}

	return nil
}

// ValidarNombre valida nombres y apellidos
func ValidarNombre(nombre string, campo string) error {
	if nombre == "" {
		return errors.New(campo + " es requerido")
	}

	nombre = strings.TrimSpace(nombre)

	if len(nombre) < 2 {
		return errors.New(campo + " debe tener al menos 2 caracteres")
	}

	if len(nombre) > 100 {
		return errors.New(campo + " es demasiado largo")
	}

	// Solo permitir letras, espacios y algunos caracteres especiales
	validNameRegex := regexp.MustCompile(`^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$`)
	if !validNameRegex.MatchString(nombre) {
		return errors.New(campo + " contiene caracteres no válidos")
	}

	return nil
}

// SanitizarInput limpia y sanitiza inputs de usuario
func SanitizarInput(input string) string {
	// Eliminar espacios al inicio y final
	input = strings.TrimSpace(input)

	// Escapar HTML para prevenir XSS
	input = html.EscapeString(input)

	// Eliminar caracteres nulos
	input = strings.ReplaceAll(input, "\x00", "")

	return input
}

// ValidarContraSQL verifica que no haya intentos de SQL Injection
func ValidarContraSQL(input string) error {
	if sqlRegex.MatchString(input) {
		return errors.New("input contiene patrones sospechosos")
	}
	return nil
}

// ValidarLongitudTexto valida la longitud de un texto
func ValidarLongitudTexto(texto string, min, max int, campo string) error {
	length := len(strings.TrimSpace(texto))

	if length < min {
		return errors.New(campo + " debe tener al menos " + string(rune(min)) + " caracteres")
	}

	if length > max {
		return errors.New(campo + " excede el límite de caracteres permitidos")
	}

	return nil
}

// LimpiarTelefono limpia un número de teléfono
func LimpiarTelefono(phone string) string {
	phone = strings.ReplaceAll(phone, " ", "")
	phone = strings.ReplaceAll(phone, "-", "")
	phone = strings.ReplaceAll(phone, "(", "")
	phone = strings.ReplaceAll(phone, ")", "")
	return phone
}

// ValidarPassword valida requisitos de seguridad de contraseña
func ValidarPassword(password string) error {
	if len(password) < 8 {
		return errors.New("la contraseña debe tener al menos 8 caracteres")
	}

	if len(password) > 128 {
		return errors.New("la contraseña es demasiado larga")
	}

	var (
		tieneMayuscula bool
		tieneMinuscula bool
		tieneNumero    bool
		tieneEspecial  bool
	)

	especialesPermitidos := "!@#$%^&*()_+-=[]{}|;:,.<>?"

	for _, char := range password {
		switch {
		case char >= 'A' && char <= 'Z':
			tieneMayuscula = true
		case char >= 'a' && char <= 'z':
			tieneMinuscula = true
		case char >= '0' && char <= '9':
			tieneNumero = true
		case strings.ContainsRune(especialesPermitidos, char):
			tieneEspecial = true
		}
	}

	if !tieneMayuscula {
		return errors.New("la contraseña debe contener al menos una letra mayúscula")
	}

	if !tieneMinuscula {
		return errors.New("la contraseña debe contener al menos una letra minúscula")
	}

	if !tieneNumero {
		return errors.New("la contraseña debe contener al menos un número")
	}

	if !tieneEspecial {
		return errors.New("la contraseña debe contener al menos un carácter especial (!@#$%^&*...)")
	}

	// Verificar contraseñas comunes
	commonPasswords := []string{
		"password", "12345678", "qwerty123", "abc12345",
		"password123", "admin123", "welcome123",
	}

	passwordLower := strings.ToLower(password)
	for _, common := range commonPasswords {
		if passwordLower == common {
			return errors.New("la contraseña es demasiado común, elige una más segura")
		}
	}

	return nil
}

// EsEmailCorporativo verifica si un email es corporativo
func EsEmailCorporativo(email string) bool {
	dominiosPublicos := []string{
		"gmail.com", "yahoo.com", "hotmail.com", "outlook.com",
		"icloud.com", "live.com", "msn.com", "aol.com",
	}

	emailLower := strings.ToLower(email)
	for _, dominio := range dominiosPublicos {
		if strings.HasSuffix(emailLower, "@"+dominio) {
			return false
		}
	}

	return true
}
