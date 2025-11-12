package repository

import (
	"errors"
	"log"

	"github.com/tuusuario/quovi/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type DBManager struct {
	db *gorm.DB
}

// New crea una nueva instancia del gestor de base de datos
func New(dsn string) *DBManager {
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		log.Fatalf("❌ Error al conectar con la base de datos: %v", err)
	}

	log.Println("✅ Conexión a la base de datos establecida correctamente")
	return &DBManager{db: db}
}

// VerificarTablas verifica que las tablas existan (sin modificarlas)
func (dm *DBManager) VerificarTablas() error {
	log.Println("🔍 Verificando existencia de tablas...")

	tablas := []string{
		"usuarios",
		"sesiones",
		"busquedas",
		"restaurantes",
		"reseñas",
		"favoritos",
		"ciudades",
		"categorias_cocina",
		"caracteristicas",
		"platillos",
		"horarios",
		"imagenes_restaurante",
	}

	for _, tabla := range tablas {
		if !dm.db.Migrator().HasTable(tabla) {
			log.Printf("⚠️  Tabla '%s' no existe. Ejecuta el script SQL de inicialización primero.", tabla)
			return errors.New("faltan tablas en la base de datos")
		}
	}

	log.Println("✅ Todas las tablas requeridas existen")
	return nil
}

// GetDB retorna la instancia de la base de datos
func (dm *DBManager) GetDB() *gorm.DB {
	return dm.db
}

// === MÉTODOS PARA USUARIOS ===

// CrearUsuario inserta un nuevo usuario en la BD
func (dm *DBManager) CrearUsuario(usuario *models.Usuario) error {
	result := dm.db.Create(usuario)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// ObtenerUsuarioPorEmail busca un usuario por su email
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

// ObtenerUsuarioPorID busca un usuario por su ID
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

// ObtenerUsuarioPorGoogleID busca un usuario por su Google ID
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

// ActualizarUsuario actualiza los datos de un usuario
func (dm *DBManager) ActualizarUsuario(usuario *models.Usuario) error {
	result := dm.db.Save(usuario)
	if result.Error != nil {
		return result.Error
	}
	return nil
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

// === MÉTODOS PARA SESIONES ===

// CrearSesion crea una nueva sesión de usuario
func (dm *DBManager) CrearSesion(sesion *models.Sesion) error {
	result := dm.db.Create(sesion)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// ObtenerSesionPorToken busca una sesión por su token
func (dm *DBManager) ObtenerSesionPorToken(token string) (*models.Sesion, error) {
	var sesion models.Sesion
	result := dm.db.Where("token = ?", token).First(&sesion)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("sesión no encontrada")
		}
		return nil, result.Error
	}

	return &sesion, nil
}

// EliminarSesion elimina una sesión de la BD
func (dm *DBManager) EliminarSesion(token string) error {
	result := dm.db.Where("token = ?", token).Delete(&models.Sesion{})
	if result.Error != nil {
		return result.Error
	}
	return nil
}
