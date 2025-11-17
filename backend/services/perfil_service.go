package services

import (
	"errors"
	"mime/multipart"

	"github.com/tuusuario/quovi/models"
	"github.com/tuusuario/quovi/repository"
	"github.com/tuusuario/quovi/utils"
	"golang.org/x/crypto/bcrypt"
)

type PerfilService struct {
	dbManager *repository.DBManager
}

// NewPerfilService crea una nueva instancia del servicio de perfil
func NewPerfilService(dbManager *repository.DBManager) *PerfilService {
	return &PerfilService{
		dbManager: dbManager,
	}
}

// ObtenerPerfil obtiene el perfil completo del usuario
func (ps *PerfilService) ObtenerPerfil(userID uint) (*models.Usuario, error) {
	return ps.dbManager.ObtenerUsuarioPorID(userID)
}

// ActualizarPerfil actualiza la información básica del perfil
func (ps *PerfilService) ActualizarPerfil(userID uint, nombre, apellido, email string) (*models.Usuario, error) {
	// Validar inputs
	if err := utils.ValidarNombre(nombre, "Nombre"); err != nil {
		return nil, err
	}

	if apellido != "" {
		if err := utils.ValidarNombre(apellido, "Apellido"); err != nil {
			return nil, err
		}
	}

	if err := utils.ValidarEmail(email); err != nil {
		return nil, err
	}

	// Sanitizar inputs
	nombre = utils.SanitizarInput(nombre)
	apellido = utils.SanitizarInput(apellido)
	email = utils.SanitizarInput(email)

	// Actualizar en la base de datos
	err := ps.dbManager.ActualizarPerfil(userID, nombre, apellido, email)
	if err != nil {
		return nil, err
	}

	// Obtener usuario actualizado
	return ps.dbManager.ObtenerUsuarioPorID(userID)
}

// ActualizarFotoPerfil actualiza la foto de perfil del usuario
func (ps *PerfilService) ActualizarFotoPerfil(userID uint, file *multipart.FileHeader) (*models.Usuario, error) {
	// Obtener usuario actual para eliminar foto antigua si existe
	usuario, err := ps.dbManager.ObtenerUsuarioPorID(userID)
	if err != nil {
		return nil, err
	}

	// Guardar nueva imagen
	imageURL, err := utils.GuardarImagen(file, userID)
	if err != nil {
		return nil, err
	}

	// Eliminar foto antigua si existe
	if usuario.Foto != "" {
		utils.EliminarImagen(usuario.Foto)
	}

	// Actualizar en la base de datos
	err = ps.dbManager.ActualizarFotoPerfil(userID, imageURL)
	if err != nil {
		// Si falla la actualización, eliminar la nueva imagen
		utils.EliminarImagen(imageURL)
		return nil, err
	}

	// Obtener usuario actualizado
	return ps.dbManager.ObtenerUsuarioPorID(userID)
}

// ActualizarFotoPerfilBase64 actualiza la foto usando base64
func (ps *PerfilService) ActualizarFotoPerfilBase64(userID uint, base64Image string, extension string) (*models.Usuario, error) {
	// Obtener usuario actual
	usuario, err := ps.dbManager.ObtenerUsuarioPorID(userID)
	if err != nil {
		return nil, err
	}

	// Guardar nueva imagen
	imageURL, err := utils.GuardarBase64Image(base64Image, userID, extension)
	if err != nil {
		return nil, err
	}

	// Eliminar foto antigua si existe
	if usuario.Foto != "" {
		utils.EliminarImagen(usuario.Foto)
	}

	// Actualizar en la base de datos
	err = ps.dbManager.ActualizarFotoPerfil(userID, imageURL)
	if err != nil {
		utils.EliminarImagen(imageURL)
		return nil, err
	}

	return ps.dbManager.ObtenerUsuarioPorID(userID)
}

// EliminarFotoPerfil elimina la foto de perfil del usuario
func (ps *PerfilService) EliminarFotoPerfil(userID uint) (*models.Usuario, error) {
	usuario, err := ps.dbManager.ObtenerUsuarioPorID(userID)
	if err != nil {
		return nil, err
	}

	if usuario.Foto != "" {
		utils.EliminarImagen(usuario.Foto)
	}

	err = ps.dbManager.ActualizarFotoPerfil(userID, "")
	if err != nil {
		return nil, err
	}

	return ps.dbManager.ObtenerUsuarioPorID(userID)
}

// CambiarPassword cambia la contraseña del usuario
func (ps *PerfilService) CambiarPassword(userID uint, passwordActual, passwordNueva string) error {
	// Obtener usuario
	usuario, err := ps.dbManager.ObtenerUsuarioPorID(userID)
	if err != nil {
		return err
	}

	// Si el usuario es de Google/OAuth, no tiene contraseña local
	if usuario.Provider != "local" {
		return errors.New("no puedes cambiar la contraseña de una cuenta de Google")
	}

	// Verificar contraseña actual
	err = bcrypt.CompareHashAndPassword([]byte(usuario.Password), []byte(passwordActual))
	if err != nil {
		return errors.New("la contraseña actual es incorrecta")
	}

	// Validar nueva contraseña
	if err := utils.ValidarPassword(passwordNueva); err != nil {
		return err
	}

	// Hashear nueva contraseña
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(passwordNueva), 12)
	if err != nil {
		return errors.New("error al procesar la nueva contraseña")
	}

	// Actualizar en la base de datos
	return ps.dbManager.CambiarPassword(userID, string(hashedPassword))
}

// ActualizarNombreUsuario actualiza el nombre de usuario
func (ps *PerfilService) ActualizarNombreUsuario(userID uint, nombreUsuario string) (*models.Usuario, error) {
	// Validar nombre de usuario
	if len(nombreUsuario) < 3 {
		return nil, errors.New("el nombre de usuario debe tener al menos 3 caracteres")
	}

	if len(nombreUsuario) > 30 {
		return nil, errors.New("el nombre de usuario no puede exceder 30 caracteres")
	}

	// Sanitizar
	nombreUsuario = utils.SanitizarInput(nombreUsuario)

	// Actualizar
	err := ps.dbManager.ActualizarNombreUsuario(userID, nombreUsuario)
	if err != nil {
		return nil, err
	}

	return ps.dbManager.ObtenerUsuarioPorID(userID)
}

// EliminarCuenta desactiva la cuenta del usuario
func (ps *PerfilService) EliminarCuenta(userID uint, password string) error {
	// Obtener usuario
	usuario, err := ps.dbManager.ObtenerUsuarioPorID(userID)
	if err != nil {
		return err
	}

	// Si es cuenta local, verificar contraseña
	if usuario.Provider == "local" {
		err = bcrypt.CompareHashAndPassword([]byte(usuario.Password), []byte(password))
		if err != nil {
			return errors.New("contraseña incorrecta")
		}
	}

	// Eliminar foto si existe
	if usuario.Foto != "" {
		utils.EliminarImagen(usuario.Foto)
	}

	// Desactivar cuenta
	return ps.dbManager.EliminarCuenta(userID)
}
