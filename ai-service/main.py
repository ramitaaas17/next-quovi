# ai-service/main.py
# Servicio principal de IA para el sistema de recomendaciones de restaurantes
# Implementa un algoritmo de Recocido Simulado combinado con embeddings semánticos

import os
import gc
import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Query, Path
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import httpx
import logging
from dotenv import load_dotenv

load_dotenv()

from services.discover_service import DiscoverService
from services.weather_service import WeatherService
from models.recommender import SimulatedAnnealingRecommender
from models.embeddings import EmbeddingGenerator

# Configuración del sistema de logging
log_level = os.getenv('LOG_LEVEL', 'INFO')
logging.basicConfig(
    level=getattr(logging, log_level),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Carga de variables de entorno
BACKEND_URL = os.getenv('BACKEND_URL', 'http://backend:8080/api')
OPENWEATHER_API_KEY = os.getenv('OPENWEATHER_API_KEY', None)
ENVIRONMENT = os.getenv('ENVIRONMENT', 'development')
PORT = int(os.getenv('PORT', '5050'))

# Parámetros del algoritmo de Recocido Simulado
SA_TEMPERATURA_INICIAL = float(os.getenv('SA_TEMPERATURA_INICIAL', '100.0'))
SA_TEMPERATURA_MINIMA = float(os.getenv('SA_TEMPERATURA_MINIMA', '0.1'))
SA_TASA_ENFRIAMIENTO = float(os.getenv('SA_TASA_ENFRIAMIENTO', '0.95'))
SA_MAX_ITERACIONES = int(os.getenv('SA_MAX_ITERACIONES', '500'))

# Variables globales que almacenan instancias de los servicios
# Se inicializan durante el startup de la aplicación
discover_service = None
weather_service = None
sa_recommender = None
embedding_generator = None
embeddings_cache = {}

logger.info("=" * 60)
logger.info(f"AI Service iniciado - Puerto: {PORT}")
logger.info(f"Entorno: {ENVIRONMENT}")
logger.info(f"Backend: {BACKEND_URL}")
logger.info("=" * 60)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Gestiona el ciclo de vida completo de la aplicación.
    Se ejecuta al iniciar y al cerrar el servicio.
    
    Startup: Inicializa todos los servicios y carga modelos
    Shutdown: Limpia recursos y libera memoria
    """
    
    # STARTUP: Inicialización de servicios
    global discover_service, weather_service, sa_recommender, embedding_generator
    
    logger.info("=" * 60)
    logger.info("AI Service INICIANDO...")
    logger.info(f"Puerto: {PORT}")
    logger.info(f"Backend: {BACKEND_URL}")
    logger.info("=" * 60)
    
    try:
        # Inicializar los servicios de descubrimiento y clima
        logger.info("Inicializando servicios...")
        discover_service = DiscoverService()
        weather_service = WeatherService(api_key=OPENWEATHER_API_KEY)
        
        # Crear instancia del optimizador de Recocido Simulado
        sa_recommender = SimulatedAnnealingRecommender(
            temperatura_inicial=SA_TEMPERATURA_INICIAL,
            temperatura_minima=SA_TEMPERATURA_MINIMA,
            tasa_enfriamiento=SA_TASA_ENFRIAMIENTO,
            max_iteraciones=SA_MAX_ITERACIONES
        )
        
        # Pre-cargar el modelo de embeddings en memoria
        # Esto mejora el tiempo de respuesta del primer request
        logger.info("Pre-cargando modelo de embeddings...")
        embedding_generator = EmbeddingGenerator()
        logger.info("Modelo de embeddings listo")
        
        logger.info("Todos los servicios inicializados correctamente")
        
    except Exception as e:
        logger.error(f"Error en startup: {e}", exc_info=True)
        raise
    
    yield  # La aplicación permanece corriendo aquí
    
    # SHUTDOWN: Limpieza de recursos
    logger.info("AI Service cerrando...")
    
    # Limpiar cache de embeddings y forzar garbage collection
    global embeddings_cache
    embeddings_cache.clear()
    gc.collect()
    
    logger.info("Limpieza completada")


# Crear la aplicación FastAPI con el gestor de ciclo de vida
app = FastAPI(
    title="Quovi AI Service",
    description="Microservicio de IA para recomendaciones inteligentes de restaurantes",
    version="1.0.0",
    lifespan=lifespan
)

# Configuración de CORS para permitir requests desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://frontend:3000",
        "*"  # En desarrollo permite todos los orígenes
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)


# Modelos de datos para validación de requests/responses

class PreferenciasUsuario(BaseModel):
    """Define las preferencias del usuario para la búsqueda"""
    clima_actual: Optional[str] = Field(None, description="soleado, lluvioso, nublado, frio")
    ocasion: str = Field(..., description="cita, amigos, solo, familia")
    distancia: str = Field(..., description="cerca, explorar, lejos")
    antojo: str = Field(..., description="dulce, salado, ambos")
    presupuesto: str = Field(..., description="bajo, medio, alto")


class UbicacionUsuario(BaseModel):
    """Coordenadas geográficas del usuario"""
    latitud: float = Field(..., ge=-90, le=90)
    longitud: float = Field(..., ge=-180, le=180)


class DescubrirRequest(BaseModel):
    """Request completo para el endpoint de descubrimiento"""
    preferencias: PreferenciasUsuario
    ubicacion: UbicacionUsuario
    top_n: int = Field(10, ge=1, le=20, description="Numero de recomendaciones")


class DescubrirResponse(BaseModel):
    """Response con las recomendaciones y estadísticas del proceso"""
    recomendaciones: List[Dict[str, Any]]
    estadisticas: Dict[str, Any]
    clima: Optional[Dict[str, Any]] = None


# Endpoints de la API

@app.get("/")
async def root():
    """Endpoint raíz con información básica del servicio"""
    return {
        "service": "Quovi AI Service",
        "version": "1.0.0",
        "status": "running",
        "environment": ENVIRONMENT
    }


@app.get("/health")
async def health_check():
    """
    Healthcheck para Docker y monitoreo.
    Verifica que todos los servicios estén operativos.
    """
    logger.info("Healthcheck OK")
    return {
        "status": "ok",
        "service": "Quovi AI Service",
        "environment": ENVIRONMENT,
        "backend_url": BACKEND_URL,
        "weather_api": "enabled" if OPENWEATHER_API_KEY else "mock",
        "embedding_model_loaded": embedding_generator is not None,
        "embeddings_cached": len(embeddings_cache)
    }


@app.post("/api/ai/discover", response_model=DescubrirResponse)
async def descubrir_restaurantes(request: DescubrirRequest):
    """
    Endpoint principal de recomendaciones inteligentes.
    
    Proceso:
    1. Obtiene todos los restaurantes disponibles del backend
    2. Consulta el clima actual (si no fue proporcionado)
    3. Calcula scores individuales según preferencias del usuario
    4. Genera embeddings semánticos de los restaurantes (primera vez)
    5. Optimiza las recomendaciones con Recocido Simulado
    6. Retorna las mejores N recomendaciones con estadísticas
    """
    
    try:
        logger.info("Iniciando proceso de recomendaciones...")
        logger.info(f"Preferencias: {request.preferencias}")
        
        # Paso 1: Obtener lista de restaurantes desde el backend
        logger.info(f"Obteniendo restaurantes de {BACKEND_URL}/restaurantes")
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(f"{BACKEND_URL}/restaurantes")
            response.raise_for_status()
            data = response.json()
            restaurantes = data.get('data', [])
        
        if not restaurantes:
            raise HTTPException(status_code=404, detail="No se encontraron restaurantes")
        
        logger.info(f"{len(restaurantes)} restaurantes obtenidos")
        
        # Paso 2: Obtener información del clima
        clima_info = None
        clima_clasificacion = request.preferencias.clima_actual
        
        if not clima_clasificacion:
            logger.info("Obteniendo clima actual...")
            clima_info = await weather_service.get_weather(
                request.ubicacion.latitud,
                request.ubicacion.longitud
            )
            clima_clasificacion = clima_info['clasificacion']
            logger.info(f"Clima: {clima_clasificacion}")
        
        # Paso 3: Calcular scores individuales para cada restaurante
        logger.info("Calculando scores...")
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
        
        # Obtener top 50 restaurantes según scoring inicial
        restaurantes_con_score = discover_service.get_recommendations(
            restaurantes=restaurantes,
            preferencias=preferencias_dict,
            ubicacion_usuario=ubicacion_dict,
            top_n=min(50, len(restaurantes))
        )
        
        logger.info(f"Scores calculados para {len(restaurantes_con_score)} restaurantes")
        
        # Paso 4: Generar o recuperar embeddings del cache
        global embeddings_cache
        if not embeddings_cache:
            logger.info("Generando embeddings (primera vez)...")
            try:
                # Generar embeddings usando el modelo pre-cargado
                embeddings_cache = embedding_generator.generate_embeddings_batch(
                    restaurantes,
                    batch_size=8  # Batches pequeños para evitar Out of Memory
                )
                logger.info(f"Cache creado: {len(embeddings_cache)} embeddings")
                
                # Liberar memoria inmediatamente
                gc.collect()
                
            except Exception as e:
                logger.error(f"Error generando embeddings: {e}", exc_info=True)
                logger.warning("Continuando sin embeddings...")
                embeddings_cache = {}
        
        # Paso 5: Optimizar recomendaciones con Recocido Simulado
        logger.info("Optimizando con Recocido Simulado...")
        recomendaciones_optimizadas, estadisticas = sa_recommender.optimize_recommendations(
            restaurantes_con_score=restaurantes_con_score,
            num_recomendaciones=request.top_n,
            embeddings=embeddings_cache if embeddings_cache else None
        )
        
        logger.info(f"Optimizacion completada - Mejora: {estadisticas['mejora_porcentual']:.2f}%")
        
        # Liberar memoria después de cada request
        gc.collect()
        
        # Construir response con todas las estadísticas
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
                "embeddings_used": len(embeddings_cache) > 0,
                "configuracion": {
                    "temperatura_inicial": SA_TEMPERATURA_INICIAL,
                    "tasa_enfriamiento": SA_TASA_ENFRIAMIENTO,
                    "max_iteraciones": SA_MAX_ITERACIONES
                }
            },
            "clima": clima_info
        }
        
    except httpx.HTTPError as e:
        logger.error(f"Error comunicacion backend: {e}")
        raise HTTPException(status_code=502, detail="Error al obtener restaurantes")
    
    except Exception as e:
        logger.error(f"Error inesperado: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/ai/climate/{lat}/{lng}")
async def obtener_clima(
    lat: float = Path(..., ge=-90, le=90),
    lng: float = Path(..., ge=-180, le=180)
):
    """Obtener clima actual para unas coordenadas específicas"""
    try:
        clima = await weather_service.get_weather(lat, lng)
        return clima
    except Exception as e:
        logger.error(f"Error clima: {e}")
        raise HTTPException(status_code=500, detail="Error al obtener clima")


@app.get("/api/ai/config")
async def obtener_configuracion():
    """Consultar la configuración actual del servicio"""
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
        "embeddings_cached": len(embeddings_cache),
        "embedding_model_loaded": embedding_generator is not None
    }


@app.post("/api/ai/clear-cache")
async def limpiar_cache():
    """Limpiar el cache de embeddings para liberar memoria"""
    global embeddings_cache
    cache_size = len(embeddings_cache)
    embeddings_cache = {}
    gc.collect()
    logger.info(f"Cache limpiado ({cache_size} entradas)")
    return {
        "success": True,
        "message": f"Cache limpiado ({cache_size} entradas)"
    }


if __name__ == "__main__":
    logger.info(f"Arrancando Uvicorn en 0.0.0.0:{PORT}")
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=PORT,
        log_level=log_level.lower()
    )