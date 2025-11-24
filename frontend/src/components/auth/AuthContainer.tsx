'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Login from './Login';
import Register from './Register';

interface AuthContainerProps {
  onAuthComplete: (user: any) => void;
  onBack: () => void;
  initialMode?: 'login' | 'register'; 
}

export type AuthMode = 'login' | 'register';

/**
 * Contenedor de autenticación - Alterna entre Login y Register
 * Maneja transiciones animadas con AnimatePresence
 */
const AuthContainer: React.FC<AuthContainerProps> = ({ 
  onAuthComplete, 
  onBack,
  initialMode = 'login' // Por defecto muestra login
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Sincronizar modo cuando cambie initialMode desde el padre
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // Usuario autenticado exitosamente
  const handleLogin = async (userData: any) => {
    onAuthComplete(userData);
  };

  // Usuario registrado exitosamente
  const handleRegister = async (userData: any) => {
    onAuthComplete(userData);
  };

  // Cambiar a modo registro
  const switchToRegister = () => {
    setMode('register');
  };

  // Cambiar a modo login
  const switchToLogin = () => {
    setMode('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      {/* Transición animada entre Login y Register */}
      <AnimatePresence mode="wait">
        {mode === 'login' ? (
          <Login
            key="login"
            onSwitchToRegister={switchToRegister}
            onBack={onBack}
            onLogin={handleLogin}
          />
        ) : (
          <Register
            key="register"
            onSwitchToLogin={switchToLogin}
            onBack={onBack}
            onRegister={handleRegister}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthContainer;