// frontend/src/components/discover/DiscoverButton.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface DiscoverButtonProps {
  onClick: () => void;
  className?: string;
}

/**
 * Botón mejorado para activar el asistente de recomendaciones
 * Con animaciones suaves y efecto de partículas
 */
const DiscoverButton: React.FC<DiscoverButtonProps> = ({ onClick, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex items-center justify-center w-10 h-10 rounded-full overflow-hidden transition-all duration-300 ${className}`}
        style={{
          background: isHovered 
            ? 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)' 
            : 'rgba(251, 146, 60, 0.1)',
          boxShadow: isHovered 
            ? '0 8px 20px rgba(251, 146, 60, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)' 
            : 'none',
        }}
      >
        {/* Efecto de brillo rotatorio */}
        {isHovered && (
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{
              background: 'conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            }}
          />
        )}

        {/* Icono con animación */}
        <motion.div
          animate={isHovered ? {
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1.1, 1.1, 1]
          } : {}}
          transition={{ duration: 0.5 }}
        >
          <Sparkles 
            className="w-5 h-5 transition-colors duration-300 relative z-10"
            style={{ color: isHovered ? '#ffffff' : '#fb923c' }}
            strokeWidth={2}
          />
        </motion.div>

        {/* Partículas decorativas */}
        {isHovered && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * Math.PI) / 3) * 20,
                  y: Math.sin((i * Math.PI) / 3) * 20,
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </>
        )}
      </motion.button>

      {/* Tooltip mejorado */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 pointer-events-none z-20"
          >
            <div 
              className="px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shadow-2xl border"
              style={{
                background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
                borderColor: 'rgba(251, 146, 60, 0.3)',
                color: '#ffffff'
              }}
            >
              Descubre lugares
              <div className="absolute top-full left-1/2 -translate-x-1/2">
                <div className="border-4 border-transparent border-t-orange-500" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscoverButton;