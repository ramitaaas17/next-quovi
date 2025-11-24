'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Heart, Eye, Navigation as NavigationIcon } from 'lucide-react';
import { RestauranteConDistancia } from '@/services/restauranteService';
import restauranteService from '@/services/restauranteService';

interface FavoritoCardProps {
  restaurante: RestauranteConDistancia;
  onVerMenu: (id: number, nombre: string) => void;
  onEliminar: (id: number) => Promise<void>;
  index: number;
}

// Tarjeta individual de restaurante favorito
const FavoritoCard: React.FC<FavoritoCardProps> = ({
  restaurante,
  onVerMenu,
  onEliminar,
  index,
}) => {
  const [eliminando, setEliminando] = useState(false);

  // Confirmar y eliminar favorito
  const handleEliminar = async () => {
    if (!window.confirm(`¿Eliminar ${restaurante.nombre} de favoritos?`)) {
      return;
    }

    try {
      setEliminando(true);
      await onEliminar(restaurante.idRestaurante);
    } catch (error) {
      alert('Error al eliminar de favoritos');
    } finally {
      setEliminando(false);
    }
  };

  // Formato de distancia en km o metros
  const formatearDistancia = (km: number): string => {
    if (km === 0) return '';
    if (km < 1) return `${Math.round(km * 1000)} m`;
    return `${km.toFixed(1)} km`;
  };

  const obtenerRangoPrecio = (precio?: number): string => {
    return restauranteService.obtenerRangoPrecio(precio);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      {/* Imagen del restaurante */}
      <div className="relative h-40 sm:h-48 bg-gradient-to-br from-orange-100 to-red-100 overflow-hidden">
        {restaurante.imagenes && restaurante.imagenes.length > 0 ? (
          <img 
            src={restaurante.imagenes[0].url} 
            alt={restaurante.nombre}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-5xl sm:text-6xl opacity-20">
              {restauranteService.obtenerEmojiCategoria(
                restaurante.categorias?.[0]?.nombreCategoria || 'Internacional'
              )}
            </div>
          </div>
        )}

        {/* Badge de estado */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
          <span className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${
            restaurante.estaAbierto 
              ? 'bg-green-500/90 text-white' 
              : 'bg-gray-500/90 text-white'
          }`}>
            {restaurante.estaAbierto ? 'Abierto' : 'Cerrado'}
          </span>
        </div>

        {/* Boton de eliminar */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleEliminar}
          disabled={eliminando}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors disabled:opacity-50"
          aria-label="Eliminar de favoritos"
        >
          {eliminando ? (
            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 fill-red-500" />
          )}
        </motion.button>

        {/* Rating */}
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-white/95 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center space-x-1 shadow-lg">
          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-xs sm:text-sm font-bold text-gray-800">
            {restaurante.calificacionPromedio.toFixed(1)}
          </span>
          <span className="text-xs text-gray-500">
            ({restaurante.totalReseñas})
          </span>
        </div>
      </div>

      {/* Informacion del restaurante */}
      <div className="p-4 sm:p-5">
        <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-2 line-clamp-1">
          {restaurante.nombre}
        </h3>

        <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-600 mb-3">
          <span className="font-medium">
            {restaurante.categorias?.[0]?.nombreCategoria || 'Restaurante'}
          </span>
          <span className="text-gray-400">•</span>
          <span className="font-medium text-orange-600">
            {obtenerRangoPrecio(restaurante.precioPromedio)}
          </span>
        </div>

        {/* Direccion */}
        <div className="flex items-start space-x-2 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0 mt-0.5" />
          <span className="line-clamp-1">{restaurante.direccion}</span>
        </div>

        {/* Distancia y horario */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 text-xs sm:text-sm">
          {restaurante.distanciaKm > 0 && (
            <div className="flex items-center space-x-1 text-gray-600 flex-1 min-w-0">
              <NavigationIcon className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
              <span className="font-medium truncate">
                {formatearDistancia(restaurante.distanciaKm)}
              </span>
              {restaurante.tiempoEstimado && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="truncate">{restaurante.tiempoEstimado}</span>
                </>
              )}
            </div>
          )}
          
          {restaurante.horarioHoy && (
            <div className="flex items-center space-x-1 text-gray-600 flex-shrink-0 ml-2">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
              <span className="text-xs hidden sm:inline">{restaurante.horarioHoy}</span>
            </div>
          )}
        </div>

        {/* Botones de accion */}
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onVerMenu(restaurante.idRestaurante, restaurante.nombre)}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center space-x-1 sm:space-x-2 shadow-md hover:shadow-lg transition-shadow"
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Ver menú</span>
          </motion.button>

        </div>
      </div>
    </motion.div>
  );
};

export default FavoritoCard;