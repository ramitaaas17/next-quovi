'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft } from 'lucide-react';
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

  // Resetear estado al abrir/cerrar
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setPreferencias({});
      setShowResults(false);
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  // Manejar selección de opción
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

  // Enviar preferencias al backend
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
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-5 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-bold pr-10">
            Descubre tu lugar perfecto
          </h2>
          <p className="text-white/90 text-sm mt-1">
            Responde unas preguntas rápidas
          </p>

          {/* Barra de progreso */}
          {!showResults && !isLoading && !error && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 border border-red-200 rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <X className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Algo salió mal
                </h3>
                <p className="text-red-600 text-sm mb-4">{error}</p>
                <button
                  onClick={handleRestart}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                >
                  Intentar nuevamente
                </button>
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

        {/* Footer con navegación */}
        {!showResults && !isLoading && !error && (
          <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between bg-gray-50">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 hover:bg-gray-100"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Atrás</span>
            </button>

            {/* Indicadores de paso */}
            <div className="flex space-x-2">
              {discoverQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep
                      ? 'bg-orange-400 w-6'
                      : index < currentStep
                        ? 'bg-orange-300'
                        : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="w-20" />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DiscoverModal;