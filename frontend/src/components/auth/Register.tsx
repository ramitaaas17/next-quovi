'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, UserPlus, User, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import ParticleBackground from '../common/Particles';

interface RegisterProps {
  onSwitchToLogin: () => void;
  onBack: () => void;
  onRegister: (userData: RegisterData) => void;
}

interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  location: string;
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin, onBack, onRegister }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegisterData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const quoviColors = ['#ff6b35', '#f7931e', '#feca57'];

  const validateStep1 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es requerido';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'El nombre debe tener al menos 2 caracteres';
    }
    
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Teléfono inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'La ubicación es requerida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    setIsLoading(true);
    
    // Simular registro
    setTimeout(() => {
      onRegister(formData);
      setIsLoading(false);
    }, 2000);
  };

  const handleInputChange = (field: keyof RegisterData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const renderStep1 = () => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Campo Nombre */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Nombre Completo
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-orange-400" />
          </div>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/60 backdrop-blur-sm ${
              errors.fullName 
                ? 'border-red-300 focus:ring-red-200' 
                : 'border-orange-200 focus:ring-orange-200 focus:border-orange-300'
            }`}
            placeholder="Juan Pérez"
          />
        </div>
        <AnimatePresence>
          {errors.fullName && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.fullName}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Campo Email */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-orange-400" />
          </div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/60 backdrop-blur-sm ${
              errors.email 
                ? 'border-red-300 focus:ring-red-200' 
                : 'border-orange-200 focus:ring-orange-200 focus:border-orange-300'
            }`}
            placeholder="juan@email.com"
          />
        </div>
        <AnimatePresence>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Campo Teléfono */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Teléfono
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-orange-400" />
          </div>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/60 backdrop-blur-sm ${
              errors.phone 
                ? 'border-red-300 focus:ring-red-200' 
                : 'border-orange-200 focus:ring-orange-200 focus:border-orange-300'
            }`}
            placeholder="+52 123 456 7890"
          />
        </div>
        <AnimatePresence>
          {errors.phone && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.phone}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Botón Siguiente */}
      <button
        type="button"
        onClick={handleNext}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2"
      >
        <span>Continuar</span>
        <ArrowLeft className="w-5 h-5 rotate-180" />
      </button>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Campo Contraseña */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Contraseña
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-orange-400" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`w-full pl-10 pr-12 py-3 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/60 backdrop-blur-sm ${
              errors.password 
                ? 'border-red-300 focus:ring-red-200' 
                : 'border-orange-200 focus:ring-orange-200 focus:border-orange-300'
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-orange-400 hover:text-orange-600 transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        <AnimatePresence>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.password}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Campo Confirmar Contraseña */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Confirmar Contraseña
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-orange-400" />
          </div>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className={`w-full pl-10 pr-12 py-3 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/60 backdrop-blur-sm ${
              errors.confirmPassword 
                ? 'border-red-300 focus:ring-red-200' 
                : 'border-orange-200 focus:ring-orange-200 focus:border-orange-300'
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-orange-400 hover:text-orange-600 transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        <AnimatePresence>
          {errors.confirmPassword && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.confirmPassword}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Campo Ubicación */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Ubicación
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-orange-400" />
          </div>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/60 backdrop-blur-sm ${
              errors.location 
                ? 'border-red-300 focus:ring-red-200' 
                : 'border-orange-200 focus:ring-orange-200 focus:border-orange-300'
            }`}
            placeholder="Ciudad de México, México"
          />
        </div>
        <AnimatePresence>
          {errors.location && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.location}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Botones */}
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-300 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Atrás</span>
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Registrando...</span>
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              <span>Crear Cuenta</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Fondo de partículas */}
      <ParticleBackground 
        particleCount={40}
        colors={quoviColors}
        className="opacity-30"
      />
      
      {/* Blobs de fondo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-red-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Botón de regresar */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={onBack}
          className="mb-6 flex items-center text-orange-600 hover:text-orange-700 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </motion.button>

        {/* Contenedor principal del formulario */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 relative overflow-hidden"
        >
          {/* Efecto de brillo sutil */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer" />
          
          {/* Logo y título */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="inline-block mb-4"
            >
              <Image 
                src="/images/quoviLogo.png"
                alt="Quovi" 
                width={80}
                height={80}
                className="object-contain mx-auto"
                priority
              />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-3xl font-bold text-slate-800 mb-2"
            >
              ¡Únete a Quovi!
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-slate-600"
            >
              Crea tu cuenta y comienza a descubrir sabores únicos
            </motion.p>

            {/* Indicador de progreso */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center space-x-2 mt-4"
            >
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                step === 1 ? 'bg-orange-500 scale-125' : 'bg-orange-200'
              }`} />
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                step === 2 ? 'bg-orange-500 scale-125' : 'bg-orange-200'
              }`} />
            </motion.div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 ? renderStep1() : renderStep2()}
            </AnimatePresence>
          </form>

          {/* Divisor - Solo en step 1 */}
          <AnimatePresence>
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="my-6 flex items-center"
              >
                <div className="flex-1 border-t border-slate-200" />
                <div className="mx-4 text-sm text-slate-500">o</div>
                <div className="flex-1 border-t border-slate-200" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Link para login - Solo en step 1 */}
          <AnimatePresence>
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <p className="text-slate-600">
                  ¿Ya tienes una cuenta?{' '}
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors"
                  >
                    Inicia sesión aquí
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Estilos para animación shimmer */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Register;