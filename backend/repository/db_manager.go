package repository

import (
	"errors"
	"log"

	"github.com/tuusuario/quovi/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
)

// DBManager maneja las operaciones de base de datos
type DBManager struct {
	db *gorm.DB
}

// New inicializa la conexion a la base de datos
func New(dsn string) *DBManager {
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true,
			NoLowerCase:   true,
		},
	})
	if err != nil {
		log.Fatalf("Error al conectar con la base de datos: %v", err)
	}

	return &DBManager{db: db}
}

// VerificarTablas valida que todas las tablas necesarias existan
func (dm *DBManager) VerificarTablas() error {
	tablas := []string{
		"usuarios", "sesiones", "busquedas", "restaurantes",
		"resenas", "favoritos", "ciudades", "categorias_cocina",
		"caracteristicas", "platillos", "horarios", "imagenes_restaurante",
	}

	for _, tabla := range tablas {
		if !dm.db.Migrator().HasTable(tabla) {
			return errors.New("faltan tablas en la base de datos")
		}
	}

	return nil
}

// GetDB retorna la instancia de la base de datos
func (dm *DBManager) GetDB() *gorm.DB {
	return dm.db
}

// CrearUsuario inserta un nuevo usuario
func (dm *DBManager) CrearUsuario(usuario *models.Usuario) error {
	return dm.db.Create(usuario).Error
}

// ObtenerUsuarioPorEmail busca un usuario por email
func (dm *DBManager) ObtenerUsuarioPorEmail(email string) (*models.Usuario, error) {
	var usuario models.Usuario
	result := dm.db.Where("email = ?", email).First(&usuario)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("usuario no encontrado")
		}
		return nil, result.Error
	}

	return &usuario, nil
}

// ObtenerUsuarioPorID busca un usuario por ID
func (dm *DBManager) ObtenerUsuarioPorID(id uint) (*models.Usuario, error) {
	var usuario models.Usuario
	result := dm.db.First(&usuario, id)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("usuario no encontrado")
		}
		return nil, result.Error
	}

	return &usuario, nil
}

// ObtenerUsuarioPorGoogleID busca un usuario por Google ID
func (dm *DBManager) ObtenerUsuarioPorGoogleID(googleID string) (*models.Usuario, error) {
	var usuario models.Usuario
	result := dm.db.Where("googleId = ?", googleID).First(&usuario)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("usuario no encontrado")
		}
		return nil, result.Error
	}

	return &usuario, nil
}

// ActualizarUsuario guarda los cambios de un usuario
func (dm *DBManager) ActualizarUsuario(usuario *models.Usuario) error {
	return dm.db.Save(usuario).Error
}

// ObtenerTodosLosUsuarios retorna todos los usuarios activos
func (dm *DBManager) ObtenerTodosLosUsuarios() ([]models.Usuario, error) {
	var usuarios []models.Usuario
	result := dm.db.Where("activo = ?", true).Find(&usuarios)

	if result.Error != nil {
		return nil, result.Error
	}

	return usuarios, nil
}

// CrearSesion registra una nueva sesion de usuario
func (dm *DBManager) CrearSesion(sesion *models.Sesion) error {
	return dm.db.Create(sesion).Error
}

// ObtenerSesionPorToken busca una sesion por token
func (dm *DBManager) ObtenerSesionPorToken(token string) (*models.Sesion, error) {
	var sesion models.Sesion
	result := dm.db.Where("token = ?", token).First(&sesion)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("sesion no encontrada")
		}
		return nil, result.Error
	}

	return &sesion, nil
}

// EliminarSesion borra una sesion de la base de datos
func (dm *DBManager) EliminarSesion(token string) error {
	return dm.db.Where("token = ?", token).Delete(&models.Sesion{}).Error
}
