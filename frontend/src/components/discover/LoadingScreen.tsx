'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

/**
 * Pantalla de carga mientras se procesan las recomendaciones
 * Diseño minimalista sin elementos distractores
 */
const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      {/* Spinner principal */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 rounded-full border-4 border-orange-100 border-t-orange-400"
      />

      {/* Texto */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">
          Buscando los mejores lugares
        </h3>
        <p className="text-sm text-gray-500">
          Esto tomará solo un momento
        </p>
      </div>

      {/* Puntos de progreso */}
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-orange-400"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;