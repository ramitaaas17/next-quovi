'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Navigation as NavigationIcon, MapPin } from 'lucide-react';

interface RouteDisplayProps {
  isVisible: boolean;
  onClose: () => void;
  startLocation: [number, number];
  endLocation: [number, number];
  restaurantName: string;
  routeData?: {
    distance: number;
    duration: string;
    steps: Array<{
      instruction: string;
      distance: string;
    }>;
  };
}

declare global {
  interface Window {
    L: any;
  }
}

const RouteDisplay: React.FC<RouteDisplayProps> = ({
  isVisible,
  onClose,
  startLocation,
  endLocation,
  restaurantName,
  routeData
}) => {
  const routeMapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!isVisible || !routeMapRef.current || !window.L) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const map = window.L.map(routeMapRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView(startLocation, 14);

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Marcador de inicio (ubicación del usuario)
    const startIcon = window.L.divIcon({
      className: 'route-start-marker',
      html: `
        <div class="relative">
          <div class="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
          <div class="absolute inset-0 w-6 h-6 bg-blue-400 rounded-full opacity-30 animate-ping"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    window.L.marker(startLocation, { icon: startIcon })
      .addTo(map)
      .bindPopup('<div class="text-center font-semibold">Tu ubicación</div>');

    // Marcador de destino (restaurante)
    const endIcon = window.L.divIcon({
      className: 'route-end-marker',
      html: `
        <div class="relative">
          <div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg border-3 border-white">
            <span class="text-white text-lg">🍽️</span>
          </div>
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 48]
    });

    window.L.marker(endLocation, { icon: endIcon })
      .addTo(map)
      .bindPopup(`<div class="text-center font-semibold">${restaurantName}</div>`);

    // Dibujar la ruta con animación
    const routeLine = window.L.polyline([startLocation, endLocation], {
      color: '#f97316',
      weight: 4,
      opacity: 0.8,
      dashArray: '10, 10',
      lineCap: 'round'
    }).addTo(map);

    // Animación de la línea
    let offset = 0;
    const animateDash = () => {
      offset += 1;
      if (routeLine._path) {
        routeLine._path.style.strokeDashoffset = offset;
      }
      requestAnimationFrame(animateDash);
    };
    animateDash();

    // Ajustar el mapa para mostrar toda la ruta
    const bounds = window.L.latLngBounds([startLocation, endLocation]);
    map.fitBounds(bounds, { padding: [50, 50] });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isVisible, startLocation, endLocation, restaurantName]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="flex items-center space-x-3 mb-2">
                <NavigationIcon className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Ruta al restaurante</h2>
              </div>
              <p className="text-white/90">{restaurantName}</p>
            </div>

            {/* Contenido */}
            <div className="grid sm:grid-cols-2 h-[calc(90vh-120px)] sm:h-[500px]">
              {/* Mapa */}
              <div className="relative h-64 sm:h-full bg-gray-100">
                <div ref={routeMapRef} className="w-full h-full" />
                
                {/* Indicadores de inicio y fin */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg flex items-center space-x-2 text-sm">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span className="font-medium text-gray-700">Inicio</span>
                  </div>
                  
                  <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="font-medium text-gray-700">Destino</span>
                  </div>
                </div>
              </div>

              {/* Información de la ruta */}
              <div className="p-6 overflow-y-auto bg-gray-50">
                <h3 className="font-bold text-lg text-gray-800 mb-4">Detalles de la ruta</h3>

                {routeData ? (
                  <div className="space-y-4">
                    {/* Resumen */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Distancia total</p>
                          <p className="text-xl font-bold text-gray-800">
                            {routeData.distance < 1 
                              ? `${Math.round(routeData.distance * 1000)} m`
                              : `${routeData.distance.toFixed(1)} km`
                            }
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Tiempo estimado</p>
                          <p className="text-xl font-bold text-gray-800">{routeData.duration}</p>
                        </div>
                      </div>
                    </div>

                    {/* Pasos */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-700 text-sm">Instrucciones</h4>
                      {routeData.steps.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-start space-x-3"
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800 text-sm leading-relaxed">{step.instruction}</p>
                            <p className="text-xs text-gray-500 mt-1">{step.distance}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Placeholder mientras se carga la ruta real desde el backend */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                      <div className="flex items-center justify-center py-8">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <NavigationIcon className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-gray-600 font-medium">Calculando mejor ruta...</p>
                          <p className="text-sm text-gray-500 mt-2">
                            Esto puede tomar unos segundos
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Botón de acción */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
                >
                  Iniciar navegación
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RouteDisplay;