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

func NewAuthHandler(authService *services.AuthService) *AuthHandler {
	return &AuthHandler{authService: authService}
}

// Estructuras de peticion
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

// Estructuras de respuesta
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

// Registrar crea una nueva cuenta de usuario
func (ah *AuthHandler) Registrar(c *gin.Context) {
	var req RegistroRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_request",
			Message: "Datos de registro invalidos: " + err.Error(),
		})
		return
	}

	// Sanitizar datos de entrada
	req.FullName = utils.SanitizarInput(req.FullName)
	req.Email = utils.SanitizarInput(req.Email)

	// Validar email
	if err := utils.ValidarEmail(req.Email); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_email",
			Message: err.Error(),
		})
		return
	}

	// Validar nombre
	if err := utils.ValidarNombre(req.FullName, "Nombre completo"); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_name",
			Message: err.Error(),
		})
		return
	}

	// Verificar que las contraseñas coincidan
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

	// Separar nombre completo
	nombres := strings.Fields(req.FullName)
	nombre := nombres[0]
	apellido := ""
	if len(nombres) > 1 {
		apellido = strings.Join(nombres[1:], " ")
	}

	// Crear usuario
	usuario, err := ah.authService.RegistrarUsuario(nombre, apellido, req.Email, req.Password)
	if err != nil {
		// Manejar específicamente error de email duplicado
		if strings.Contains(err.Error(), "email ya registrado") ||
			strings.Contains(err.Error(), "Duplicate entry") {
			c.JSON(http.StatusConflict, ErrorResponse{
				Error:   "email_already_exists",
				Message: "Este correo electrónico ya está registrado. Por favor, inicia sesión o usa otro email.",
			})
			return
		}

		// Otros errores
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "registration_failed",
			Message: err.Error(),
		})
		return
	}

	// Generar token JWT
	token, err := ah.authService.GenerarToken(usuario.IDUsuario)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Error:   "token_generation_failed",
			Message: "Error al generar token de autenticacion",
		})
		return
	}

	c.JSON(http.StatusCreated, AuthResponse{
		Token: token,
		Usuario: UsuarioResponse{
			ID:              usuario.IDUsuario,
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

// Login autentica un usuario con email y contraseña
func (ah *AuthHandler) Login(c *gin.Context) {
	var req LoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_request",
			Message: "Datos de inicio de sesion invalidos",
		})
		return
	}

	// Obtener datos de la peticion para auditoria
	ipAddress := c.ClientIP()
	userAgent := c.Request.UserAgent()

	// Autenticar usuario
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
			ID:              usuario.IDUsuario,
			Email:           usuario.Email,
			FullName:        usuario.Nombre + " " + usuario.Apellido,
			Avatar:          usuario.Foto,
			EmailVerificado: usuario.EmailVerificado,
			Provider:        usuario.Provider,
			CreatedAt:       usuario.FechaRegistro.Format("2006-01-02T15:04:05Z07:00"),
		},
		Message: "Inicio de sesion exitoso",
	})
}

// LoginGoogle autentica o registra un usuario usando Google OAuth
func (ah *AuthHandler) LoginGoogle(c *gin.Context) {
	var req LoginGoogleRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_request",
			Message: "Datos de Google invalidos",
		})
		return
	}

	// Registrar o autenticar con Google
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

	// Generar token JWT
	token, err := ah.authService.GenerarToken(usuario.IDUsuario)
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
			ID:              usuario.IDUsuario,
			Email:           usuario.Email,
			FullName:        usuario.Nombre + " " + usuario.Apellido,
			Avatar:          usuario.Foto,
			EmailVerificado: usuario.EmailVerificado,
			Provider:        usuario.Provider,
			CreatedAt:       usuario.FechaRegistro.Format("2006-01-02T15:04:05Z07:00"),
		},
		Message: "Autenticacion con Google exitosa",
	})
}

// Logout invalida el token del usuario actual
func (ah *AuthHandler) Logout(c *gin.Context) {
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
			Message: "Formato de token invalido",
		})
		return
	}

	token := parts[1]

	if err := ah.authService.CerrarSesion(token); err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Error:   "logout_failed",
			Message: "Error al cerrar sesion",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Sesion cerrada exitosamente",
	})
}

// VerificarToken middleware para proteger rutas que requieren autenticacion
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
			Message: "Formato de token invalido",
		})
		c.Abort()
		return
	}

	token := parts[1]
	userID, err := ah.authService.ValidarToken(token)
	if err != nil {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Error:   "invalid_token",
			Message: "Token invalido o expirado",
		})
		c.Abort()
		return
	}

	// Guardar ID del usuario en el contexto para uso posterior
	c.Set("userID", userID)
	c.Next()
}
