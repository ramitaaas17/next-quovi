# ai-service/models/recommender.py
# Implementación del algoritmo de Recocido Simulado (Simulated Annealing)
# para optimizar las recomendaciones de restaurantes

import random
import math
import numpy as np
from typing import List, Dict, Tuple


class SimulatedAnnealingRecommender:
    """
    Optimizador de recomendaciones usando Recorrido Simulado.
    
    El Recocido Simulado es un algoritmo de optimización como si fuera un proceso
    metalúrgico de recocido, donde se calienta y enfría un material para alcanzar
    un estado de mínima energía.
    
    En nuestro caso:
    - Energía = función que combina relevancia (scores) y diversidad (variedad)
    - Temperatura = probabilidad de aceptar soluciones peores
    - Enfriamiento = reducción gradual de la temperatura
    
    Proceso:
    1. Comenzar con los mejores N restaurantes (por score)
    2. Generar "vecinos" intercambiando restaurantes
    3. Aceptar mejores soluciones siempre
    4. Aceptar peores soluciones con cierta probabilidad (para escapar óptimos locales)
    5. Reducir temperatura gradualmente
    6. Retornar la mejor solución encontrada
    """
    
    def __init__(
        self,
        temperatura_inicial: float = 100.0,
        temperatura_minima: float = 0.1,
        tasa_enfriamiento: float = 0.95,
        max_iteraciones: int = 300
    ):
        """
        Inicializa el optimizador con sus parámetros.
        
        Args:
            temperatura_inicial: Temperatura de inicio (alta = más exploración)
            temperatura_minima: Temperatura de parada (baja = más explotación)
            tasa_enfriamiento: Factor de reducción de temperatura (0-1)
            max_iteraciones: Número máximo de iteraciones del algoritmo
        """
        self.temperatura_inicial = temperatura_inicial
        self.temperatura_minima = temperatura_minima
        self.tasa_enfriamiento = tasa_enfriamiento
        self.max_iteraciones = max_iteraciones
        
        # Pesos para la función de energía
        # 80% relevancia (scores individuales) + 20% diversidad (variedad)
        self.peso_relevancia = 0.80
        self.peso_diversidad = 0.20
    
    def optimize_recommendations(
        self,
        restaurantes_con_score: List[Dict],
        num_recomendaciones: int = 10,
        embeddings: Dict[int, np.ndarray] = None
    ) -> Tuple[List[Dict], Dict]:
        """
        Optimiza la lista de recomendaciones usando Recorrido Simulado.
        
        Args:
            restaurantes_con_score: Lista de restaurantes ya evaluados con scores
            num_recomendaciones: Cantidad de recomendaciones a retornar
            embeddings: Diccionario con vectores semánticos de los restaurantes
            
        Returns:
            Tupla con:
            - Lista optimizada de restaurantes
            - Diccionario con estadísticas del proceso
        """
        
        # Si hay muy pocos restaurantes, no optimizar
        if len(restaurantes_con_score) <= num_recomendaciones:
            return restaurantes_con_score, {
                'iteraciones': 0,
                'mejoras_aceptadas': 0,
                'energia_inicial': 0,
                'energia_final': 0,
                'mejora_porcentual': 0,
                'historial': []
            }
        
        # Asegurar que estén ordenados por score
        restaurantes_ordenados = sorted(
            restaurantes_con_score,
            key=lambda x: x['score'],
            reverse=True
        )
        
        # Trabajar solo con el top 20 para eficiencia
        top_candidatos = restaurantes_ordenados[:min(20, len(restaurantes_ordenados))]
        
        # Solución inicial: los mejores N del top 20
        solucion_actual = top_candidatos[:num_recomendaciones]
        ids_actuales = [r['idRestaurante'] for r in solucion_actual]
        
        # Calcular energía inicial
        energia_actual = self._calculate_energy(
            solucion_actual,
            ids_actuales,
            embeddings
        )
        
        # Mejor solución encontrada hasta ahora
        mejor_solucion = solucion_actual.copy()
        mejor_energia = energia_actual
        
        # Variables de control del algoritmo
        temperatura = self.temperatura_inicial
        iteracion = 0
        mejoras_aceptadas = 0
        historial_energia = [energia_actual]
        
        # Algoritmo principal de Recorrido Simulado
        while temperatura > self.temperatura_minima and iteracion < self.max_iteraciones:
            
            # Generar una solución vecina (pequeña modificación)
            solucion_vecina, ids_vecinos = self._generar_vecino(
                solucion_actual,
                ids_actuales,
                top_candidatos,
                num_recomendaciones
            )
            
            # Calcular energía de la solución vecina
            energia_vecina = self._calculate_energy(
                solucion_vecina,
                ids_vecinos,
                embeddings
            )
            
            # Calcular diferencia de energía
            delta_energia = energia_vecina - energia_actual
            
            # Criterio de aceptación
            if delta_energia < 0:
                # Mejor solución - aceptar siempre
                solucion_actual = solucion_vecina
                ids_actuales = ids_vecinos
                energia_actual = energia_vecina
                mejoras_aceptadas += 1
                
                # Actualizar mejor solución global si es mejor
                if energia_actual < mejor_energia:
                    mejor_solucion = solucion_actual.copy()
                    mejor_energia = energia_actual
            
            else:
                # Peor solución - aceptar con cierta probabilidad
                # Esta probabilidad disminuye con la temperatura
                probabilidad = math.exp(-delta_energia / temperatura)
                
                if random.random() < probabilidad:
                    solucion_actual = solucion_vecina
                    ids_actuales = ids_vecinos
                    energia_actual = energia_vecina
            
            # Enfriar el sistema
            temperatura *= self.tasa_enfriamiento
            iteracion += 1
            historial_energia.append(energia_actual)
        
        # Calcular estadísticas del proceso
        estadisticas = {
            'iteraciones': iteracion,
            'mejoras_aceptadas': mejoras_aceptadas,
            'energia_inicial': historial_energia[0],
            'energia_final': mejor_energia,
            'mejora_porcentual': ((historial_energia[0] - mejor_energia) / abs(historial_energia[0])) * 100 if historial_energia[0] != 0 else 0,
            'historial': historial_energia
        }
        
        return mejor_solucion, estadisticas
    
    def _calculate_energy(
        self,
        solucion: List[Dict],
        ids: List[int],
        embeddings: Dict[int, np.ndarray]
    ) -> float:
        """
        Calcula la energía de una solución.
        
        Energía baja = buena solución
        
        La función combina:
        - Relevancia: promedio de scores individuales (80%)
        - Diversidad: qué tan diferentes son los restaurantes (20%)
        
        Retorna un valor negativo porque queremos MINIMIZAR la energía.
        """
        
        # Calcular relevancia: promedio de scores
        relevancia = sum(r['score'] for r in solucion) / len(solucion)
        
        # Calcular diversidad
        if embeddings:
            # Si hay embeddings, usar similitud semántica
            diversidad = self._calculate_diversity(ids, embeddings)
        else:
            # Si no hay embeddings, usar diversidad de categorías
            diversidad = self._calculate_category_diversity(solucion)
        
        # Combinar relevancia y diversidad con pesos
        energia = -(
            self.peso_relevancia * relevancia +
            self.peso_diversidad * diversidad
        )
        
        return energia
    
    def _calculate_diversity(
        self,
        ids: List[int],
        embeddings: Dict[int, np.ndarray]
    ) -> float:
        """
        Calcula diversidad usando embeddings (vectores semánticos).
        
        La diversidad es el promedio de distancias entre todos los pares de restaurantes.
        Distancia alta = restaurantes diferentes = mayor diversidad
        
        Usa similitud coseno:
        - 1.0 = idénticos
        - 0.0 = completamente diferentes
        Distancia = 1 - similitud
        """
        
        if len(ids) < 2:
            return 0.0
        
        distancias = []
        
        # Calcular distancia entre todos los pares
        for i in range(len(ids)):
            for j in range(i + 1, len(ids)):
                id1 = ids[i]
                id2 = ids[j]
                
                # Verificar que ambos embeddings existan
                if id1 in embeddings and id2 in embeddings:
                    vec1 = embeddings[id1]
                    vec2 = embeddings[id2]
                    
                    # Calcular distancia = 1 - similitud
                    distancia = 1 - self._cosine_similarity(vec1, vec2)
                    distancias.append(distancia)
        
        # Retornar promedio de distancias
        if distancias:
            return sum(distancias) / len(distancias)
        
        return 0.0
    
    def _calculate_category_diversity(self, solucion: List[Dict]) -> float:
        """
        Calcula diversidad basada en categorías de comida.
        
        Más categorías únicas = mayor diversidad
        
        Normalizado a [0, 1] asumiendo máximo de 10 categorías únicas.
        """
        
        categorias_unicas = set()
        
        # Recolectar todas las categorías únicas
        for restaurante in solucion:
            for categoria in restaurante.get('categorias', []):
                categorias_unicas.add(categoria.get('nombreCategoria', ''))
        
        # Normalizar a [0, 1]
        return min(len(categorias_unicas) / 10.0, 1.0)
    
    def _cosine_similarity(self, vec1: np.ndarray, vec2: np.ndarray) -> float:
        """
        Calcula la similitud coseno entre dos vectores.
        
        Similitud coseno = (vec1 · vec2) / (|vec1| × |vec2|)
        
        Resultado:
        - 1.0 = vectores idénticos
        - 0.0 = vectores perpendiculares (no relacionados)
        - -1.0 = vectores opuestos
        """
        
        # Producto punto
        dot_product = np.dot(vec1, vec2)
        
        # Normas (magnitudes) de los vectores
        norm1 = np.linalg.norm(vec1)
        norm2 = np.linalg.norm(vec2)
        
        # Evitar división por cero
        if norm1 == 0 or norm2 == 0:
            return 0.0
        
        return dot_product / (norm1 * norm2)
    
    def _generar_vecino(
        self,
        solucion_actual: List[Dict],
        ids_actuales: List[int],
        candidatos: List[Dict],
        num_recomendaciones: int
    ) -> Tuple[List[Dict], List[int]]:
        """
        Genera una solución vecina haciendo un pequeño cambio.
        
        Estrategia:
        - Elige una posición aleatoria en la solución actual
        - La reemplaza con un restaurante del top 20 que no esté incluido
        
        Esto crea una "vecindad" de soluciones similares para explorar.
        """
        
        # Copiar solución actual
        nueva_solucion = solucion_actual.copy()
        nuevos_ids = ids_actuales.copy()
        
        # Elegir posición aleatoria para cambiar
        posicion = random.randint(0, num_recomendaciones - 1)
        
        # Encontrar restaurantes disponibles (no incluidos en la solución actual)
        disponibles = [
            r for r in candidatos
            if r['idRestaurante'] not in ids_actuales
        ]
        
        # Si hay restaurantes disponibles, hacer el cambio
        if disponibles:
            nuevo = random.choice(disponibles)
            nueva_solucion[posicion] = nuevo
            nuevos_ids[posicion] = nuevo['idRestaurante']
        
        return nueva_solucion, nuevos_ids