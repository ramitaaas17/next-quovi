// frontend/src/components/auth/AuthContainer.tsx
'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Login from './Login';
import Register from './Register';

interface AuthContainerProps {
  onAuthComplete: (user: any) => void;
  onBack: () => void;
}

export type AuthMode = 'login' | 'register';

const AuthContainer: React.FC<AuthContainerProps> = ({ onAuthComplete, onBack }) => {
  const [mode, setMode] = useState<AuthMode>('login');

  const handleLogin = async (userData: any) => {
    // Los datos ya vienen del authService, solo pasarlos al padre
    console.log(' Usuario autenticado:', userData);
    onAuthComplete(userData);
  };

  const handleRegister = async (userData: any) => {
    // Los datos ya vienen del authService, solo pasarlos al padre
    console.log(' Usuario registrado:', userData);
    onAuthComplete(userData);
  };

  const switchToRegister = () => {
    setMode('register');
  };

  const switchToLogin = () => {
    setMode('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
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