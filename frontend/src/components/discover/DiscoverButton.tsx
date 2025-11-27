'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2 } from 'lucide-react';

interface DiscoverButtonProps {
  onClick: () => void;
  className?: string;
}

/**
 * Botón flotante mágico para iniciar el sistema "Descubre"
 * Posicionado en SearchBar con animaciones suaves
 */
const DiscoverButton: React.FC<DiscoverButtonProps> = ({ onClick, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; delay: number }>>([]);

  // Genera partículas al hacer hover
  React.useEffect(() => {
    if (isHovered) {
      const newParticles = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        delay: i * 0.1
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [isHovered]);

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 group overflow-visible ${className}`}
      style={{
        background: isHovered 
          ? 'linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #8b5cf6 100%)'
          : 'rgba(251, 146, 60, 0.15)',
        boxShadow: isHovered
          ? '0 8px 25px rgba(236, 72, 153, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
          : '0 3px 10px rgba(251, 146, 60, 0.2), inset 0 1px 0 rgba(255,255,255,0.4)'
      }}
    >
      {/* Anillo pulsante */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.8, opacity: 0 }}
            exit={{ scale: 1, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, transparent 70%)'
            }}
          />
        )}
      </AnimatePresence>

      {/* Partículas orbitando */}
      <AnimatePresence>
        {particles.map((particle, index) => (
          <motion.div
            key={particle.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: 360
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 2,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-amber-400 to-pink-500"
            style={{
              left: '50%',
              top: '50%',
              transformOrigin: '0 0',
              transform: `rotate(${index * 60}deg) translate(25px, -1px)`
            }}
          />
        ))}
      </AnimatePresence>

      {/* Ícono principal con rotación suave */}
      <motion.div
        animate={{
          rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
        className="relative z-10"
      >
        <Wand2 
          className="w-5 h-5 transition-colors duration-300"
          style={{
            color: isHovered ? '#ffffff' : '#f97316',
            filter: isHovered ? 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' : 'none'
          }}
        />
      </motion.div>

      {/* Destello en el icono */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 rounded-full bg-white"
          />
        )}
      </AnimatePresence>

      {/* Tooltip mejorado */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: -50, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25 
            }}
            className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none z-20"
          >
            <div 
              className="px-4 py-2 rounded-xl whitespace-nowrap shadow-2xl border flex items-center space-x-2"
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
                borderColor: 'rgba(255, 255, 255, 0.3)'
              }}
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white">Descubre magia</span>
              
              {/* Flecha del tooltip */}
              <motion.div 
                className="absolute top-full left-1/2 transform -translate-x-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div 
                  className="border-8 border-transparent"
                  style={{ borderTopColor: '#ec4899' }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brillo giratorio de fondo */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          background: 'conic-gradient(from 0deg, transparent 0%, rgba(236, 72, 153, 0.3) 50%, transparent 100%)'
        }}
      />
    </motion.button>
  );
};

export default DiscoverButton;