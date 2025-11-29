// frontend/src/components/discover/LoadingScreen.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

/**
 * Pantalla de carga con mascota Quovi animada
 * Diseño consistente con el resto de la app
 */
const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-8">
      {/* Mascota Quovi con animaciones */}
      <div className="relative">
        {/* Círculos pulsantes de fondo */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid',
              borderColor: i === 0 ? '#fb923c' : i === 1 ? '#f97316' : '#fdba74',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 0, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Mascota con movimiento suave */}
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative w-32 h-32"
        >
          <Image
            src="/images/quoviMain.png"
            alt="Quovi buscando"
            width={128}
            height={128}
            className="object-contain"
          />
        </motion.div>

        {/* Partículas flotantes alrededor */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
              top: '50%',
              left: '50%',
            }}
            animate={{
              x: Math.cos((i * Math.PI) / 4) * 60,
              y: Math.sin((i * Math.PI) / 4) * 60,
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Texto con animación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center space-y-3"
      >
        <h3 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-orange-500" />
          </motion.div>
          Buscando los mejores lugares
        </h3>
        
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm text-gray-500"
        >
          Analizando tus preferencias...
        </motion.p>
      </motion.div>

      {/* Barra de progreso infinita */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #fb923c 0%, #f97316 50%, #fb923c 100%)'
          }}
          animate={{
            x: ['-100%', '200%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Puntos de progreso animados */}
      <div className="flex space-x-3">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)'
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Mensajes rotativos */}
      <motion.div
        key={Math.floor(Date.now() / 3000)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-center"
      >
        <p className="text-xs text-gray-400 italic">
          {[
            'Consultando con nuestros expertos culinarios...',
            'Evaluando las mejores opciones para ti...',
            'Preparando recomendaciones deliciosas...',
            'Calculando distancias y tiempos...'
          ][Math.floor(Date.now() / 3000) % 4]}
        </p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;