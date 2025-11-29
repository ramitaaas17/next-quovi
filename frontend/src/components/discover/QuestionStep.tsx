// frontend/src/components/discover/QuestionStep.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { Question } from './questionOptions';

interface QuestionStepProps {
  question: Question;
  selectedValue?: string;
  onSelect: (value: string) => void;
  stepNumber: number;
  totalSteps: number;
}

/**
 * Paso individual del asistente con mascota Quovi y animaciones mejoradas
 */
const QuestionStep: React.FC<QuestionStepProps> = ({
  question,
  selectedValue,
  onSelect,
  stepNumber,
  totalSteps
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="space-y-6"
    >
      {/* Header con mascota Quovi */}
      <div className="text-center space-y-4">
        {/* Mascota Quovi animada */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="flex justify-center mb-4"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-24 h-24"
            >
              <Image
                src="/images/quoviMain.png"
                alt="Quovi"
                width={96}
                height={96}
                className="object-contain"
              />
            </motion.div>

            {/* Círculos decorativos alrededor de la mascota */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2"
                style={{
                  borderColor: i === 0 ? '#fb923c' : i === 1 ? '#f97316' : '#fdba74',
                  opacity: 0.3
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Badge de paso */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          className="inline-flex items-center justify-center px-4 py-2 rounded-full font-bold text-sm shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
            color: '#ffffff'
          }}
        >
          Pregunta {stepNumber} de {totalSteps}
        </motion.div>
        
        {/* Título con animación */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-800"
        >
          {question.title}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 text-sm"
        >
          {question.subtitle}
        </motion.p>
      </div>

      {/* Grid de opciones mejorado */}
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, index) => {
          const isSelected = selectedValue === option.value;
          const IconComponent = option.Icon;

          return (
            <motion.button
              key={option.value}
              onClick={() => onSelect(option.value)}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: 0.5 + (index * 0.1),
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className="relative p-5 rounded-2xl border-2 transition-all overflow-hidden"
              style={{
                borderColor: isSelected ? '#fb923c' : '#e5e7eb',
                background: isSelected 
                  ? 'linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(249, 115, 22, 0.05) 100%)'
                  : '#ffffff',
                boxShadow: isSelected 
                  ? '0 8px 20px rgba(251, 146, 60, 0.3), inset 0 1px 0 rgba(255,255,255,0.5)'
                  : '0 2px 8px rgba(0, 0, 0, 0.05)'
              }}
            >
              {/* Efecto de onda al seleccionar */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    background: 'radial-gradient(circle, rgba(251, 146, 60, 0.3) 0%, transparent 70%)'
                  }}
                />
              )}

              <div className="flex flex-col items-center space-y-3 relative z-10">
                {/* Contenedor del icono con animación */}
                <motion.div
                  animate={isSelected ? {
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-xl flex items-center justify-center transition-all"
                  style={{
                    background: isSelected 
                      ? 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)'
                      : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                    boxShadow: isSelected 
                      ? '0 4px 12px rgba(251, 146, 60, 0.4)'
                      : 'none'
                  }}
                >
                  <IconComponent 
                    className="w-7 h-7 transition-colors"
                    style={{ color: isSelected ? '#ffffff' : '#6b7280' }}
                    strokeWidth={2}
                  />
                </motion.div>

                {/* Label */}
                <span 
                  className="text-sm font-semibold text-center transition-colors"
                  style={{ color: isSelected ? '#f97316' : '#374151' }}
                >
                  {option.label}
                </span>

                {/* Descripción opcional */}
                {option.description && (
                  <span className="text-xs text-gray-400 text-center line-clamp-2">
                    {option.description}
                  </span>
                )}

                {/* Checkmark animado */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                    }}
                  >
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </div>

              {/* Brillo al hover */}
              <motion.div
                className="absolute inset-0 opacity-0 pointer-events-none"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'linear-gradient(135deg, transparent 0%, rgba(251, 146, 60, 0.05) 50%, transparent 100%)'
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