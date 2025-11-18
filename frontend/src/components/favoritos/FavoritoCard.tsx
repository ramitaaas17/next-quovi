// frontend/src/components/favoritos/FavoritoCard.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Heart, Eye, Navigation as NavigationIcon, Trash2 } from 'lucide-react';
import { RestauranteConDistancia } from '@/services/restauranteService';
import restauranteService from '@/services/restauranteService';

interface FavoritoCardProps {
  restaurante: RestauranteConDistancia;
  onVerMenu: (id: number, nombre: string) => void;
  onEliminar: (id: number) => Promise<void>;
  index: number;
}

const FavoritoCard: React.FC<FavoritoCardProps> = ({
  restaurante,
  onVerMenu,
  onEliminar,
  index,
}) => {
  const [eliminando, setEliminando] = useState(false);

  const handleEliminar = async () => {
    if (!window.confirm(`¿Eliminar ${restaurante.nombre} de favoritos?`)) {
      return;
    }

    try {
      setEliminando(true);
      await onEliminar(restaurante.idRestaurante);
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar de favoritos');
    } finally {
      setEliminando(false);
    }
  };

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
      <div className="relative h-48 bg-gradient-to-br from-orange-100 to-red-100 overflow-hidden">
        {restaurante.imagenes && restaurante.imagenes.length > 0 ? (
          <img 
            src={restaurante.imagenes[0].url} 
            alt={restaurante.nombre}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl opacity-20">
              {restauranteService.obtenerEmojiCategoria(
                restaurante.categorias?.[0]?.nombreCategoria || 'Internacional'
              )}
            </div>
          </div>
        )}

        {/* Badge de estado */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${
            restaurante.estaAbierto 
              ? 'bg-green-500/90 text-white' 
              : 'bg-gray-500/90 text-white'
          }`}>
            {restaurante.estaAbierto ? 'Abierto' : 'Cerrado'}
          </span>
        </div>

        {/* Botón de eliminar */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleEliminar}
          disabled={eliminando}
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          {eliminando ? (
            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          )}
        </motion.button>

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-lg">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-bold text-gray-800">
            {restaurante.calificacionPromedio.toFixed(1)}
          </span>
          <span className="text-xs text-gray-500">
            ({restaurante.totalReseñas})
          </span>
        </div>
      </div>

      {/* Información del restaurante */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
          {restaurante.nombre}
        </h3>

        <div className="flex items-center space-x-3 text-sm text-gray-600 mb-3">
          <span className="font-medium">
            {restaurante.categorias?.[0]?.nombreCategoria || 'Restaurante'}
          </span>
          <span className="text-gray-400">•</span>
          <span className="font-medium text-orange-600">
            {obtenerRangoPrecio(restaurante.precioPromedio)}
          </span>
        </div>

        {/* Dirección */}
        <div className="flex items-start space-x-2 text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
          <span className="line-clamp-1">{restaurante.direccion}</span>
        </div>

        {/* Distancia y horario */}
        <div className="flex items-center justify-between mb-4 text-sm">
          {restaurante.distanciaKm > 0 && (
            <div className="flex items-center space-x-1 text-gray-600">
              <NavigationIcon className="w-4 h-4 text-orange-500" />
              <span className="font-medium">
                {formatearDistancia(restaurante.distanciaKm)}
              </span>
              {restaurante.tiempoEstimado && (
                <>
                  <span className="text-gray-400">•</span>
                  <span>{restaurante.tiempoEstimado}</span>
                </>
              )}
            </div>
          )}
          
          {restaurante.horarioHoy && (
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-xs">{restaurante.horarioHoy}</span>
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onVerMenu(restaurante.idRestaurante, restaurante.nombre)}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-shadow"
          >
            <Eye className="w-4 h-4" />
            <span>Ver menú</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white border-2 border-orange-500 text-orange-500 py-2.5 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-orange-50 transition-colors"
          >
            <NavigationIcon className="w-4 h-4" />
            <span>Ruta</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FavoritoCard;