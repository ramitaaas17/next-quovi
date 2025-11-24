'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Edit3, Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/landing/Navigation';
import ParticleBackground from '@/components/common/Particles';
import AvatarUpload from '@/components/profile/AvatarUpload';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileHeader from '@/components/profile/ProfileHeader';
import { usePerfil } from '@/hooks/usePerfil';

/**
 * Página de perfil - Gestión de datos y foto del usuario
 */
export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  const { 
    perfil, 
    cargando, 
    error, 
    obtenerPerfil, 
    actualizarPerfil, 
    subirFoto, 
    eliminarFoto 
  } = usePerfil();

  // Verificar autenticación al montar
  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/');
          return;
        }
        setIsAuthenticated(true);
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router]);

  // Obtener perfil cuando esté autenticado
  useEffect(() => {
    if (isAuthenticated && !perfil && !cargando) {
      obtenerPerfil();
    }
  }, [isAuthenticated, perfil, cargando]);

  // Guardar cambios del perfil
  const handleSave = async (data: { nombre: string; apellido: string; email: string }) => {
    try {
      await actualizarPerfil(data);
      setIsEditing(false);
    } catch (error) {
      // Error manejado en el hook
    }
  };

  // Cancelar edición
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Subir foto de perfil
  const handleUploadAvatar = async (file: File) => {
    try {
      await subirFoto(file);
    } catch (error) {
      // Error manejado en el hook
    }
  };

  // Eliminar foto de perfil
  const handleDeleteAvatar = async () => {
    try {
      await eliminarFoto();
    } catch (error) {
      // Error manejado en el hook
    }
  };

  // Pantalla de carga inicial
  if (isCheckingAuth || (cargando && !perfil)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-orange-200"></div>
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-orange-500 absolute top-0"></div>
          </div>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            {isCheckingAuth ? 'Verificando sesión...' : 'Cargando perfil...'}
          </p>
        </div>
      </div>
    );
  }

  // Pantalla de error
  if (error && !perfil) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50 p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Error al cargar perfil</h2>
            <p className="text-sm sm:text-base text-red-600 mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => obtenerPerfil()}
                className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors text-sm sm:text-base"
              >
                Reintentar
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!perfil || !isAuthenticated) return null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fondo con partículas */}
      <ParticleBackground 
        particleCount={30}
        colors={['#fb923c', '#f97316', '#ea580c', '#fdba74', '#fed7aa']}
        className="absolute inset-0"
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/90 via-amber-50/90 to-red-50/90 backdrop-blur-sm"></div>

      {/* Blobs animados decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-24 h-24 sm:w-32 sm:h-32 bg-orange-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 left-10 w-32 h-32 sm:w-40 sm:h-40 bg-pink-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <Navigation />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-24">
        
        {/* Botón volver */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/dashboard')}
          className="group flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-6 sm:mb-8 transition-all duration-300"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <span className="font-semibold text-sm sm:text-base">Volver al inicio</span>
        </motion.button>

        {/* Card del perfil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-2xl border rounded-3xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            borderColor: 'rgba(251, 146, 60, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(251, 146, 60, 0.3), 0 0 0 1px rgba(251, 146, 60, 0.1), inset 0 1px 0 rgba(255,255,255,0.6)'
          }}
        >
          {/* Header con gradient */}
          <ProfileHeader 
            nombreCompleto={`${perfil.nombre} ${perfil.apellido}`}
            fechaRegistro={perfil.fechaRegistro}
            emailVerificado={perfil.emailVerificado}
          />

          {/* Avatar superpuesto */}
          <div className="flex justify-center -mt-12 sm:-mt-16 pb-4 sm:pb-6 relative z-10">
            <AvatarUpload 
              currentAvatar={perfil.foto}
              userName={perfil.nombre}
              onUpload={handleUploadAvatar}
              onDelete={perfil.foto ? handleDeleteAvatar : undefined}
              disabled={cargando}
            />
          </div>

          {/* Formulario o vista de datos */}
          <div className="p-6 sm:p-8 md:p-10">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="editing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProfileForm 
                    nombre={perfil.nombre}
                    apellido={perfil.apellido}
                    email={perfil.email}
                    provider={perfil.provider}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    disabled={cargando}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="viewing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Grid de información */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3">
                        Nombre
                      </label>
                      <div className="px-4 py-3 sm:px-5 sm:py-4 rounded-2xl border-2 border-orange-200/50 bg-white/60 backdrop-blur-sm font-medium text-gray-800 text-sm sm:text-base">
                        {perfil.nombre}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3">
                        Apellido
                      </label>
                      <div className="px-4 py-3 sm:px-5 sm:py-4 rounded-2xl border-2 border-orange-200/50 bg-white/60 backdrop-blur-sm font-medium text-gray-800 text-sm sm:text-base">
                        {perfil.apellido || 'No especificado'}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3">
                        Correo electrónico
                      </label>
                      <div className="px-4 py-3 sm:px-5 sm:py-4 rounded-2xl border-2 border-orange-200/50 bg-white/60 backdrop-blur-sm font-medium text-gray-800 text-sm sm:text-base break-all">
                        {perfil.email}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3">
                        Nombre de usuario
                      </label>
                      <div className="px-4 py-3 sm:px-5 sm:py-4 rounded-2xl border-2 border-orange-200/50 bg-white/60 backdrop-blur-sm font-medium text-gray-800 text-sm sm:text-base">
                        @{perfil.nombreUsuario}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3">
                        Tipo de cuenta
                      </label>
                      <div className="px-4 py-3 sm:px-5 sm:py-4 rounded-2xl border-2 border-orange-200/50 bg-white/60 backdrop-blur-sm font-medium text-gray-800 capitalize text-sm sm:text-base">
                        {perfil.provider === 'local' ? 'Local' : perfil.provider}
                      </div>
                    </div>
                  </div>

                  {/* Botón editar */}
                  <motion.div 
                    className="flex justify-center pt-4 mt-6 sm:mt-8 border-t border-orange-200/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <button
                      onClick={() => setIsEditing(true)}
                      disabled={cargando}
                      className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white py-3 px-6 sm:py-4 sm:px-8 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group disabled:opacity-50 text-sm sm:text-base"
                    >
                      <Edit3 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
                      <span>Editar perfil</span>
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Overlay de carga */}
        <AnimatePresence>
          {cargando && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-2xl flex items-center space-x-3 sm:space-x-4">
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 animate-spin" />
                <span className="text-sm sm:text-base text-gray-700 font-medium">Procesando...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}