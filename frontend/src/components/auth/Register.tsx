'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, UserPlus, User, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import ParticleBackground from '../common/Particles';
import { authService } from '@/services/authService';

interface RegisterProps {
  onSwitchToLogin: () => void;
  onBack: () => void;
  onRegister: (userData: any) => void;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin, onBack, onRegister }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegisterData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [apiError, setApiError] = useState<string>('');

  const quoviColors = ['#ff6b35', '#f7931e', '#feca57'];

  // Valida nombre completo y email
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
      newErrors.email = 'Email invalido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Valida requisitos de seguridad de contraseña
  const validateStep2 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else {
      const tieneMayuscula = /[A-Z]/.test(formData.password);
      const tieneMinuscula = /[a-z]/.test(formData.password);
      const tieneNumero = /[0-9]/.test(formData.password);
      const tieneEspecial = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(formData.password);
      
      if (!tieneMayuscula) {
        newErrors.password = 'Debe contener al menos una letra mayuscula';
      } else if (!tieneMinuscula) {
        newErrors.password = 'Debe contener al menos una letra minuscula';
      } else if (!tieneNumero) {
        newErrors.password = 'Debe contener al menos un numero';
      } else if (!tieneEspecial) {
        newErrors.password = 'Debe contener al menos un caracter especial (!@#$%...)';
      }
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      setApiError(''); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    
    if (!validateStep2()) return;
    
    setIsLoading(true);
    
    try {
      const response = await authService.register(formData);
      onRegister(response.usuario);
    } catch (error: any) {
      setApiError(error.message || 'Error al registrar usuario. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof RegisterData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (apiError) {
      setApiError('');
    }
  };

  const renderStep1 = () => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-5 md:space-y-6"
    >
      <div>
        <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">
          Nombre Completo
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-4 w-4 md:h-5 md:w-5 text-orange-400" />
          </div>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className={`w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/60 backdrop-blur-sm text-sm md:text-base ${
              errors.fullName 
                ? 'border-red-300 focus:ring-red-200' 
                : 'border-orange-200 focus:ring-orange-200 focus:border-orange-300'
            }`}
            placeholder="Juan Perez"
          />
        </div>
        <AnimatePresence>
          {errors.fullName && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-red-500 text-xs md:text-sm mt-1"
            >
              {errors.fullName}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div>
        <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-4 w-4 md:h-5 md:w-5 text-orange-400" />
          </div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/60 backdrop-blur-sm text-sm md:text-base ${
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
              className="text-red-500 text-xs md:text-sm mt-1"
            >
              {errors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={handleNext}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 md:py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 text-sm md:text-base"
      >
        <span>Continuar</span>
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 rotate-180" />
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
      className="space-y-5 md:space-y-6"
    >
      <AnimatePresence>
        {apiError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 md:p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-xs md:text-sm">{apiError}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">
          Contraseña
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-4 w-4 md:h-5 md:w-5 text-orange-400" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`w-full pl-9 md:pl-10 pr-11 md:pr-12 py-2.5 md:py-3 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/60 backdrop-blur-sm text-sm md:text-base ${
              errors.password 
                ? 'border-red-300 focus:ring-red-200' 
                : 'border-orange-200 focus:ring-orange-200 focus:border-orange-300'
            }`}
            placeholder="••••••••"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-orange-400 hover:text-orange-600 transition-colors"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="h-4 w-4 md:h-5 md:w-5" /> : <Eye className="h-4 w-4 md:h-5 md:w-5" />}
          </button>
        </div>
        
        {/* Indicador de requisitos de contraseña */}
        {formData.password && (
          <div className="mt-2 space-y-1">
            <p className={`text-xs ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
              Minimo 8 caracteres
            </p>
            <p className={`text-xs ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
              Una letra mayuscula
            </p>
            <p className={`text-xs ${/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
              Una letra minuscula
            </p>
            <p className={`text-xs ${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
              Un numero
            </p>
            <p className={`text-xs ${/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
              Un caracter especial
            </p>
          </div>
        )}
        
        <AnimatePresence>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-red-500 text-xs md:text-sm mt-1"
            >
              {errors.password}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div>
        <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">
          Confirmar Contraseña
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-4 w-4 md:h-5 md:w-5 text-orange-400" />
          </div>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className={`w-full pl-9 md:pl-10 pr-11 md:pr-12 py-2.5 md:py-3 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white/60 backdrop-blur-sm text-sm md:text-base ${
              errors.confirmPassword 
                ? 'border-red-300 focus:ring-red-200' 
                : 'border-orange-200 focus:ring-orange-200 focus:border-orange-300'
            }`}
            placeholder="••••••••"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-orange-400 hover:text-orange-600 transition-colors"
            disabled={isLoading}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4 md:h-5 md:w-5" /> : <Eye className="h-4 w-4 md:h-5 md:w-5" />}
          </button>
        </div>
        <AnimatePresence>
          {errors.confirmPassword && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-red-500 text-xs md:text-sm mt-1"
            >
              {errors.confirmPassword}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="flex space-x-3 md:space-x-4">
        <button
          type="button"
          onClick={() => {
            setStep(1);
            setApiError('');
          }}
          disabled={isLoading}
          className="flex-1 bg-gray-200 text-gray-700 py-2.5 md:py-3 rounded-2xl font-semibold hover:bg-gray-300 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 text-sm md:text-base"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          <span>Atras</span>
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 md:py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm md:text-base"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Registrando...</span>
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4 md:w-5 md:h-5" />
              <span>Crear Cuenta</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8">
      <ParticleBackground 
        particleCount={40}
        colors={quoviColors}
        className="opacity-30"
      />
      
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-orange-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-64 h-64 md:w-96 md:h-96 bg-yellow-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 md:w-64 md:h-64 bg-red-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={onBack}
          className="mb-4 md:mb-6 flex items-center text-orange-600 hover:text-orange-700 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm md:text-base">Volver al inicio</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer" />
          
          <div className="text-center mb-6 md:mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="inline-block mb-4"
            >
              <Image 
                src="/images/quoviLogo.png"
                alt="Quovi" 
                width={60}
                height={60}
                className="object-contain mx-auto md:w-20 md:h-20"
                priority
              />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-2xl md:text-3xl font-bold text-slate-800 mb-2"
            >
              Unete a Quovi
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-slate-600 text-sm md:text-base"
            >
              Crea tu cuenta y comienza a descubrir sabores unicos
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center space-x-2 mt-4"
            >
              <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                step === 1 ? 'bg-orange-500 scale-125' : 'bg-orange-200'
              }`} />
              <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                step === 2 ? 'bg-orange-500 scale-125' : 'bg-orange-200'
              }`} />
            </motion.div>
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 ? renderStep1() : renderStep2()}
            </AnimatePresence>
          </form>

          <AnimatePresence>
            {step === 1 && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="my-5 md:my-6 flex items-center"
                >
                  <div className="flex-1 border-t border-slate-200" />
                  <div className="mx-4 text-xs md:text-sm text-slate-500">o</div>
                  <div className="flex-1 border-t border-slate-200" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <p className="text-slate-600 text-xs md:text-sm">
                    Ya tienes una cuenta?{' '}
                    <button
                      type="button"
                      onClick={onSwitchToLogin}
                      className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors"
                    >
                      Inicia sesion aqui
                    </button>
                  </p>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

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