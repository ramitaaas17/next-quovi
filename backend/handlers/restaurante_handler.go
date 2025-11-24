package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/tuusuario/quovi/services"
)

type RestauranteHandler struct {
	restauranteService *services.RestauranteService
}

func NewRestauranteHandler(restauranteService *services.RestauranteService) *RestauranteHandler {
	return &RestauranteHandler{
		restauranteService: restauranteService,
	}
}

type ObtenerRestaurantesCercanosRequest struct {
	Latitud  float64 `json:"latitud" binding:"required"`
	Longitud float64 `json:"longitud" binding:"required"`
	Radio    float64 `json:"radio"`
}

type BuscarRestaurantesRequest struct {
	Termino     string   `json:"termino"`
	Categoria   string   `json:"categoria,omitempty"`
	IDCategoria *uint    `json:"idCategoria,omitempty"`
	Latitud     *float64 `json:"latitud,omitempty"`
	Longitud    *float64 `json:"longitud,omitempty"`
	Radio       float64  `json:"radio,omitempty"`
}

type AgregarFavoritoRequest struct {
	IDRestaurante uint `json:"idRestaurante" binding:"required"`
}

func (rh *RestauranteHandler) ObtenerTodosLosRestaurantes(c *gin.Context) {
	restaurantes, err := rh.restauranteService.ObtenerTodosLosRestaurantes()
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Error:   "fetch_failed",
			Message: "Error al obtener restaurantes: " + err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":    restaurantes,
		"total":   len(restaurantes),
		"message": "Restaurantes obtenidos exitosamente",
	})
}

func (rh *RestauranteHandler) ObtenerRestaurantePorID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_id",
			Message: "ID de restaurante inválido",
		})
		return
	}

	restaurante, err := rh.restauranteService.ObtenerRestaurantePorID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, ErrorResponse{
			Error:   "not_found",
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":    restaurante,
		"message": "Restaurante obtenido exitosamente",
	})
}

func (rh *RestauranteHandler) ObtenerRestaurantesCercanos(c *gin.Context) {
	var req ObtenerRestaurantesCercanosRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_request",
			Message: "Datos inválidos: " + err.Error(),
		})
		return
	}

	if req.Latitud < -90 || req.Latitud > 90 {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_latitude",
			Message: "Latitud debe estar entre -90 y 90",
		})
		return
	}

	if req.Longitud < -180 || req.Longitud > 180 {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_longitude",
			Message: "Longitud debe estar entre -180 y 180",
		})
		return
	}

	if req.Radio <= 0 {
		req.Radio = 5.0
	}

	if req.Radio > 50 {
		req.Radio = 50.0
	}

	restaurantes, err := rh.restauranteService.ObtenerRestaurantesCercanos(
		req.Latitud,
		req.Longitud,
		req.Radio,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Error:   "fetch_failed",
			Message: "Error al buscar restaurantes cercanos: " + err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":  restaurantes,
		"total": len(restaurantes),
		"ubicacion": gin.H{
			"latitud":  req.Latitud,
			"longitud": req.Longitud,
			"radio":    req.Radio,
		},
		"message": "Restaurantes cercanos encontrados",
	})
}

func (rh *RestauranteHandler) BuscarRestaurantes(c *gin.Context) {
	var req BuscarRestaurantesRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_request",
			Message: "Datos de búsqueda inválidos: " + err.Error(),
		})
		return
	}

	if req.Termino == "" && req.Categoria == "" && req.IDCategoria == nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "missing_criteria",
			Message: "Debe proporcionar al menos un término de búsqueda o categoría",
		})
		return
	}

	if req.Latitud != nil && (*req.Latitud < -90 || *req.Latitud > 90) {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_latitude",
			Message: "Latitud debe estar entre -90 y 90",
		})
		return
	}

	if req.Longitud != nil && (*req.Longitud < -180 || *req.Longitud > 180) {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_longitude",
			Message: "Longitud debe estar entre -180 y 180",
		})
		return
	}

	restaurantes, err := rh.restauranteService.BuscarRestaurantes(
		req.Termino,
		req.Categoria,
		req.IDCategoria,
		req.Latitud,
		req.Longitud,
		req.Radio,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Error:   "search_failed",
			Message: "Error al buscar restaurantes: " + err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":      restaurantes,
		"total":     len(restaurantes),
		"termino":   req.Termino,
		"categoria": req.Categoria,
		"message":   "Búsqueda completada",
	})
}

func (rh *RestauranteHandler) ObtenerCategorias(c *gin.Context) {
	categorias, err := rh.restauranteService.ObtenerCategorias()
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Error:   "fetch_failed",
			Message: "Error al obtener categorías: " + err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":    categorias,
		"total":   len(categorias),
		"message": "Categorías obtenidas exitosamente",
	})
}

func (rh *RestauranteHandler) ObtenerRestaurantesPorCategoria(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_id",
			Message: "ID de categoría inválido",
		})
		return
	}

	var lat, lng *float64
	if latStr := c.Query("lat"); latStr != "" {
		latVal, err := strconv.ParseFloat(latStr, 64)
		if err == nil && latVal >= -90 && latVal <= 90 {
			lat = &latVal
		}
	}

	if lngStr := c.Query("lng"); lngStr != "" {
		lngVal, err := strconv.ParseFloat(lngStr, 64)
		if err == nil && lngVal >= -180 && lngVal <= 180 {
			lng = &lngVal
		}
	}

	restaurantes, err := rh.restauranteService.ObtenerRestaurantesPorCategoria(uint(id), lat, lng)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Error:   "fetch_failed",
			Message: "Error al obtener restaurantes: " + err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":    restaurantes,
		"total":   len(restaurantes),
		"message": "Restaurantes obtenidos exitosamente",
	})
}

func (rh *RestauranteHandler) ObtenerCiudades(c *gin.Context) {
	ciudades, err := rh.restauranteService.ObtenerCiudades()
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Error:   "fetch_failed",
			Message: "Error al obtener ciudades: " + err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":    ciudades,
		"total":   len(ciudades),
		"message": "Ciudades obtenidas exitosamente",
	})
}

func (rh *RestauranteHandler) AgregarFavorito(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Error:   "unauthorized",
			Message: "Usuario no autenticado",
		})
		return
	}

	var req AgregarFavoritoRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_request",
			Message: "Datos inválidos: " + err.Error(),
		})
		return
	}

	err := rh.restauranteService.AgregarFavorito(userID.(uint), req.IDRestaurante)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "favorite_failed",
			Message: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Restaurante agregado a favoritos",
	})
}

func (rh *RestauranteHandler) EliminarFavorito(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Error:   "unauthorized",
			Message: "Usuario no autenticado",
		})
		return
	}

	idStr := c.Param("id")
	idRestaurante, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{
			Error:   "invalid_id",
			Message: "ID de restaurante inválido",
		})
		return
	}

	err = rh.restauranteService.EliminarFavorito(userID.(uint), uint(idRestaurante))
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Error:   "unfavorite_failed",
			Message: "Error al eliminar favorito: " + err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Restaurante eliminado de favoritos",
	})
}

func (rh *RestauranteHandler) ObtenerFavoritos(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, ErrorResponse{
			Error:   "unauthorized",
			Message: "Usuario no autenticado",
		})
		return
	}

	var lat, lng *float64
	if latStr := c.Query("lat"); latStr != "" {
		latVal, err := strconv.ParseFloat(latStr, 64)
		if err == nil && latVal >= -90 && latVal <= 90 {
			lat = &latVal
		}
	}

	if lngStr := c.Query("lng"); lngStr != "" {
		lngVal, err := strconv.ParseFloat(lngStr, 64)
		if err == nil && lngVal >= -180 && lngVal <= 180 {
			lng = &lngVal
		}
	}

	restaurantes, err := rh.restauranteService.ObtenerFavoritos(userID.(uint), lat, lng)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			Error:   "fetch_failed",
			Message: "Error al obtener favoritos: " + err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":    restaurantes,
		"total":   len(restaurantes),
		"message": "Favoritos obtenidos exitosamente",
	})
}
