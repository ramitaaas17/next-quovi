package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/tuusuario/quovi/services"
)

type PlatilloHandler struct {
	platilloService *services.PlatilloService
}

// NewPlatilloHandler crea una nueva instancia del handler de platillos
func NewPlatilloHandler(platilloService *services.PlatilloService) *PlatilloHandler {
	return &PlatilloHandler{
		platilloService: platilloService,
	}
}

// ObtenerPlatillosPorRestaurante obtiene los platillos de un restaurante
// GET /api/restaurantes/:id/platillos
func (ph *PlatilloHandler) ObtenerPlatillosPorRestaurante(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_id",
			Message: "ID de restaurante inválido",
		})
		return
	}

	platillos, err := ph.platilloService.ObtenerPlatillosPorRestaurante(uint(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Error:   "fetch_failed",
			Message: "Error al obtener platillos: " + err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":    platillos,
		"total":   len(platillos),
		"message": "Platillos obtenidos exitosamente",
	})
}

// ObtenerPlatilloDestacados obtiene los platillos destacados de un restaurante
// GET /api/restaurantes/:id/platillos/destacados
func (ph *PlatilloHandler) ObtenerPlatilloDestacados(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_id",
			Message: "ID de restaurante inválido",
		})
		return
	}

	platillos, err := ph.platilloService.ObtenerPlatillosDestacados(uint(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Error:   "fetch_failed",
			Message: "Error al obtener platillos destacados: " + err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":    platillos,
		"total":   len(platillos),
		"message": "Platillos destacados obtenidos exitosamente",
	})
}
