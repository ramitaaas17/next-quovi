'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, RefreshCw, ExternalLink } from 'lucide-react';
import { RestauranteConDistancia } from '@/services/restauranteService';
import FavoriteButton from '../dashboard/FavoriteButton';

interface RecommendationResultsProps {
  recommendations: RestauranteConDistancia[];
  onRestart: () => void;
  onClose: () => void;
}

/**
 * Resultados del asistente de recomendaciones
 * Muestra los restaurantes más relevantes según las preferencias del usuario
 */
const RecommendationResults: React.FC<RecommendationResultsProps> = ({
  recommendations,
  onRestart,
  onClose
}) => {
  // Navegar al restaurante en el mapa
  const handleViewOnMap = (restaurant: RestauranteConDistancia): void => {
    onClose();
    window.dispatchEvent(new CustomEvent('focusRestaurant', {
      detail: { restaurant }
    }));
  };

  // Formatear precio
  const formatPrice = (price: number | undefined | null): string => {
    if (!price) return '$$';
    return `$${price.toFixed(0)}`;
  };

  // Formatear distancia
  const formatDistance = (distanceKm: number | undefined): string => {
    if (!distanceKm) return 'N/A';
    return distanceKm < 1 
      ? `${Math.round(distanceKm * 1000)} m`
      : `${distanceKm.toFixed(1)} km`;
  };

  return (
    <div className="space-y-4">
      {/* Header de resultados */}
      <div className="text-center pb-4 border-b border-gray-200">
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Star className="w-6 h-6 text-orange-500 fill-orange-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-1">
          Encontramos {recommendations.length} lugares
        </h3>
        <p className="text-sm text-gray-500">
          Optimizados especialmente para ti
        </p>
      </div>

      {/* Lista de restaurantes */}
      <div className="space-y-3 max-h-[50vh] overflow-y-auto">
        {recommendations.map((restaurant, index) => (
          <motion.div
            key={restaurant.idRestaurante}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Badge de posición */}
            <div className="absolute top-3 left-3 z-10 w-7 h-7 bg-orange-400 rounded-lg flex items-center justify-center text-white text-sm font-bold">
              {index + 1}
            </div>

            {/* Botón de favorito */}
            <div className="absolute top-3 right-3 z-10">
              <FavoriteButton
                restaurantId={restaurant.idRestaurante}
                initialIsFavorite={restaurant.esFavorito || false}
                size="sm"
              />
            </div>

            <div className="flex">
              {/* Imagen */}
              <div className="relative w-28 h-28 bg-gray-100 flex-shrink-0">
                {restaurant.imagenes && restaurant.imagenes.length > 0 ? (
                  <img
                    src={restaurant.imagenes[0].url}
                    alt={restaurant.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-gray-300" />
                  </div>
                )}

                {/* Estado */}
                <div className="absolute bottom-2 left-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                    restaurant.estaAbierto
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}>
                    {restaurant.estaAbierto ? 'Abierto' : 'Cerrado'}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 p-3 space-y-2">
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm line-clamp-1">
                    {restaurant.nombre}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {restaurant.categorias?.[0]?.nombreCategoria || 'Restaurante'}
                  </p>
                </div>

                {/* Rating y precio */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-0.5 rounded">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium text-gray-700">
                      {restaurant.calificacionPromedio?.toFixed(1) || '0.0'}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                    {formatPrice(restaurant.precioPromedio)}
                  </span>
                </div>

                {/* Distancia y tiempo */}
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{formatDistance(restaurant.distanciaKm)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{restaurant.tiempoEstimado || 'N/A'}</span>
                  </div>
                </div>

                {/* Botón ver en mapa */}
                <button
                  type="button"
                  onClick={() => handleViewOnMap(restaurant)}
                  className="w-full py-1.5 px-3 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg text-xs font-medium flex items-center justify-center space-x-1 transition-colors"
                >
                  <MapPin className="w-3 h-3" />
                  <span>Ver en mapa</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Botón reiniciar */}
      <button
        type="button"
        onClick={onRestart}
        className="w-full py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Buscar nuevas opciones</span>
      </button>
    </div>
  );
};

export default RecommendationResults;