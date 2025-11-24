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

func NewPlatilloHandler(platilloService *services.PlatilloService) *PlatilloHandler {
	return &PlatilloHandler{platilloService: platilloService}
}

// ObtenerPlatillosPorRestaurante devuelve todos los platillos de un restaurante
func (ph *PlatilloHandler) ObtenerPlatillosPorRestaurante(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_id",
			Message: "ID de restaurante invalido",
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

// ObtenerPlatilloDestacados devuelve los platillos destacados de un restaurante
func (ph *PlatilloHandler) ObtenerPlatilloDestacados(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_id",
			Message: "ID de restaurante invalido",
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
