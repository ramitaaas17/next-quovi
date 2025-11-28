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
 * Botón para activar el asistente de recomendaciones
 * Diseño minimalista integrado con SearchBar
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
        className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${className}`}
        style={{
          background: isHovered ? '#fb923c' : 'rgba(251, 146, 60, 0.1)',
          boxShadow: isHovered ? '0 4px 12px rgba(251, 146, 60, 0.3)' : 'none',
        }}
      >
        <Sparkles 
          className="w-5 h-5 transition-colors duration-300"
          style={{ color: isHovered ? '#ffffff' : '#fb923c' }}
          strokeWidth={2}
        />
      </motion.button>

      {/* Tooltip simple */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap pointer-events-none"
          >
            Descubre lugares
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscoverButton;