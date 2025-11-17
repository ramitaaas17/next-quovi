'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Edit3, Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/landing/Navigation';
import ParticleBackground from '@/components/common/Particles';
import { AvatarUpload, ProfileForm, ProfileHeader } from '@/components/profile';
import { usePerfil } from '@/hooks/usePerfil';

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

  useEffect(() => {
    if (isAuthenticated && !perfil && !cargando) {
      obtenerPerfil();
    }
  }, [isAuthenticated, perfil, cargando]);

  const handleSave = async (data: { nombre: string; apellido: string; email: string }) => {
    try {
      await actualizarPerfil(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUploadAvatar = async (file: File) => {
    try {
      await subirFoto(file);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      await eliminarFoto();
    } catch (error) {
      console.error('Error deleting avatar:', error);
    }
  };

  if (isCheckingAuth || (cargando && !perfil)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 absolute top-0"></div>
          </div>
          <p className="text-gray-600 font-medium">
            {isCheckingAuth ? 'Verificando sesión...' : 'Cargando perfil...'}
          </p>
        </div>
      </div>
    );
  }

  if (error && !perfil) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error al cargar perfil</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <div className="flex gap-3">
              <button
                onClick={() => obtenerPerfil()}
                className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
              >
                Reintentar
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
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
      <ParticleBackground 
        particleCount={30}
        colors={['#fb923c', '#f97316', '#ea580c', '#fdba74', '#fed7aa']}
        className="absolute inset-0"
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/90 via-amber-50/90 to-red-50/90 backdrop-blur-sm"></div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 bg-orange-300/20 rounded-full blur-3xl"
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
          className="absolute bottom-32 left-10 w-40 h-40 bg-pink-300/20 rounded-full blur-3xl"
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

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-24">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/dashboard')}
          className="group flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-8 transition-all duration-300"
        >
          <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="font-semibold">Volver al inicio</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-2xl border rounded-[2.5rem] shadow-2xl overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            borderColor: 'rgba(251, 146, 60, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(251, 146, 60, 0.3), 0 0 0 1px rgba(251, 146, 60, 0.1), inset 0 1px 0 rgba(255,255,255,0.6)'
          }}
        >
          <ProfileHeader 
            nombreCompleto={`${perfil.nombre} ${perfil.apellido}`}
            fechaRegistro={perfil.fechaRegistro}
            emailVerificado={perfil.emailVerificado}
          />

          <div className="flex justify-center -mt-16 pb-6 relative z-10">
            <AvatarUpload 
              currentAvatar={perfil.foto}
              userName={perfil.nombre}
              onUpload={handleUploadAvatar}
              onDelete={perfil.foto ? handleDeleteAvatar : undefined}
              disabled={cargando}
            />
          </div>

          <div className="p-8 md:p-10">
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
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Nombre
                      </label>
                      <div className="px-5 py-4 rounded-2xl border-2 border-orange-200/50 bg-white/60 backdrop-blur-sm font-medium text-gray-800">
                        {perfil.nombre}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Apellido
                      </label>
                      <div className="px-5 py-4 rounded-2xl border-2 border-orange-200/50 bg-white/60 backdrop-blur-sm font-medium text-gray-800">
                        {perfil.apellido || 'No especificado'}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Correo electrónico
                      </label>
                      <div className="px-5 py-4 rounded-2xl border-2 border-orange-200/50 bg-white/60 backdrop-blur-sm font-medium text-gray-800">
                        {perfil.email}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Nombre de usuario
                      </label>
                      <div className="px-5 py-4 rounded-2xl border-2 border-orange-200/50 bg-white/60 backdrop-blur-sm font-medium text-gray-800">
                        @{perfil.nombreUsuario}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Tipo de cuenta
                      </label>
                      <div className="px-5 py-4 rounded-2xl border-2 border-orange-200/50 bg-white/60 backdrop-blur-sm font-medium text-gray-800 capitalize">
                        {perfil.provider === 'local' ? 'Local' : perfil.provider}
                      </div>
                    </div>
                  </div>

                  <motion.div 
                    className="flex justify-center pt-4 mt-8 border-t border-orange-200/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <button
                      onClick={() => setIsEditing(true)}
                      disabled={cargando}
                      className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white py-4 px-8 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group disabled:opacity-50"
                    >
                      <Edit3 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      <span>Editar perfil</span>
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <AnimatePresence>
          {cargando && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <div className="bg-white rounded-2xl p-6 shadow-2xl flex items-center space-x-4">
                <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
                <span className="text-gray-700 font-medium">Procesando...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}