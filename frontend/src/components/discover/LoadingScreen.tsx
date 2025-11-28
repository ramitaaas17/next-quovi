'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Search, MapPin, Star } from 'lucide-react';

/**
 * Pantalla de carga animada mientras se procesan las recomendaciones
 * Con iconos flotantes y mensajes motivacionales
 */
const LoadingScreen: React.FC = () => {
  const loadingIcons = [
    { Icon: Search, delay: 0, color: '#f59e0b' },
    { Icon: MapPin, delay: 0.2, color: '#ec4899' },
    { Icon: Star, delay: 0.4, color: '#8b5cf6' },
    { Icon: Sparkles, delay: 0.6, color: '#14b8a6' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-12 space-y-8"
    >
      {/* Contenedor de iconos giratorios */}
      <div className="relative w-32 h-32">
        {/* Anillo externo pulsante */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #f59e0b20, #ec489920, #8b5cf620)',
            border: '2px solid rgba(236, 72, 153, 0.2)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Iconos orbitando */}
        {loadingIcons.map((item, index) => {
          const { Icon } = item;
          const angle = (index * 360) / loadingIcons.length;
          
          return (
            <motion.div
              key={index}
              className="absolute w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${item.color}20, ${item.color}40)`,
                border: `2px solid ${item.color}30`,
                left: '50%',
                top: '50%',
                marginLeft: '-24px',
                marginTop: '-24px'
              }}
              animate={{
                rotate: [angle, angle + 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay
                }
              }}
            >
              <Icon 
                className="w-6 h-6" 
                style={{ color: item.color }}
                strokeWidth={2.5}
              />
            </motion.div>
          );
        })}

        {/* Centro brillante */}
        <motion.div
          className="absolute inset-0 m-auto w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6)',
          }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: 360
          }}
          transition={{
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          <Sparkles className="w-8 h-8 text-white" strokeWidth={2.5} />
        </motion.div>
      </div>

      {/* Texto animado */}
      <motion.div
        className="text-center space-y-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
          Buscando la magia perfecta...
        </h3>
        
        <motion.p
          className="text-gray-600 text-center max-w-md text-sm sm:text-base px-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Estamos analizando miles de opciones para encontrar los mejores lugares para ti
        </motion.p>
      </motion.div>

      {/* Puntos de progreso */}
      <div className="flex items-center space-x-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #ec4899)'
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Mensaje adicional */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 rounded-2xl p-4 max-w-md"
      >
        <p className="text-sm text-gray-600 text-center">
          💡 <span className="font-semibold">Tip:</span> Nuestras recomendaciones se basan en IA para darte las mejores opciones según tus preferencias
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;