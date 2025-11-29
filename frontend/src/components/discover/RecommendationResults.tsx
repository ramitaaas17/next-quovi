// frontend/src/components/discover/RecommendationResults.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, RefreshCw, ExternalLink, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { RestauranteConDistancia } from '@/services/restauranteService';
import FavoriteButton from '../dashboard/FavoriteButton';

interface RecommendationResultsProps {
  recommendations: RestauranteConDistancia[];
  onRestart: () => void;
  onClose: () => void;
}

/**
 * Resultados mejorados con mascota Quovi y animaciones suaves
 */
const RecommendationResults: React.FC<RecommendationResultsProps> = ({
  recommendations,
  onRestart,
  onClose
}) => {
  const handleViewOnMap = (restaurant: RestauranteConDistancia): void => {
    onClose();
    window.dispatchEvent(new CustomEvent('focusRestaurant', {
      detail: { restaurant }
    }));
  };

  const formatPrice = (price: number | undefined | null): string => {
    if (!price) return '$$';
    return `$${price.toFixed(0)}`;
  };

  const formatDistance = (distanceKm: number | undefined): string => {
    if (!distanceKm) return 'N/A';
    return distanceKm < 1 
      ? `${Math.round(distanceKm * 1000)} m`
      : `${distanceKm.toFixed(1)} km`;
  };

  return (
    <div className="space-y-6">
      {/* Header simple sin animaciones excesivas */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center pb-6 border-b-2"
        style={{
          borderImage: 'linear-gradient(90deg, transparent, #fb923c, transparent) 1'
        }}
      >
        {/* Mascota Quovi estática */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 relative">
            <Image
              src="/images/quoviMain.png"
              alt="Quovi"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl sm:text-2xl font-bold text-gray-800 mb-2"
        >
          ¡Encontramos {recommendations.length} lugares perfectos!
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs sm:text-sm text-gray-500"
        >
          Seleccionados especialmente para ti
        </motion.p>
      </motion.div>

      {/* Lista de restaurantes con scroll personalizado */}
      <div className="space-y-3 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
        {recommendations.map((restaurant, index) => (
          <motion.div
            key={restaurant.idRestaurante}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, type: "spring", stiffness: 150 }}
            whileHover={{ scale: 1.01, y: -2 }}
            className="relative bg-white border-2 rounded-2xl overflow-hidden transition-all"
            style={{
              borderColor: index < 3 ? '#fb923c' : '#e5e7eb',
              boxShadow: index < 3 
                ? '0 4px 12px rgba(251, 146, 60, 0.2)' 
                : '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}
          >
            {/* Badge de posición con gradiente */}
            <div 
              className="absolute top-3 left-3 z-10 w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg"
              style={{
                background: index < 3 
                  ? 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)'
                  : 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)'
              }}
            >
              {index + 1}
            </div>

            {/* Medalla para top 3 */}
            {index < 3 && (
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                className="absolute top-3 left-12 z-10"
              >
                <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-lg shadow-lg flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-900" />
                  TOP {index + 1}
                </div>
              </motion.div>
            )}

            {/* Botón de favorito */}
            <div className="absolute top-3 right-3 z-10">
              <FavoriteButton
                restaurantId={restaurant.idRestaurante}
                initialIsFavorite={restaurant.esFavorito || false}
                size="sm"
              />
            </div>

            <div className="flex">
              {/* Imagen con overlay */}
              <div className="relative w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 overflow-hidden">
                {restaurant.imagenes && restaurant.imagenes.length > 0 ? (
                  <>
                    <img
                      src={restaurant.imagenes[0].url}
                      alt={restaurant.nombre}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <MapPin className="w-10 h-10 text-gray-300" />
                  </div>
                )}

                {/* Estado con animación */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="absolute bottom-2 left-2"
                >
                  <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-lg ${
                    restaurant.estaAbierto
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-700 text-white'
                  }`}>
                    {restaurant.estaAbierto ? 'Abierto ahora' : 'Cerrado'}
                  </span>
                </motion.div>
              </div>

              {/* Info del restaurante */}
              <div className="flex-1 p-4 space-y-2">
                <div>
                  <h4 className="font-bold text-gray-800 text-base line-clamp-1">
                    {restaurant.nombre}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {restaurant.categorias?.[0]?.nombreCategoria || 'Restaurante'}
                  </p>
                </div>

                {/* Rating y precio mejorados */}
                <div className="flex items-center space-x-2">
                  <div 
                    className="flex items-center space-x-1 px-2 py-1 rounded-lg shadow-sm"
                    style={{
                      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
                    }}
                  >
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs font-bold text-gray-700">
                      {restaurant.calificacionPromedio?.toFixed(1) || '0.0'}
                    </span>
                  </div>
                  <div 
                    className="text-xs font-bold px-2 py-1 rounded-lg shadow-sm"
                    style={{
                      background: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)',
                      color: '#9a3412'
                    }}
                  >
                    {formatPrice(restaurant.precioPromedio)}
                  </div>
                </div>

                {/* Distancia y tiempo */}
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span className="font-medium">{formatDistance(restaurant.distanciaKm)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span className="font-medium">{restaurant.tiempoEstimado || 'N/A'}</span>
                  </div>
                </div>

                {/* Botón ver en mapa mejorado */}
                <motion.button
                  type="button"
                  onClick={() => handleViewOnMap(restaurant)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 px-3 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-1 shadow-md transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)'
                  }}
                >
                  <MapPin className="w-3 h-3" />
                  <span>Ver en mapa</span>
                  <ExternalLink className="w-3 h-3" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Botón reiniciar con confeti */}
      <motion.button
        type="button"
        onClick={onRestart}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center space-x-2 shadow-lg relative overflow-hidden group"
        style={{
          background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)'
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw className="w-5 h-5" />
        </motion.div>
        <span>Buscar nuevas opciones</span>

        {/* Efecto de brillo al hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </div>
      </motion.button>
    </div>
  );
};

export default RecommendationResults;