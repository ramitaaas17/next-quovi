'use client';

import React, { useState } from 'react';
import { Hero, Benefits } from '@/components/landing';
import EpicLoader from '@/components/common/EpicLoader';
import { AuthContainer } from '@/components/auth';
import Footer from '@/components/landing/Footer';
import { useRouter } from 'next/navigation';

type PageState = 'loading' | 'landing' | 'auth';
type AuthMode = 'login' | 'register';

interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  location: string;
  avatar: string | null;
  createdAt: string;
}

/**
 * Página principal - Maneja loader inicial, landing y autenticación
 */
export default function Home() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  
  // Verificar si debe saltar el loader 
  const [pageState, setPageState] = useState<PageState>(() => {
    if (typeof window !== 'undefined') {
      const skipLoader = localStorage.getItem('skipLoader');
      if (skipLoader === 'true') {
        localStorage.removeItem('skipLoader');
        return 'landing';
      }
    }
    return 'loading';
  });

  // Completar animación del loader
  const handleLoadingComplete = () => {
    setPageState('landing');
  };

  // Mostrar formulario de LOGIN
  const handleShowLogin = () => {
    setAuthMode('login');
    setPageState('auth');
  };

  // Mostrar formulario de REGISTRO
  const handleShowRegister = () => {
    setAuthMode('register');
    setPageState('auth');
  };

  // Usuario autenticado exitosamente
  const handleAuthComplete = (userData: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userData));
    }
    router.push('/dashboard');
  };

  // Volver al landing desde auth
  const handleBackToLanding = () => {
    setPageState('landing');
  };

  // Renderizar según estado actual
  const renderContent = () => {
    switch (pageState) {
      case 'loading':
        return (
          <EpicLoader 
            onComplete={handleLoadingComplete}
            duration={2800}
          />
        );
        
      case 'auth':
        return (
          <AuthContainer
            initialMode={authMode}
            onAuthComplete={handleAuthComplete}
            onBack={handleBackToLanding}
          />
        );
        
      case 'landing':
      default:
        return (
          <div className="min-h-screen">
            <Hero 
              onShowAuth={handleShowLogin}
              onStartDiscovering={handleShowRegister}
            />
            <Benefits />
            <Footer />
          </div>
        );
    }
  };

  return renderContent();
}