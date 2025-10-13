'use client';

import React from 'react';
import Image from 'next/image';
import ParticleBackground from '../common/Particles';
import ConfettiButton from '../common/Button'; 
import { Search, LogIn } from 'lucide-react';

interface HeroProps {
  onShowAuth?: () => void;
  onStartDiscovering?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShowAuth, onStartDiscovering }) => {
  // Paleta de colores personalizada para Quovi
  const quoviColors = [
    '#ff6b35', 
    '#f7931e', 
    '#2ecc71', 
    '#e74c3c', 
    '#f1c40f', 
    '#8e44ad'  
  ];

  const handleStartDiscovering = () => {
    if (onStartDiscovering) {
      onStartDiscovering();
    } else {
      // Fallback: mostrar auth si no hay función específica
      onShowAuth?.();
    }
  };

  const handleLogin = () => {
    onShowAuth?.();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Partículas de fondo */}
      <ParticleBackground 
        particleCount={60}
        colors={[quoviColors[0]]}
        className="opacity-70"
      />
      
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-yellow-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Title with Logo Space */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-6 min-h-[50vh]">
              <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-[#ff6b35] tracking-wider pr-4 animate-fade-in-left">
                QU
              </h1>
              <div className="flex justify-center animate-fade-in-up">
                <Image
                  src="/images/quoviMain.png"
                  alt="Quovi mascot"
                  width={448}
                  height={448}
                  className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] object-contain transform hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
              
              <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-[#ff6b35] tracking-wider pl-4 animate-fade-in-right">
                VI
              </h1>
            </div>

            {/* Tagline optimizado */}
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{animationDelay: '0.8s'}}>
              Descubre sabores únicos cerca de ti con{' '}
              <span className="text-orange-500 font-semibold">
                búsqueda inteligente
              </span>
              ,{' '}
              <span className="text-green-600 font-semibold">
                restaurantes locales
              </span>
              {' '}y{' '}
              <span className="text-purple-600 font-semibold">
                experiencias auténticas
              </span>
            </p>

            <div
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
              style={{ animationDelay: '1s' }}
            >
              <ConfettiButton
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                icon={Search}
                onClick={handleStartDiscovering}
              >
                Empezar a Descubrir
              </ConfettiButton>
              
              <ConfettiButton
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                icon={LogIn}
                onClick={handleLogin}
              >
                Ya tengo una cuenta
              </ConfettiButton>
            </div>
          </div>         
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fff7ed" />
              <stop offset="50%" stopColor="#f0fdf4" />
              <stop offset="100%" stopColor="#fef7f0" />
            </linearGradient>
          </defs>
          <path fill="url(#waveGradient)" d="M0,50 C150,20 350,80 600,50 C850,20 1050,80 1440,50 L1440,100 L0,100 Z" />
        </svg>
      </div>

      {/* CSS personalizado para las animaciones */}
      <style>{`
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-left {
          animation: fade-in-left 1s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;