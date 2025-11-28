'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, Sparkles } from 'lucide-react';
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

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setPreferencias({});
      setShowResults(false);
      setError(null);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const currentQuestion = discoverQuestions[currentStep];
  const progress = ((currentStep + 1) / discoverQuestions.length) * 100;

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
    }, 400);
  };

  // ✅ USAR PROXY DE NEXT.JS en lugar de conexión directa
  const handleSubmit = async (finalPrefs: PreferenciasUsuario) => {
    if (!userLocation) {
      setError('No se pudo obtener tu ubicación');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // ✅ Usar el proxy de Next.js: /api/ai/discover
      const endpoint = '/api/ai/discover';
          
      console.log('🔍 Enviando request a proxy:', endpoint);
      console.log('📍 Ubicación:', userLocation);
      console.log('⚙️ Preferencias:', finalPrefs);
      
      const response = await fetch(endpoint, {
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

      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Error response:', errorData);
        throw new Error(errorData.details || errorData.error || 'Error del servidor');
      }

      const data = await response.json();
      console.log('✅ Datos recibidos:', data);
      
      if (!data.recomendaciones || data.recomendaciones.length === 0) {
        throw new Error('No se encontraron recomendaciones. Intenta con otras preferencias.');
      }
      
      setRecommendations(data.recomendaciones);
      setShowResults(true);
      
    } catch (err: any) {
      console.error('💥 Error completo:', err);
      
      let errorMessage = 'Error al procesar tu solicitud. ';
      
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        errorMessage += 'Verifica tu conexión a internet.';
      } else if (err.message.includes('timeout')) {
        errorMessage += 'El servidor tardó demasiado en responder. Intenta de nuevo.';
      } else if (err.message.includes('unavailable')) {
        errorMessage += 'El servicio de IA no está disponible en este momento.';
      } else {
        errorMessage += err.message;
      }
      
      setError(errorMessage);
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
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            style={{ zIndex: 9999 }}
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden relative"
              style={{ zIndex: 10000 }}
            >
              {/* Header */}
              <div 
                className="relative p-6 sm:p-8 text-white overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #8b5cf6 100%)'
                }}
              >
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

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </motion.button>

                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="relative z-10"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl font-bold">Descubre tu próxima experiencia</h2>
                  </div>
                  <p className="text-white/90 text-sm sm:text-base">
                    Responde unas preguntas y te recomendaremos los mejores lugares
                  </p>
                </motion.div>

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
                      className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center"
                    >
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <X className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-red-800 mb-2">Algo salió mal</h3>
                      <p className="text-red-600 mb-6 text-sm">{error}</p>
                      <button
                        onClick={handleRestart}
                        className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
                      >
                        Intentar nuevamente
                      </button>
                    </motion.div>
                  ) : (
                    <QuestionStep
                      key={`question-${currentStep}`}
                      question={currentQuestion}
                      selectedValue={preferencias[currentQuestion.id === 'clima' ? 'clima_actual' : currentQuestion.id as keyof PreferenciasUsuario]}
                      onSelect={handleSelectOption}
                      stepNumber={currentStep + 1}
                      totalSteps={discoverQuestions.length}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
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
                    {discoverQuestions.map((_, index) => (
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

                  <div className="w-20" />
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DiscoverModal;