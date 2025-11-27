# Este archivo implementa el algoritmo de Recocido Simulado
# Optimiza las recomendaciones para que sean relevantes Y diversas
# Es el algoritmo mas complejo del proyecto

import random
import math
import numpy as np
from typing import List, Dict, Tuple

class SimulatedAnnealingRecommender:
    """
    Implementacion del algoritmo de Recocido Simulado para optimizar recomendaciones
    
    El objetivo es encontrar un conjunto de restaurantes que:
    1. Tengan scores altos (relevancia)
    2. Sean diferentes entre si (diversidad)
    
    Es como enfriar metal: al inicio aceptamos cambios malos, al final solo mejoras
    """
    
    def __init__(
        self,
        temperatura_inicial: float = 100.0,
        temperatura_minima: float = 0.1,
        tasa_enfriamiento: float = 0.95,
        max_iteraciones: int = 500
    ):
        """
        Inicializa el optimizador de Recocido Simulado
        
        Args:
            temperatura_inicial: Temperatura al comenzar (mayor = mas aleatorio)
            temperatura_minima: Cuando parar de enfriar
            tasa_enfriamiento: Que tan rapido se enfria (0.95 = 5% por iteracion)
            max_iteraciones: Maximo numero de intentos
        """
        self.temperatura_inicial = temperatura_inicial
        self.temperatura_minima = temperatura_minima
        self.tasa_enfriamiento = tasa_enfriamiento
        self.max_iteraciones = max_iteraciones
        
        # Pesos para la funcion de energia
        self.peso_relevancia = 0.6  # 60% importancia a los scores
        self.peso_diversidad = 0.4  # 40% importancia a la variedad
    
    def optimize_recommendations(
        self,
        restaurantes_con_score: List[Dict],
        num_recomendaciones: int = 10,
        embeddings: Dict[int, np.ndarray] = None
    ) -> Tuple[List[Dict], Dict]:
        """
        Optimiza las recomendaciones usando Recocido Simulado
        
        Args:
            restaurantes_con_score: Todos los restaurantes con su score ya calculado
            num_recomendaciones: Cuantos restaurantes queremos recomendar
            embeddings: Vectores de cada restaurante para calcular diversidad
            
        Returns:
            Tupla con (mejores_restaurantes, estadisticas_del_proceso)
        """
        
        # Si no hay suficientes restaurantes, devolver todos
        if len(restaurantes_con_score) <= num_recomendaciones:
            return restaurantes_con_score, {'iteraciones': 0, 'mejora': 0}
        
        # Ordenar por score para tener buenos candidatos
        restaurantes_ordenados = sorted(
            restaurantes_con_score,
            key=lambda x: x['score'],
            reverse=True
        )
        
        # Solucion inicial: los N restaurantes con mejor score
        solucion_actual = restaurantes_ordenados[:num_recomendaciones]
        ids_actuales = [r['idRestaurante'] for r in solucion_actual]
        
        # Calcular energia inicial (menor energia = mejor solucion)
        energia_actual = self._calculate_energy(
            solucion_actual,
            ids_actuales,
            embeddings
        )
        
        # Guardar la mejor solucion encontrada
        mejor_solucion = solucion_actual.copy()
        mejor_energia = energia_actual
        
        # Variables para estadisticas
        temperatura = self.temperatura_inicial
        iteracion = 0
        mejoras_aceptadas = 0
        
        # Historial de energias (para graficar despues si queremos)
        historial_energia = [energia_actual]
        
        # Algoritmo principal de Recocido Simulado
        while temperatura > self.temperatura_minima and iteracion < self.max_iteraciones:
            
            # Generar solucion vecina: cambiar un restaurante aleatorio
            solucion_vecina, ids_vecinos = self._generar_vecino(
                solucion_actual,
                ids_actuales,
                restaurantes_ordenados,
                num_recomendaciones
            )
            
            # Calcular energia de la nueva solucion
            energia_vecina = self._calculate_energy(
                solucion_vecina,
                ids_vecinos,
                embeddings
            )
            
            # Calcular cambio de energia
            delta_energia = energia_vecina - energia_actual
            
            # Decidir si aceptar la nueva solucion
            if delta_energia < 0:
                # La nueva solucion es mejor, siempre aceptar
                solucion_actual = solucion_vecina
                ids_actuales = ids_vecinos
                energia_actual = energia_vecina
                mejoras_aceptadas += 1
                
                # Actualizar mejor solucion si es necesario
                if energia_actual < mejor_energia:
                    mejor_solucion = solucion_actual.copy()
                    mejor_energia = energia_actual
            
            else:
                # La nueva solucion es peor, aceptar con probabilidad
                # Al inicio (T alta) aceptamos mas cambios malos
                # Al final (T baja) solo aceptamos mejoras
                probabilidad_aceptacion = math.exp(-delta_energia / temperatura)
                
                if random.random() < probabilidad_aceptacion:
                    solucion_actual = solucion_vecina
                    ids_actuales = ids_vecinos
                    energia_actual = energia_vecina
            
            # Enfriar el sistema
            temperatura *= self.tasa_enfriamiento
            iteracion += 1
            
            # Guardar energia para estadisticas
            historial_energia.append(energia_actual)
        
        # Preparar estadisticas del proceso
        estadisticas = {
            'iteraciones': iteracion,
            'mejoras_aceptadas': mejoras_aceptadas,
            'energia_inicial': historial_energia[0],
            'energia_final': mejor_energia,
            'mejora_porcentual': ((historial_energia[0] - mejor_energia) / historial_energia[0]) * 100,
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
        Calcula la energia de una solucion
        Energia menor = mejor solucion
        
        Energia = -(relevancia + diversidad)
        
        Args:
            solucion: Lista de restaurantes en la solucion actual
            ids: IDs de los restaurantes (para acceso rapido)
            embeddings: Vectores para calcular diversidad
            
        Returns:
            Energia (menor es mejor)
        """
        
        # Calcular relevancia: promedio de los scores
        relevancia = sum(r['score'] for r in solucion) / len(solucion)
        
        # Calcular diversidad: que tan diferentes son entre si
        diversidad = 0.0
        if embeddings:
            diversidad = self._calculate_diversity(ids, embeddings)
        else:
            # Si no hay embeddings, usar diversidad de categorias
            diversidad = self._calculate_category_diversity(solucion)
        
        # Combinar relevancia y diversidad (queremos maximizar ambas)
        # Por eso ponemos negativo (energia menor = mejor)
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
        Calcula la diversidad usando embeddings (vectores)
        Mayor diversidad = restaurantes mas diferentes entre si
        
        Usa la distancia coseno entre vectores
        """
        
        if len(ids) < 2:
            return 0.0
        
        distancias = []
        
        # Comparar cada par de restaurantes
        for i in range(len(ids)):
            for j in range(i + 1, len(ids)):
                id1 = ids[i]
                id2 = ids[j]
                
                # Obtener vectores
                if id1 in embeddings and id2 in embeddings:
                    vec1 = embeddings[id1]
                    vec2 = embeddings[id2]
                    
                    # Calcular distancia coseno
                    # (1 = muy diferentes, 0 = identicos)
                    distancia = 1 - self._cosine_similarity(vec1, vec2)
                    distancias.append(distancia)
        
        # Promedio de todas las distancias
        if distancias:
            return sum(distancias) / len(distancias)
        
        return 0.0
    
    def _calculate_category_diversity(self, solucion: List[Dict]) -> float:
        """
        Calcula diversidad basandose en las categorias
        Mas categorias diferentes = mayor diversidad
        """
        
        categorias_unicas = set()
        
        for restaurante in solucion:
            for categoria in restaurante.get('categorias', []):
                categorias_unicas.add(categoria.get('nombreCategoria', ''))
        
        # Normalizar entre 0 y 1
        # Asumimos maximo 10 categorias diferentes
        return min(len(categorias_unicas) / 10.0, 1.0)
    
    def _cosine_similarity(self, vec1: np.ndarray, vec2: np.ndarray) -> float:
        """
        Calcula similitud coseno entre dos vectores
        1 = identicos, 0 = muy diferentes
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
        todos_restaurantes: List[Dict],
        num_recomendaciones: int
    ) -> Tuple[List[Dict], List[int]]:
        """
        Genera una solucion vecina cambiando un restaurante aleatorio
        
        Returns:
            Tupla con (nueva_solucion, nuevos_ids)
        """
        
        # Copiar solucion actual
        nueva_solucion = solucion_actual.copy()
        nuevos_ids = ids_actuales.copy()
        
        # Elegir posicion aleatoria para cambiar
        posicion_cambiar = random.randint(0, num_recomendaciones - 1)
        
        # Elegir un nuevo restaurante que no este en la solucion actual
        restaurantes_disponibles = [
            r for r in todos_restaurantes
            if r['idRestaurante'] not in ids_actuales
        ]
        
        if restaurantes_disponibles:
            nuevo_restaurante = random.choice(restaurantes_disponibles)
            
            # Reemplazar
            nueva_solucion[posicion_cambiar] = nuevo_restaurante
            nuevos_ids[posicion_cambiar] = nuevo_restaurante['idRestaurante']
        
        return nueva_solucion, nuevos_ids