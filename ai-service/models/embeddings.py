# Este archivo genera vectores (embeddings) para cada restaurante
# Los embeddings permiten comparar restaurantes matematicamente

from sentence_transformers import SentenceTransformer
import numpy as np
from typing import Dict, List
import logging

logger = logging.getLogger(__name__)

class EmbeddingGenerator:
    """
    Genera embeddings (vectores) para restaurantes usando un modelo de lenguaje
    
    Los embeddings convierten texto en numeros, permitiendonos calcular
    que tan similares son dos restaurantes
    """
    
    def __init__(self, model_name: str = 'paraphrase-multilingual-MiniLM-L12-v2'):
        """
        Inicializa el generador de embeddings
        
        Args:
            model_name: Nombre del modelo de Sentence Transformers a usar
                       Este modelo funciona bien con espanol
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
        Genera un vector de 384 dimensiones que representa al restaurante
        
        Args:
            restaurante: Diccionario con info del restaurante
            
        Returns:
            Vector numpy de 384 dimensiones
        """
        
        # Crear texto descriptivo del restaurante
        texto = self._create_description_text(restaurante)
        
        # Generar embedding
        embedding = self.model.encode(texto, convert_to_numpy=True)
        
        return embedding
    
    def generate_embeddings_batch(
        self,
        restaurantes: List[Dict]
    ) -> Dict[int, np.ndarray]:
        """
        Genera embeddings para muchos restaurantes a la vez (mas rapido)
        
        Returns:
            Diccionario con {id_restaurante: embedding}
        """
        
        embeddings_dict = {}
        
        # Crear textos descriptivos
        textos = []
        ids = []
        
        for restaurante in restaurantes:
            texto = self._create_description_text(restaurante)
            textos.append(texto)
            ids.append(restaurante['idRestaurante'])
        
        # Generar todos los embeddings de una vez
        logger.info(f"Generando embeddings para {len(textos)} restaurantes...")
        embeddings = self.model.encode(textos, convert_to_numpy=True, show_progress_bar=True)
        
        # Crear diccionario
        for idx, embedding in zip(ids, embeddings):
            embeddings_dict[idx] = embedding
        
        logger.info("Embeddings generados exitosamente")
        
        return embeddings_dict
    
    def _create_description_text(self, restaurante: Dict) -> str:
        """
        Crea un texto descriptivo del restaurante para generar el embedding
        
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
        
        # Descripcion
        if restaurante.get('descripcion'):
            partes.append(restaurante['descripcion'])
        
        # Caracteristicas especiales
        caracteristicas = restaurante.get('caracteristicas', [])
        if caracteristicas:
            caract_texto = ' '.join([c.get('nombreCaracteristica', '') for c in caracteristicas])
            partes.append(caract_texto)
        
        # Unir todo con espacios
        texto_completo = ' '.join(partes)
        
        return texto_completo