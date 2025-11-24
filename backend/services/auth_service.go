package services

import (
	"crypto/rand"
	"encoding/base64"
	"errors"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/tuusuario/quovi/models"
	"github.com/tuusuario/quovi/repository"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	dbManager *repository.DBManager
	jwtSecret []byte
}

// NewAuthService crea una instancia del servicio de autenticacion
func NewAuthService(dbManager *repository.DBManager, jwtSecret string) *AuthService {
	return &AuthService{
		dbManager: dbManager,
		jwtSecret: []byte(jwtSecret),
	}
}

// RegistrarUsuario crea una nueva cuenta local
func (as *AuthService) RegistrarUsuario(nombre, apellido, email, password string) (*models.Usuario, error) {
	// Verificar disponibilidad del email
	existente, _ := as.dbManager.ObtenerUsuarioPorEmail(email)
	if existente != nil {
		return nil, errors.New("el email ya esta registrado")
	}

	// Validar requisitos de seguridad de la contrasena
	if err := validarPassword(password); err != nil {
		return nil, err
	}

	// Hash de la contrasena
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), 12)
	if err != nil {
		return nil, errors.New("error al procesar la contrasena")
	}

	usuario := &models.Usuario{
		NombreUsuario:   generarNombreUsuarioDesdeEmail(email),
		Nombre:          nombre,
		Apellido:        apellido,
		Email:           email,
		Password:        string(hashedPassword),
		Provider:        "local",
		FechaRegistro:   time.Now(),
		Activo:          true,
		EmailVerificado: false,
	}

	err = as.dbManager.CrearUsuario(usuario)
	if err != nil {
		return nil, err
	}

	return usuario, nil
}

// IniciarSesion valida credenciales y genera un token JWT
func (as *AuthService) IniciarSesion(email, password, ipAddress, userAgent string) (string, *models.Usuario, error) {
	usuario, err := as.dbManager.ObtenerUsuarioPorEmail(email)
	if err != nil {
		return "", nil, errors.New("credenciales invalidas")
	}

	// Verificar contrasena
	err = bcrypt.CompareHashAndPassword([]byte(usuario.Password), []byte(password))
	if err != nil {
		return "", nil, errors.New("credenciales invalidas")
	}

	// Validar cuenta activa
	if !usuario.Activo {
		return "", nil, errors.New("cuenta desactivada")
	}

	// Generar token JWT
	token, err := as.GenerarToken(usuario.IDUsuario)
	if err != nil {
		return "", nil, errors.New("error al generar token")
	}

	// Actualizar ultimo acceso
	ahora := time.Now()
	usuario.UltimoAcceso = &ahora
	as.dbManager.ActualizarUsuario(usuario)

	// Registrar sesion
	sesion := &models.Sesion{
		IDUsuario: usuario.IDUsuario,
		Token:     token,
		Provider:  "local",
		ExpiraEn:  time.Now().Add(24 * time.Hour),
		IPAddress: ipAddress,
		UserAgent: userAgent,
	}
	as.dbManager.CrearSesion(sesion)

	return token, usuario, nil
}

// GenerarToken crea un JWT con expiracion de 24 horas
func (as *AuthService) GenerarToken(userID uint) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
		"iat":     time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(as.jwtSecret)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// ValidarToken verifica un JWT y retorna el ID de usuario
func (as *AuthService) ValidarToken(tokenString string) (uint, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("metodo de firma invalido")
		}
		return as.jwtSecret, nil
	})

	if err != nil {
		return 0, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userID := uint(claims["user_id"].(float64))
		return userID, nil
	}

	return 0, errors.New("token invalido")
}

// CerrarSesion invalida un token de sesion
func (as *AuthService) CerrarSesion(token string) error {
	return as.dbManager.EliminarSesion(token)
}

// RegistrarUsuarioGoogle autentica o crea cuenta con Google OAuth
func (as *AuthService) RegistrarUsuarioGoogle(googleID, email, nombre, apellido, foto string) (*models.Usuario, error) {
	// Buscar usuario con Google ID
	usuario, err := as.dbManager.ObtenerUsuarioPorGoogleID(googleID)

	if err == nil {
		// Usuario existe, actualizar ultimo acceso
		ahora := time.Now()
		usuario.UltimoAcceso = &ahora
		as.dbManager.ActualizarUsuario(usuario)
		return usuario, nil
	}

	// Verificar si existe cuenta con ese email
	usuarioEmail, _ := as.dbManager.ObtenerUsuarioPorEmail(email)
	if usuarioEmail != nil {
		// Vincular Google ID a cuenta existente
		usuarioEmail.GoogleID = &googleID
		usuarioEmail.Provider = "google"
		usuarioEmail.EmailVerificado = true
		if foto != "" {
			usuarioEmail.Foto = foto
		}
		if usuarioEmail.NombreUsuario == "" {
			usuarioEmail.NombreUsuario = generarNombreUsuarioUnico(email, googleID)
		}
		as.dbManager.ActualizarUsuario(usuarioEmail)
		return usuarioEmail, nil
	}

	// Crear nueva cuenta
	nuevoUsuario := &models.Usuario{
		NombreUsuario:   generarNombreUsuarioUnico(email, googleID),
		GoogleID:        &googleID,
		Email:           email,
		Nombre:          nombre,
		Apellido:        apellido,
		Foto:            foto,
		Provider:        "google",
		EmailVerificado: true,
		FechaRegistro:   time.Now(),
		Activo:          true,
	}

	err = as.dbManager.CrearUsuario(nuevoUsuario)
	if err != nil {
		return nil, err
	}

	return nuevoUsuario, nil
}

// validarPassword verifica requisitos de seguridad: minimo 8 caracteres, mayusculas, minusculas y numeros
func validarPassword(password string) error {
	if len(password) < 8 {
		return errors.New("la contrasena debe tener al menos 8 caracteres")
	}

	var (
		tieneMayuscula bool
		tieneMinuscula bool
		tieneNumero    bool
	)

	for _, char := range password {
		switch {
		case char >= 'A' && char <= 'Z':
			tieneMayuscula = true
		case char >= 'a' && char <= 'z':
			tieneMinuscula = true
		case char >= '0' && char <= '9':
			tieneNumero = true
		}
	}

	if !tieneMayuscula || !tieneMinuscula || !tieneNumero {
		return errors.New("la contrasena debe contener mayusculas, minusculas y numeros")
	}

	return nil
}

// generarNombreUsuarioUnico crea un username a partir del email y Google ID
func generarNombreUsuarioUnico(email, googleID string) string {
	partes := strings.Split(email, "@")
	base := partes[0]

	base = strings.ReplaceAll(base, ".", "")
	base = strings.ReplaceAll(base, "+", "")
	base = strings.ReplaceAll(base, "-", "")

	if len(base) > 20 {
		base = base[:20]
	}

	if len(googleID) >= 8 {
		sufijo := googleID[len(googleID)-8:]
		return strings.ToLower(base + "_" + sufijo)
	}

	return strings.ToLower(base + "_" + googleID)
}

// generarNombreUsuarioDesdeEmail crea un username basico del email
func generarNombreUsuarioDesdeEmail(email string) string {
	partes := strings.Split(email, "@")
	base := partes[0]

	base = strings.ReplaceAll(base, ".", "")
	base = strings.ReplaceAll(base, "+", "")
	base = strings.ReplaceAll(base, "-", "")

	if len(base) > 30 {
		base = base[:30]
	}

	return strings.ToLower(base)
}

// generarTokenSeguro crea un token aleatorio usando crypto/rand
func generarTokenSeguro() (string, error) {
	b := make([]byte, 32)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}
	return base64.URLEncoding.EncodeToString(b), nil
}
