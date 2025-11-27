'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, RefreshCw, ExternalLink, Heart } from 'lucide-react';
import { RestauranteConDistancia } from '@/services/restauranteService';
import FavoriteButton from '../dashboard/FavoriteButton';

interface RecommendationResultsProps {
  recommendations: RestauranteConDistancia[];
  onRestart: () => void;
  onClose: () => void;
}

/**
 * Pantalla de resultados con cards de restaurantes
 * Animaciones suaves de entrada y hover
 */
const RecommendationResults: React.FC<RecommendationResultsProps> = ({
  recommendations,
  onRestart,
  onClose
}) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Redireccionar al mapa con el restaurante seleccionado
  const handleViewOnMap = (restaurant: RestauranteConDistancia) => {
    onClose();
    // Emitir evento para que el dashboard centre el mapa
    window.dispatchEvent(new CustomEvent('focusRestaurant', {
      detail: { restaurant }
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header de resultados */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center pb-4 border-b border-gray-200"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl mb-4 shadow-lg">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            ✨
          </motion.div>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          ¡Encontramos {recommendations.length} lugares perfectos!
        </h3>
        <p className="text-gray-600 text-sm sm:text-base">
          Optimizados especialmente para ti usando inteligencia artificial
        </p>
      </motion.div>

      {/* Grid de restaurantes */}
      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
        {recommendations.map((restaurant, index) => {
          const isHovered = hoveredCard === restaurant.idRestaurante;

          return (
            <motion.div
              key={restaurant.idRestaurante}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onHoverStart={() => setHoveredCard(restaurant.idRestaurante)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative bg-white rounded-2xl border-2 border-gray-100 overflow-hidden group transition-all duration-300"
              style={{
                boxShadow: isHovered 
                  ? '0 15px 40px rgba(236, 72, 153, 0.15)'
                  : '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}
            >
              {/* Badge de posición */}
              <div className="absolute top-3 left-3 z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                  className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
                >
                  {index + 1}
                </motion.div>
              </div>

              {/* Botón de favorito */}
              <div className="absolute top-3 right-3 z-10">
                <FavoriteButton
                  restaurantId={restaurant.idRestaurante}
                  initialIsFavorite={restaurant.esFavorito || false}
                  size="sm"
                />
              </div>

              <div className="flex flex-col sm:flex-row">
                {/* Imagen */}
                <div className="relative w-full sm:w-32 h-32 bg-gradient-to-br from-orange-100 to-pink-100 flex-shrink-0">
                  {restaurant.imagenes && restaurant.imagenes.length > 0 ? (
                    <img
                      src={restaurant.imagenes[0].url}
                      alt={restaurant.nombre}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl opacity-30">
                      🍽️
                    </div>
                  )}

                  {/* Badge de estado */}
                  <div className="absolute bottom-2 left-2">
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold shadow-md ${
                      restaurant.estaAbierto
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-500 text-white'
                    }`}>
                      {restaurant.estaAbierto ? 'Abierto' : 'Cerrado'}
                    </span>
                  </div>
                </div>

                {/* Info del restaurante */}
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-base sm:text-lg mb-1 line-clamp-1">
                        {restaurant.nombre}
                      </h4>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {restaurant.categorias?.[0]?.nombreCategoria || 'Restaurante'}
                      </p>
                    </div>
                  </div>

                  {/* Rating y precio */}
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-700">
                        {restaurant.calificacionPromedio.toFixed(1)}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({restaurant.totalReseñas})
                      </span>
                    </div>

                    <span className="text-sm font-semibold text-orange-600">
                      {restaurant.precioPromedio 
                        ? `$${restaurant.precioPromedio.toFixed(0)}` 
                        : '$$'}
                    </span>
                  </div>

                  {/* Distancia y tiempo */}
                  <div className="flex items-center space-x-4 text-xs text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-orange-500" />
                      <span>
                        {restaurant.distanciaKm < 1 
                          ? `${Math.round(restaurant.distanciaKm * 1000)} m`
                          : `${restaurant.distanciaKm.toFixed(1)} km`}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-orange-500" />
                      <span>{restaurant.tiempoEstimado}</span>
                    </div>
                  </div>

                  {/* Botón ver en mapa */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleViewOnMap(restaurant)}
                    className="w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Ver en mapa</span>
                    <ExternalLink className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>

              {/* Efecto hover */}
              {isHovered && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500"
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Footer con botón reiniciar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="pt-4 border-t border-gray-200"
      >
        <button
          onClick={onRestart}
          className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl font-bold text-base flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all group"
        >
          <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          <span>Buscar nuevas opciones</span>
        </button>
      </motion.div>

      {/* CSS para scrollbar personalizado */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #f59e0b 0%, #ec4899 100%);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #ea580c 0%, #db2777 100%);
        }
      `}</style>
    </motion.div>
  );
};

export default RecommendationResults;