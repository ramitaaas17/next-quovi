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

interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  location: string;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ onAuthComplete, onBack }) => {
  const [mode, setMode] = useState<AuthMode>('login');

  const handleLogin = async (email: string, password: string) => {
    try {
      // Aquí harías la llamada real a tu API de login
      console.log('Login attempt:', { email, password });
      
      // Simulación de login exitoso
      const mockUser = {
        id: '1',
        email,
        fullName: 'Usuario Demo',
        phone: '+52 123 456 7890',
        location: 'Ciudad de México',
        avatar: null,
        createdAt: new Date().toISOString(),
      };

      onAuthComplete(mockUser);
    } catch (error) {
      console.error('Error en login:', error);
      // Aquí puedes manejar errores específicos
    }
  };

  const handleRegister = async (userData: RegisterData) => {
    try {
      // Aquí harías la llamada real a tu API de registro
      console.log('Register attempt:', userData);
      
      // Simulación de registro exitoso
      const mockUser = {
        id: Date.now().toString(),
        email: userData.email,
        fullName: userData.fullName,
        phone: userData.phone,
        location: userData.location,
        avatar: null,
        createdAt: new Date().toISOString(),
      };

      onAuthComplete(mockUser);
    } catch (error) {
      console.error('Error en registro:', error);
    }
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