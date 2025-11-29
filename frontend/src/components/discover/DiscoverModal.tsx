// frontend/src/components/discover/DiscoverModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, Sparkles } from 'lucide-react';
import Image from 'next/image';
import QuestionStep from './QuestionStep';
import RecommendationResults from './RecommendationResults';
import LoadingScreen from './LoadingScreen';
import { discoverQuestions } from './questionOptions';
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

const DiscoverModal: React.FC<DiscoverModalProps> = ({ isOpen, onClose, userLocation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferencias, setPreferencias] = useState<PreferenciasUsuario>({});
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RestauranteConDistancia[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = discoverQuestions[currentStep];
  const progress = ((currentStep + 1) / discoverQuestions.length) * 100;

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setPreferencias({});
      setShowResults(false);
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleSelectOption = (value: string) => {
    const updatedPrefs = {
      ...preferencias,
      [currentQuestion.id === 'clima' ? 'clima_actual' : currentQuestion.id]: value
    };
    setPreferencias(updatedPrefs);

    setTimeout(() => {
      if (currentStep < discoverQuestions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit(updatedPrefs);
      }
    }, 300);
  };

  const handleSubmit = async (finalPrefs: PreferenciasUsuario) => {
    if (!userLocation) {
      setError('No se pudo obtener tu ubicación');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || 'Error del servidor');
      }

      const data = await response.json();
      
      if (!data.recomendaciones || data.recomendaciones.length === 0) {
        throw new Error('No se encontraron recomendaciones. Intenta con otras preferencias.');
      }
      
      setRecommendations(data.recomendaciones);
      setShowResults(true);
      
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Error al procesar tu solicitud');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setPreferencias({});
    setShowResults(false);
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop mejorado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 backdrop-blur-md"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(251, 146, 60, 0.15), rgba(0, 0, 0, 0.5))'
        }}
      />

      {/* Modal Content con animaciones mejoradas */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden"
        style={{
          boxShadow: '0 25px 50px -12px rgba(251, 146, 60, 0.5), 0 0 0 1px rgba(251, 146, 60, 0.1)'
        }}
      >
        {/* Header con gradiente simple */}
        <div className="relative overflow-hidden" style={{
          background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)'
        }}>
          {/* Efectos decorativos de fondo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl" />
          </div>

          <div className="relative px-4 sm:px-6 py-5 sm:py-6 text-white">
            {/* Botón cerrar mejorado */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 sm:top-5 right-4 sm:right-5 w-10 h-10 rounded-full flex items-center justify-center transition-all z-20"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Título simple sin iconos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                Descubre tu lugar perfecto
              </h2>
              <p className="text-white/90 text-xs sm:text-sm">
                Responde unas preguntas rápidas
              </p>
            </motion.div>

            {/* Barra de progreso simple sin animación de brillo */}
            {!showResults && !isLoading && !error && (
              <div className="mt-4 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    background: '#ffffff',
                    boxShadow: '0 0 8px rgba(255,255,255,0.6)'
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Contenido con scroll suave */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)] custom-scrollbar">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingScreen key="loading" />
            ) : showResults ? (
              <RecommendationResults
                key="results"
                recommendations={recommendations}
                onRestart={handleRestart}
                onClose={onClose}
              />
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center"
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <X className="w-8 h-8 text-red-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-red-800 mb-2">
                  Algo salió mal
                </h3>
                <p className="text-red-600 text-sm mb-6">{error}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRestart}
                  className="px-6 py-3 rounded-xl font-semibold text-white shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                  }}
                >
                  Intentar nuevamente
                </motion.button>
              </motion.div>
            ) : (
              <QuestionStep
                key={currentStep}
                question={currentQuestion}
                selectedValue={preferencias[currentQuestion.id === 'clima' ? 'clima_actual' : currentQuestion.id as keyof PreferenciasUsuario]}
                onSelect={handleSelectOption}
                stepNumber={currentStep + 1}
                totalSteps={discoverQuestions.length}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Footer con navegación mejorado */}
        {!showResults && !isLoading && !error && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="border-t border-gray-200 px-6 py-4 flex items-center justify-between bg-gradient-to-r from-orange-50/50 to-red-50/50"
          >
            <motion.button
              onClick={handleBack}
              disabled={currentStep === 0}
              whileHover={{ scale: currentStep === 0 ? 1 : 1.05, x: currentStep === 0 ? 0 : -2 }}
              whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: currentStep === 0 ? 'transparent' : 'rgba(251, 146, 60, 0.1)',
                color: '#f97316'
              }}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Atrás</span>
            </motion.button>

            {/* Indicadores de paso mejorados */}
            <div className="flex space-x-2">
              {discoverQuestions.map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative"
                >
                  <motion.div
                    className="rounded-full transition-all"
                    animate={{
                      width: index === currentStep ? 24 : 8,
                      height: 8,
                      backgroundColor: index <= currentStep ? '#fb923c' : '#e5e7eb'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {index === currentStep && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ backgroundColor: '#fb923c' }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            <div className="w-20" />
          </motion.div>
        )}
      </motion.div>

      {/* Estilos para scrollbar personalizado */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
        }
      `}</style>
    </div>
  );
};

export default DiscoverModal;