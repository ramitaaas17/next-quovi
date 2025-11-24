package repository

import (
	"errors"

	"github.com/tuusuario/quovi/models"
	"gorm.io/gorm"
)

// ActualizarPerfil modifica la informacion basica del perfil
func (dm *DBManager) ActualizarPerfil(idUsuario uint, nombre, apellido, email string) error {
	var usuario models.Usuario

	result := dm.db.First(&usuario, idUsuario)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return errors.New("usuario no encontrado")
		}
		return result.Error
	}

	// Verificar si el email ya esta en uso
	if email != usuario.Email {
		var existente models.Usuario
		result := dm.db.Where("email = ? AND idUsuario != ?", email, idUsuario).First(&existente)
		if result.Error == nil {
			return errors.New("el email ya esta en uso por otro usuario")
		}
	}

	usuario.Nombre = nombre
	usuario.Apellido = apellido
	usuario.Email = email

	return dm.db.Save(&usuario).Error
}

// ActualizarFotoPerfil cambia la foto de perfil del usuario
func (dm *DBManager) ActualizarFotoPerfil(idUsuario uint, fotoURL string) error {
	var usuario models.Usuario

	result := dm.db.First(&usuario, idUsuario)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return errors.New("usuario no encontrado")
		}
		return result.Error
	}

	usuario.Foto = fotoURL
	return dm.db.Save(&usuario).Error
}

// ActualizarNombreUsuario modifica el nombre de usuario
func (dm *DBManager) ActualizarNombreUsuario(idUsuario uint, nombreUsuario string) error {
	var usuario models.Usuario

	result := dm.db.First(&usuario, idUsuario)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return errors.New("usuario no encontrado")
		}
		return result.Error
	}

	// Verificar disponibilidad del nombre de usuario
	if nombreUsuario != usuario.NombreUsuario {
		var existente models.Usuario
		result := dm.db.Where("nombreUsuario = ? AND idUsuario != ?", nombreUsuario, idUsuario).First(&existente)
		if result.Error == nil {
			return errors.New("el nombre de usuario ya esta en uso")
		}
	}

	usuario.NombreUsuario = nombreUsuario
	return dm.db.Save(&usuario).Error
}

// CambiarPassword actualiza la contrasena del usuario
func (dm *DBManager) CambiarPassword(idUsuario uint, hashedPassword string) error {
	var usuario models.Usuario

	result := dm.db.First(&usuario, idUsuario)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return errors.New("usuario no encontrado")
		}
		return result.Error
	}

	usuario.Password = hashedPassword
	return dm.db.Save(&usuario).Error
}

// EliminarCuenta desactiva la cuenta del usuario (soft delete)
func (dm *DBManager) EliminarCuenta(idUsuario uint) error {
	var usuario models.Usuario

	result := dm.db.First(&usuario, idUsuario)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return errors.New("usuario no encontrado")
		}
		return result.Error
	}

	usuario.Activo = false
	return dm.db.Save(&usuario).Error
}
