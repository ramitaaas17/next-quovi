'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Navigation as NavigationIcon } from 'lucide-react';

interface RestaurantCardProps {
  id: number;
  name: string;
  category: string;
  rating: number;
  distance: string;
  estimatedTime: string;
  imageUrl?: string;
  isOpen: boolean;
  onClick: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  name,
  category,
  rating,
  distance,
  estimatedTime,
  imageUrl,
  isOpen,
  onClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer border border-gray-100 hover:shadow-xl transition-all duration-300"
      onClick={onClick}
    >
      {/* Imagen del restaurante */}
      <div className="relative h-40 bg-gradient-to-br from-orange-100 to-red-100 overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl opacity-20">🍽️</div>
          </div>
        )}
        
        {/* Badge de estado */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isOpen 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-500 text-white'
          }`}>
            {isOpen ? 'Abierto' : 'Cerrado'}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-bold text-gray-800">{rating}</span>
        </div>
      </div>

      {/* Información del restaurante */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-1 truncate">{name}</h3>
        <p className="text-sm text-gray-500 mb-3">{category}</p>

        {/* Distancia y tiempo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-gray-600">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">{distance}</span>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-600">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">{estimatedTime}</span>
          </div>
        </div>

        {/* Botón de ruta */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-shadow"
        >
          <NavigationIcon className="w-4 h-4" />
          <span>Ver ruta</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;