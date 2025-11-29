# ai-service/services/weather_service.py
# Servicio para obtener información meteorológica actual
# Usa OpenWeatherMap API o datos simulados si no hay API key

import httpx
import logging
from typing import Dict, Optional

logger = logging.getLogger(__name__)


class WeatherService:
    """
    Servicio para obtener información del clima actual basado en coordenadas.
    
    Funcionalidad:
    - Consulta OpenWeatherMap API si hay API key disponible
    - Retorna datos simulados si no hay API key (para desarrollo)
    - Clasifica el clima en categorías simples: soleado, lluvioso, nublado, frio
    
    La clasificación del clima se usa para ajustar las recomendaciones
    (por ejemplo, priorizar terrazas en días soleados).
    """
    
    def __init__(self, api_key: Optional[str] = None):
        """
        Inicializa el servicio de clima.
        
        Args:
            api_key: API key de OpenWeatherMap (opcional)
                    Si no se proporciona, se usarán datos simulados
        """
        self.api_key = api_key
        self.base_url = "https://api.openweathermap.org/data/2.5/weather"
    
    async def get_weather(self, latitud: float, longitud: float) -> Dict:
        """
        Obtiene el clima actual para unas coordenadas específicas.
        
        Args:
            latitud: Latitud del lugar
            longitud: Longitud del lugar
            
        Returns:
            Diccionario con:
            - temperatura: Temperatura en grados Celsius
            - descripcion: Descripción del clima en español
            - clasificacion: Categoría simple (soleado/lluvioso/nublado/frio)
            - fuente: Origen de los datos (openweathermap o mock)
        """
        
        # Si no hay API key, usar datos simulados
        if not self.api_key:
            logger.warning("No hay API key de clima, usando datos simulados")
            return self._get_mock_weather()
        
        try:
            # Realizar petición a OpenWeatherMap API
            async with httpx.AsyncClient(timeout=5.0) as client:
                params = {
                    'lat': latitud,
                    'lon': longitud,
                    'appid': self.api_key,
                    'units': 'metric',  # Usar Celsius
                    'lang': 'es'        # Descripciones en español
                }
                
                response = await client.get(self.base_url, params=params)
                response.raise_for_status()
                
                data = response.json()
                
                # Procesar y simplificar la respuesta
                return self._process_weather_data(data)
                
        except Exception as e:
            logger.error(f"Error al obtener clima: {e}")
            # Si falla la API, usar datos simulados como fallback
            return self._get_mock_weather()
    
    def _process_weather_data(self, data: Dict) -> Dict:
        """
        Procesa la respuesta de OpenWeatherMap y la simplifica.
        
        Extrae solo la información relevante y clasifica el clima
        en una de las 4 categorías simples.
        
        Args:
            data: Respuesta JSON de la API
            
        Returns:
            Diccionario simplificado con datos del clima
        """
        
        temperatura = data['main']['temp']
        descripcion = data['weather'][0]['description']
        codigo_clima = data['weather'][0]['id']
        
        # Clasificar el clima usando el código de OpenWeatherMap
        clasificacion = self._classify_weather(codigo_clima, temperatura)
        
        return {
            'temperatura': round(temperatura, 1),
            'descripcion': descripcion,
            'clasificacion': clasificacion,
            'fuente': 'openweathermap'
        }
    
    def _classify_weather(self, codigo: int, temperatura: float) -> str:
        """
        Clasifica el clima en categorías simples basándose en códigos de OpenWeatherMap.
        
        Códigos de OpenWeatherMap:
        - 2xx: Tormenta
        - 3xx: Llovizna
        - 5xx: Lluvia
        - 6xx: Nieve
        - 7xx: Atmósfera (niebla, bruma, etc)
        - 800: Cielo despejado
        - 80x: Nubes (parciales o totales)
        
        Args:
            codigo: Código de condición meteorológica de OpenWeatherMap
            temperatura: Temperatura actual en Celsius
            
        Returns:
            Clasificación simple: 'frio', 'lluvioso', 'soleado', o 'nublado'
        """
        
        # Si hace frío, esa es la característica principal
        if temperatura < 15:
            return 'frio'
        
        # Clasificar por código de condición
        if codigo >= 200 and codigo < 600:
            # Tormentas, lloviznas y lluvia
            return 'lluvioso'
        elif codigo == 800:
            # Cielo completamente despejado
            return 'soleado'
        elif codigo > 800:
            # Cualquier tipo de nubes
            return 'nublado'
        else:
            # Condiciones atmosféricas (niebla, etc)
            return 'nublado'
    
    def _get_mock_weather(self) -> Dict:
        """
        Genera datos de clima simulados para desarrollo o fallback.
        
        Útil cuando:
        - No hay API key configurada
        - La API de OpenWeatherMap está caída
        - Se están realizando pruebas
        
        Returns:
            Diccionario con datos de clima simulados (aleatorios)
        """
        import random
        
        # Lista de condiciones climáticas posibles
        climas_mock = [
            {
                'temperatura': 24.5,
                'descripcion': 'Cielo despejado',
                'clasificacion': 'soleado',
                'fuente': 'mock'
            },
            {
                'temperatura': 18.0,
                'descripcion': 'Parcialmente nublado',
                'clasificacion': 'nublado',
                'fuente': 'mock'
            },
            {
                'temperatura': 16.5,
                'descripcion': 'Lluvia ligera',
                'clasificacion': 'lluvioso',
                'fuente': 'mock'
            },
            {
                'temperatura': 12.0,
                'descripcion': 'Frio y nublado',
                'clasificacion': 'frio',
                'fuente': 'mock'
            }
        ]
        
        # Retornar uno aleatorio
        return random.choice(climas_mock)