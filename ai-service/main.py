# Este es el archivo principal del microservicio de IA
# Expone endpoints REST para recomendaciones y clima
# Lee configuracion desde variables de entorno (.env)

import os
# --- CAMBIO 1: Importamos uvicorn para poder correr el servidor desde codigo
import uvicorn
from fastapi import FastAPI, HTTPException, Query, Path
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
import httpx
import logging
from dotenv import load_dotenv

# Cargar variables de entorno del archivo .env
load_dotenv()

from services.discover_service import DiscoverService
from services.weather_service import WeatherService
from models.recommender import SimulatedAnnealingRecommender
from models.embeddings import EmbeddingGenerator

# Configurar logging segun variable de entorno
log_level = os.getenv('LOG_LEVEL', 'INFO')
logging.basicConfig(
    level=getattr(logging, log_level),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Obtener configuracion desde variables de entorno
BACKEND_URL = os.getenv('BACKEND_URL', 'http://backend:8080/api')
OPENWEATHER_API_KEY = os.getenv('OPENWEATHER_API_KEY', None)
ENVIRONMENT = os.getenv('ENVIRONMENT', 'development')
PORT = int(os.getenv('PORT', '5050'))

# Configuracion de Recocido Simulado desde .env
SA_TEMPERATURA_INICIAL = float(os.getenv('SA_TEMPERATURA_INICIAL', '100.0'))
SA_TEMPERATURA_MINIMA = float(os.getenv('SA_TEMPERATURA_MINIMA', '0.1'))
SA_TASA_ENFRIAMIENTO = float(os.getenv('SA_TASA_ENFRIAMIENTO', '0.95'))
SA_MAX_ITERACIONES = int(os.getenv('SA_MAX_ITERACIONES', '500'))

# Crear aplicacion FastAPI
app = FastAPI(
    title="Quovi AI Service",
    description="Microservicio de IA para recomendaciones inteligentes",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",  
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",  
        "http://localhost:5173",
        "http://frontend:3000",
        "*"  # TEMPORAL para desarrollo - QUITAR en producción
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)
# Inicializar servicios globales
discover_service = DiscoverService()
weather_service = WeatherService(api_key=OPENWEATHER_API_KEY)

# Inicializar Recocido Simulado con configuracion de .env
sa_recommender = SimulatedAnnealingRecommender(
    temperatura_inicial=SA_TEMPERATURA_INICIAL,
    temperatura_minima=SA_TEMPERATURA_MINIMA,
    tasa_enfriamiento=SA_TASA_ENFRIAMIENTO,
    max_iteraciones=SA_MAX_ITERACIONES
)

# Variable global para embeddings (se generan una vez y se reutilizan)
embeddings_cache = {}

# Log de inicio con configuracion
logger.info("=" * 60)
logger.info(f"AI Service iniciado en modo: {ENVIRONMENT}")
logger.info(f"Puerto: {PORT}")
logger.info(f"Backend URL: {BACKEND_URL}")
logger.info(f"OpenWeather API: {'Configurado' if OPENWEATHER_API_KEY else 'Mock mode'}")
logger.info(f"Recocido Simulado - Temp Inicial: {SA_TEMPERATURA_INICIAL}")
logger.info(f"Recocido Simulado - Max Iteraciones: {SA_MAX_ITERACIONES}")
logger.info("=" * 60)

# ==================== MODELOS DE DATOS ====================

class PreferenciasUsuario(BaseModel):
    """Preferencias del usuario para recomendaciones"""
    clima_actual: Optional[str] = Field(None, description="soleado, lluvioso, nublado, frio, o None para obtenerlo automaticamente")
    ocasion: str = Field(..., description="cita, amigos, solo, familia")
    distancia: str = Field(..., description="cerca, explorar, lejos")
    antojo: str = Field(..., description="dulce, salado, ambos")
    presupuesto: str = Field(..., description="bajo, medio, alto")

class UbicacionUsuario(BaseModel):
    """Ubicacion del usuario"""
    latitud: float = Field(..., ge=-90, le=90)
    longitud: float = Field(..., ge=-180, le=180)

class DescubrirRequest(BaseModel):
    """Request completo para el endpoint de descubrir"""
    preferencias: PreferenciasUsuario
    ubicacion: UbicacionUsuario
    top_n: int = Field(10, ge=1, le=20, description="Numero de recomendaciones")

class DescubrirResponse(BaseModel):
    """Response con recomendaciones optimizadas"""
    recomendaciones: List[Dict]
    estadisticas: Dict
    clima: Optional[Dict] = None

# ==================== ENDPOINTS ====================

@app.get("/")
async def root():
    """
    Endpoint raiz con informacion del servicio
    """
    return {
        "service": "Quovi AI Service",
        "version": "1.0.0",
        "environment": ENVIRONMENT,
        "endpoints": {
            "health": "/health",
            "discover": "POST /api/ai/discover",
            "climate": "GET /api/ai/climate/{lat}/{lng}"
        }
    }

@app.get("/health")
async def health_check():
    """
    Endpoint para verificar que el servicio esta funcionando
    """
    return {
        "status": "ok",
        "service": "Quovi AI Service",
        "version": "1.0.0",
        "environment": ENVIRONMENT,
        "backend_url": BACKEND_URL,
        "weather_api": "enabled" if OPENWEATHER_API_KEY else "mock",
        "simulated_annealing": {
            "temperatura_inicial": SA_TEMPERATURA_INICIAL,
            "temperatura_minima": SA_TEMPERATURA_MINIMA,
            "tasa_enfriamiento": SA_TASA_ENFRIAMIENTO,
            "max_iteraciones": SA_MAX_ITERACIONES
        }
    }

@app.post("/api/ai/discover", response_model=DescubrirResponse)
async def descubrir_restaurantes(request: DescubrirRequest):
    """
    Endpoint principal de recomendaciones inteligentes
    
    Proceso:
    1. Obtener todos los restaurantes del backend
    2. Obtener clima actual (si no se especifico)
    3. Calcular score para cada restaurante (5 criterios)
    4. Optimizar con Recocido Simulado (balancear relevancia y diversidad)
    5. Devolver top N recomendaciones
    """
    
    try:
        logger.info("Iniciando proceso de recomendaciones...")
        logger.info(f"Preferencias: {request.preferencias}")
        logger.info(f"Ubicacion: {request.ubicacion}")
        
        # Paso 1: Obtener todos los restaurantes desde el backend de Go
        logger.info(f"Obteniendo restaurantes del backend: {BACKEND_URL}/restaurantes")
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(f"{BACKEND_URL}/restaurantes")
            response.raise_for_status()
            data = response.json()
            restaurantes = data.get('data', [])
        
        if not restaurantes:
            raise HTTPException(status_code=404, detail="No se encontraron restaurantes")
        
        logger.info(f"Se obtuvieron {len(restaurantes)} restaurantes")
        
        # Paso 2: Obtener clima actual si no se especifico
        clima_info = None
        clima_clasificacion = request.preferencias.clima_actual
        
        if not clima_clasificacion:
            logger.info("Obteniendo clima actual...")
            clima_info = await weather_service.get_weather(
                request.ubicacion.latitud,
                request.ubicacion.longitud
            )
            clima_clasificacion = clima_info['clasificacion']
            logger.info(f"Clima detectado: {clima_clasificacion}")
        else:
            logger.info(f"Usando clima especificado: {clima_clasificacion}")
        
        # Paso 3: Calcular scores individuales para cada restaurante
        logger.info("Calculando scores de restaurantes...")
        preferencias_dict = {
            'clima_actual': clima_clasificacion,
            'ocasion': request.preferencias.ocasion,
            'distancia': request.preferencias.distancia,
            'antojo': request.preferencias.antojo,
            'presupuesto': request.preferencias.presupuesto
        }
        
        ubicacion_dict = {
            'latitud': request.ubicacion.latitud,
            'longitud': request.ubicacion.longitud
        }
        
        restaurantes_con_score = discover_service.get_recommendations(
            restaurantes=restaurantes,
            preferencias=preferencias_dict,
            ubicacion_usuario=ubicacion_dict,
            top_n=min(50, len(restaurantes))
        )
        
        logger.info(f"Scores calculados para {len(restaurantes_con_score)} restaurantes")
        
        # Paso 4: Generar embeddings si no existen en cache
        global embeddings_cache
        if not embeddings_cache:
            logger.info("Generando embeddings (primera vez)...")
            embedding_generator = EmbeddingGenerator()
            embeddings_cache = embedding_generator.generate_embeddings_batch(restaurantes)
            logger.info(f"Cache de embeddings creado con {len(embeddings_cache)} restaurantes")
        
        # Paso 5: Optimizar con Recocido Simulado
        logger.info("Optimizando recomendaciones con Recocido Simulado...")
        recomendaciones_optimizadas, estadisticas = sa_recommender.optimize_recommendations(
            restaurantes_con_score=restaurantes_con_score,
            num_recomendaciones=request.top_n,
            embeddings=embeddings_cache
        )
        
        logger.info(f"Optimizacion completada. Mejora: {estadisticas['mejora_porcentual']:.2f}%")
        logger.info(f"Iteraciones: {estadisticas['iteraciones']}, Mejoras aceptadas: {estadisticas['mejoras_aceptadas']}")
        
        # Preparar respuesta
        return {
            "recomendaciones": recomendaciones_optimizadas,
            "estadisticas": {
                "total_restaurantes_evaluados": len(restaurantes),
                "algoritmo": "Recocido Simulado + Scoring Multi-Criterio",
                "iteraciones": estadisticas['iteraciones'],
                "mejoras_aceptadas": estadisticas['mejoras_aceptadas'],
                "mejora_porcentual": round(estadisticas['mejora_porcentual'], 2),
                "energia_inicial": round(estadisticas['energia_inicial'], 4),
                "energia_final": round(estadisticas['energia_final'], 4),
                "configuracion": {
                    "temperatura_inicial": SA_TEMPERATURA_INICIAL,
                    "tasa_enfriamiento": SA_TASA_ENFRIAMIENTO,
                    "max_iteraciones": SA_MAX_ITERACIONES
                }
            },
            "clima": clima_info
        }
        
    except httpx.HTTPError as e:
        logger.error(f"Error al comunicarse con el backend: {e}")
        raise HTTPException(status_code=502, detail="Error al obtener restaurantes del backend")
    
    except Exception as e:
        logger.error(f"Error inesperado: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/ai/climate/{lat}/{lng}")
async def obtener_clima(
    lat: float = Path(..., ge=-90, le=90, description="Latitud"),
    lng: float = Path(..., ge=-180, le=180, description="Longitud")
):
    """
    Endpoint para obtener el clima actual de una ubicacion
    """
    
    try:
        logger.info(f"Obteniendo clima para: lat={lat}, lng={lng}")
        clima = await weather_service.get_weather(lat, lng)
        logger.info(f"Clima obtenido: {clima['clasificacion']}")
        return clima
    except Exception as e:
        logger.error(f"Error al obtener clima: {e}")
        raise HTTPException(status_code=500, detail="Error al obtener clima")

@app.get("/api/ai/config")
async def obtener_configuracion():
    """
    Endpoint para ver la configuracion actual del servicio
    """
    return {
        "backend_url": BACKEND_URL,
        "environment": ENVIRONMENT,
        "weather_api": "enabled" if OPENWEATHER_API_KEY else "mock",
        "simulated_annealing": {
            "temperatura_inicial": SA_TEMPERATURA_INICIAL,
            "temperatura_minima": SA_TEMPERATURA_MINIMA,
            "tasa_enfriamiento": SA_TASA_ENFRIAMIENTO,
            "max_iteraciones": SA_MAX_ITERACIONES
        },
        "discover_service": {
            "peso_clima": discover_service.PESO_CLIMA,
            "peso_ocasion": discover_service.PESO_OCASION,
            "peso_distancia": discover_service.PESO_DISTANCIA,
            "peso_antojo": discover_service.PESO_ANTOJO,
            "peso_presupuesto": discover_service.PESO_PRESUPUESTO
        },
        "embeddings": {
            "cached": len(embeddings_cache),
            "model": os.getenv('MODEL_NAME', 'paraphrase-multilingual-MiniLM-L12-v2')
        }
    }

@app.post("/api/ai/clear-cache")
async def limpiar_cache():
    """
    Endpoint para limpiar el cache de embeddings
    Util si se actualizan los restaurantes en la base de datos
    """
    global embeddings_cache
    cache_size = len(embeddings_cache)
    embeddings_cache = {}
    logger.info(f"Cache de embeddings limpiado ({cache_size} entradas)")
    return {
        "success": True,
        "message": f"Cache limpiado ({cache_size} entradas)",
        "cache_size": 0
    }

# Evento de inicio de la aplicacion
@app.on_event("startup")
async def startup_event():
    """
    Se ejecuta cuando el servidor inicia
    """
    logger.info("=" * 60)
    logger.info("🚀 AI Service iniciando...")
    logger.info("=" * 60)
    logger.info(f"Entorno: {ENVIRONMENT}")
    logger.info(f"Backend URL: {BACKEND_URL}")
    logger.info(f"Puerto: {PORT}")
    logger.info("=" * 60)

# Evento de cierre de la aplicacion
@app.on_event("shutdown")
async def shutdown_event():
    """
    Se ejecuta cuando el servidor se cierra
    """
    logger.info("=" * 60)
    logger.info(" AI Service cerrando...")
    logger.info("=" * 60)

# ---Bloque de arranque para Docker 
if __name__ == "__main__":

    uvicorn.run(
        app, 
        host="0.0.0.0", 
        port=PORT,
        log_level=log_level.lower()
    )