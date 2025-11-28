# ai-service/models/embeddings.py - VERSIÓN OPTIMIZADA

from sentence_transformers import SentenceTransformer
import numpy as np
from typing import Dict, List
import logging

logger = logging.getLogger(__name__)

class EmbeddingGenerator:
    """
    Genera embeddings (vectores) para restaurantes usando un modelo de lenguaje
    OPTIMIZADO para usar menos memoria
    """
    
    def __init__(self, model_name: str = 'paraphrase-MiniLM-L3-v2'):
        """
        Inicializa el generador de embeddings con modelo ligero
        
        Args:
            model_name: Modelo más pequeño y rápido (L3 en vez de L12)
        """
        try:
            logger.info(f"Cargando modelo de embeddings: {model_name}")
            self.model = SentenceTransformer(model_name)
            logger.info("✅ Modelo cargado exitosamente")
        except Exception as e:
            logger.error(f"❌ Error al cargar modelo: {e}")
            raise
    
    def generate_restaurant_embedding(self, restaurante: Dict) -> np.ndarray:
        """
        Genera un vector que representa al restaurante
        """
        texto = self._create_description_text(restaurante)
        embedding = self.model.encode(texto, convert_to_numpy=True, show_progress_bar=False)
        return embedding
    
    def generate_embeddings_batch(
        self,
        restaurantes: List[Dict]
    ) -> Dict[int, np.ndarray]:
        """
        Genera embeddings para muchos restaurantes a la vez
        OPTIMIZADO: Procesa en batches pequeños para evitar OOM
        """
        
        embeddings_dict = {}
        
        # Crear textos descriptivos
        textos = []
        ids = []
        
        for restaurante in restaurantes:
            texto = self._create_description_text(restaurante)
            textos.append(texto)
            ids.append(restaurante['idRestaurante'])
        
        logger.info(f"🧠 Generando embeddings para {len(textos)} restaurantes...")
        
        # ✅ CRÍTICO: Procesar en batches pequeños para evitar OOM
        batch_size = 8  # Reducido de 32 a 8
        all_embeddings = []
        
        for i in range(0, len(textos), batch_size):
            batch = textos[i:i+batch_size]
            logger.info(f"   Procesando batch {i//batch_size + 1}/{(len(textos)-1)//batch_size + 1}")
            
            batch_embeddings = self.model.encode(
                batch, 
                convert_to_numpy=True, 
                show_progress_bar=False,
                batch_size=batch_size
            )
            all_embeddings.append(batch_embeddings)
        
        # Concatenar todos los batches
        embeddings = np.vstack(all_embeddings)
        
        # Crear diccionario
        for idx, embedding in zip(ids, embeddings):
            embeddings_dict[idx] = embedding
        
        logger.info(f"✅ Embeddings generados exitosamente")
        
        return embeddings_dict
    
    def _create_description_text(self, restaurante: Dict) -> str:
        """
        Crea un texto descriptivo del restaurante
        Incluye: nombre, categorias, descripcion, caracteristicas
        """
        
        partes = []
        
        # Nombre del restaurante
        partes.append(restaurante.get('nombre', ''))
        
        # Categorias de cocina
        categorias = restaurante.get('categorias', [])
        if categorias:
            categorias_texto = ' '.join([c.get('nombreCategoria', '') for c in categorias])
            partes.append(categorias_texto)
        
        # Descripcion (limitada para reducir memoria)
        descripcion = restaurante.get('descripcion', '')
        if descripcion:
            # Limitar a 100 caracteres
            partes.append(descripcion[:100])
        
        # Caracteristicas especiales
        caracteristicas = restaurante.get('caracteristicas', [])
        if caracteristicas:
            caract_texto = ' '.join([c.get('nombreCaracteristica', '') for c in caracteristicas[:3]])
            partes.append(caract_texto)
        
        # Unir todo con espacios
        texto_completo = ' '.join(partes)
        
        return texto_completo