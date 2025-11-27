package services

import (
	"github.com/tuusuario/quovi/models"
	"github.com/tuusuario/quovi/repository"
)

// TourService maneja la logica de negocio para tours gastronomicos
type TourService struct {
	repo *repository.DBManager
}

// NewTourService crea una nueva instancia del servicio
func NewTourService(repo *repository.DBManager) *TourService {
	return &TourService{
		repo: repo,
	}
}

// ObtenerRestaurantesPorIDs obtiene informacion de varios restaurantes
func (ts *TourService) ObtenerRestaurantesPorIDs(ids []int) ([]models.Restaurante, error) {
	// Convertir []int a []uint para GORM
	uintIDs := make([]uint, len(ids))
	for i, id := range ids {
		uintIDs[i] = uint(id)
	}

	// Usar metodo del repository
	return ts.repo.ObtenerRestaurantesPorIDs(uintIDs)
}

// ValidarTour verifica que un tour sea valido
func (ts *TourService) ValidarTour(ids []int) (bool, string) {
	// Validar que haya al menos 2 restaurantes
	if len(ids) < 2 {
		return false, "Se requieren al menos 2 restaurantes"
	}

	// Validar que no haya duplicados
	vistos := make(map[int]bool)
	for _, id := range ids {
		if vistos[id] {
			return false, "No se permiten restaurantes duplicados"
		}
		vistos[id] = true
	}

	// Validar que todos los IDs existan
	restaurantes, err := ts.ObtenerRestaurantesPorIDs(ids)
	if err != nil {
		return false, "Error al verificar restaurantes"
	}

	if len(restaurantes) != len(ids) {
		return false, "Algunos restaurantes no existen"
	}

	return true, ""
}
