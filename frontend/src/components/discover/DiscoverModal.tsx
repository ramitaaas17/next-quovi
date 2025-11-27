'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, Sparkles } from 'lucide-react';
import QuestionStep from './QuestionStep';
import RecommendationResults from './RecommendationResults';
import { RestauranteConDistancia } from '@/services/restauranteService';

interface DiscoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  userLocation: { lat: number; lng: number } | null;
}

interface PreferenciasUsuario {
  clima_actual?: string;
  ocasion?: string;
  distancia?: string;
  antojo?: string;
  presupuesto?: string;
}

/**
 * Modal principal del sistema "Descubre"
 * Guía al usuario a través de 5 preguntas con animaciones suaves
 */
const DiscoverModal: React.FC<DiscoverModalProps> = ({ isOpen, onClose, userLocation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferencias, setPreferencias] = useState<PreferenciasUsuario>({});
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RestauranteConDistancia[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Resetear al abrir
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setPreferencias({});
      setShowResults(false);
      setError(null);
    }
  }, [isOpen]);

  // Definición de preguntas
  const questions = [
    {
      id: 'clima',
      title: '¿Cómo está el clima?',
      subtitle: 'Buscaremos lugares perfectos para hoy',
      options: [
        { value: 'soleado', label: 'Soleado', icon: '☀️', gradient: 'from-yellow-400 to-orange-500' },
        { value: 'lluvioso', label: 'Lluvioso', icon: '🌧️', gradient: 'from-blue-400 to-blue-600' },
        { value: 'nublado', label: 'Nublado', icon: '☁️', gradient: 'from-gray-400 to-gray-600' },
        { value: 'frio', label: 'Frío', icon: '❄️', gradient: 'from-cyan-400 to-blue-500' },
      ]
    },
    {
      id: 'ocasion',
      title: '¿Cuál es tu plan?',
      subtitle: 'Cada momento merece el lugar perfecto',
      options: [
        { value: 'cita', label: 'Cita romántica', icon: '💑', gradient: 'from-pink-400 to-rose-500' },
        { value: 'amigos', label: 'Con amigos', icon: '👯', gradient: 'from-purple-400 to-pink-500' },
        { value: 'solo', label: 'Solo/a', icon: '🧘', gradient: 'from-indigo-400 to-purple-500' },
        { value: 'familia', label: 'En familia', icon: '👨‍👩‍👧‍👦', gradient: 'from-green-400 to-emerald-500' },
      ]
    },
    {
      id: 'distancia',
      title: '¿Qué tan lejos quieres ir?',
      subtitle: 'La aventura comienza aquí',
      options: [
        { value: 'cerca', label: 'Cerca (0-2 km)', icon: '🚶', gradient: 'from-green-400 to-teal-500' },
        { value: 'explorar', label: 'Explorar (2-8 km)', icon: '🚗', gradient: 'from-blue-400 to-cyan-500' },
        { value: 'lejos', label: 'Aventura (8+ km)', icon: '🛣️', gradient: 'from-orange-400 to-red-500' },
      ]
    },
    {
      id: 'antojo',
      title: '¿Qué se te antoja?',
      subtitle: 'Tu paladar es el protagonista',
      options: [
        { value: 'dulce', label: 'Algo dulce', icon: '🍰', gradient: 'from-pink-400 to-rose-500' },
        { value: 'salado', label: 'Algo salado', icon: '🍕', gradient: 'from-orange-400 to-amber-500' },
        { value: 'ambos', label: 'Me gustan ambos', icon: '🍽️', gradient: 'from-purple-400 to-indigo-500' },
      ]
    },
    {
      id: 'presupuesto',
      title: '¿Cuál es tu presupuesto?',
      subtitle: 'Hay opciones deliciosas para todos',
      options: [
        { value: 'bajo', label: 'Económico ($-$$)', icon: '💵', gradient: 'from-green-400 to-emerald-500' },
        { value: 'medio', label: 'Moderado ($$-$$$)', icon: '💳', gradient: 'from-blue-400 to-indigo-500' },
        { value: 'alto', label: 'Premium ($$$-$$$$)', icon: '💎', gradient: 'from-purple-400 to-pink-500' },
      ]
    }
  ];

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  // Maneja selección de opción
  const handleSelectOption = (value: string) => {
    const updatedPrefs = {
      ...preferencias,
      [currentQuestion.id === 'clima' ? 'clima_actual' : currentQuestion.id]: value
    };
    setPreferencias(updatedPrefs);

    // Auto-avanzar después de 400ms
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit(updatedPrefs);
      }
    }, 400);
  };

  // Envía preferencias al backend
  const handleSubmit = async (finalPrefs: PreferenciasUsuario) => {
    if (!userLocation) {
      setError('No se pudo obtener tu ubicación');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const AI_SERVICE_URL = process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:5001/api/ai';
      
      const response = await fetch(`${AI_SERVICE_URL}/discover`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferencias: finalPrefs,
          ubicacion: {
            latitud: userLocation.lat,
            longitud: userLocation.lng
          },
          top_n: 10
        }),
      });

      if (!response.ok) {
        throw new Error('Error al obtener recomendaciones');
      }

      const data = await response.json();
      setRecommendations(data.recomendaciones || []);
      setShowResults(true);
    } catch (err: any) {
      setError(err.message || 'Error al procesar tu solicitud');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setPreferencias({});
    setShowResults(false);
    setError(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden relative"
          >
            {/* Header con gradiente */}
            <div 
              className="relative p-6 sm:p-8 text-white overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #8b5cf6 100%)'
              }}
            >
              {/* Partículas decorativas */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/20 rounded-full"
                    style={{
                      left: `${10 + i * 12}%`,
                      top: `${20 + (i % 3) * 30}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              {/* Botón cerrar */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Título */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative z-10"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
                  <h2 className="text-2xl sm:text-3xl font-bold">Descubre tu próxima experiencia</h2>
                </div>
                <p className="text-white/90 text-sm sm:text-base">
                  Responde unas preguntas y te recomendaremos los mejores lugares
                </p>
              </motion.div>

              {/* Barra de progreso */}
              {!showResults && !isLoading && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white/30"
                >
                  <motion.div
                    className="h-full bg-white rounded-r-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              )}
            </div>

            {/* Contenido */}
            <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-180px)]">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="relative w-20 h-20 mb-6"
                    >
                      <Sparkles className="w-20 h-20 text-pink-500" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Buscando la magia perfecta...
                    </h3>
                    <p className="text-gray-600 text-center max-w-md">
                      Estamos analizando miles de opciones para encontrar los mejores lugares para ti
                    </p>
                  </motion.div>
                ) : showResults ? (
                  <RecommendationResults
                    recommendations={recommendations}
                    onRestart={handleRestart}
                    onClose={onClose}
                  />
                ) : error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center"
                  >
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <X className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-red-800 mb-2">Algo salió mal</h3>
                    <p className="text-red-600 mb-6">{error}</p>
                    <button
                      onClick={handleRestart}
                      className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
                    >
                      Intentar nuevamente
                    </button>
                  </motion.div>
                ) : (
                  <QuestionStep
                    question={currentQuestion}
                    selectedValue={preferencias[currentQuestion.id === 'clima' ? 'clima_actual' : currentQuestion.id as keyof PreferenciasUsuario]}
                    onSelect={handleSelectOption}
                    stepNumber={currentStep + 1}
                    totalSteps={questions.length}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Footer con navegación */}
            {!showResults && !isLoading && !error && (
              <div className="border-t border-gray-200 p-4 sm:p-6 flex items-center justify-between bg-gray-50">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: currentStep > 0 ? 'rgba(251, 146, 60, 0.1)' : 'transparent',
                    color: currentStep > 0 ? '#f97316' : '#9ca3af'
                  }}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Atrás</span>
                </motion.button>

                <div className="flex items-center space-x-2">
                  {questions.map((_, index) => (
                    <motion.div
                      key={index}
                      className="w-2 h-2 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      style={{
                        background: index === currentStep 
                          ? 'linear-gradient(135deg, #f59e0b, #ec4899)'
                          : index < currentStep
                            ? '#10b981'
                            : '#e5e7eb'
                      }}
                    />
                  ))}
                </div>

                <div className="w-20" /> {/* Espaciador */}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DiscoverModal;