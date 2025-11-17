package repository

import (
	"errors"

	"github.com/tuusuario/quovi/models"
	"gorm.io/gorm"
)

// === MÉTODOS PARA PERFIL DE USUARIO ===

// ActualizarPerfil actualiza la información del perfil del usuario
func (dm *DBManager) ActualizarPerfil(idUsuario uint, nombre, apellido, email string) error {
	var usuario models.Usuario

	// Buscar el usuario
	result := dm.db.First(&usuario, idUsuario)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return errors.New("usuario no encontrado")
		}
		return result.Error
	}

	// Verificar si el email ya está en uso por otro usuario
	if email != usuario.Email {
		var existente models.Usuario
		result := dm.db.Where("email = ? AND idUsuario != ?", email, idUsuario).First(&existente)
		if result.Error == nil {
			return errors.New("el email ya está en uso por otro usuario")
		}
	}

	// Actualizar campos
	usuario.Nombre = nombre
	usuario.Apellido = apellido
	usuario.Email = email

	// Guardar cambios
	if err := dm.db.Save(&usuario).Error; err != nil {
		return err
	}

	return nil
}

// ActualizarFotoPerfil actualiza la foto de perfil del usuario
func (dm *DBManager) ActualizarFotoPerfil(idUsuario uint, fotoURL string) error {
	var usuario models.Usuario

	result := dm.db.First(&usuario, idUsuario)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return errors.New("usuario no encontrado")
		}
		return result.Error
	}

	// Actualizar foto
	usuario.Foto = fotoURL

	if err := dm.db.Save(&usuario).Error; err != nil {
		return err
	}

	return nil
}

// ActualizarNombreUsuario actualiza el nombre de usuario
func (dm *DBManager) ActualizarNombreUsuario(idUsuario uint, nombreUsuario string) error {
	var usuario models.Usuario

	result := dm.db.First(&usuario, idUsuario)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return errors.New("usuario no encontrado")
		}
		return result.Error
	}

	// Verificar si el nombre de usuario ya está en uso
	if nombreUsuario != usuario.NombreUsuario {
		var existente models.Usuario
		result := dm.db.Where("nombreUsuario = ? AND idUsuario != ?", nombreUsuario, idUsuario).First(&existente)
		if result.Error == nil {
			return errors.New("el nombre de usuario ya está en uso")
		}
	}

	usuario.NombreUsuario = nombreUsuario

	if err := dm.db.Save(&usuario).Error; err != nil {
		return err
	}

	return nil
}

// CambiarPassword cambia la contraseña del usuario
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

	if err := dm.db.Save(&usuario).Error; err != nil {
		return err
	}

	return nil
}

// EliminarCuenta elimina la cuenta del usuario (soft delete)
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

	if err := dm.db.Save(&usuario).Error; err != nil {
		return err
	}

	return nil
}
