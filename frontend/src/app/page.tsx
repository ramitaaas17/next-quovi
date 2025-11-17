'use client';

import React, { useState, useEffect } from 'react';
import { Hero, Benefits } from '@/components/landing';
import EpicLoader from '@/components/common/EpicLoader';
import { AuthContainer } from '@/components/auth';
import Footer from '@/components/landing/Footer';
import { useRouter } from 'next/navigation';

type PageState = 'loading' | 'landing' | 'auth';

interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  location: string;
  avatar: string | null;
  createdAt: string;
}

export default function Home() {
  const router = useRouter();
  // CLAVE: Verificar si debe saltar el loader
  const [pageState, setPageState] = useState<PageState>(() => {
    if (typeof window !== 'undefined') {
      const skipLoader = localStorage.getItem('skipLoader');
      if (skipLoader === 'true') {
        localStorage.removeItem('skipLoader'); // Limpiar el flag
        return 'landing'; // Ir directo al landing
      }
    }
    return 'loading'; // Estado normal con loader
  });

  const handleLoadingComplete = () => {
    setPageState('landing');
  };

  const handleShowAuth = () => {
    setPageState('auth');
  };

  const handleAuthComplete = (userData: User) => {
    console.log('Usuario autenticado:', userData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userData));
    }
    // Redirigir al dashboard
    router.push('/dashboard');
  };

  const handleBackToLanding = () => {
    setPageState('landing');
  };

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
            onAuthComplete={handleAuthComplete}
            onBack={handleBackToLanding}
          />
        );
        
      case 'landing':
      default:
        return (
          <div className="min-h-screen bg-background text-foreground">
            <Hero onShowAuth={handleShowAuth} />
            <Benefits />
            <Footer />
          </div>
        );
    }
  };

  return renderContent();
}