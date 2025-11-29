# ai-service/models/embeddings.py
# Generador de embeddings semánticos para restaurantes
# Los embeddings son representaciones vectoriales que capturan el "significado" del restaurante

from sentence_transformers import SentenceTransformer
import numpy as np
from typing import Dict, List
import logging

logger = logging.getLogger(__name__)


class EmbeddingGenerator:
    """
    Generador de embeddings semánticos para restaurantes.
    
    Los embeddings son vectores numéricos que representan el "significado" de un restaurante
    en un espacio multidimensional. Restaurantes similares tendrán vectores cercanos.
    
    Esto nos permite:
    - Medir similaridad semántica entre restaurantes
    - Calcular diversidad de recomendaciones
    - Encontrar restaurantes similares
    
    Usa un modelo pre-entrenado de Sentence Transformers que convierte texto en vectores.
    """
    
    def __init__(self, model_name: str = 'paraphrase-MiniLM-L3-v2'):
        """
        Inicializa el generador cargando el modelo de embeddings.
        
        Args:
            model_name: Nombre del modelo a cargar
                       'paraphrase-MiniLM-L3-v2' es un modelo ligero y rápido
                       que genera vectores de 384 dimensiones
        """
        try:
            logger.info(f"Cargando modelo de embeddings: {model_name}")
            self.model = SentenceTransformer(model_name)
            logger.info("Modelo cargado exitosamente")
        except Exception as e:
            logger.error(f"Error al cargar modelo: {e}")
            raise
    
    def generate_restaurant_embedding(self, restaurante: Dict) -> np.ndarray:
        """
        Genera un vector embedding para un solo restaurante.
        
        Args:
            restaurante: Diccionario con datos del restaurante
            
        Returns:
            Array numpy con el embedding (vector de 384 dimensiones)
        """
        texto = self._create_description_text(restaurante)
        embedding = self.model.encode(texto, convert_to_numpy=True, show_progress_bar=False)
        return embedding
    
    def generate_embeddings_batch(
        self,
        restaurantes: List[Dict]
    ) -> Dict[int, np.ndarray]:
        """
        Genera embeddings para múltiples restaurantes de manera eficiente.
        
        Procesa los restaurantes en batches pequeños para evitar problemas de memoria.
        
        Args:
            restaurantes: Lista de restaurantes
            
        Returns:
            Diccionario donde las claves son IDs de restaurantes y los valores son embeddings
        """
        
        embeddings_dict = {}
        
        # Crear textos descriptivos para todos los restaurantes
        textos = []
        ids = []
        
        for restaurante in restaurantes:
            texto = self._create_description_text(restaurante)
            textos.append(texto)
            ids.append(restaurante['idRestaurante'])
        
        logger.info(f"Generando embeddings para {len(textos)} restaurantes...")
        
        # Procesar en batches pequeños para evitar Out of Memory
        batch_size = 8
        all_embeddings = []
        
        for i in range(0, len(textos), batch_size):
            batch = textos[i:i+batch_size]
            logger.info(f"   Procesando batch {i//batch_size + 1}/{(len(textos)-1)//batch_size + 1}")
            
            # Generar embeddings para este batch
            batch_embeddings = self.model.encode(
                batch, 
                convert_to_numpy=True, 
                show_progress_bar=False,
                batch_size=batch_size
            )
            all_embeddings.append(batch_embeddings)
        
        # Concatenar todos los batches en un solo array
        embeddings = np.vstack(all_embeddings)
        
        # Crear diccionario ID -> embedding
        for idx, embedding in zip(ids, embeddings):
            embeddings_dict[idx] = embedding
        
        logger.info(f"Embeddings generados exitosamente")
        
        return embeddings_dict
    
    def _create_description_text(self, restaurante: Dict) -> str:
        """
        Crea una descripción textual del restaurante para el modelo.
        
        Combina información relevante:
        - Nombre del restaurante
        - Categorías de cocina
        - Descripción (limitada a 100 caracteres)
        - Características especiales (máximo 3)
        
        El texto resultante será convertido en un embedding.
        
        Args:
            restaurante: Diccionario con datos del restaurante
            
        Returns:
            String con la descripción completa
        """
        
        partes = []
        
        # Agregar nombre del restaurante
        partes.append(restaurante.get('nombre', ''))
        
        # Agregar categorías de cocina
        categorias = restaurante.get('categorias', [])
        if categorias:
            categorias_texto = ' '.join([c.get('nombreCategoria', '') for c in categorias])
            partes.append(categorias_texto)
        
        # Agregar descripción (limitada para reducir uso de memoria)
        descripcion = restaurante.get('descripcion', '')
        if descripcion:
            partes.append(descripcion[:100])
        
        # Agregar hasta 3 características especiales
        caracteristicas = restaurante.get('caracteristicas', [])
        if caracteristicas:
            caract_texto = ' '.join([c.get('nombreCaracteristica', '') for c in caracteristicas[:3]])
            partes.append(caract_texto)
        
        # Unir todo con espacios
        texto_completo = ' '.join(partes)
        
        return texto_completo