package services

import (
	"crypto/rand"
	"encoding/base64"
	"errors"
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

// NewAuthService crea una nueva instancia del servicio de autenticación
func NewAuthService(dbManager *repository.DBManager, jwtSecret string) *AuthService {
	return &AuthService{
		dbManager: dbManager,
		jwtSecret: []byte(jwtSecret),
	}
}

// RegistrarUsuario registra un nuevo usuario en el sistema
func (as *AuthService) RegistrarUsuario(nombre, apellido, email, password string) (*models.Usuario, error) {
	// Verificar si el usuario ya existe
	existente, _ := as.dbManager.ObtenerUsuarioPorEmail(email)
	if existente != nil {
		return nil, errors.New("el email ya está registrado")
	}

	// Validar contraseña (mínimo 8 caracteres, mayúsculas, minúsculas, números)
	if err := validarPassword(password); err != nil {
		return nil, err
	}

	// Hashear la contraseña con costo 12 (más seguro)
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), 12)
	if err != nil {
		return nil, errors.New("error al procesar la contraseña")
	}

	// Crear el usuario
	usuario := &models.Usuario{
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

// IniciarSesion autentica a un usuario y genera un token JWT
func (as *AuthService) IniciarSesion(email, password, ipAddress, userAgent string) (string, *models.Usuario, error) {
	// Buscar el usuario
	usuario, err := as.dbManager.ObtenerUsuarioPorEmail(email)
	if err != nil {
		return "", nil, errors.New("credenciales inválidas")
	}

	// Verificar la contraseña
	err = bcrypt.CompareHashAndPassword([]byte(usuario.Password), []byte(password))
	if err != nil {
		return "", nil, errors.New("credenciales inválidas")
	}

	// Verificar que el usuario esté activo
	if !usuario.Activo {
		return "", nil, errors.New("cuenta desactivada")
	}

	// Generar token JWT
	token, err := as.GenerarToken(usuario.IDUsuario) // ✅ CORREGIDO: IDUsuario en lugar de ID
	if err != nil {
		return "", nil, errors.New("error al generar token")
	}

	// Actualizar último acceso
	ahora := time.Now()
	usuario.UltimoAcceso = &ahora
	as.dbManager.ActualizarUsuario(usuario)

	// Crear sesión en la BD
	sesion := &models.Sesion{
		IDUsuario: usuario.IDUsuario, // ✅ CORREGIDO
		Token:     token,
		Provider:  "local",
		ExpiraEn:  time.Now().Add(24 * time.Hour),
		IPAddress: ipAddress,
		UserAgent: userAgent,
	}
	as.dbManager.CrearSesion(sesion)

	return token, usuario, nil
}

// GenerarToken genera un token JWT para un usuario
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

// ValidarToken valida un token JWT y retorna el ID del usuario
func (as *AuthService) ValidarToken(tokenString string) (uint, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("método de firma inválido")
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

	return 0, errors.New("token inválido")
}

// CerrarSesion cierra la sesión de un usuario
func (as *AuthService) CerrarSesion(token string) error {
	return as.dbManager.EliminarSesion(token)
}

// RegistrarUsuarioGoogle registra o autentica un usuario con Google OAuth
func (as *AuthService) RegistrarUsuarioGoogle(googleID, email, nombre, apellido, foto string) (*models.Usuario, error) {
	// Buscar si ya existe un usuario con ese Google ID
	usuario, err := as.dbManager.ObtenerUsuarioPorGoogleID(googleID)

	if err == nil {
		// Usuario ya existe, actualizar último acceso
		ahora := time.Now()
		usuario.UltimoAcceso = &ahora
		as.dbManager.ActualizarUsuario(usuario)
		return usuario, nil
	}

	// Verificar si existe un usuario con ese email
	usuarioEmail, _ := as.dbManager.ObtenerUsuarioPorEmail(email)
	if usuarioEmail != nil {
		// Vincular Google ID al usuario existente
		usuarioEmail.GoogleID = googleID
		usuarioEmail.Provider = "google"
		usuarioEmail.EmailVerificado = true
		if foto != "" {
			usuarioEmail.Foto = foto
		}
		as.dbManager.ActualizarUsuario(usuarioEmail)
		return usuarioEmail, nil
	}

	// Crear nuevo usuario
	nuevoUsuario := &models.Usuario{
		GoogleID:        googleID,
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

// validarPassword valida que la contraseña cumpla con requisitos de seguridad
func validarPassword(password string) error {
	if len(password) < 8 {
		return errors.New("la contraseña debe tener al menos 8 caracteres")
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
		return errors.New("la contraseña debe contener mayúsculas, minúsculas y números")
	}

	return nil
}

// generarTokenSeguro genera un token aleatorio seguro
func generarTokenSeguro() (string, error) {
	b := make([]byte, 32)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}
	return base64.URLEncoding.EncodeToString(b), nil
}
