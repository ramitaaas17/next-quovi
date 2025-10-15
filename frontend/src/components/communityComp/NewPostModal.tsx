import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Send, Star } from 'lucide-react';
import Button from '@/components/common/Button';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (caption: string, rating: number) => void;
}

export default function NewPostModal({ isOpen, onClose, onSubmit }: NewPostModalProps) {
  const [caption, setCaption] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = () => {
    if (caption.trim() && rating > 0) {
      onSubmit(caption, rating);
      setCaption('');
      setRating(0);
    }
  };

  const handleClose = () => {
    setCaption('');
    setRating(0);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-orange-400 to-red-500 p-4 sm:p-6 text-center sticky top-0 z-10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Compartir experiencia
              </h2>
              <p className="text-white/80 text-xs sm:text-sm mt-1 sm:mt-2">
                Cuéntanos sobre tu última visita
              </p>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              {/* Restaurant Selection */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Restaurante
                </label>
                <select className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border border-orange-200/50 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all">
                  <option>Selecciona un restaurante</option>
                  <option>Tacos El Güero</option>
                  <option>Café Central</option>
                  <option>Sushi Bar</option>
                  <option>Pizza Roma</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Calificación
                </label>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className="transition-transform hover:scale-110 active:scale-95"
                      onClick={() => setRating(i + 1)}
                      onMouseEnter={() => setHoveredStar(i + 1)}
                      onMouseLeave={() => setHoveredStar(0)}
                      aria-label={`${i + 1} estrellas`}
                    >
                      <Star
                        className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                          i < (hoveredStar || rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-2">
                    Has seleccionado {rating} {rating === 1 ? 'estrella' : 'estrellas'}
                  </p>
                )}
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Cuéntanos tu experiencia
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="¿Qué te pareció? Comparte tu opinión..."
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border border-orange-200/50 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all"
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">
                    {caption.length}/500 caracteres
                  </p>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Foto
                </label>
                <button 
                  type="button"
                  className="w-full py-6 sm:py-8 border-2 border-dashed border-orange-300 rounded-xl hover:border-orange-400 transition-all group active:scale-95"
                >
                  <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-orange-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-xs sm:text-sm text-gray-600">
                    Click para subir una foto
                  </p>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4">
                <Button
                  onClick={handleClose}
                  variant="primary"
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSubmit}
                  variant="primary"
                  className="flex-1"
                  disabled={!caption.trim() || rating === 0}
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Publicar</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}