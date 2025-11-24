'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Star, Clock, Phone, Globe, Navigation as NavigationIcon } from 'lucide-react';
import DistanceInfo from './DistanceInfo';
import FavoriteButton from './FavoriteButton';

interface RestaurantDetailsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: {
    id: number;
    name: string;
    category: string;
    rating: number;
    reviews: number;
    distance: number;
    estimatedTime: string;
    address: string;
    phone?: string;
    website?: string;
    imageUrl?: string;
    isOpenNow: boolean;
    openingHours?: string;
    price: string;
    description?: string;
    isFavorite?: boolean;
  } | null;
  onShowRoute: () => void;
}

// Panel lateral con detalles completos del restaurante
const RestaurantDetailsPanel: React.FC<RestaurantDetailsPanelProps> = ({
  isOpen,
  onClose,
  restaurant,
  onShowRoute
}) => {
  if (!restaurant) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel deslizante */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-white shadow-2xl z-50 overflow-y-auto"
          >
            {/* Imagen header */}
            <div className="relative h-48 sm:h-64 bg-gradient-to-br from-orange-100 to-red-100">
              {restaurant.imageUrl ? (
                <img 
                  src={restaurant.imageUrl} 
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-7xl sm:text-8xl opacity-20">🍽️</div>
                </div>
              )}

              {/* Botones superiores */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <FavoriteButton
                  restaurantId={restaurant.id}
                  initialIsFavorite={restaurant.isFavorite || false}
                  size="md"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </motion.button>
              </div>

              {/* Badge de estado */}
              <div className="absolute bottom-4 left-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
                  restaurant.isOpenNow 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-500 text-white'
                }`}>
                  {restaurant.isOpenNow ? 'Abierto ahora' : 'Cerrado'}
                </span>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Nombre y rating */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{restaurant.name}</h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm sm:text-base">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-800">{restaurant.rating}</span>
                    <span className="text-gray-500">({restaurant.reviews})</span>
                  </div>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600 font-medium">{restaurant.category}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600 font-medium">{restaurant.price}</span>
                </div>
              </div>

              {/* Info de distancia */}
              <DistanceInfo 
                distance={restaurant.distance}
                estimatedTime={restaurant.estimatedTime}
                userLocation="Tu ubicación"
              />

              {/* Boton trazar ruta */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onShowRoute}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-shadow"
              >
                <NavigationIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Trazar ruta</span>
              </motion.button>

              {/* Descripcion */}
              {restaurant.description && (
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Acerca de</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{restaurant.description}</p>
                </div>
              )}

              {/* Informacion de contacto */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-800">Información</h3>
                
                {/* Direccion */}
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-500">Dirección</p>
                    <p className="text-sm sm:text-base text-gray-800 break-words">{restaurant.address}</p>
                  </div>
                </div>

                {/* Horario */}
                {restaurant.openingHours && (
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Clock className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Horario</p>
                      <p className="text-sm sm:text-base text-gray-800">{restaurant.openingHours}</p>
                    </div>
                  </div>
                )}

                {/* Telefono */}
                {restaurant.phone && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Phone className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Teléfono</p>
                      <a 
                        href={`tel:${restaurant.phone}`} 
                        className="text-sm sm:text-base text-gray-800 hover:text-orange-500"
                      >
                        {restaurant.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Sitio web */}
                {restaurant.website && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Globe className="w-5 h-5 text-orange-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-500">Sitio web</p>
                      <a 
                        href={restaurant.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base text-gray-800 hover:text-orange-500 truncate block"
                      >
                        Visitar sitio web
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RestaurantDetailsPanel;