'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MapPin, Camera, Save, ArrowLeft, Edit3, Check, X, Sparkles, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/landing/Navigation';
import ParticleBackground from '@/components/common/Particles';

interface UserData {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  location: string;
  avatar: string | null;
  createdAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setFormData({
          fullName: parsedUser.fullName,
          email: parsedUser.email,
          phone: parsedUser.phone,
          location: parsedUser.location,
        });
      } else {
        router.push('/');
      }
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    setTimeout(() => {
      if (user) {
        const updatedUser = {
          ...user,
          ...formData,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
        setIsSaving(false);
      }
    }, 1000);
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        location: user.location,
      });
    }
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 absolute top-0"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground 
        particleCount={30}
        colors={['#fb923c', '#f97316', '#ea580c', '#fdba74', '#fed7aa']}
        className="absolute inset-0"
      />
      
      {/* Background con gradiente mejorado */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/90 via-amber-50/90 to-red-50/90 backdrop-blur-sm"></div>

      {/* Decoraciones flotantes */}
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

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-24">
        {/* Back Button mejorado */}
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

        {/* Profile Card con diseño renovado */}
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
          {/* Header mejorado con patrón */}
          <div className="relative bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 p-10 overflow-hidden">
            {/* Patrón decorativo */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />
            </div>
            
            {/* Sparkles decorativos */}
            <motion.div
              className="absolute top-8 right-12"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-6 h-6 text-yellow-200" />
            </motion.div>
            
            <motion.div
              className="absolute bottom-12 left-16"
              animate={{
                rotate: [360, 0],
                scale: [1.2, 1, 1.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-5 h-5 text-pink-200" />
            </motion.div>

            <div className="relative text-center">
              {/* Avatar con mejor diseño */}
              <motion.div 
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Anillo externo animado */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(45deg, rgba(255,255,255,0.5), rgba(255,200,100,0.5))',
                    padding: '4px',
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-red-500" />
                </motion.div>
                
                {/* Avatar */}
                <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-red-500 shadow-2xl">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                
                {/* Botón de cámara mejorado */}
                <motion.button 
                  className="absolute bottom-2 right-2 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Camera className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </motion.button>
              </motion.div>
              
              <motion.h1 
                className="text-3xl font-bold text-white mt-6 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {user.fullName}
              </motion.h1>
              
              <motion.div
                className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles className="w-4 h-4 text-yellow-200" />
                <p className="text-white/90 text-sm font-medium">
                  Miembro desde {new Date(user.createdAt).toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Form con mejor diseño */}
          <div className="p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="md:col-span-2"
              >
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-md">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span>Nombre completo</span>
                  </div>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-orange-200/50 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed font-medium text-gray-800 placeholder-gray-400"
                  placeholder="Tu nombre completo"
                />
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-md">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <span>Correo electrónico</span>
                  </div>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-orange-200/50 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed font-medium text-gray-800 placeholder-gray-400"
                  placeholder="tu@email.com"
                />
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-md">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <span>Teléfono</span>
                  </div>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-orange-200/50 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed font-medium text-gray-800 placeholder-gray-400"
                  placeholder="+52 123 456 7890"
                />
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="md:col-span-2"
              >
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center shadow-md">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <span>Ubicación</span>
                  </div>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-orange-200/50 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed font-medium text-gray-800 placeholder-gray-400"
                  placeholder="Ciudad de México, MX"
                />
              </motion.div>
            </div>

            {/* Action Buttons mejorados */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-8 mt-8 border-t border-orange-200/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <AnimatePresence mode="wait">
                {!isEditing ? (
                  <motion.button
                    key="edit"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => setIsEditing(true)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Edit3 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>Editar perfil</span>
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      key="cancel"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onClick={handleCancel}
                      className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-bold transition-all duration-300 bg-white hover:bg-gray-50 hover:border-gray-400 hover:scale-105 group"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                      <span>Cancelar</span>
                    </motion.button>
                    <motion.button
                      key="save"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed group"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSaving ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Guardando...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          <span>Guardar cambios</span>
                        </>
                      )}
                    </motion.button>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}