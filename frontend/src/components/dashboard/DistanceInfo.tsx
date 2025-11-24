'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Navigation as NavigationIcon, Clock, TrendingUp } from 'lucide-react';

interface DistanceInfoProps {
  distance: number;
  estimatedTime: string;
  userLocation: string;
}

// Componente que muestra la distancia y tiempo estimado al restaurante
const DistanceInfo: React.FC<DistanceInfoProps> = ({
  distance,
  estimatedTime,
  userLocation
}) => {
  // Convierte km a metros si es menor a 1km
  const formatDistance = (km: number): string => {
    if (km < 1) {
      return `${Math.round(km * 1000)} m`;
    }
    return `${km.toFixed(1)} km`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 sm:p-5 border border-orange-100"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
            <NavigationIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>
          <span className="font-semibold text-gray-800 text-sm sm:text-base">Desde {userLocation}</span>
        </div>
      </div>

      {/* Tarjetas de info */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Distancia */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-orange-100/50"
        >
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
            <span className="text-xs font-medium text-gray-500 uppercase">Distancia</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-800">{formatDistance(distance)}</p>
        </motion.div>

        {/* Tiempo estimado */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-orange-100/50"
        >
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
            <span className="text-xs font-medium text-gray-500 uppercase">Tiempo</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-800">{estimatedTime}</p>
        </motion.div>
      </div>

      {/* Nota de trafico */}
      <div className="mt-4 pt-4 border-t border-orange-200/50">
        <p className="text-xs text-gray-500 text-center">
          Tiempo estimado en condiciones normales de tráfico
        </p>
      </div>
    </motion.div>
  );
};

export default DistanceInfo;