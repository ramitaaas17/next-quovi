package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tuusuario/quovi/services"
)

type PerfilHandler struct {
	perfilService *services.PerfilService
}

func NewPerfilHandler(perfilService *services.PerfilService) *PerfilHandler {
	return &PerfilHandler{perfilService: perfilService}
}

// Estructuras de peticion
type ActualizarPerfilRequest struct {
	Nombre   string `json:"nombre" binding:"required"`
	Apellido string `json:"apellido"`
	Email    string `json:"email" binding:"required,email"`
}

type ActualizarFotoBase64Request struct {
	ImageData string `json:"imageData" binding:"required"`
	Extension string `json:"extension" binding:"required"`
}

type CambiarPasswordRequest struct {
	PasswordActual string `json:"passwordActual" binding:"required"`
	PasswordNueva  string `json:"passwordNueva" binding:"required,min=8"`
}

type ActualizarNombreUsuarioRequest struct {
	NombreUsuario string `json:"nombreUsuario" binding:"required,min=3,max=30"`
}

type EliminarCuentaRequest struct {
	Password string `json:"password" binding:"required"`
}

// Estructuras de respuesta
type PerfilResponse struct {
	IDUsuario       uint   `json:"idUsuario"`
	NombreUsuario   string `json:"nombreUsuario"`
	Email           string `json:"email"`
	Nombre          string `json:"nombre"`
	Apellido        string `json:"apellido"`
	Foto            string `json:"foto"`
	Provider        string `json:"provider"`
	EmailVerificado bool   `json:"emailVerificado"`
	FechaRegistro   string `json:"fechaRegistro"`
}

// ObtenerPerfil devuelve la informacion del usuario autenticado
func (ph *PerfilHandler) ObtenerPerfil(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Error:   "unauthorized",
			Message: "Usuario no autenticado",
		})
		return
	}

	usuario, err := ph.perfilService.ObtenerPerfil(userID.(uint))
	if err != nil {
		c.JSON(http.StatusNotFound, ErrorResponse{
			Error:   "not_found",
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": PerfilResponse{
			IDUsuario:       usuario.IDUsuario,
			NombreUsuario:   usuario.NombreUsuario,
			Email:           usuario.Email,
			Nombre:          usuario.Nombre,
			Apellido:        usuario.Apellido,
			Foto:            usuario.Foto,
			Provider:        usuario.Provider,
			EmailVerificado: usuario.EmailVerificado,
			FechaRegistro:   usuario.FechaRegistro.Format("2006-01-02T15:04:05Z07:00"),
		},
		"message": "Perfil obtenido exitosamente",
	})
}

// ActualizarPerfil modifica los datos del perfil del usuario
func (ph *PerfilHandler) ActualizarPerfil(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Error:   "unauthorized",
			Message: "Usuario no autenticado",
		})
		return
	}

	var req ActualizarPerfilRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_request",
			Message: "Datos invalidos: " + err.Error(),
		})
		return
	}

	usuario, err := ph.perfilService.ActualizarPerfil(
		userID.(uint),
		req.Nombre,
		req.Apellido,
		req.Email,
	)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "update_failed",
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": PerfilResponse{
			IDUsuario:       usuario.IDUsuario,
			NombreUsuario:   usuario.NombreUsuario,
			Email:           usuario.Email,
			Nombre:          usuario.Nombre,
			Apellido:        usuario.Apellido,
			Foto:            usuario.Foto,
			Provider:        usuario.Provider,
			EmailVerificado: usuario.EmailVerificado,
			FechaRegistro:   usuario.FechaRegistro.Format("2006-01-02T15:04:05Z07:00"),
		},
		"message": "Perfil actualizado exitosamente",
	})
}

// SubirFotoPerfil actualiza la foto usando multipart/form-data
func (ph *PerfilHandler) SubirFotoPerfil(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Error:   "unauthorized",
			Message: "Usuario no autenticado",
		})
		return
	}

	file, err := c.FormFile("foto")
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "missing_file",
			Message: "No se encontro el archivo 'foto' en la peticion",
		})
		return
	}

	usuario, err := ph.perfilService.ActualizarFotoPerfil(userID.(uint), file)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "upload_failed",
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": PerfilResponse{
			IDUsuario:       usuario.IDUsuario,
			NombreUsuario:   usuario.NombreUsuario,
			Email:           usuario.Email,
			Nombre:          usuario.Nombre,
			Apellido:        usuario.Apellido,
			Foto:            usuario.Foto,
			Provider:        usuario.Provider,
			EmailVerificado: usuario.EmailVerificado,
			FechaRegistro:   usuario.FechaRegistro.Format("2006-01-02T15:04:05Z07:00"),
		},
		"message": "Foto de perfil actualizada exitosamente",
	})
}

// SubirFotoPerfilBase64 actualiza la foto usando una cadena base64
func (ph *PerfilHandler) SubirFotoPerfilBase64(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Error:   "unauthorized",
			Message: "Usuario no autenticado",
		})
		return
	}

	var req ActualizarFotoBase64Request
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_request",
			Message: "Datos invalidos: " + err.Error(),
		})
		return
	}

	usuario, err := ph.perfilService.ActualizarFotoPerfilBase64(
		userID.(uint),
		req.ImageData,
		req.Extension,
	)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "upload_failed",
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": PerfilResponse{
			IDUsuario:       usuario.IDUsuario,
			NombreUsuario:   usuario.NombreUsuario,
			Email:           usuario.Email,
			Nombre:          usuario.Nombre,
			Apellido:        usuario.Apellido,
			Foto:            usuario.Foto,
			Provider:        usuario.Provider,
			EmailVerificado: usuario.EmailVerificado,
			FechaRegistro:   usuario.FechaRegistro.Format("2006-01-02T15:04:05Z07:00"),
		},
		"message": "Foto de perfil actualizada exitosamente",
	})
}

// EliminarFotoPerfil remueve la foto de perfil del usuario
func (ph *PerfilHandler) EliminarFotoPerfil(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Error:   "unauthorized",
			Message: "Usuario no autenticado",
		})
		return
	}

	usuario, err := ph.perfilService.EliminarFotoPerfil(userID.(uint))
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Error:   "delete_failed",
			Message: "Error al eliminar foto de perfil",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": PerfilResponse{
			IDUsuario:       usuario.IDUsuario,
			NombreUsuario:   usuario.NombreUsuario,
			Email:           usuario.Email,
			Nombre:          usuario.Nombre,
			Apellido:        usuario.Apellido,
			Foto:            usuario.Foto,
			Provider:        usuario.Provider,
			EmailVerificado: usuario.EmailVerificado,
			FechaRegistro:   usuario.FechaRegistro.Format("2006-01-02T15:04:05Z07:00"),
		},
		"message": "Foto de perfil eliminada exitosamente",
	})
}

// CambiarPassword actualiza la contraseña del usuario
func (ph *PerfilHandler) CambiarPassword(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Error:   "unauthorized",
			Message: "Usuario no autenticado",
		})
		return
	}

	var req CambiarPasswordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_request",
			Message: "Datos invalidos: " + err.Error(),
		})
		return
	}

	err := ph.perfilService.CambiarPassword(
		userID.(uint),
		req.PasswordActual,
		req.PasswordNueva,
	)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "password_change_failed",
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Contraseña cambiada exitosamente",
	})
}

// ActualizarNombreUsuario modifica el nombre de usuario
func (ph *PerfilHandler) ActualizarNombreUsuario(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Error:   "unauthorized",
			Message: "Usuario no autenticado",
		})
		return
	}

	var req ActualizarNombreUsuarioRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_request",
			Message: "Datos invalidos: " + err.Error(),
		})
		return
	}

	usuario, err := ph.perfilService.ActualizarNombreUsuario(userID.(uint), req.NombreUsuario)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "update_failed",
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": PerfilResponse{
			IDUsuario:       usuario.IDUsuario,
			NombreUsuario:   usuario.NombreUsuario,
			Email:           usuario.Email,
			Nombre:          usuario.Nombre,
			Apellido:        usuario.Apellido,
			Foto:            usuario.Foto,
			Provider:        usuario.Provider,
			EmailVerificado: usuario.EmailVerificado,
			FechaRegistro:   usuario.FechaRegistro.Format("2006-01-02T15:04:05Z07:00"),
		},
		"message": "Nombre de usuario actualizado exitosamente",
	})
}

// EliminarCuenta desactiva permanentemente la cuenta del usuario
func (ph *PerfilHandler) EliminarCuenta(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Error:   "unauthorized",
			Message: "Usuario no autenticado",
		})
		return
	}

	var req EliminarCuentaRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_request",
			Message: "Datos invalidos: " + err.Error(),
		})
		return
	}

	err := ph.perfilService.EliminarCuenta(userID.(uint), req.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "delete_failed",
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Cuenta eliminada exitosamente",
	})
}
