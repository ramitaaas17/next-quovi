'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/landing/Navigation';
import ParticleBackground from '@/components/common/Particles';
import EmptyFavoritos from '@/components/favoritos/EmptyFavoritos';
import FavoritosGrid from '@/components/favoritos/FavoritosGrid';
import useFavoritos from '@/hooks/useFavoritos';
import useGeolocation from '@/hooks/useGeolocation';
import authService from '@/services/authService';

/**
 * Página de favoritos - Muestra restaurantes guardados por el usuario
 */
export default function FavoritosPage() {
  const router = useRouter();
  const { ubicacion } = useGeolocation(false);
  
  const {
    favoritos,
    cargando,
    error,
    eliminarFavorito,
  } = useFavoritos(
    ubicacion?.latitud,
    ubicacion?.longitud
  );

  // Verificar autenticación al cargar
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push('/');
    }
  }, [router]);

  // Eliminar favorito con manejo de errores
  const handleEliminarFavorito = async (id: number) => {
    try {
      await eliminarFavorito(id);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fondo con partículas */}
      <ParticleBackground 
        particleCount={40}
        colors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']}
        className="absolute inset-0"
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/80 via-orange-50/80 to-pink-50/80 backdrop-blur-sm"></div>

      {/* Navegación */}
      <div className="relative z-50">
        <Navigation />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header con botón volver y título */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8"
          >
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors mb-3 sm:mb-4 group"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium text-sm sm:text-base">Volver al mapa</span>
            </button>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">Mis Favoritos</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  Tus restaurantes guardados
                </p>
              </div>
            </div>
          </motion.div>

          {/* Estado de carga */}
          {cargando && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 sm:py-20"
            >
              <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500 animate-spin mb-4" />
              <p className="text-sm sm:text-base text-gray-600 font-medium">Cargando tus favoritos...</p>
            </motion.div>
          )}

          {/* Estado de error */}
          {error && !cargando && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 sm:p-6 flex items-start space-x-3 sm:space-x-4"
            >
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 mb-1 text-sm sm:text-base">Error al cargar favoritos</h3>
                <p className="text-red-600 text-xs sm:text-sm">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Contenido: Grid o estado vacío */}
          {!cargando && !error && (
            <>
              {favoritos.length === 0 ? (
                <EmptyFavoritos />
              ) : (
                <FavoritosGrid
                  favoritos={favoritos}
                  onEliminarFavorito={handleEliminarFavorito}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}