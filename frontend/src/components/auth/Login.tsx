// frontend/src/components/auth/Login.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, LogIn, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import ParticleBackground from '../common/Particles';
import ConfettiButton from '../common/Button';
import { authService } from '@/services/authService';
import { useGoogleLogin } from '@react-oauth/google';

interface LoginProps {
  onSwitchToRegister: () => void;
  onBack: () => void;
  onLogin: (userData: any) => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToRegister, onBack, onLogin }) => {
  // Estados del formulario
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [apiError, setApiError] = useState<string>('');

  const quoviColors = ['#ff6b35', '#f7931e', '#feca57'];

  // Manejo de login con Google
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsGoogleLoading(true);
      setApiError('');

      try {
        // Obtener info del usuario de Google
        const userInfoResponse = await fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        if (!userInfoResponse.ok) {
          throw new Error('No se pudo obtener información del usuario');
        }

        const googleUserInfo = await userInfoResponse.json();

        // Enviar datos al backend
        const response = await authService.loginWithGoogle({
          googleId: googleUserInfo.sub,
          email: googleUserInfo.email,
          nombre: googleUserInfo.given_name || googleUserInfo.name,
          apellido: googleUserInfo.family_name,
          foto: googleUserInfo.picture,
        });

        onLogin(response.usuario);

      } catch (error: any) {
        setApiError(error.message || 'Error al iniciar sesión con Google');
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: () => {
      setApiError('Error al conectar con Google. Por favor, intenta de nuevo.');
      setIsGoogleLoading(false);
    },
  });

  // Validacion del formulario
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Envio del formulario
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setApiError('');
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const response = await authService.login(formData.email, formData.password);
      onLogin(response.usuario);
      
    } catch (error: any) {
      setApiError(error.message || 'Error al iniciar sesión. Por favor, verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  // Manejo de cambios en inputs
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (apiError) {
      setApiError('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8">
      <ParticleBackground 
        particleCount={40}
        colors={quoviColors}
        className="opacity-30"
      />
      
      {/* Fondo decorativo */}
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
        {/* Boton volver */}
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

        {/* Card principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer" />
          
          {/* Header */}
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
              ¡Bienvenido de vuelta!
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-slate-600 text-sm md:text-base"
            >
              Inicia sesión para continuar descubriendo sabores únicos
            </motion.p>
          </div>

          {/* Mensaje de error */}
          <AnimatePresence>
            {apiError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-xs md:text-sm">{apiError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Formulario */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5 md:space-y-6">
            {/* Campo email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
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
                  placeholder="tu@email.com"
                  disabled={isLoading || isGoogleLoading}
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
            </motion.div>

            {/* Campo contraseña */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
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
                  disabled={isLoading || isGoogleLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-orange-400 hover:text-orange-600 transition-colors"
                  disabled={isLoading || isGoogleLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4 md:h-5 md:w-5" /> : <Eye className="h-4 w-4 md:h-5 md:w-5" />}
                </button>
              </div>
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
            </motion.div>

            {/* Olvidaste contraseña */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="flex justify-end"
            >
              <button
                type="button"
                className="text-xs md:text-sm text-orange-600 hover:text-orange-700 transition-colors hover:underline"
                disabled={isLoading || isGoogleLoading}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </motion.div>

            {/* Boton de login */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <ConfettiButton
                onClick={handleSubmit}
                loading={isLoading}
                icon={LogIn}
                variant="primary"
                size="default"
                disabled={isLoading || isGoogleLoading}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </ConfettiButton>
            </motion.div>
          </form>

          {/* Divisor */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="my-5 md:my-6 flex items-center"
          >
            <div className="flex-1 border-t border-slate-200" />
            <div className="mx-4 text-xs md:text-sm text-slate-500">o</div>
            <div className="flex-1 border-t border-slate-200" />
          </motion.div>

          {/* Boton Google */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25 }}
          >
            <button
              type="button"
              onClick={googleLogin}
              disabled={isLoading || isGoogleLoading}
              className="w-full flex items-center justify-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 bg-white border-2 border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-sm hover:shadow-md group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGoogleLoading ? (
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-slate-300 border-t-orange-500 rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              <span className="font-semibold text-slate-700 group-hover:text-slate-900 transition-colors text-xs md:text-sm">
                {isGoogleLoading ? 'Conectando...' : 'Continuar con Google'}
              </span>
            </button>
          </motion.div>

          {/* Link a registro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="text-center mt-5 md:mt-6"
          >
            <p className="text-slate-600 text-xs md:text-sm">
              ¿No tienes una cuenta?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                disabled={isLoading || isGoogleLoading}
                className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors disabled:opacity-50"
              >
                Regístrate aquí
              </button>
            </p>
          </motion.div>
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

export default Login;