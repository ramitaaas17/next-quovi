package repository

import (
	"errors"
	"fmt"

	"github.com/tuusuario/quovi/models"
	"gorm.io/gorm"
)

// === MÉTODOS PARA RESTAURANTES ===

// ObtenerTodosLosRestaurantes obtiene todos los restaurantes activos con sus relaciones
func (dm *DBManager) ObtenerTodosLosRestaurantes() ([]models.Restaurante, error) {
	var restaurantes []models.Restaurante

	result := dm.db.
		Preload("Ciudad").
		Preload("Categorias").
		Preload("Caracteristicas").
		Preload("Horarios").
		Preload("Imagenes").
		Where("activo = ?", true).
		Find(&restaurantes)

	if result.Error != nil {
		return nil, result.Error
	}

	return restaurantes, nil
}

// ObtenerRestaurantePorID obtiene un restaurante por su ID con todas sus relaciones
func (dm *DBManager) ObtenerRestaurantePorID(id uint) (*models.Restaurante, error) {
	var restaurante models.Restaurante

	result := dm.db.
		Preload("Ciudad").
		Preload("Categorias").
		Preload("Caracteristicas").
		Preload("Platillos", "disponible = ?", true).
		Preload("Horarios").
		Preload("Imagenes", func(db *gorm.DB) *gorm.DB {
			return db.Order("orden ASC")
		}).
		Where("activo = ?", true).
		First(&restaurante, id)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("restaurante no encontrado")
		}
		return nil, result.Error
	}

	return &restaurante, nil
}

// ObtenerRestaurantesPorCiudad obtiene restaurantes de una ciudad específica
func (dm *DBManager) ObtenerRestaurantesPorCiudad(idCiudad uint) ([]models.Restaurante, error) {
	var restaurantes []models.Restaurante

	result := dm.db.
		Preload("Ciudad").
		Preload("Categorias").
		Preload("Caracteristicas").
		Preload("Horarios").
		Preload("Imagenes").
		Where("id_ciudad = ? AND activo = ?", idCiudad, true).
		Find(&restaurantes)

	if result.Error != nil {
		return nil, result.Error
	}

	return restaurantes, nil
}

// ObtenerRestaurantesPorCategoria obtiene restaurantes de una categoría específica
func (dm *DBManager) ObtenerRestaurantesPorCategoria(idCategoria uint) ([]models.Restaurante, error) {
	var restaurantes []models.Restaurante

	result := dm.db.
		Preload("Ciudad").
		Preload("Categorias").
		Preload("Caracteristicas").
		Preload("Horarios").
		Preload("Imagenes").
		Joins("JOIN restaurante_categorias ON restaurante_categorias.idRestaurante = restaurantes.idRestaurante").
		Where("restaurante_categorias.idCategoria = ? AND restaurantes.activo = ?", idCategoria, true).
		Find(&restaurantes)

	if result.Error != nil {
		return nil, result.Error
	}

	return restaurantes, nil
}

// BuscarRestaurantes busca restaurantes por nombre o categoría
func (dm *DBManager) BuscarRestaurantes(termino string) ([]models.Restaurante, error) {
	var restaurantes []models.Restaurante

	searchTerm := fmt.Sprintf("%%%s%%", termino)

	result := dm.db.
		Preload("Ciudad").
		Preload("Categorias").
		Preload("Caracteristicas").
		Preload("Horarios").
		Preload("Imagenes").
		Where("activo = ? AND (nombre LIKE ? OR descripcion LIKE ?)", true, searchTerm, searchTerm).
		Find(&restaurantes)

	if result.Error != nil {
		return nil, result.Error
	}

	return restaurantes, nil
}

// ObtenerRestaurantesCercanos obtiene restaurantes dentro de un radio (en km) de una ubicación
func (dm *DBManager) ObtenerRestaurantesCercanos(lat, lng, radioKm float64) ([]models.Restaurante, error) {
	var restaurantes []models.Restaurante

	// Fórmula de Haversine simplificada para filtrado inicial
	// 1 grado ≈ 111 km
	deltaLat := radioKm / 111.0
	deltaLng := radioKm / (111.0 * 0.8) // Ajuste aproximado para longitud

	result := dm.db.
		Preload("Ciudad").
		Preload("Categorias").
		Preload("Caracteristicas").
		Preload("Horarios").
		Preload("Imagenes").
		Where("activo = ? AND latitud BETWEEN ? AND ? AND longitud BETWEEN ? AND ?",
			true,
			lat-deltaLat, lat+deltaLat,
			lng-deltaLng, lng+deltaLng,
		).
		Find(&restaurantes)

	if result.Error != nil {
		return nil, result.Error
	}

	return restaurantes, nil
}

// === MÉTODOS PARA CIUDADES ===

// ObtenerTodasLasCiudades obtiene todas las ciudades disponibles
func (dm *DBManager) ObtenerTodasLasCiudades() ([]models.Ciudad, error) {
	var ciudades []models.Ciudad

	result := dm.db.Find(&ciudades)
	if result.Error != nil {
		return nil, result.Error
	}

	return ciudades, nil
}

// ObtenerCiudadPorID obtiene una ciudad por su ID
func (dm *DBManager) ObtenerCiudadPorID(id uint) (*models.Ciudad, error) {
	var ciudad models.Ciudad

	result := dm.db.First(&ciudad, id)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("ciudad no encontrada")
		}
		return nil, result.Error
	}

	return &ciudad, nil
}

// === MÉTODOS PARA CATEGORÍAS ===

// ObtenerTodasLasCategorias obtiene todas las categorías de cocina
func (dm *DBManager) ObtenerTodasLasCategorias() ([]models.CategoriaRestaurante, error) {
	var categorias []models.CategoriaRestaurante

	result := dm.db.Find(&categorias)
	if result.Error != nil {
		return nil, result.Error
	}

	return categorias, nil
}

// === MÉTODOS PARA CARACTERÍSTICAS ===

// ObtenerTodasLasCaracteristicas obtiene todas las características disponibles
func (dm *DBManager) ObtenerTodasLasCaracteristicas() ([]models.CaracteristicaRestaurante, error) {
	var caracteristicas []models.CaracteristicaRestaurante

	result := dm.db.Find(&caracteristicas)
	if result.Error != nil {
		return nil, result.Error
	}

	return caracteristicas, nil
}

// === MÉTODOS PARA PLATILLOS ===

// ObtenerPlatillosPorRestaurante obtiene los platillos de un restaurante
func (dm *DBManager) ObtenerPlatillosPorRestaurante(idRestaurante uint) ([]models.Platillo, error) {
	var platillos []models.Platillo

	result := dm.db.
		Where("id_restaurante = ? AND disponible = ?", idRestaurante, true).
		Order("destacado DESC, nombre ASC").
		Find(&platillos)

	if result.Error != nil {
		return nil, result.Error
	}

	return platillos, nil
}

// === MÉTODOS PARA FAVORITOS ===

// AgregarFavorito agrega un restaurante a los favoritos del usuario
func (dm *DBManager) AgregarFavorito(idUsuario, idRestaurante uint) error {
	favorito := models.Favorito{
		IDUsuario:     idUsuario,
		IDRestaurante: idRestaurante,
	}

	result := dm.db.Create(&favorito)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

// EliminarFavorito elimina un restaurante de los favoritos del usuario
func (dm *DBManager) EliminarFavorito(idUsuario, idRestaurante uint) error {
	result := dm.db.
		Where("idUsuario = ? AND idRestaurante = ?", idUsuario, idRestaurante).
		Delete(&models.Favorito{})

	if result.Error != nil {
		return result.Error
	}

	return nil
}

// ObtenerFavoritosUsuario obtiene los restaurantes favoritos de un usuario
func (dm *DBManager) ObtenerFavoritosUsuario(idUsuario uint) ([]models.Restaurante, error) {
	var restaurantes []models.Restaurante

	result := dm.db.
		Preload("Ciudad").
		Preload("Categorias").
		Preload("Caracteristicas").
		Preload("Horarios").
		Preload("Imagenes").
		Joins("JOIN favoritos ON favoritos.idRestaurante = restaurantes.idRestaurante").
		Where("favoritos.idUsuario = ? AND restaurantes.activo = ?", idUsuario, true).
		Find(&restaurantes)

	if result.Error != nil {
		return nil, result.Error
	}

	return restaurantes, nil
}

// VerificarFavorito verifica si un restaurante está en los favoritos del usuario
func (dm *DBManager) VerificarFavorito(idUsuario, idRestaurante uint) (bool, error) {
	var count int64

	result := dm.db.Model(&models.Favorito{}).
		Where("idUsuario = ? AND idRestaurante = ?", idUsuario, idRestaurante).
		Count(&count)

	if result.Error != nil {
		return false, result.Error
	}

	return count > 0, nil
}
