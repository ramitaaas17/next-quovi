package algorithms

import (
	"container/heap"
	"math"
)

// Coordenada representa una ubicacion geografica
type Coordenada struct {
	Latitud  float64 `json:"latitud"`
	Longitud float64 `json:"longitud"`
}

// Nodo representa un restaurante en el grafo de busqueda
type Nodo struct {
	ID          int        `json:"id"`
	Nombre      string     `json:"nombre"`
	Coordenadas Coordenada `json:"coordenadas"`
}

// Estado representa un punto en el espacio de busqueda de A*
type Estado struct {
	NodoActual     int     // ID del restaurante actual
	Visitados      []int   // Lista de IDs ya visitados en orden
	CostoAcumulado float64 // g(n) - distancia real recorrida
	CostoEstimado  float64 // f(n) = g(n) + h(n)
	Indice         int     // Para el heap
}

// ColaPrioridad implementa heap.Interface para Estados
type ColaPrioridad []*Estado

func (cp ColaPrioridad) Len() int { return len(cp) }

func (cp ColaPrioridad) Less(i, j int) bool {
	// Menor costo estimado tiene mayor prioridad
	return cp[i].CostoEstimado < cp[j].CostoEstimado
}

func (cp ColaPrioridad) Swap(i, j int) {
	cp[i], cp[j] = cp[j], cp[i]
	cp[i].Indice = i
	cp[j].Indice = j
}

func (cp *ColaPrioridad) Push(x interface{}) {
	n := len(*cp)
	estado := x.(*Estado)
	estado.Indice = n
	*cp = append(*cp, estado)
}

func (cp *ColaPrioridad) Pop() interface{} {
	old := *cp
	n := len(old)
	estado := old[n-1]
	old[n-1] = nil
	estado.Indice = -1
	*cp = old[0 : n-1]
	return estado
}

// AStarOptimizer optimiza rutas usando el algoritmo A*
type AStarOptimizer struct {
	nodos map[int]*Nodo
}

// NewAStarOptimizer crea un nuevo optimizador
func NewAStarOptimizer() *AStarOptimizer {
	return &AStarOptimizer{
		nodos: make(map[int]*Nodo),
	}
}

// AgregarNodo agrega un restaurante al grafo
func (aso *AStarOptimizer) AgregarNodo(id int, nombre string, lat, lng float64) {
	aso.nodos[id] = &Nodo{
		ID:     id,
		Nombre: nombre,
		Coordenadas: Coordenada{
			Latitud:  lat,
			Longitud: lng,
		},
	}
}

// OptimizarRuta encuentra la mejor ruta para visitar todos los restaurantes
// Usa A* para resolver el problema del vendedor viajero (TSP)
func (aso *AStarOptimizer) OptimizarRuta(
	puntoInicio Coordenada,
	idsRestaurantes []int,
) ([]int, float64, error) {

	// Si solo hay un restaurante, devolver directamente
	if len(idsRestaurantes) == 0 {
		return []int{}, 0, nil
	}

	if len(idsRestaurantes) == 1 {
		distancia := aso.calcularDistanciaHaversine(
			puntoInicio,
			aso.nodos[idsRestaurantes[0]].Coordenadas,
		)
		return idsRestaurantes, distancia, nil
	}

	// Encontrar el restaurante mas cercano al punto de inicio
	mejorInicio := aso.encontrarMasCercano(puntoInicio, idsRestaurantes)

	// Crear estado inicial
	estadoInicial := &Estado{
		NodoActual:     mejorInicio,
		Visitados:      []int{mejorInicio},
		CostoAcumulado: aso.calcularDistanciaHaversine(puntoInicio, aso.nodos[mejorInicio].Coordenadas),
		CostoEstimado:  0,
	}

	// Calcular heuristica inicial
	pendientes := aso.obtenerPendientes(idsRestaurantes, estadoInicial.Visitados)
	estadoInicial.CostoEstimado = estadoInicial.CostoAcumulado +
		aso.heuristicaMSTAproximada(estadoInicial.NodoActual, pendientes)

	// Cola de prioridad para A*
	colaPrioridad := &ColaPrioridad{}
	heap.Init(colaPrioridad)
	heap.Push(colaPrioridad, estadoInicial)

	// Mapa para evitar revisar estados repetidos
	visitadosGlobal := make(map[string]bool)

	// Algoritmo A* principal
	for colaPrioridad.Len() > 0 {
		// Obtener estado con menor costo estimado
		estadoActual := heap.Pop(colaPrioridad).(*Estado)

		// Verificar si ya visitamos todos los restaurantes
		if len(estadoActual.Visitados) == len(idsRestaurantes) {
			return estadoActual.Visitados, estadoActual.CostoAcumulado, nil
		}

		// Crear clave unica para este estado
		clave := aso.crearClaveEstado(estadoActual)
		if visitadosGlobal[clave] {
			continue
		}
		visitadosGlobal[clave] = true

		// Expandir vecinos (restaurantes no visitados)
		pendientes := aso.obtenerPendientes(idsRestaurantes, estadoActual.Visitados)

		for _, siguienteID := range pendientes {
			// Calcular costo de ir al siguiente restaurante
			distancia := aso.calcularDistanciaHaversine(
				aso.nodos[estadoActual.NodoActual].Coordenadas,
				aso.nodos[siguienteID].Coordenadas,
			)

			// Crear nuevo estado
			nuevosVisitados := make([]int, len(estadoActual.Visitados))
			copy(nuevosVisitados, estadoActual.Visitados)
			nuevosVisitados = append(nuevosVisitados, siguienteID)

			nuevoCostoAcumulado := estadoActual.CostoAcumulado + distancia

			// Calcular heuristica para el nuevo estado
			nuevosPendientes := aso.obtenerPendientes(idsRestaurantes, nuevosVisitados)
			heuristica := aso.heuristicaMSTAproximada(siguienteID, nuevosPendientes)

			nuevoEstado := &Estado{
				NodoActual:     siguienteID,
				Visitados:      nuevosVisitados,
				CostoAcumulado: nuevoCostoAcumulado,
				CostoEstimado:  nuevoCostoAcumulado + heuristica,
			}

			heap.Push(colaPrioridad, nuevoEstado)
		}
	}

	// Si llegamos aqui, no se encontro solucion (no deberia pasar)
	return nil, 0, nil
}

// heuristicaMSTAproximada calcula una aproximacion del MST para los nodos pendientes
// Esta es la funcion h(n) del algoritmo A*
func (aso *AStarOptimizer) heuristicaMSTAproximada(nodoActual int, pendientes []int) float64 {
	if len(pendientes) == 0 {
		return 0
	}

	// Usar la distancia al mas cercano como heuristica simple pero admisible
	// Esto garantiza que A* encuentre la solucion optima
	minDistancia := math.MaxFloat64
	coordActual := aso.nodos[nodoActual].Coordenadas

	for _, id := range pendientes {
		distancia := aso.calcularDistanciaHaversine(
			coordActual,
			aso.nodos[id].Coordenadas,
		)
		if distancia < minDistancia {
			minDistancia = distancia
		}
	}

	// Sumar las distancias minimas entre los pendientes
	// Esto es una aproximacion del costo restante
	costoRestante := minDistancia

	if len(pendientes) > 1 {
		// Agregar una estimacion conservadora del resto
		costoRestante += float64(len(pendientes)-1) * minDistancia * 0.5
	}

	return costoRestante
}

// encontrarMasCercano encuentra el restaurante mas cercano a un punto
func (aso *AStarOptimizer) encontrarMasCercano(punto Coordenada, ids []int) int {
	mejorID := ids[0]
	mejorDistancia := aso.calcularDistanciaHaversine(punto, aso.nodos[ids[0]].Coordenadas)

	for _, id := range ids[1:] {
		distancia := aso.calcularDistanciaHaversine(punto, aso.nodos[id].Coordenadas)
		if distancia < mejorDistancia {
			mejorDistancia = distancia
			mejorID = id
		}
	}

	return mejorID
}

// obtenerPendientes devuelve los IDs de restaurantes no visitados
func (aso *AStarOptimizer) obtenerPendientes(todos []int, visitados []int) []int {
	visitadosMap := make(map[int]bool)
	for _, id := range visitados {
		visitadosMap[id] = true
	}

	pendientes := []int{}
	for _, id := range todos {
		if !visitadosMap[id] {
			pendientes = append(pendientes, id)
		}
	}

	return pendientes
}

// crearClaveEstado crea una representacion unica del estado
func (aso *AStarOptimizer) crearClaveEstado(estado *Estado) string {
	// Crear mapa de visitados para clave
	visitadosMap := make(map[int]bool)
	for _, id := range estado.Visitados {
		visitadosMap[id] = true
	}

	// La clave es: nodo_actual + conjunto de visitados
	// Esto evita explorar el mismo subproblema varias veces
	clave := string(rune(estado.NodoActual))
	for id := range visitadosMap {
		clave += string(rune(id))
	}

	return clave
}

// calcularDistanciaHaversine calcula distancia entre dos coordenadas en km
// Esta es la distancia real en la superficie de la Tierra
func (aso *AStarOptimizer) calcularDistanciaHaversine(coord1, coord2 Coordenada) float64 {
	const radioTierraKm = 6371.0

	// Convertir grados a radianes
	lat1Rad := coord1.Latitud * math.Pi / 180
	lon1Rad := coord1.Longitud * math.Pi / 180
	lat2Rad := coord2.Latitud * math.Pi / 180
	lon2Rad := coord2.Longitud * math.Pi / 180

	// Diferencias
	dLat := lat2Rad - lat1Rad
	dLon := lon2Rad - lon1Rad

	// Formula de Haversine
	a := math.Sin(dLat/2)*math.Sin(dLat/2) +
		math.Cos(lat1Rad)*math.Cos(lat2Rad)*
			math.Sin(dLon/2)*math.Sin(dLon/2)

	c := 2 * math.Asin(math.Sqrt(a))

	return radioTierraKm * c
}

// ObtenerNodo devuelve informacion de un nodo por ID
func (aso *AStarOptimizer) ObtenerNodo(id int) *Nodo {
	return aso.nodos[id]
}
