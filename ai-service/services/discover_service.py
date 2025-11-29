# ai-service/services/discover_service.py
# Servicio de descubrimiento y scoring de restaurantes
# Implementa un sistema de puntuación multi-criterio basado en preferencias del usuario

import math
from typing import List, Dict, Optional
import logging

logger = logging.getLogger(__name__)


class DiscoverService:
    """
    Servicio principal para calcular scores de restaurantes según preferencias.
    
    El sistema de scoring pondera diferentes criterios:
    - Antojo (dulce/salado): 50% - Mayor peso para asegurar relevancia
    - Ocasión (cita/amigos/familia): 20%
    - Distancia (cerca/explorar/lejos): 15%
    - Presupuesto (bajo/medio/alto): 10%
    - Clima (soleado/lluvioso/frío): 5%
    
    Total: 100% (los pesos suman 1.0)
    """
    
    # Definición de pesos para cada criterio
    PESO_ANTOJO = 0.50       # El más importante - define tipo de comida
    PESO_OCASION = 0.20      # Contexto social
    PESO_DISTANCIA = 0.15    # Proximidad geográfica
    PESO_PRESUPUESTO = 0.10  # Capacidad económica
    PESO_CLIMA = 0.05        # Condiciones meteorológicas
    
    def __init__(self):
        """
        Inicializa el servicio con las palabras clave para clasificación.
        Estas keywords se usan para identificar el tipo de restaurante.
        """
        
        # Keywords para identificar comida salada
        self.keywords_salado = [
            'tacos', 'pizza', 'hamburguesas', 'mariscos', 
            'italiana', 'japonesa', 'argentina', 'pasta',
            'carne', 'alitas', 'antojitos', 'mexicana',
            'sushi', 'ramen', 'parrilla', 'asado'
        ]
        
        # Keywords para identificar comida dulce
        self.keywords_dulce = [
            'postres', 'cafetería', 'panadería', 'helados',
            'repostería', 'café', 'dulces', 'chocolatería',
            'pastelería', 'desayunos'
        ]
    
    def get_recommendations(
        self,
        restaurantes: List[Dict],
        preferencias: Dict,
        ubicacion_usuario: Dict,
        top_n: int = 10
    ) -> List[Dict]:
        """
        Calcula scores para todos los restaurantes y retorna los mejores N.
        
        Args:
            restaurantes: Lista de todos los restaurantes disponibles
            preferencias: Diccionario con las preferencias del usuario
            ubicacion_usuario: Coordenadas (lat, lng) del usuario
            top_n: Número de recomendaciones a retornar
            
        Returns:
            Lista de restaurantes ordenados por score (mayor a menor)
        """
        
        logger.info(f"Buscando restaurantes con preferencias: {preferencias}")
        
        restaurantes_con_score = []
        antojo = preferencias.get('antojo', 'ambos')
        
        # Calcular score para cada restaurante
        for restaurante in restaurantes:
            score = self._calculate_restaurant_score(
                restaurante,
                preferencias,
                ubicacion_usuario
            )
            
            # Calcular scores individuales para debugging
            scores_debug = {
                'antojo': self._score_antojo(restaurante, antojo),
                'ocasion': self._score_ocasion(restaurante, preferencias.get('ocasion', 'solo')),
                'distancia': self._score_distancia(restaurante, ubicacion_usuario, preferencias.get('distancia', 'cerca')),
                'presupuesto': self._score_presupuesto(restaurante, preferencias.get('presupuesto', 'medio')),
                'clima': self._score_clima(restaurante, preferencias.get('clima_actual', 'soleado'))
            }
            
            restaurante_con_score = restaurante.copy()
            restaurante_con_score['score'] = score
            restaurante_con_score['_debug_scores'] = scores_debug
            
            # Filtro estricto: si pidió dulce/salado específico y no coincide, score = 0
            if antojo in ['dulce', 'salado']:
                if scores_debug['antojo'] < 0.5:
                    restaurante_con_score['score'] = 0.0
                    logger.debug(f"{restaurante['nombre']} descartado por antojo")
            
            restaurantes_con_score.append(restaurante_con_score)
        
        # Filtrar restaurantes con score válido (mayor a 0)
        restaurantes_validos = [r for r in restaurantes_con_score if r['score'] > 0]
        
        logger.info(f"{len(restaurantes_validos)} restaurantes validos de {len(restaurantes)}")
        
        # Ordenar por score descendente y retornar top N
        restaurantes_validos.sort(key=lambda x: x['score'], reverse=True)
        
        return restaurantes_validos[:top_n]
    
    def _calculate_restaurant_score(
        self,
        restaurante: Dict,
        preferencias: Dict,
        ubicacion_usuario: Dict
    ) -> float:
        """
        Calcula el score final del restaurante combinando todos los criterios.
        
        La fórmula es una suma ponderada:
        Score = (score_antojo * 0.50) + (score_ocasion * 0.20) + 
                (score_distancia * 0.15) + (score_presupuesto * 0.10) + 
                (score_clima * 0.05)
        """
        
        score_antojo = self._score_antojo(restaurante, preferencias.get('antojo', 'ambos'))
        score_ocasion = self._score_ocasion(restaurante, preferencias.get('ocasion', 'solo'))
        score_distancia = self._score_distancia(restaurante, ubicacion_usuario, preferencias.get('distancia', 'cerca'))
        score_presupuesto = self._score_presupuesto(restaurante, preferencias.get('presupuesto', 'medio'))
        score_clima = self._score_clima(restaurante, preferencias.get('clima_actual', 'soleado'))
        
        # Calcular score total con pesos definidos
        score_total = (
            score_antojo * self.PESO_ANTOJO +
            score_ocasion * self.PESO_OCASION +
            score_distancia * self.PESO_DISTANCIA +
            score_presupuesto * self.PESO_PRESUPUESTO +
            score_clima * self.PESO_CLIMA
        )
        
        return score_total
    
    def _score_antojo(self, restaurante: Dict, antojo: str) -> float:
        """
        Calcula score según tipo de antojo (dulce/salado/ambos).
        
        Estrategia:
        - Busca keywords específicas en categorías, nombre y descripción
        - Si coincide: score = 1.0 (perfecto)
        - Si no coincide y fue específico: score = 0.0 (descartado)
        - Si es "ambos": score = 0.7 (neutral)
        """
        
        # Extraer todo el texto relevante del restaurante
        categorias = restaurante.get('categorias', [])
        categorias_texto = ' '.join([
            c.get('nombreCategoria', '').lower() 
            for c in categorias
        ])
        
        nombre_restaurante = restaurante.get('nombre', '').lower()
        descripcion = restaurante.get('descripcion', '').lower()
        texto_completo = f"{categorias_texto} {nombre_restaurante} {descripcion}"
        
        if antojo == 'dulce':
            # Buscar keywords de comida dulce
            for keyword in self.keywords_dulce:
                if keyword in texto_completo:
                    logger.debug(f"{restaurante['nombre']} match dulce ({keyword})")
                    return 1.0
            
            # No coincide - penalización severa
            logger.debug(f"{restaurante['nombre']} NO es dulce")
            return 0.0
        
        elif antojo == 'salado':
            # Buscar keywords de comida salada
            for keyword in self.keywords_salado:
                if keyword in texto_completo:
                    logger.debug(f"{restaurante['nombre']} match salado ({keyword})")
                    return 1.0
            
            # No coincide - penalización severa
            logger.debug(f"{restaurante['nombre']} NO es salado")
            return 0.0
        
        elif antojo == 'ambos':
            # Sin preferencia específica - score neutral
            return 0.7
        
        return 0.5
    
    def _score_ocasion(self, restaurante: Dict, ocasion: str) -> float:
        """
        Calcula score según la ocasión social.
        
        Ocasiones:
        - cita: Prefiere lugares con bar, terraza, música (románticos)
        - amigos: Prefiere lugares con ambiente social
        - solo: Prefiere lugares tranquilos con wifi
        - familia: Prefiere lugares espaciosos
        """
        
        # Obtener características del restaurante
        caracteristicas = [
            c.get('nombreCaracteristica', '').lower() 
            for c in restaurante.get('caracteristicas', [])
        ]
        
        if ocasion == 'cita':
            # Buscar características románticas
            if any(k in ' '.join(caracteristicas) for k in ['bar', 'terraza', 'música', 'romantico']):
                return 1.0
            # Penalizar lugares ruidosos
            if 'ruidoso' in ' '.join(caracteristicas):
                return 0.2
            return 0.6
        
        elif ocasion == 'amigos':
            # Buscar ambiente social
            if any(k in ' '.join(caracteristicas) for k in ['bar', 'terraza', 'música']):
                return 1.0
            return 0.7
        
        elif ocasion == 'solo':
            # Buscar lugares para trabajar/leer
            if any(k in ' '.join(caracteristicas) for k in ['wifi', 'cafetería', 'tranquilo']):
                return 1.0
            return 0.7
        
        elif ocasion == 'familia':
            # Buscar lugares familiares
            if any(k in ' '.join(caracteristicas) for k in ['espacioso', 'buffet', 'familiar']):
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
        Calcula score según la distancia y preferencia de exploración.
        
        Preferencias:
        - cerca: 0-2km = 1.0, 2-5km = 0.5, >5km = 0.1
        - explorar: 2-8km = 1.0, <2km = 0.7, >8km = 0.3
        - lejos: >8km = 1.0, 5-8km = 0.7, <5km = 0.3
        """
        
        # Calcular distancia real en kilómetros
        distancia_km = self._calcular_distancia_haversine(
            ubicacion_usuario['latitud'],
            ubicacion_usuario['longitud'],
            restaurante['latitud'],
            restaurante['longitud']
        )
        
        if preferencia_distancia == 'cerca':
            if distancia_km <= 2.0:
                return 1.0
            elif distancia_km <= 5.0:
                return 0.5
            else:
                return 0.1
        
        elif preferencia_distancia == 'explorar':
            if 2.0 <= distancia_km <= 8.0:
                return 1.0
            elif distancia_km < 2.0:
                return 0.7
            else:
                return 0.3
        
        elif preferencia_distancia == 'lejos':
            if distancia_km > 8.0:
                return 1.0
            elif distancia_km > 5.0:
                return 0.7
            else:
                return 0.3
        
        return 0.7
    
    def _score_presupuesto(self, restaurante: Dict, presupuesto: str) -> float:
        """
        Calcula score según el presupuesto del usuario.
        
        Rangos de precios (MXN):
        - bajo: <150 = 1.0, 150-250 = 0.4, >250 = 0.0
        - medio: 150-400 = 1.0, <150 = 0.6, >400 = 0.3
        - alto: >400 = 1.0, 300-400 = 0.7, <300 = 0.3
        """
        
        precio_promedio = restaurante.get('precioPromedio', 0)
        
        if presupuesto == 'bajo':
            if precio_promedio < 150:
                return 1.0
            elif precio_promedio < 250:
                return 0.4
            else:
                return 0.0
        
        elif presupuesto == 'medio':
            if 150 <= precio_promedio <= 400:
                return 1.0
            elif precio_promedio < 150:
                return 0.6
            else:
                return 0.3
        
        elif presupuesto == 'alto':
            if precio_promedio > 400:
                return 1.0
            elif precio_promedio > 300:
                return 0.7
            else:
                return 0.3
        
        return 0.7
    
    def _score_clima(self, restaurante: Dict, clima: str) -> float:
        """
        Calcula score según el clima actual.
        
        Clima:
        - soleado: Prefiere terrazas (1.0)
        - lluvioso: Prefiere interiores (1.0)
        - frio/nublado: Score neutral (0.7-0.8)
        """
        
        # Obtener características del restaurante
        caracteristicas = [
            c.get('nombreCaracteristica', '').lower() 
            for c in restaurante.get('caracteristicas', [])
        ]
        
        if clima == 'soleado':
            if 'terraza' in ' '.join(caracteristicas):
                return 1.0
            return 0.7
        
        elif clima == 'lluvioso':
            if 'interior' in ' '.join(caracteristicas):
                return 1.0
            return 0.7
        
        elif clima == 'frio':
            return 0.8
        
        return 0.7
    
    def _calcular_distancia_haversine(
        self,
        lat1: float,
        lon1: float,
        lat2: float,
        lon2: float
    ) -> float:
        """
        Calcula la distancia entre dos puntos geográficos usando la fórmula de Haversine.
        
        Esta fórmula considera la curvatura de la Tierra para dar distancias precisas.
        
        Args:
            lat1, lon1: Coordenadas del primer punto
            lat2, lon2: Coordenadas del segundo punto
            
        Returns:
            Distancia en kilómetros
        """
        
        # Radio promedio de la Tierra en kilómetros
        RADIO_TIERRA_KM = 6371.0
        
        # Convertir coordenadas de grados a radianes
        lat1_rad = math.radians(lat1)
        lon1_rad = math.radians(lon1)
        lat2_rad = math.radians(lat2)
        lon2_rad = math.radians(lon2)
        
        # Diferencias de coordenadas
        dlat = lat2_rad - lat1_rad
        dlon = lon2_rad - lon1_rad
        
        # Fórmula de Haversine
        a = math.sin(dlat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2)**2
        c = 2 * math.asin(math.sqrt(a))
        
        return RADIO_TIERRA_KM * c