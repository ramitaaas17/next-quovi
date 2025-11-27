# Este archivo obtiene el clima actual usando una API externa
# Si no hay API key, devuelve datos de prueba

import httpx
import logging
from typing import Dict, Optional

logger = logging.getLogger(__name__)

class WeatherService:
    """
    Servicio para obtener informacion del clima actual
    Usa OpenWeatherMap API (gratis hasta 1000 llamadas/dia)
    """
    
    def __init__(self, api_key: Optional[str] = None):
        """
        Inicializa el servicio de clima
        
        Args:
            api_key: Clave de OpenWeatherMap (opcional)
        """
        self.api_key = api_key
        self.base_url = "https://api.openweathermap.org/data/2.5/weather"
    
    async def get_weather(self, latitud: float, longitud: float) -> Dict:
        """
        Obtiene el clima actual para unas coordenadas
        
        Args:
            latitud: Latitud del lugar
            longitud: Longitud del lugar
            
        Returns:
            Diccionario con temperatura, descripcion y clasificacion
        """
        
        # Si no hay API key, devolver datos mock
        if not self.api_key:
            logger.warning("No hay API key de clima, usando datos mock")
            return self._get_mock_weather()
        
        try:
            # Llamar a la API de OpenWeatherMap
            async with httpx.AsyncClient(timeout=5.0) as client:
                params = {
                    'lat': latitud,
                    'lon': longitud,
                    'appid': self.api_key,
                    'units': 'metric',  # Celsius
                    'lang': 'es'        # Español
                }
                
                response = await client.get(self.base_url, params=params)
                response.raise_for_status()
                
                data = response.json()
                
                # Procesar respuesta
                return self._process_weather_data(data)
                
        except Exception as e:
            logger.error(f"Error al obtener clima: {e}")
            # Si falla, devolver mock
            return self._get_mock_weather()
    
    def _process_weather_data(self, data: Dict) -> Dict:
        """
        Procesa la respuesta de la API y la simplifica
        """
        
        temperatura = data['main']['temp']
        descripcion = data['weather'][0]['description']
        codigo_clima = data['weather'][0]['id']
        
        # Clasificar el clima en categorias simples
        clasificacion = self._classify_weather(codigo_clima, temperatura)
        
        return {
            'temperatura': round(temperatura, 1),
            'descripcion': descripcion,
            'clasificacion': clasificacion,  # soleado, lluvioso, nublado, frio
            'fuente': 'openweathermap'
        }
    
    def _classify_weather(self, codigo: int, temperatura: float) -> str:
        """
        Clasifica el clima en categorias simples
        
        Codigos de OpenWeatherMap:
        - 2xx: Tormenta
        - 3xx: Llovizna
        - 5xx: Lluvia
        - 6xx: Nieve
        - 7xx: Atmosfera (niebla, etc)
        - 800: Cielo despejado
        - 80x: Nubes
        """
        
        # Si hace frio, priorizar eso
        if temperatura < 15:
            return 'frio'
        
        # Clasificar por codigo
        if codigo >= 200 and codigo < 600:
            return 'lluvioso'
        elif codigo == 800:
            return 'soleado'
        elif codigo > 800:
            return 'nublado'
        else:
            return 'nublado'
    
    def _get_mock_weather(self) -> Dict:
        """
        Devuelve datos de clima de prueba cuando no hay API key
        """
        import random
        
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
        
        return random.choice(climas_mock)