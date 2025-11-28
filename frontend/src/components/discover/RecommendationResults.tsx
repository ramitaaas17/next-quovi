'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Clock, RefreshCw, ExternalLink, CheckCircle2, TrendingUp } from 'lucide-react';
import { RestauranteConDistancia } from '@/services/restauranteService';
import FavoriteButton from '../dashboard/FavoriteButton';

interface RecommendationResultsProps {
  recommendations: RestauranteConDistancia[];
  onRestart: () => void;
  onClose: () => void;
}

/**
 * Pantalla de resultados con cards de restaurantes
 * ✅ FIXED: Validaciones para campos opcionales como precioPromedio
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
    window.dispatchEvent(new CustomEvent('focusRestaurant', {
      detail: { restaurant }
    }));
  };

  // ✅ Helper para formatear precio con validación
  const formatPrice = (price: number | undefined | null): string => {
    if (price === undefined || price === null || price === 0) {
      return '$$'; // Precio por defecto
    }
    return `$${price.toFixed(0)}`;
  };

  // ✅ Helper para formatear distancia con validación
  const formatDistance = (distanceKm: number | undefined): string => {
    if (!distanceKm || distanceKm === 0) {
      return 'N/A';
    }
    return distanceKm < 1 
      ? `${Math.round(distanceKm * 1000)} m`
      : `${distanceKm.toFixed(1)} km`;
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
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl mb-4 shadow-lg overflow-hidden relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <CheckCircle2 className="w-8 h-8 text-white" strokeWidth={2.5} />
          
          {/* Partículas de celebración */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-white rounded-full"
              initial={{
                x: '50%',
                y: '50%',
                scale: 0
              }}
              animate={{
                x: `${50 + Math.cos(i * 45 * Math.PI / 180) * 150}%`,
                y: `${50 + Math.sin(i * 45 * Math.PI / 180) * 150}%`,
                scale: [0, 1, 0],
                opacity: [1, 1, 0]
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>

        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          ¡Encontramos {recommendations.length} lugares perfectos!
        </h3>
        <p className="text-gray-600 text-sm sm:text-base flex items-center justify-center space-x-2">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span>Optimizados especialmente para ti usando inteligencia artificial</span>
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
              onMouseEnter={() => setHoveredCard(restaurant.idRestaurante)}
              onMouseLeave={() => setHoveredCard(null)}
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
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: index * 0.05 + 0.2,
                    type: 'spring',
                    stiffness: 200
                  }}
                  className="w-10 h-10 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-lg border-2 border-white"
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
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin className="w-12 h-12 text-orange-300" strokeWidth={1.5} />
                    </div>
                  )}

                  {/* Badge de estado */}
                  <div className="absolute bottom-2 left-2">
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-semibold shadow-md ${
                      restaurant.estaAbierto
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-500 text-white'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        restaurant.estaAbierto ? 'bg-white' : 'bg-gray-300'
                      } ${restaurant.estaAbierto ? 'animate-pulse' : ''}`} />
                      <span>{restaurant.estaAbierto ? 'Abierto' : 'Cerrado'}</span>
                    </div>
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

                  {/* Rating y precio - ✅ CON VALIDACIÓN */}
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" strokeWidth={2} />
                      <span className="text-sm font-semibold text-gray-700">
                        {restaurant.calificacionPromedio?.toFixed(1) || '0.0'}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({restaurant.totalReseñas || 0})
                      </span>
                    </div>

                    <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">
                      {formatPrice(restaurant.precioPromedio)}
                    </span>
                  </div>

                  {/* Distancia y tiempo - ✅ CON VALIDACIÓN */}
                  <div className="flex items-center space-x-4 text-xs text-gray-600 mb-3">
                    <div className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-lg">
                      <MapPin className="w-3 h-3 text-orange-500" strokeWidth={2.5} />
                      <span className="font-medium">
                        {formatDistance(restaurant.distanciaKm)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-lg">
                      <Clock className="w-3 h-3 text-orange-500" strokeWidth={2.5} />
                      <span className="font-medium">{restaurant.tiempoEstimado || 'N/A'}</span>
                    </div>
                  </div>

                  {/* Botón ver en mapa */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleViewOnMap(restaurant)}
                    className="w-full py-2 px-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all group"
                  >
                    <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                    <span>Ver en mapa</span>
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.button>
                </div>
              </div>

              {/* Efecto hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500"
                    style={{ transformOrigin: 'left' }}
                  />
                )}
              </AnimatePresence>
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
          className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white rounded-2xl font-bold text-base flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all group"
        >
          <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" strokeWidth={2.5} />
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