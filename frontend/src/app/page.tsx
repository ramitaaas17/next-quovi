'use client';

import React, { useState, useEffect } from 'react';
import { Hero, Benefits } from '@/components/landing';
import EpicLoader from '@/components/common/EpicLoader';
import { AuthContainer } from '@/components/auth';
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
    // Opcional: Guardar datos del usuario
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
            
            {/* Footer */}
            <footer className="bg-sidebar text-sidebar-foreground py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Logo and description */}
                  <div className="md:col-span-2">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
                        <span className="text-sidebar-primary-foreground font-bold text-xl">Q</span>
                      </div>
                      <span className="text-2xl font-bold">Quovi</span>
                    </div>
                    <p className="text-sidebar-foreground/80">
                      Tu destino para experiencias únicas que combinan lo mejor de la innovación y la tradición.
                    </p>
                  </div>

                  {/* Quick links */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Enlaces Rápidos</h3>
                    <ul className="space-y-2">
                      <li><a href="#home" className="hover:text-sidebar-primary transition-colors">Inicio</a></li>
                      <li><a href="#about" className="hover:text-sidebar-primary transition-colors">Nosotros</a></li>
                      <li><a href="#services" className="hover:text-sidebar-primary transition-colors">Servicios</a></li>
                      <li><a href="#contact" className="hover:text-sidebar-primary transition-colors">Contacto</a></li>
                    </ul>
                  </div>

                  {/* Contact info */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Contacto</h3>
                    <ul className="space-y-2">
                      <li>📧 info@quovi.com</li>
                      <li>📱 +52 123 456 7890</li>
                      <li>📍 Ciudad de México, MX</li>
                    </ul>
                  </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-sidebar-border mt-8 pt-8 text-center">
                  <p className="text-sidebar-foreground/60">
                    © 2025 Quovi. Todos los derechos reservados.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        );
    }
  };

  return renderContent();
}