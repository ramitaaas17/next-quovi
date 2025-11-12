package handlers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/tuusuario/quovi/services"
	"github.com/tuusuario/quovi/utils"
)

type AuthHandler struct {
	authService *services.AuthService
}

// NewAuthHandler crea una nueva instancia del handler de autenticación
func NewAuthHandler(authService *services.AuthService) *AuthHandler {
	return &AuthHandler{
		authService: authService,
	}
}

// Estructuras para requests

type RegistroRequest struct {
	FullName        string `json:"fullName" binding:"required"`
	Email           string `json:"email" binding:"required,email"`
	Password        string `json:"password" binding:"required,min=8"`
	ConfirmPassword string `json:"confirmPassword" binding:"required"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type LoginGoogleRequest struct {
	GoogleID string `json:"googleId" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Nombre   string `json:"nombre" binding:"required"`
	Apellido string `json:"apellido"`
	Foto     string `json:"foto"`
}

// Estructuras para responses

type UsuarioResponse struct {
	ID              uint   `json:"id"`
	Email           string `json:"email"`
	FullName        string `json:"fullName"`
	Avatar          string `json:"avatar"`
	EmailVerificado bool   `json:"emailVerificado"`
	Provider        string `json:"provider"`
	CreatedAt       string `json:"createdAt"`
}

type AuthResponse struct {
	Token   string          `json:"token"`
	Usuario UsuarioResponse `json:"usuario"`
	Message string          `json:"message"`
}

type ErrorResponse struct {
	Error   string `json:"error"`
	Message string `json:"message"`
}

// Registrar maneja el registro de nuevos usuarios
func (ah *AuthHandler) Registrar(c *gin.Context) {
	var req RegistroRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_request",
			Message: "Datos de registro inválidos: " + err.Error(),
		})
		return
	}

	// Sanitizar inputs
	req.FullName = utils.SanitizarInput(req.FullName)
	req.Email = utils.SanitizarInput(req.Email)

	// Validaciones de seguridad
	if err := utils.ValidarEmail(req.Email); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_email",
			Message: err.Error(),
		})
		return
	}

	if err := utils.ValidarNombre(req.FullName, "Nombre completo"); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_name",
			Message: err.Error(),
		})
		return
	}

	// Validar que las contraseñas coincidan
	if req.Password != req.ConfirmPassword {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "password_mismatch",
			Message: "Las contraseñas no coinciden",
		})
		return
	}

	// Validar contra SQL Injection
	if err := utils.ValidarContraSQL(req.FullName + req.Email); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_input",
			Message: "Los datos contienen caracteres no permitidos",
		})
		return
	}

	// Separar nombre completo en nombre y apellido
	nombres := strings.Fields(req.FullName)
	nombre := nombres[0]
	apellido := ""
	if len(nombres) > 1 {
		apellido = strings.Join(nombres[1:], " ")
	}

	// Registrar usuario
	usuario, err := ah.authService.RegistrarUsuario(
		nombre,
		apellido,
		req.Email,
		req.Password,
	)

	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "registration_failed",
			Message: err.Error(),
		})
		return
	}

	// Generar token
	token, err := ah.authService.GenerarToken(usuario.IDUsuario) // ✅ CORREGIDO: IDUsuario
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Error:   "token_generation_failed",
			Message: "Error al generar token de autenticación",
		})
		return
	}

	c.JSON(http.StatusCreated, AuthResponse{
		Token: token,
		Usuario: UsuarioResponse{
			ID:              usuario.IDUsuario, // ✅ CORREGIDO: IDUsuario
			Email:           usuario.Email,
			FullName:        usuario.Nombre + " " + usuario.Apellido,
			Avatar:          usuario.Foto,
			EmailVerificado: usuario.EmailVerificado,
			Provider:        usuario.Provider,
			CreatedAt:       usuario.FechaRegistro.Format("2006-01-02T15:04:05Z07:00"),
		},
		Message: "Usuario registrado exitosamente",
	})
}

// Login maneja el inicio de sesión de usuarios
func (ah *AuthHandler) Login(c *gin.Context) {
	var req LoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_request",
			Message: "Datos de inicio de sesión inválidos",
		})
		return
	}

	// Obtener información de la petición
	ipAddress := c.ClientIP()
	userAgent := c.Request.UserAgent()

	// Intentar inicio de sesión
	token, usuario, err := ah.authService.IniciarSesion(req.Email, req.Password, ipAddress, userAgent)
	if err != nil {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Error:   "authentication_failed",
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, AuthResponse{
		Token: token,
		Usuario: UsuarioResponse{
			ID:              usuario.IDUsuario, // ✅ CORREGIDO: IDUsuario
			Email:           usuario.Email,
			FullName:        usuario.Nombre + " " + usuario.Apellido,
			Avatar:          usuario.Foto,
			EmailVerificado: usuario.EmailVerificado,
			Provider:        usuario.Provider,
			CreatedAt:       usuario.FechaRegistro.Format("2006-01-02T15:04:05Z07:00"),
		},
		Message: "Inicio de sesión exitoso",
	})
}

// LoginGoogle maneja el inicio de sesión con Google
func (ah *AuthHandler) LoginGoogle(c *gin.Context) {
	var req LoginGoogleRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_request",
			Message: "Datos de Google inválidos",
		})
		return
	}

	// Registrar o autenticar usuario con Google
	usuario, err := ah.authService.RegistrarUsuarioGoogle(
		req.GoogleID,
		req.Email,
		req.Nombre,
		req.Apellido,
		req.Foto,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Error:   "google_auth_failed",
			Message: err.Error(),
		})
		return
	}

	// Generar token
	token, err := ah.authService.GenerarToken(usuario.IDUsuario) // ✅ CORREGIDO: IDUsuario
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Error:   "token_generation_failed",
			Message: "Error al generar token",
		})
		return
	}

	c.JSON(http.StatusOK, AuthResponse{
		Token: token,
		Usuario: UsuarioResponse{
			ID:              usuario.IDUsuario, // ✅ CORREGIDO: IDUsuario
			Email:           usuario.Email,
			FullName:        usuario.Nombre + " " + usuario.Apellido,
			Avatar:          usuario.Foto,
			EmailVerificado: usuario.EmailVerificado,
			Provider:        usuario.Provider,
			CreatedAt:       usuario.FechaRegistro.Format("2006-01-02T15:04:05Z07:00"),
		},
		Message: "Autenticación con Google exitosa",
	})
}

// Logout maneja el cierre de sesión
func (ah *AuthHandler) Logout(c *gin.Context) {
	// Obtener token del header Authorization
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Error:   "missing_token",
			Message: "Token no proporcionado",
		})
		return
	}

	// Extraer token (formato: "Bearer TOKEN")
	parts := strings.Split(authHeader, " ")
	if len(parts) != 2 || parts[0] != "Bearer" {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Error:   "invalid_token_format",
			Message: "Formato de token inválido",
		})
		return
	}

	token := parts[1]

	// Cerrar sesión
	err := ah.authService.CerrarSesion(token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Error:   "logout_failed",
			Message: "Error al cerrar sesión",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Sesión cerrada exitosamente",
	})
}

// VerificarToken middleware para verificar tokens JWT
func (ah *AuthHandler) VerificarToken(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Error:   "missing_token",
			Message: "Token no proporcionado",
		})
		c.Abort()
		return
	}

	parts := strings.Split(authHeader, " ")
	if len(parts) != 2 || parts[0] != "Bearer" {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Error:   "invalid_token_format",
			Message: "Formato de token inválido",
		})
		c.Abort()
		return
	}

	token := parts[1]
	userID, err := ah.authService.ValidarToken(token)
	if err != nil {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Error:   "invalid_token",
			Message: "Token inválido o expirado",
		})
		c.Abort()
		return
	}

	// Guardar el ID del usuario en el contexto
	c.Set("userID", userID)
	c.Next()
}
