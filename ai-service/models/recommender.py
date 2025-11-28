# ai-service/models/recommender.py - VERSIÓN CORREGIDA

import random
import math
import numpy as np
from typing import List, Dict, Tuple

class SimulatedAnnealingRecommender:
    """
    ✅ VERSIÓN MEJORADA del Recocido Simulado
    
    CAMBIOS:
    1. Pesos ajustados: 80% relevancia, 20% diversidad
    2. Mejor función de energía
    3. Solo reorganiza el top 20 (no todos)
    """
    
    def __init__(
        self,
        temperatura_inicial: float = 100.0,
        temperatura_minima: float = 0.1,
        tasa_enfriamiento: float = 0.95,
        max_iteraciones: int = 300  # ⬇️ Reducido (antes 500)
    ):
        self.temperatura_inicial = temperatura_inicial
        self.temperatura_minima = temperatura_minima
        self.tasa_enfriamiento = tasa_enfriamiento
        self.max_iteraciones = max_iteraciones
        
        # ✅ PESOS AJUSTADOS
        self.peso_relevancia = 0.80  # ⬆️ Aumentado (antes 0.60)
        self.peso_diversidad = 0.20  # ⬇️ Reducido (antes 0.40)
    
    def optimize_recommendations(
        self,
        restaurantes_con_score: List[Dict],
        num_recomendaciones: int = 10,
        embeddings: Dict[int, np.ndarray] = None
    ) -> Tuple[List[Dict], Dict]:
        """
        ✅ OPTIMIZACIÓN MEJORADA
        
        CAMBIO PRINCIPAL: Solo reorganiza el TOP 20
        """
        
        if len(restaurantes_con_score) <= num_recomendaciones:
            return restaurantes_con_score, {
                'iteraciones': 0,
                'mejoras_aceptadas': 0,
                'energia_inicial': 0,
                'energia_final': 0,
                'mejora_porcentual': 0,
                'historial': []
            }
        
        # ✅ Ordenar por score (ya están ordenados, pero por si acaso)
        restaurantes_ordenados = sorted(
            restaurantes_con_score,
            key=lambda x: x['score'],
            reverse=True
        )
        
        # ✅ CAMBIO: Solo optimizar el TOP 20
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
        
        # Mejor solución encontrada
        mejor_solucion = solucion_actual.copy()
        mejor_energia = energia_actual
        
        # Variables de control
        temperatura = self.temperatura_inicial
        iteracion = 0
        mejoras_aceptadas = 0
        historial_energia = [energia_actual]
        
        # ✅ Algoritmo de Recocido Simulado
        while temperatura > self.temperatura_minima and iteracion < self.max_iteraciones:
            
            # Generar vecino SOLO del top 20
            solucion_vecina, ids_vecinos = self._generar_vecino(
                solucion_actual,
                ids_actuales,
                top_candidatos,  # ✅ Solo del top 20
                num_recomendaciones
            )
            
            # Calcular energía
            energia_vecina = self._calculate_energy(
                solucion_vecina,
                ids_vecinos,
                embeddings
            )
            
            # Delta de energía
            delta_energia = energia_vecina - energia_actual
            
            # Decidir si aceptar
            if delta_energia < 0:
                # Mejor solución, aceptar
                solucion_actual = solucion_vecina
                ids_actuales = ids_vecinos
                energia_actual = energia_vecina
                mejoras_aceptadas += 1
                
                # Actualizar mejor
                if energia_actual < mejor_energia:
                    mejor_solucion = solucion_actual.copy()
                    mejor_energia = energia_actual
            
            else:
                # Peor solución, aceptar con probabilidad
                probabilidad = math.exp(-delta_energia / temperatura)
                
                if random.random() < probabilidad:
                    solucion_actual = solucion_vecina
                    ids_actuales = ids_vecinos
                    energia_actual = energia_vecina
            
            # Enfriar
            temperatura *= self.tasa_enfriamiento
            iteracion += 1
            historial_energia.append(energia_actual)
        
        # Estadísticas
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
        ✅ FUNCIÓN DE ENERGÍA MEJORADA
        
        Energía = -(relevancia * 0.80 + diversidad * 0.20)
        """
        
        # Relevancia: promedio de scores
        relevancia = sum(r['score'] for r in solucion) / len(solucion)
        
        # Diversidad
        if embeddings:
            diversidad = self._calculate_diversity(ids, embeddings)
        else:
            diversidad = self._calculate_category_diversity(solucion)
        
        # ✅ Combinar con NUEVOS PESOS
        energia = -(
            self.peso_relevancia * relevancia +      # 80%
            self.peso_diversidad * diversidad        # 20%
        )
        
        return energia
    
    def _calculate_diversity(
        self,
        ids: List[int],
        embeddings: Dict[int, np.ndarray]
    ) -> float:
        """
        Diversidad usando embeddings
        """
        
        if len(ids) < 2:
            return 0.0
        
        distancias = []
        
        for i in range(len(ids)):
            for j in range(i + 1, len(ids)):
                id1 = ids[i]
                id2 = ids[j]
                
                if id1 in embeddings and id2 in embeddings:
                    vec1 = embeddings[id1]
                    vec2 = embeddings[id2]
                    
                    distancia = 1 - self._cosine_similarity(vec1, vec2)
                    distancias.append(distancia)
        
        if distancias:
            return sum(distancias) / len(distancias)
        
        return 0.0
    
    def _calculate_category_diversity(self, solucion: List[Dict]) -> float:
        """
        Diversidad por categorías
        """
        
        categorias_unicas = set()
        
        for restaurante in solucion:
            for categoria in restaurante.get('categorias', []):
                categorias_unicas.add(categoria.get('nombreCategoria', ''))
        
        return min(len(categorias_unicas) / 10.0, 1.0)
    
    def _cosine_similarity(self, vec1: np.ndarray, vec2: np.ndarray) -> float:
        """
        Similitud coseno
        """
        
        dot_product = np.dot(vec1, vec2)
        norm1 = np.linalg.norm(vec1)
        norm2 = np.linalg.norm(vec2)
        
        if norm1 == 0 or norm2 == 0:
            return 0.0
        
        return dot_product / (norm1 * norm2)
    
    def _generar_vecino(
        self,
        solucion_actual: List[Dict],
        ids_actuales: List[int],
        candidatos: List[Dict],  # ✅ Solo top 20
        num_recomendaciones: int
    ) -> Tuple[List[Dict], List[int]]:
        """
        ✅ Genera vecino SOLO de candidatos top 20
        """
        
        nueva_solucion = solucion_actual.copy()
        nuevos_ids = ids_actuales.copy()
        
        # Posición aleatoria
        posicion = random.randint(0, num_recomendaciones - 1)
        
        # ✅ Elegir del top 20 que NO esté en la solución
        disponibles = [
            r for r in candidatos
            if r['idRestaurante'] not in ids_actuales
        ]
        
        if disponibles:
            nuevo = random.choice(disponibles)
            nueva_solucion[posicion] = nuevo
            nuevos_ids[posicion] = nuevo['idRestaurante']
        
        return nueva_solucion, nuevos_ids