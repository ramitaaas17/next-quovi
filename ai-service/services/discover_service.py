# Este archivo calcula que tan bien un restaurante coincide con las preferencias del usuario
# Usa 5 criterios: clima, ocasion, distancia, antojo y presupuesto

import math
from typing import List, Dict, Optional

class DiscoverService:
    """
    Servicio que calcula recomendaciones basadas en multiples criterios
    Cada criterio tiene un peso diferente en el score final
    """
    
    # Pesos de cada criterio (suman 100%)
    PESO_CLIMA = 0.25      # 25% del score total
    PESO_OCASION = 0.30    # 30% del score total
    PESO_DISTANCIA = 0.20  # 20% del score total
    PESO_ANTOJO = 0.15     # 15% del score total
    PESO_PRESUPUESTO = 0.10 # 10% del score total
    
    def __init__(self):
        pass
    
    def get_recommendations(
        self,
        restaurantes: List[Dict],
        preferencias: Dict,
        ubicacion_usuario: Dict,
        top_n: int = 10
    ) -> List[Dict]:
        """
        Obtiene los mejores restaurantes segun las preferencias del usuario
        
        Args:
            restaurantes: Lista de todos los restaurantes disponibles
            preferencias: Diccionario con clima, ocasion, distancia, antojo, presupuesto
            ubicacion_usuario: Diccionario con latitud y longitud del usuario
            top_n: Cuantos restaurantes devolver
            
        Returns:
            Lista de restaurantes ordenados por score (mayor a menor)
        """
        
        # Calcular score para cada restaurante
        restaurantes_con_score = []
        
        for restaurante in restaurantes:
            # Calcular score individual
            score = self._calculate_restaurant_score(
                restaurante,
                preferencias,
                ubicacion_usuario
            )
            
            # Agregar score al restaurante
            restaurante_con_score = restaurante.copy()
            restaurante_con_score['score'] = score
            restaurantes_con_score.append(restaurante_con_score)
        
        # Ordenar por score de mayor a menor
        restaurantes_con_score.sort(key=lambda x: x['score'], reverse=True)
        
        # Devolver solo los top N
        return restaurantes_con_score[:top_n]
    
    def _calculate_restaurant_score(
        self,
        restaurante: Dict,
        preferencias: Dict,
        ubicacion_usuario: Dict
    ) -> float:
        """
        Calcula el score total de un restaurante sumando los 5 criterios
        
        Returns:
            Score entre 0 y 1 (1 es perfecto)
        """
        
        # Calcular cada criterio por separado
        score_clima = self._score_clima(restaurante, preferencias.get('clima_actual', 'soleado'))
        score_ocasion = self._score_ocasion(restaurante, preferencias.get('ocasion', 'solo'))
        score_distancia = self._score_distancia(restaurante, ubicacion_usuario, preferencias.get('distancia', 'cerca'))
        score_antojo = self._score_antojo(restaurante, preferencias.get('antojo', 'dulce'))
        score_presupuesto = self._score_presupuesto(restaurante, preferencias.get('presupuesto', 'medio'))
        
        # Sumar todos los scores con sus pesos
        score_total = (
            score_clima * self.PESO_CLIMA +
            score_ocasion * self.PESO_OCASION +
            score_distancia * self.PESO_DISTANCIA +
            score_antojo * self.PESO_ANTOJO +
            score_presupuesto * self.PESO_PRESUPUESTO
        )
        
        return score_total
    
    def _score_clima(self, restaurante: Dict, clima: str) -> float:
        """
        Calcula score basado en el clima actual
        Ejemplo: si esta soleado, prioriza terrazas
        """
        
        caracteristicas = [c.get('nombreCaracteristica', '').lower() 
                          for c in restaurante.get('caracteristicas', [])]
        
        if clima == 'soleado':
            # Dar puntos extra si tiene terraza o area exterior
            if 'terraza' in caracteristicas or 'exterior' in caracteristicas:
                return 1.0
            return 0.7
            
        elif clima == 'lluvioso':
            # Dar puntos extra si es interior acogedor
            if 'interior acogedor' in caracteristicas:
                return 1.0
            return 0.7
            
        elif clima == 'frio':
            # Dar puntos extra si tiene comida caliente
            categorias = [c.get('nombreCategoria', '').lower() 
                         for c in restaurante.get('categorias', [])]
            if 'sopas' in categorias or 'comida caliente' in categorias:
                return 1.0
            return 0.7
        
        # Si no hay match especial, dar score neutro
        return 0.7
    
    def _score_ocasion(self, restaurante: Dict, ocasion: str) -> float:
        """
        Calcula score basado en la ocasion (cita, amigos, solo, familia)
        """
        
        caracteristicas = [c.get('nombreCaracteristica', '').lower() 
                          for c in restaurante.get('caracteristicas', [])]
        
        if ocasion == 'cita':
            # Buscar caracteristicas romanticas
            if 'romantico' in caracteristicas or 'intimo' in caracteristicas:
                return 1.0
            # Penalizar si es muy ruidoso
            if 'ruidoso' in caracteristicas:
                return 0.3
            return 0.6
            
        elif ocasion == 'amigos':
            # Buscar lugares animados para compartir
            if 'animado' in caracteristicas or 'para compartir' in caracteristicas:
                return 1.0
            return 0.7
            
        elif ocasion == 'solo':
            # Buscar lugares casuales y rapidos
            if 'casual' in caracteristicas or 'rapido' in caracteristicas:
                return 1.0
            return 0.7
            
        elif ocasion == 'familia':
            # Buscar lugares espaciosos con variedad
            if 'espacioso' in caracteristicas or 'variado' in caracteristicas:
                return 1.0
            return 0.7
        
        return 0.7
    
    def _score_distancia(
        self,
        restaurante: Dict,
        ubicacion_usuario: Dict,
        preferencia_distancia: str
    ) -> float:
        """
        Calcula score basado en la distancia al restaurante
        Usa la formula de Haversine para calcular distancia real
        """
        
        # Calcular distancia en kilometros usando Haversine
        distancia_km = self._calcular_distancia_haversine(
            ubicacion_usuario['latitud'],
            ubicacion_usuario['longitud'],
            restaurante['latitud'],
            restaurante['longitud']
        )
        
        if preferencia_distancia == 'cerca':
            # Usuario quiere restaurantes muy cercanos (0-2km)
            if distancia_km <= 2.0:
                return 1.0
            elif distancia_km <= 5.0:
                return 0.5
            else:
                return 0.1
                
        elif preferencia_distancia == 'explorar':
            # Usuario quiere explorar un poco (2-8km)
            if 2.0 <= distancia_km <= 8.0:
                return 1.0
            elif distancia_km < 2.0:
                return 0.7
            else:
                return 0.3
                
        elif preferencia_distancia == 'lejos':
            # Usuario esta dispuesto a ir lejos (>8km)
            if distancia_km > 8.0:
                return 1.0
            elif distancia_km > 5.0:
                return 0.7
            else:
                return 0.3
        
        return 0.7
    
    def _score_antojo(self, restaurante: Dict, antojo: str) -> float:
        """
        Calcula score basado en el antojo del usuario (dulce o salado)
        """
        
        categorias = [c.get('nombreCategoria', '').lower() 
                     for c in restaurante.get('categorias', [])]
        
        if antojo == 'dulce':
            # Buscar postres, cafeterias, panaderias
            dulces = ['postres', 'cafeteria', 'panaderia', 'helados']
            if any(d in cat for cat in categorias for d in dulces):
                return 1.0
            return 0.4
            
        elif antojo == 'salado':
            # Buscar comida salada (tacos, pizza, hamburguesas)
            salados = ['tacos', 'pizza', 'hamburguesas', 'mariscos']
            if any(s in cat for cat in categorias for s in salados):
                return 1.0
            return 0.4
            
        elif antojo == 'ambos':
            # No tiene preferencia especifica
            return 0.7
        
        return 0.7
    
    def _score_presupuesto(self, restaurante: Dict, presupuesto: str) -> float:
        """
        Calcula score basado en el presupuesto del usuario
        """
        
        precio_promedio = restaurante.get('precioPromedio', 0)
        
        if presupuesto == 'bajo':
            # Buscar lugares baratos (<$150)
            if precio_promedio < 150:
                return 1.0
            elif precio_promedio < 300:
                return 0.5
            else:
                return 0.2
                
        elif presupuesto == 'medio':
            # Buscar lugares de precio medio ($150-$400)
            if 150 <= precio_promedio <= 400:
                return 1.0
            elif precio_promedio < 150:
                return 0.7
            else:
                return 0.4
                
        elif presupuesto == 'alto':
            # Buscar lugares caros (>$400)
            if precio_promedio > 400:
                return 1.0
            elif precio_promedio > 300:
                return 0.7
            else:
                return 0.4
        
        return 0.7
    
    def _calcular_distancia_haversine(
        self,
        lat1: float,
        lon1: float,
        lat2: float,
        lon2: float
    ) -> float:
        """
        Calcula la distancia entre dos puntos geograficos usando la formula de Haversine
        
        Returns:
            Distancia en kilometros
        """
        
        # Radio de la Tierra en kilometros
        RADIO_TIERRA_KM = 6371.0
        
        # Convertir grados a radianes
        lat1_rad = math.radians(lat1)
        lon1_rad = math.radians(lon1)
        lat2_rad = math.radians(lat2)
        lon2_rad = math.radians(lon2)
        
        # Diferencias
        dlat = lat2_rad - lat1_rad
        dlon = lon2_rad - lon1_rad
        
        # Formula de Haversine
        a = math.sin(dlat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2)**2
        c = 2 * math.asin(math.sqrt(a))
        
        # Distancia final
        distancia = RADIO_TIERRA_KM * c
        
        return distancia