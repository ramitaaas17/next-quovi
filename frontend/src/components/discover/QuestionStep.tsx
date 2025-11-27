'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

// Guardamos el archivo completo

interface QuestionOption {
  value: string;
  label: string;
  icon: string;
  gradient: string;
}

interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: QuestionOption[];
}

interface QuestionStepProps {
  question: Question;
  selectedValue?: string;
  onSelect: (value: string) => void;
  stepNumber: number;
  totalSteps: number;
}

/**
 * Componente para cada pregunta del wizard
 * Animaciones suaves al seleccionar opciones
 */
const QuestionStep: React.FC<QuestionStepProps> = ({
  question,
  selectedValue,
  onSelect,
  stepNumber,
  totalSteps
}) => {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Título de la pregunta */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="inline-block mb-4"
        >
          <div 
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)'
            }}
          >
            {stepNumber}/{totalSteps}
          </div>
        </motion.div>

        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2"
        >
          {question.title}
        </motion.h3>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-sm sm:text-base"
        >
          {question.subtitle}
        </motion.p>
      </div>

      {/* Opciones en grid responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {question.options.map((option, index) => {
          const isSelected = selectedValue === option.value;
          const isHovered = hoveredOption === option.value;

          return (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(option.value)}
              onHoverStart={() => setHoveredOption(option.value)}
              onHoverEnd={() => setHoveredOption(null)}
              className="relative p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden group"
              style={{
                borderColor: isSelected ? '#ec4899' : isHovered ? '#f59e0b' : '#e5e7eb',
                background: isSelected 
                  ? 'rgba(236, 72, 153, 0.05)'
                  : isHovered 
                    ? 'rgba(245, 158, 11, 0.05)'
                    : 'white',
                boxShadow: isSelected 
                  ? '0 10px 30px rgba(236, 72, 153, 0.2)'
                  : isHovered
                    ? '0 8px 25px rgba(245, 158, 11, 0.15)'
                    : '0 2px 8px rgba(0, 0, 0, 0.05)'
              }}
            >
              {/* Efecto de gradiente de fondo */}
              {(isSelected || isHovered) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-5`}
                />
              )}

              {/* Contenido */}
              <div className="relative z-10 flex items-center space-x-4">
                {/* Icono emoji con animación */}
                <motion.div
                  animate={{
                    scale: isSelected ? [1, 1.2, 1] : isHovered ? 1.1 : 1,
                    rotate: isSelected ? [0, 10, -10, 0] : 0
                  }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl sm:text-5xl"
                >
                  {option.icon}
                </motion.div>

                {/* Label */}
                <div className="flex-1 text-left">
                  <span className={`font-semibold text-sm sm:text-base transition-colors ${
                    isSelected 
                      ? 'text-pink-600' 
                      : isHovered 
                        ? 'text-orange-600' 
                        : 'text-gray-700'
                  }`}>
                    {option.label}
                  </span>
                </div>

                {/* Check mark animado */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ 
                    scale: isSelected ? 1 : 0,
                    rotate: isSelected ? 0 : -180
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`w-7 h-7 rounded-full flex items-center justify-center bg-gradient-to-br ${option.gradient}`}
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              </div>

              {/* Partículas al seleccionar */}
              {isSelected && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-pink-400 rounded-full"
                      initial={{ 
                        x: '50%', 
                        y: '50%',
                        scale: 0,
                        opacity: 1
                      }}
                      animate={{
                        x: `${50 + (Math.cos(i * 60 * Math.PI / 180) * 100)}%`,
                        y: `${50 + (Math.sin(i * 60 * Math.PI / 180) * 100)}%`,
                        scale: [0, 1, 0],
                        opacity: [1, 1, 0]
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </>
              )}

              {/* Brillo al hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                  transform: 'translateX(-100%)'
                }}
                animate={{
                  x: isHovered ? ['0%', '200%'] : '0%'
                }}
                transition={{
                  duration: 0.8,
                  repeat: isHovered ? Infinity : 0,
                  ease: "linear"
                }}
              />
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuestionStep;