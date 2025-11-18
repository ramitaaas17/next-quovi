package services

import (
	"encoding/base64"
	"errors"
	"fmt"
	"mime/multipart"
	"strings"

	"github.com/tuusuario/quovi/models"
	"github.com/tuusuario/quovi/repository"
	"github.com/tuusuario/quovi/utils"
	"golang.org/x/crypto/bcrypt"
)

type PerfilService struct {
	dbManager *repository.DBManager
}

func NewPerfilService(dbManager *repository.DBManager) *PerfilService {
	return &PerfilService{
		dbManager: dbManager,
	}
}

func (ps *PerfilService) ObtenerPerfil(userID uint) (*models.Usuario, error) {
	return ps.dbManager.ObtenerUsuarioPorID(userID)
}

func (ps *PerfilService) ActualizarPerfil(userID uint, nombre, apellido, email string) (*models.Usuario, error) {
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

	nombre = utils.SanitizarInput(nombre)
	apellido = utils.SanitizarInput(apellido)
	email = utils.SanitizarInput(email)

	err := ps.dbManager.ActualizarPerfil(userID, nombre, apellido, email)
	if err != nil {
		return nil, err
	}

	return ps.dbManager.ObtenerUsuarioPorID(userID)
}

func (ps *PerfilService) ActualizarFotoPerfil(userID uint, file *multipart.FileHeader) (*models.Usuario, error) {
	return nil, errors.New("método no disponible, usar base64")
}

func (ps *PerfilService) ActualizarFotoPerfilBase64(userID uint, base64Image string, extension string) (*models.Usuario, error) {
	if base64Image == "" {
		return nil, errors.New("imagen base64 vacía")
	}

	imageData, err := base64.StdEncoding.DecodeString(base64Image)
	if err != nil {
		return nil, errors.New("formato base64 inválido")
	}

	if len(imageData) > 5*1024*1024 {
		return nil, errors.New("la imagen excede el tamaño máximo de 5MB")
	}

	allowedExtensions := map[string]bool{
		"jpg":  true,
		"jpeg": true,
		"png":  true,
		"gif":  true,
		"webp": true,
	}

	extension = strings.ToLower(extension)
	if !allowedExtensions[extension] {
		return nil, errors.New("formato de imagen no permitido")
	}

	base64URL := fmt.Sprintf("data:image/%s;base64,%s", extension, base64Image)

	err = ps.dbManager.ActualizarFotoPerfil(userID, base64URL)
	if err != nil {
		return nil, err
	}

	return ps.dbManager.ObtenerUsuarioPorID(userID)
}

func (ps *PerfilService) EliminarFotoPerfil(userID uint) (*models.Usuario, error) {
	err := ps.dbManager.ActualizarFotoPerfil(userID, "")
	if err != nil {
		return nil, err
	}

	return ps.dbManager.ObtenerUsuarioPorID(userID)
}

func (ps *PerfilService) CambiarPassword(userID uint, passwordActual, passwordNueva string) error {
	usuario, err := ps.dbManager.ObtenerUsuarioPorID(userID)
	if err != nil {
		return err
	}

	if usuario.Provider != "local" {
		return errors.New("no puedes cambiar la contraseña de una cuenta de Google")
	}

	err = bcrypt.CompareHashAndPassword([]byte(usuario.Password), []byte(passwordActual))
	if err != nil {
		return errors.New("la contraseña actual es incorrecta")
	}

	if err := utils.ValidarPassword(passwordNueva); err != nil {
		return err
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(passwordNueva), 12)
	if err != nil {
		return errors.New("error al procesar la nueva contraseña")
	}

	return ps.dbManager.CambiarPassword(userID, string(hashedPassword))
}

func (ps *PerfilService) ActualizarNombreUsuario(userID uint, nombreUsuario string) (*models.Usuario, error) {
	if len(nombreUsuario) < 3 {
		return nil, errors.New("el nombre de usuario debe tener al menos 3 caracteres")
	}

	if len(nombreUsuario) > 30 {
		return nil, errors.New("el nombre de usuario no puede exceder 30 caracteres")
	}

	nombreUsuario = utils.SanitizarInput(nombreUsuario)

	err := ps.dbManager.ActualizarNombreUsuario(userID, nombreUsuario)
	if err != nil {
		return nil, err
	}

	return ps.dbManager.ObtenerUsuarioPorID(userID)
}

func (ps *PerfilService) EliminarCuenta(userID uint, password string) error {
	usuario, err := ps.dbManager.ObtenerUsuarioPorID(userID)
	if err != nil {
		return err
	}

	if usuario.Provider == "local" {
		err = bcrypt.CompareHashAndPassword([]byte(usuario.Password), []byte(password))
		if err != nil {
			return errors.New("contraseña incorrecta")
		}
	}

	return ps.dbManager.EliminarCuenta(userID)
}
