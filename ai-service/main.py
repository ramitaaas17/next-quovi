# Este es el archivo principal del microservicio de IA
# Expone endpoints REST para recomendaciones y clima

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
import httpx
import logging

from services.discover_service import DiscoverService
from services.weather_service import WeatherService
from models.recommender import SimulatedAnnealingRecommender
from models.embeddings import EmbeddingGenerator

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Crear aplicacion FastAPI
app = FastAPI(
    title="Quovi AI Service",
    description="Microservicio de IA para recomendaciones inteligentes",
    version="1.0.0"
)

# Configurar CORS para permitir requests desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En produccion, especificar dominios exactos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar servicios globales
discover_service = DiscoverService()
weather_service = WeatherService(api_key=None)  # Cambiar por API key real si tienes
sa_recommender = SimulatedAnnealingRecommender()

# Variable global para embeddings (se generan una vez y se reutilizan)
embeddings_cache = {}

# URL del backend de Go
BACKEND_URL = "http://backend:8080/api"

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

@app.get("/health")
async def health_check():
    """
    Endpoint para verificar que el servicio esta funcionando
    """
    return {
        "status": "ok",
        "service": "Quovi AI Service",
        "version": "1.0.0"
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
        
        # Paso 1: Obtener todos los restaurantes desde el backend de Go
        logger.info("Obteniendo restaurantes del backend...")
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
            top_n=min(50, len(restaurantes))  # Pre-filtrar top 50 para SA
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
        
        # Preparar response
        return {
            "recomendaciones": recomendaciones_optimizadas,
            "estadisticas": {
                "total_restaurantes_evaluados": len(restaurantes),
                "algoritmo": "Recocido Simulado + Scoring Multi-Criterio",
                "iteraciones": estadisticas['iteraciones'],
                "mejora_porcentual": round(estadisticas['mejora_porcentual'], 2)
            },
            "clima": clima_info
        }
        
    except httpx.HTTPError as e:
        logger.error(f"Error al comunicarse con el backend: {e}")
        raise HTTPException(status_code=502, detail="Error al obtener restaurantes del backend")
    
    except Exception as e:
        logger.error(f"Error inesperado: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/ai/climate/{lat}/{lng}")
async def obtener_clima(
    lat: float = Query(..., ge=-90, le=90),
    lng: float = Query(..., ge=-180, le=180)
):
    """
    Endpoint para obtener el clima actual de una ubicacion
    """
    
    try:
        clima = await weather_service.get_weather(lat, lng)
        return clima
    except Exception as e:
        logger.error(f"Error al obtener clima: {e}")
        raise HTTPException(status_code=500, detail="Error al obtener clima")

@app.get("/")
async def root():
    """
    Endpoint raiz con informacion del servicio
    """
    return {
        "service": "Quovi AI Service",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "discover": "POST /api/ai/discover",
            "climate": "GET /api/ai/climate/{lat}/{lng}"
        }
    }