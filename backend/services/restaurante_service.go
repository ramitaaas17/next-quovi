package services

import (
	"errors"
	"math"
	"sort"
	"time"

	"github.com/tuusuario/quovi/models"
	"github.com/tuusuario/quovi/repository"
)

type RestauranteService struct {
	dbManager *repository.DBManager
}

func NewRestauranteService(dbManager *repository.DBManager) *RestauranteService {
	return &RestauranteService{
		dbManager: dbManager,
	}
}

type RestauranteConDistancia struct {
	models.Restaurante
	DistanciaKm    float64 `json:"distanciaKm"`
	TiempoEstimado string  `json:"tiempoEstimado"`
	EstaAbierto    bool    `json:"estaAbierto"`
	HorarioHoy     string  `json:"horarioHoy,omitempty"`
}

func (rs *RestauranteService) ObtenerTodosLosRestaurantes() ([]models.Restaurante, error) {
	return rs.dbManager.ObtenerTodosLosRestaurantes()
}

func (rs *RestauranteService) ObtenerRestaurantePorID(id uint) (*models.Restaurante, error) {
	return rs.dbManager.ObtenerRestaurantePorID(id)
}

func (rs *RestauranteService) ObtenerRestaurantesCercanos(lat, lng, radioKm float64) ([]RestauranteConDistancia, error) {
	restaurantes, err := rs.dbManager.ObtenerRestaurantesCercanos(lat, lng, radioKm)
	if err != nil {
		return nil, err
	}

	resultado := make([]RestauranteConDistancia, 0, len(restaurantes))

	for _, rest := range restaurantes {
		distancia := calcularDistancia(lat, lng, rest.Latitud, rest.Longitud)

		if distancia <= radioKm {
			tiempoEstimado := calcularTiempoEstimado(distancia)
			estaAbierto, horarioHoy := verificarHorario(rest.Horarios)

			resultado = append(resultado, RestauranteConDistancia{
				Restaurante:    rest,
				DistanciaKm:    math.Round(distancia*100) / 100,
				TiempoEstimado: tiempoEstimado,
				EstaAbierto:    estaAbierto,
				HorarioHoy:     horarioHoy,
			})
		}
	}

	sort.Slice(resultado, func(i, j int) bool {
		return resultado[i].DistanciaKm < resultado[j].DistanciaKm
	})

	return resultado, nil
}

func (rs *RestauranteService) BuscarRestaurantes(termino string, lat, lng *float64, radioKm float64) ([]RestauranteConDistancia, error) {
	restaurantes, err := rs.dbManager.BuscarRestaurantes(termino)
	if err != nil {
		return nil, err
	}

	if lat == nil || lng == nil {
		resultado := make([]RestauranteConDistancia, 0, len(restaurantes))
		for _, rest := range restaurantes {
			estaAbierto, horarioHoy := verificarHorario(rest.Horarios)
			resultado = append(resultado, RestauranteConDistancia{
				Restaurante: rest,
				DistanciaKm: 0,
				EstaAbierto: estaAbierto,
				HorarioHoy:  horarioHoy,
			})
		}
		return resultado, nil
	}

	resultado := make([]RestauranteConDistancia, 0)

	for _, rest := range restaurantes {
		distancia := calcularDistancia(*lat, *lng, rest.Latitud, rest.Longitud)

		if radioKm > 0 && distancia > radioKm {
			continue
		}

		tiempoEstimado := calcularTiempoEstimado(distancia)
		estaAbierto, horarioHoy := verificarHorario(rest.Horarios)

		resultado = append(resultado, RestauranteConDistancia{
			Restaurante:    rest,
			DistanciaKm:    math.Round(distancia*100) / 100,
			TiempoEstimado: tiempoEstimado,
			EstaAbierto:    estaAbierto,
			HorarioHoy:     horarioHoy,
		})
	}

	sort.Slice(resultado, func(i, j int) bool {
		return resultado[i].DistanciaKm < resultado[j].DistanciaKm
	})

	return resultado, nil
}

func (rs *RestauranteService) ObtenerRestaurantesPorCategoria(idCategoria uint, lat, lng *float64) ([]RestauranteConDistancia, error) {
	restaurantes, err := rs.dbManager.ObtenerRestaurantesPorCategoria(idCategoria)
	if err != nil {
		return nil, err
	}

	resultado := make([]RestauranteConDistancia, 0, len(restaurantes))

	for _, rest := range restaurantes {
		estaAbierto, horarioHoy := verificarHorario(rest.Horarios)

		item := RestauranteConDistancia{
			Restaurante: rest,
			EstaAbierto: estaAbierto,
			HorarioHoy:  horarioHoy,
		}

		if lat != nil && lng != nil {
			distancia := calcularDistancia(*lat, *lng, rest.Latitud, rest.Longitud)
			item.DistanciaKm = math.Round(distancia*100) / 100
			item.TiempoEstimado = calcularTiempoEstimado(distancia)
		}

		resultado = append(resultado, item)
	}

	if lat != nil && lng != nil {
		sort.Slice(resultado, func(i, j int) bool {
			return resultado[i].DistanciaKm < resultado[j].DistanciaKm
		})
	}

	return resultado, nil
}

func (rs *RestauranteService) ObtenerCategorias() ([]models.CategoriaRestaurante, error) {
	return rs.dbManager.ObtenerTodasLasCategorias()
}

func (rs *RestauranteService) ObtenerCiudades() ([]models.Ciudad, error) {
	return rs.dbManager.ObtenerTodasLasCiudades()
}

func (rs *RestauranteService) AgregarFavorito(idUsuario, idRestaurante uint) error {
	_, err := rs.dbManager.ObtenerRestaurantePorID(idRestaurante)
	if err != nil {
		return errors.New("restaurante no encontrado")
	}

	return rs.dbManager.AgregarFavorito(idUsuario, idRestaurante)
}

func (rs *RestauranteService) EliminarFavorito(idUsuario, idRestaurante uint) error {
	return rs.dbManager.EliminarFavorito(idUsuario, idRestaurante)
}

func (rs *RestauranteService) ObtenerFavoritos(idUsuario uint, lat, lng *float64) ([]RestauranteConDistancia, error) {
	restaurantes, err := rs.dbManager.ObtenerFavoritosUsuario(idUsuario)
	if err != nil {
		return nil, err
	}

	resultado := make([]RestauranteConDistancia, 0, len(restaurantes))

	for _, rest := range restaurantes {
		estaAbierto, horarioHoy := verificarHorario(rest.Horarios)

		item := RestauranteConDistancia{
			Restaurante: rest,
			EstaAbierto: estaAbierto,
			HorarioHoy:  horarioHoy,
		}

		if lat != nil && lng != nil {
			distancia := calcularDistancia(*lat, *lng, rest.Latitud, rest.Longitud)
			item.DistanciaKm = math.Round(distancia*100) / 100
			item.TiempoEstimado = calcularTiempoEstimado(distancia)
		}

		resultado = append(resultado, item)
	}

	return resultado, nil
}

func calcularDistancia(lat1, lng1, lat2, lng2 float64) float64 {
	const R = 6371

	lat1Rad := lat1 * math.Pi / 180
	lat2Rad := lat2 * math.Pi / 180
	deltaLat := (lat2 - lat1) * math.Pi / 180
	deltaLng := (lng2 - lng1) * math.Pi / 180

	a := math.Sin(deltaLat/2)*math.Sin(deltaLat/2) +
		math.Cos(lat1Rad)*math.Cos(lat2Rad)*
			math.Sin(deltaLng/2)*math.Sin(deltaLng/2)

	c := 2 * math.Atan2(math.Sqrt(a), math.Sqrt(1-a))

	return R * c
}

func calcularTiempoEstimado(distanciaKm float64) string {
	velocidadPromedio := 20.0
	tiempoHoras := distanciaKm / velocidadPromedio
	tiempoMinutos := int(tiempoHoras * 60)

	if tiempoMinutos < 5 {
		return "2-5 min"
	} else if tiempoMinutos < 10 {
		return "5-10 min"
	} else if tiempoMinutos < 15 {
		return "10-15 min"
	} else if tiempoMinutos < 20 {
		return "15-20 min"
	} else if tiempoMinutos < 30 {
		return "20-30 min"
	}
	return "30+ min"
}

func verificarHorario(horarios []models.Horario) (bool, string) {
	if len(horarios) == 0 {
		return false, ""
	}

	ahora := time.Now()
	diaActual := int(ahora.Weekday())
	if diaActual == 0 {
		diaActual = 7
	}

	var horarioHoy *models.Horario
	for i := range horarios {
		if int(horarios[i].Dia) == diaActual {
			horarioHoy = &horarios[i]
			break
		}
	}

	if horarioHoy == nil {
		return false, "Cerrado hoy"
	}

	if horarioHoy.Cerrado {
		return false, "Cerrado hoy"
	}

	horarioTexto := horarioHoy.Apertura + " - " + horarioHoy.Cierre

	horaActual := ahora.Format("15:04:05")
	estaAbierto := horaActual >= horarioHoy.Apertura && horaActual <= horarioHoy.Cierre

	return estaAbierto, horarioTexto
}
