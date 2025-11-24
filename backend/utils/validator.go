package utils

import (
	"errors"
	"fmt"
	"html"
	"regexp"
	"strings"
)

var (
	emailRegex = regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)
	phoneRegex = regexp.MustCompile(`^\+?[1-9]\d{1,14}$`)
	sqlRegex   = regexp.MustCompile(`(?i)(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT|JAVASCRIPT)`)
)

// ValidarEmail verifica el formato del email
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

	// Bloquea dominios temporales comunes
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

// ValidarNombre valida nombres y apellidos
func ValidarNombre(nombre string, campo string) error {
	if nombre == "" {
		return fmt.Errorf("%s es requerido", campo)
	}

	nombre = strings.TrimSpace(nombre)

	if len(nombre) < 2 {
		return fmt.Errorf("%s debe tener al menos 2 caracteres", campo)
	}

	if len(nombre) > 100 {
		return fmt.Errorf("%s es demasiado largo", campo)
	}

	// Permite letras, espacios, guiones y apóstrofes
	validNameRegex := regexp.MustCompile(`^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$`)
	if !validNameRegex.MatchString(nombre) {
		return fmt.Errorf("%s contiene caracteres no válidos", campo)
	}

	return nil
}

// SanitizarInput limpia el input del usuario
func SanitizarInput(input string) string {
	input = strings.TrimSpace(input)
	input = html.EscapeString(input)
	input = strings.ReplaceAll(input, "\x00", "")
	return input
}

// ValidarContraSQL detecta patrones de SQL injection
func ValidarContraSQL(input string) error {
	if sqlRegex.MatchString(input) {
		return errors.New("input contiene patrones sospechosos")
	}
	return nil
}

// ValidarLongitudTexto verifica la longitud de un texto
func ValidarLongitudTexto(texto string, min, max int, campo string) error {
	length := len(strings.TrimSpace(texto))

	if length < min {
		return fmt.Errorf("%s debe tener al menos %d caracteres", campo, min)
	}

	if length > max {
		return fmt.Errorf("%s excede el límite de caracteres permitidos", campo)
	}

	return nil
}

// LimpiarTelefono remueve caracteres especiales del teléfono
func LimpiarTelefono(phone string) string {
	phone = strings.ReplaceAll(phone, " ", "")
	phone = strings.ReplaceAll(phone, "-", "")
	phone = strings.ReplaceAll(phone, "(", "")
	phone = strings.ReplaceAll(phone, ")", "")
	return phone
}

// ValidarPassword verifica que la contraseña cumpla los requisitos de seguridad
// Requiere: minimo 8 caracteres, mayusculas, minusculas, numeros y caracteres especiales
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
		return errors.New("la contraseña debe contener al menos un carácter especial")
	}

	// Bloquea contraseñas comunes
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

// EsEmailCorporativo verifica si el email no es de un proveedor público
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
