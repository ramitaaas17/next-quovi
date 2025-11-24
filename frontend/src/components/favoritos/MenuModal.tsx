'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Star, DollarSign } from 'lucide-react';
import { Platillo } from '@/services/restauranteService';
import favoritosService from '@/services/favoritosService';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  restauranteId: number;
  restauranteNombre: string;
}

// Modal que muestra el menu completo de un restaurante
const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  restauranteId,
  restauranteNombre,
}) => {
  const [platillos, setPlatillos] = useState<Platillo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar platillos al abrir el modal
  useEffect(() => {
    if (isOpen && restauranteId) {
      cargarPlatillos();
    }
  }, [isOpen, restauranteId]);

  const cargarPlatillos = async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await favoritosService.obtenerPlatillos(restauranteId);
      setPlatillos(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar el menú');
    } finally {
      setCargando(false);
    }
  };

  const formatearPrecio = (precio: number): string => {
    return `$${precio.toFixed(2)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-3xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 sm:p-6 text-white relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>

              <h2 className="text-xl sm:text-2xl font-bold mb-1">Menú</h2>
              <p className="text-sm sm:text-base text-white/90">{restauranteNombre}</p>
            </div>

            {/* Contenido */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-100px)] sm:max-h-[calc(90vh-120px)]">
              {/* Estado de carga */}
              {cargando ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500 animate-spin mb-4" />
                  <p className="text-sm sm:text-base text-gray-600">Cargando menú...</p>
                </div>
              ) : error ? (
                // Estado de error
                <div className="text-center py-12">
                  <p className="text-sm sm:text-base text-red-500 mb-4">{error}</p>
                  <button
                    onClick={cargarPlatillos}
                    className="text-sm sm:text-base text-orange-500 hover:text-orange-600 font-medium"
                  >
                    Intentar de nuevo
                  </button>
                </div>
              ) : platillos.length === 0 ? (
                // Menu vacio
                <div className="text-center py-12">
                  <p className="text-sm sm:text-base text-gray-500">No hay platillos disponibles</p>
                </div>
              ) : (
                // Grid de platillos
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {platillos.map((platillo, index) => (
                    <motion.div
                      key={platillo.idPlatillo}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {/* Imagen del platillo */}
                      <div className="relative h-32 sm:h-40 bg-gradient-to-br from-orange-100 to-red-100">
                        {platillo.imagen ? (
                          <img 
                            src={platillo.imagen} 
                            alt={platillo.nombre}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <DollarSign className="w-10 h-10 sm:w-12 sm:h-12 text-orange-300" />
                          </div>
                        )}
                        
                        {/* Badge de destacado */}
                        {platillo.destacado && (
                          <div className="absolute top-2 right-2">
                            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              Destacado
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Info del platillo */}
                      <div className="p-3 sm:p-4">
                        <h3 className="font-bold text-sm sm:text-base text-gray-800 mb-1 line-clamp-1">
                          {platillo.nombre}
                        </h3>
                        
                        {platillo.descripcion && (
                          <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                            {platillo.descripcion}
                          </p>
                        )}

                        {platillo.ingredientes && (
                          <p className="text-xs text-gray-500 mb-2 sm:mb-3 line-clamp-1">
                            {platillo.ingredientes}
                          </p>
                        )}

                        {/* Precio y disponibilidad */}
                        <div className="flex items-center justify-between">
                          <span className="text-lg sm:text-xl font-bold text-orange-600">
                            {formatearPrecio(platillo.precio)}
                          </span>
                          
                          {!platillo.disponible && (
                            <span className="text-xs text-red-500 font-medium">
                              No disponible
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuModal;