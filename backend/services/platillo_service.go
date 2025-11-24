package services

import (
	"github.com/tuusuario/quovi/models"
	"github.com/tuusuario/quovi/repository"
)

type PlatilloService struct {
	dbManager *repository.DBManager
}

func NewPlatilloService(dbManager *repository.DBManager) *PlatilloService {
	return &PlatilloService{
		dbManager: dbManager,
	}
}

// ObtenerPlatillosPorRestaurante retorna todos los platillos disponibles de un restaurante
func (ps *PlatilloService) ObtenerPlatillosPorRestaurante(idRestaurante uint) ([]models.Platillo, error) {
	return ps.dbManager.ObtenerPlatillosPorRestaurante(idRestaurante)
}

// ObtenerPlatillosDestacados filtra solo los platillos destacados
func (ps *PlatilloService) ObtenerPlatillosDestacados(idRestaurante uint) ([]models.Platillo, error) {
	platillos, err := ps.dbManager.ObtenerPlatillosPorRestaurante(idRestaurante)
	if err != nil {
		return nil, err
	}

	destacados := make([]models.Platillo, 0)
	for _, platillo := range platillos {
		if platillo.Destacado {
			destacados = append(destacados, platillo)
		}
	}

	return destacados, nil
}
