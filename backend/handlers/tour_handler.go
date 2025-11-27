package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tuusuario/quovi/algorithms"
	"github.com/tuusuario/quovi/services"
)

// TourHandler maneja las rutas relacionadas con tours gastronomicos
type TourHandler struct {
	tourService *services.TourService
}

// NewTourHandler crea una nueva instancia del handler
func NewTourHandler(tourService *services.TourService) *TourHandler {
	return &TourHandler{
		tourService: tourService,
	}
}

// RequestGenerarTour es el request para generar un tour
type RequestGenerarTour struct {
	IDsRestaurantes  []int                 `json:"idsRestaurantes" binding:"required,min=2"`
	UbicacionUsuario algorithms.Coordenada `json:"ubicacionUsuario" binding:"required"`
	Preferencias     struct {
		Optimizar string `json:"optimizar"` // "distancia" o "tiempo"
	} `json:"preferencias"`
}

// ResponseTour es la respuesta con el tour optimizado
type ResponseTour struct {
	Ruta            []RestauranteEnRuta `json:"ruta"`
	DistanciaTotal  float64             `json:"distanciaTotalKm"`
	TiempoEstimado  int                 `json:"tiempoEstimadoMinutos"`
	Algoritmo       string              `json:"algoritmo"`
	PasosDetallados []PasoRuta          `json:"pasosDetallados"`
}

// RestauranteEnRuta representa un restaurante en la ruta optimizada
type RestauranteEnRuta struct {
	IDRestaurante int     `json:"idRestaurante"`
	Nombre        string  `json:"nombre"`
	Direccion     string  `json:"direccion"`
	Latitud       float64 `json:"latitud"`
	Longitud      float64 `json:"longitud"`
	Orden         int     `json:"orden"`
}

// PasoRuta representa un segmento del tour
type PasoRuta struct {
	Desde             string  `json:"desde"`
	Hasta             string  `json:"hasta"`
	DistanciaKm       float64 `json:"distanciaKm"`
	TiempoEstimadoMin int     `json:"tiempoEstimadoMin"`
	LatitudOrigen     float64 `json:"latitudOrigen"`
	LongitudOrigen    float64 `json:"longitudOrigen"`
	LatitudDestino    float64 `json:"latitudDestino"`
	LongitudDestino   float64 `json:"longitudDestino"`
}

// GenerarTour genera una ruta optimizada usando A*
func (th *TourHandler) GenerarTour(c *gin.Context) {
	var request RequestGenerarTour

	// Validar request
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Datos invalidos: se requieren al menos 2 restaurantes",
			"error":   err.Error(),
		})
		return
	}

	// Validar que haya al menos 2 restaurantes
	if len(request.IDsRestaurantes) < 2 {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Se requieren al menos 2 restaurantes para crear un tour",
		})
		return
	}

	// Obtener informacion de los restaurantes
	restaurantes, err := th.tourService.ObtenerRestaurantesPorIDs(request.IDsRestaurantes)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Error al obtener informacion de restaurantes",
			"error":   err.Error(),
		})
		return
	}

	// Verificar que se encontraron todos los restaurantes
	if len(restaurantes) != len(request.IDsRestaurantes) {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": "Algunos restaurantes no fueron encontrados",
		})
		return
	}

	// Crear optimizador A*
	optimizador := algorithms.NewAStarOptimizer()

	// Agregar todos los restaurantes al optimizador
	for _, rest := range restaurantes {
		optimizador.AgregarNodo(
			int(rest.IDRestaurante),
			rest.Nombre,
			rest.Latitud,
			rest.Longitud,
		)
	}

	// Optimizar la ruta usando A*
	rutaOptimizada, distanciaTotal, err := optimizador.OptimizarRuta(
		request.UbicacionUsuario,
		request.IDsRestaurantes,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Error al optimizar la ruta",
			"error":   err.Error(),
		})
		return
	}

	// Construir respuesta con la ruta optimizada
	rutaDetallada := []RestauranteEnRuta{}
	pasosDetallados := []PasoRuta{}

	// Primer paso: desde ubicacion del usuario al primer restaurante
	if len(rutaOptimizada) > 0 {
		primerRest := optimizador.ObtenerNodo(rutaOptimizada[0])
		distanciaPrimerPaso := th.calcularDistancia(
			request.UbicacionUsuario,
			primerRest.Coordenadas,
		)

		pasosDetallados = append(pasosDetallados, PasoRuta{
			Desde:             "Tu ubicacion",
			Hasta:             primerRest.Nombre,
			DistanciaKm:       distanciaPrimerPaso,
			TiempoEstimadoMin: th.calcularTiempo(distanciaPrimerPaso),
			LatitudOrigen:     request.UbicacionUsuario.Latitud,
			LongitudOrigen:    request.UbicacionUsuario.Longitud,
			LatitudDestino:    primerRest.Coordenadas.Latitud,
			LongitudDestino:   primerRest.Coordenadas.Longitud,
		})
	}

	// Construir resto de la ruta
	for i, idRest := range rutaOptimizada {
		nodo := optimizador.ObtenerNodo(idRest)

		// Buscar info completa del restaurante
		var restauranteCompleto *RestauranteEnRuta
		for _, rest := range restaurantes {
			if int(rest.IDRestaurante) == idRest {
				restauranteCompleto = &RestauranteEnRuta{
					IDRestaurante: int(rest.IDRestaurante),
					Nombre:        rest.Nombre,
					Direccion:     rest.Direccion,
					Latitud:       rest.Latitud,
					Longitud:      rest.Longitud,
					Orden:         i + 1,
				}
				break
			}
		}

		if restauranteCompleto != nil {
			rutaDetallada = append(rutaDetallada, *restauranteCompleto)
		}

		// Agregar paso si no es el ultimo
		if i < len(rutaOptimizada)-1 {
			siguienteNodo := optimizador.ObtenerNodo(rutaOptimizada[i+1])
			distanciaPaso := th.calcularDistancia(
				nodo.Coordenadas,
				siguienteNodo.Coordenadas,
			)

			pasosDetallados = append(pasosDetallados, PasoRuta{
				Desde:             nodo.Nombre,
				Hasta:             siguienteNodo.Nombre,
				DistanciaKm:       distanciaPaso,
				TiempoEstimadoMin: th.calcularTiempo(distanciaPaso),
				LatitudOrigen:     nodo.Coordenadas.Latitud,
				LongitudOrigen:    nodo.Coordenadas.Longitud,
				LatitudDestino:    siguienteNodo.Coordenadas.Latitud,
				LongitudDestino:   siguienteNodo.Coordenadas.Longitud,
			})
		}
	}

	// Calcular tiempo total estimado
	tiempoTotal := 0
	for _, paso := range pasosDetallados {
		tiempoTotal += paso.TiempoEstimadoMin
	}

	// Agregar tiempo de permanencia estimado en cada restaurante (30 min)
	tiempoTotal += len(rutaOptimizada) * 30

	// Preparar respuesta
	response := ResponseTour{
		Ruta:            rutaDetallada,
		DistanciaTotal:  distanciaTotal,
		TiempoEstimado:  tiempoTotal,
		Algoritmo:       "A* (A Star)",
		PasosDetallados: pasosDetallados,
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Tour optimizado generado exitosamente",
		"data":    response,
	})
}

// calcularDistancia usa Haversine para calcular distancia entre coordenadas
func (th *TourHandler) calcularDistancia(coord1, coord2 algorithms.Coordenada) float64 {
	// Reutilizar la funcion del optimizador
	optimizador := algorithms.NewAStarOptimizer()
	optimizador.AgregarNodo(1, "", coord1.Latitud, coord1.Longitud)
	optimizador.AgregarNodo(2, "", coord2.Latitud, coord2.Longitud)

	// Calcular usando la funcion interna (necesitariamos exportarla)
	// Por ahora, usar una implementacion simple
	return calcularDistanciaHaversine(coord1, coord2)
}

// calcularTiempo estima el tiempo de viaje en minutos
func (th *TourHandler) calcularTiempo(distanciaKm float64) int {
	// Asumir velocidad promedio de 30 km/h en ciudad
	velocidadPromedio := 30.0
	tiempoHoras := distanciaKm / velocidadPromedio
	tiempoMinutos := int(tiempoHoras * 60)

	// Minimo 5 minutos
	if tiempoMinutos < 5 {
		tiempoMinutos = 5
	}

	return tiempoMinutos
}

// Funcion auxiliar para calcular distancia Haversine
func calcularDistanciaHaversine(coord1, coord2 algorithms.Coordenada) float64 {
	const radioTierraKm = 6371.0
	const pi = 3.14159265359

	lat1Rad := coord1.Latitud * pi / 180
	lon1Rad := coord1.Longitud * pi / 180
	lat2Rad := coord2.Latitud * pi / 180
	lon2Rad := coord2.Longitud * pi / 180

	dLat := lat2Rad - lat1Rad
	dLon := lon2Rad - lon1Rad

	a := sinCuadrado(dLat/2) + cosPi(lat1Rad)*cosPi(lat2Rad)*sinCuadrado(dLon/2)
	c := 2 * asinPi(sqrtPi(a))

	return radioTierraKm * c
}

// Funciones matematicas auxiliares
func sinCuadrado(x float64) float64 {
	s := sinPi(x)
	return s * s
}

func sinPi(x float64) float64 {
	// Aproximacion simple de sin
	return x - (x*x*x)/6 + (x*x*x*x*x)/120
}

func cosPi(x float64) float64 {
	// Aproximacion simple de cos
	return 1 - (x*x)/2 + (x*x*x*x)/24
}

func asinPi(x float64) float64 {
	// Aproximacion simple de asin
	return x + (x*x*x)/6
}

func sqrtPi(x float64) float64 {
	// Metodo de Newton para raiz cuadrada
	if x == 0 {
		return 0
	}
	z := x
	for i := 0; i < 10; i++ {
		z = (z + x/z) / 2
	}
	return z
}
