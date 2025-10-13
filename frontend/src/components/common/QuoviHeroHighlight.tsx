'use client';

import React from "react";
import { motion } from "framer-motion";

interface HighlightProps {
  children: React.ReactNode;
  className?: string;
  variant?: "orange" | "green" | "purple";
}

const Highlight: React.FC<HighlightProps> = ({ 
  children, 
  className = "",
  variant = "orange"
}) => {
  const getVariantColors = () => {
    switch (variant) {
      case "orange":
        return {
          gradient: "linear-gradient(135deg, #ff6b35, #f7931e)",
          textColor: "text-white"
        };
      case "green":
        return {
          gradient: "linear-gradient(135deg, #2ecc71, #27ae60)",
          textColor: "text-white"
        };
      case "purple":
        return {
          gradient: "linear-gradient(135deg, #8e44ad, #9b59b6)",
          textColor: "text-white"
        };
      default:
        return {
          gradient: "linear-gradient(135deg, #ff6b35, #f7931e)",
          textColor: "text-white"
        };
    }
  };

  const { gradient, textColor } = getVariantColors();

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative inline-block px-3 py-1 rounded-lg font-semibold ${textColor} ${className}`}
      style={{
        background: gradient,
        boxShadow: `0 4px 15px rgba(255, 107, 53, 0.3)`
      }}
    >
      {/* Efecto de brillo */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.span>
  );
};

interface QuoviHeroHighlightProps {
  children: React.ReactNode;
  className?: string;
}

const QuoviHeroHighlight: React.FC<QuoviHeroHighlightProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-blue-50/20 rounded-2xl" />
      
      {/* Partículas decorativas */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <motion.div
          className="absolute top-4 right-8 w-2 h-2 bg-orange-400 rounded-full"
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-6 left-12 w-1.5 h-1.5 bg-blue-400 rounded-full"
          animate={{
            y: [0, -8, 0],
            opacity: [0.4, 0.9, 0.4]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div
          className="absolute top-12 left-6 w-1 h-1 bg-green-400 rounded-full"
          animate={{
            y: [0, -6, 0],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
      
      {/* Contenido */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Componente principal para usar en Hero
const QuoviTaglineHighlight: React.FC = () => {
  return (
    <QuoviHeroHighlight className="max-w-4xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light text-center"
      >
        Descubre sabores únicos cerca de ti con{' '}
        <Highlight variant="orange">
          búsqueda inteligente
        </Highlight>
        ,{' '}
        <Highlight variant="green">
          restaurantes locales
        </Highlight>
        {' '}y{' '}
        <Highlight variant="purple">
          experiencias auténticas
        </Highlight>
      </motion.p>
    </QuoviHeroHighlight>
  );
};

export { QuoviHeroHighlight, Highlight, QuoviTaglineHighlight };