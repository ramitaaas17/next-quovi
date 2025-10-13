'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface EpicLoaderProps {
  onComplete: () => void;
  duration?: number;
}

interface Particle {
  left: string;
  top: string;
  delay: string;
  duration: string;
}

const EpicLoader: React.FC<EpicLoaderProps> = ({ onComplete, duration = 2800 }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'appearing' | 'dancing' | 'flourishing'>('appearing');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  // Generar partículas solo en el cliente
  useEffect(() => {
    setMounted(true);
    const generatedParticles = [...Array(8)].map((_, i) => ({
      left: `${10 + i * 12}%`,
      top: `${20 + (i % 2) * 40}%`,
      delay: `${i * 0.8}s`,
      duration: `${3 + Math.random()}s`
    }));
    setParticles(generatedParticles);
  }, []);

  const updateProgress = useCallback(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (duration / 30));
        
        if (newProgress >= 30 && stage === 'appearing') {
          setStage('dancing');
        } else if (newProgress >= 80 && stage === 'dancing') {
          setStage('flourishing');
        }

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 600);
          return 100;
        }

        return newProgress;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [duration, stage, onComplete]);

  useEffect(() => {
    const cleanup = updateProgress();
    return cleanup;
  }, [updateProgress]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 overflow-hidden">
      
      {/* Floating hearts and sparkles - solo renderizar después de montar */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-orange-300/40 rounded-full animate-float-cute"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            />
          ))}
          
          {stage !== 'appearing' && [...Array(6)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute w-0.5 h-0.5 bg-pink-300/50 rounded-full animate-twinkle-soft"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="text-center">
        
        {/* Logo container with gentle pulse */}
        <div className="mb-8 relative">
          <div className={`relative inline-block transition-all duration-1500 ease-out ${
            stage === 'appearing' ? 'scale-90 opacity-60' : 'scale-100 opacity-100'
          }`}>
            
            {/* Soft glow behind logo */}
            <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-2000 ${
              stage === 'flourishing' ? 'bg-orange-200/60 scale-150' :
              stage === 'dancing' ? 'bg-orange-200/40 scale-125' : 'bg-orange-200/20 scale-100'
            }`} />
            
            {/* Gentle rotating ring */}
            <div className={`absolute inset-0 rounded-full border border-orange-300/30 transition-all duration-1000 ${
              stage === 'dancing' ? 'animate-spin-gentle scale-110' : ''
            }`} style={{ margin: '-12px' }} />
            
            {/* Logo */}
            <Image
              src="/images/quoviLogo.png"
              alt="Quovi"
              width={112}
              height={112}
              className={`relative object-contain transition-all duration-1000 ${
                stage === 'flourishing' ? 'scale-110 drop-shadow-lg' : 
                stage === 'dancing' ? 'animate-bounce-soft' : ''
              }`}
              priority
            />

            {/* Cute little dots around logo */}
            {stage !== 'appearing' && [...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1.5 h-1.5 rounded-full transition-all duration-1000 ${
                  i % 3 === 0 ? 'bg-orange-400/60' : 
                  i % 3 === 1 ? 'bg-pink-400/60' : 'bg-yellow-400/60'
                } ${stage === 'dancing' ? 'animate-orbit' : ''}`}
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: '0 0',
                  transform: `rotate(${i * 60}deg) translate(60px, -1px)`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Brand name with gentle reveal */}
        <div className="mb-10">
          <h1 className={`text-5xl font-light transition-all duration-1000 ${
            stage === 'appearing' ? 'opacity-40 translate-y-4' : 'opacity-100 translate-y-0'
          }`}>
            {['Q', 'U', 'O', 'V', 'I'].map((letter, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-700 ${
                  index === 2 ? 'text-orange-500 font-medium' : 'text-orange-400'
                } ${
                  stage === 'dancing' ? 'animate-letter-dance' : ''
                } ${
                  stage === 'flourishing' ? 'animate-letter-glow' : ''
                }`}
                style={{ 
                  animationDelay: `${index * 200}ms`,
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Cute loading message */}
        <div className={`mb-8 transition-all duration-1000 ${
          stage === 'appearing' ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
        }`}>
          <p className="text-orange-600/80 font-light text-lg">
            {stage === 'appearing' && 'Preparando algo delicioso...'}
            {stage === 'dancing' && 'Conectando sabores únicos...'}
            {stage === 'flourishing' && 'Todo listo para ti'}
          </p>
        </div>

        {/* Elegant progress indicator */}
        <div className="flex justify-center space-x-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                progress > i * 20 ? 
                  i % 2 === 0 ? 'bg-orange-400 scale-125 shadow-sm' : 'bg-pink-400 scale-125 shadow-sm'
                : 'bg-orange-200/50 scale-100'
              } ${
                progress > i * 20 && stage === 'dancing' ? 'animate-pulse-cute' : ''
              }`}
            />
          ))}
        </div>

        {/* Final elegant glow */}
        {stage === 'flourishing' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-radial from-orange-200/20 via-transparent to-transparent animate-gentle-expand" />
            <div className="absolute inset-0 bg-gradient-radial from-pink-200/10 via-transparent to-transparent animate-gentle-expand" style={{animationDelay: '0.3s'}} />
          </div>
        )}
      </div>

      {/* Delicate animations */}
      <style>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        @keyframes float-cute {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.3; 
          }
          50% { 
            transform: translateY(-20px) rotate(5deg); 
            opacity: 0.7; 
          }
        }

        @keyframes twinkle-soft {
          0%, 100% { 
            opacity: 0.2; 
            transform: scale(0.8); 
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.2); 
          }
        }

        @keyframes spin-gentle {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        @keyframes orbit {
          0% { transform: rotate(0deg) translate(60px, -1px); }
          100% { transform: rotate(360deg) translate(60px, -1px); }
        }

        @keyframes letter-dance {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-3px) scale(1.05); }
        }

        @keyframes letter-glow {
          0%, 100% { 
            text-shadow: 0 0 5px rgba(251, 146, 60, 0.3); 
          }
          50% { 
            text-shadow: 0 0 15px rgba(251, 146, 60, 0.6); 
          }
        }

        @keyframes pulse-cute {
          0%, 100% { transform: scale(1.25); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.8; }
        }

        @keyframes gentle-expand {
          0% { 
            opacity: 0; 
            transform: scale(0.8); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2); 
          }
          100% { 
            opacity: 0; 
            transform: scale(1.5); 
          }
        }

        .animate-float-cute { animation: float-cute ease-in-out infinite; }
        .animate-twinkle-soft { animation: twinkle-soft 2s ease-in-out infinite; }
        .animate-spin-gentle { animation: spin-gentle 8s linear infinite; }
        .animate-bounce-soft { animation: bounce-soft 2s ease-in-out infinite; }
        .animate-orbit { animation: orbit 6s linear infinite; }
        .animate-letter-dance { animation: letter-dance 1.5s ease-in-out infinite; }
        .animate-letter-glow { animation: letter-glow 2s ease-in-out infinite; }
        .animate-pulse-cute { animation: pulse-cute 1s ease-in-out infinite; }
        .animate-gentle-expand { animation: gentle-expand 2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default EpicLoader;