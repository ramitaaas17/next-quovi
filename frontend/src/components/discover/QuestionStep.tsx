'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Question } from './questionOptions';

interface QuestionStepProps {
  question: Question;
  selectedValue?: string;
  onSelect: (value: string) => void;
  stepNumber: number;
  totalSteps: number;
}

/**
 * Paso individual del asistente de recomendaciones
 * Diseño limpio y minimalista con énfasis en usabilidad
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Encabezado de la pregunta */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 font-semibold">
          {stepNumber}/{totalSteps}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800">
          {question.title}
        </h3>
        
        <p className="text-gray-500 text-sm">
          {question.subtitle}
        </p>
      </div>

      {/* Grid de opciones */}
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((option) => {
          const isSelected = selectedValue === option.value;
          const IconComponent = option.Icon;

          return (
            <motion.button
              key={option.value}
              onClick={() => onSelect(option.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                isSelected
                  ? 'border-orange-400 bg-orange-50'
                  : 'border-gray-200 bg-white hover:border-orange-200 hover:bg-orange-50/30'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                {/* Icono */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-orange-400' : 'bg-gray-100'
                }`}>
                  <IconComponent 
                    className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`}
                    strokeWidth={2}
                  />
                </div>

                {/* Label */}
                <span className={`text-sm font-medium text-center ${
                  isSelected ? 'text-orange-600' : 'text-gray-700'
                }`}>
                  {option.label}
                </span>

                {/* Checkmark para opción seleccionada */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 bg-orange-400 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuestionStep;