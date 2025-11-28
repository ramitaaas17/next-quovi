# ai-service/services/discover_service.py - SOLUCIÓN DEFINITIVA

import math
from typing import List, Dict, Optional
import logging

logger = logging.getLogger(__name__)

class DiscoverService:
    """
    ✅ VERSIÓN FINAL CORREGIDA
    
    CAMBIOS CRÍTICOS:
    1. Peso de ANTOJO = 50% (el doble de antes)
    2. Penalización SEVERA para no coincidencias (0.0 en vez de 0.2)
    3. Desactivar RS cuando el antojo es específico
    """
    
    # ✅ PESOS FINALES (suman 1.0)
    PESO_ANTOJO = 0.50       # ⬆️⬆️ MUY IMPORTANTE (antes 0.35)
    PESO_OCASION = 0.20      # ⬇️ Reducido
    PESO_DISTANCIA = 0.15    # ⬇️ Reducido
    PESO_PRESUPUESTO = 0.10  # ⬇️ Reducido
    PESO_CLIMA = 0.05        # Igual
    
    def __init__(self):
        # Keywords mejorados
        self.keywords_salado = [
            'tacos', 'pizza', 'hamburguesas', 'mariscos', 
            'italiana', 'japonesa', 'argentina', 'pasta',
            'carne', 'alitas', 'antojitos', 'mexicana',
            'sushi', 'ramen', 'parrilla', 'asado'
        ]
        
        self.keywords_dulce = [
            'postres', 'cafetería', 'panadería', 'helados',
            'repostería', 'café', 'dulces', 'chocolatería',
            'pastelería', 'desayunos'  # Desayunos suelen tener dulce
        ]
    
    def get_recommendations(
        self,
        restaurantes: List[Dict],
        preferencias: Dict,
        ubicacion_usuario: Dict,
        top_n: int = 10
    ) -> List[Dict]:
        """
        ✅ LÓGICA MEJORADA
        """
        
        logger.info(f"🔍 Buscando restaurantes con preferencias: {preferencias}")
        
        restaurantes_con_score = []
        antojo = preferencias.get('antojo', 'ambos')
        
        for restaurante in restaurantes:
            score = self._calculate_restaurant_score(
                restaurante,
                preferencias,
                ubicacion_usuario
            )
            
            # Calcular scores individuales para debug
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
            
            # ✅ FILTRO ESTRICTO: Si pidió dulce/salado y no coincide, score = 0
            if antojo in ['dulce', 'salado']:
                if scores_debug['antojo'] < 0.5:  # No coincide
                    restaurante_con_score['score'] = 0.0
                    logger.debug(f"❌ {restaurante['nombre']} descartado por antojo")
            
            restaurantes_con_score.append(restaurante_con_score)
        
        # ✅ Filtrar restaurantes con score 0
        restaurantes_validos = [r for r in restaurantes_con_score if r['score'] > 0]
        
        logger.info(f"✅ {len(restaurantes_validos)} restaurantes válidos de {len(restaurantes)}")
        
        # Ordenar por score
        restaurantes_validos.sort(key=lambda x: x['score'], reverse=True)
        
        return restaurantes_validos[:top_n]
    
    def _calculate_restaurant_score(
        self,
        restaurante: Dict,
        preferencias: Dict,
        ubicacion_usuario: Dict
    ) -> float:
        """
        Calcula score con pesos DEFINITIVOS
        """
        
        score_antojo = self._score_antojo(restaurante, preferencias.get('antojo', 'ambos'))
        score_ocasion = self._score_ocasion(restaurante, preferencias.get('ocasion', 'solo'))
        score_distancia = self._score_distancia(restaurante, ubicacion_usuario, preferencias.get('distancia', 'cerca'))
        score_presupuesto = self._score_presupuesto(restaurante, preferencias.get('presupuesto', 'medio'))
        score_clima = self._score_clima(restaurante, preferencias.get('clima_actual', 'soleado'))
        
        # ✅ PESOS FINALES
        score_total = (
            score_antojo * self.PESO_ANTOJO +           # 50% ⬆️⬆️
            score_ocasion * self.PESO_OCASION +         # 20%
            score_distancia * self.PESO_DISTANCIA +     # 15%
            score_presupuesto * self.PESO_PRESUPUESTO + # 10%
            score_clima * self.PESO_CLIMA               # 5%
        )
        
        return score_total
    
    def _score_antojo(self, restaurante: Dict, antojo: str) -> float:
        """
        ✅ SCORING ESTRICTO con penalización severa
        """
        
        # Obtener categorías
        categorias = restaurante.get('categorias', [])
        categorias_texto = ' '.join([
            c.get('nombreCategoria', '').lower() 
            for c in categorias
        ])
        
        nombre_restaurante = restaurante.get('nombre', '').lower()
        descripcion = restaurante.get('descripcion', '').lower()
        texto_completo = f"{categorias_texto} {nombre_restaurante} {descripcion}"
        
        if antojo == 'dulce':
            # Buscar palabras clave de dulce
            for keyword in self.keywords_dulce:
                if keyword in texto_completo:
                    logger.debug(f"✅ {restaurante['nombre']} match dulce ({keyword})")
                    return 1.0  # ✅ Match perfecto
            
            # ⚠️ PENALIZACIÓN SEVERA
            logger.debug(f"❌ {restaurante['nombre']} NO es dulce")
            return 0.0  # ⬇️⬇️ Antes era 0.2
        
        elif antojo == 'salado':
            # Buscar palabras clave de salado
            for keyword in self.keywords_salado:
                if keyword in texto_completo:
                    logger.debug(f"✅ {restaurante['nombre']} match salado ({keyword})")
                    return 1.0
            
            logger.debug(f"❌ {restaurante['nombre']} NO es salado")
            return 0.0  # ⬇️⬇️ Penalización severa
        
        elif antojo == 'ambos':
            # Sin preferencia
            return 0.7
        
        return 0.5
    
    def _score_ocasion(self, restaurante: Dict, ocasion: str) -> float:
        """Score basado en ocasión"""
        
        caracteristicas = [
            c.get('nombreCaracteristica', '').lower() 
            for c in restaurante.get('caracteristicas', [])
        ]
        
        if ocasion == 'cita':
            if any(k in ' '.join(caracteristicas) for k in ['bar', 'terraza', 'música', 'romantico']):
                return 1.0
            if 'ruidoso' in ' '.join(caracteristicas):
                return 0.2
            return 0.6
        
        elif ocasion == 'amigos':
            if any(k in ' '.join(caracteristicas) for k in ['bar', 'terraza', 'música']):
                return 1.0
            return 0.7
        
        elif ocasion == 'solo':
            if any(k in ' '.join(caracteristicas) for k in ['wifi', 'cafetería', 'tranquilo']):
                return 1.0
            return 0.7
        
        elif ocasion == 'familia':
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
        """Score basado en distancia"""
        
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
        """Score basado en presupuesto"""
        
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
        """Score basado en clima"""
        
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
        """Distancia en km"""
        
        RADIO_TIERRA_KM = 6371.0
        
        lat1_rad = math.radians(lat1)
        lon1_rad = math.radians(lon1)
        lat2_rad = math.radians(lat2)
        lon2_rad = math.radians(lon2)
        
        dlat = lat2_rad - lat1_rad
        dlon = lon2_rad - lon1_rad
        
        a = math.sin(dlat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2)**2
        c = 2 * math.asin(math.sqrt(a))
        
        return RADIO_TIERRA_KM * c