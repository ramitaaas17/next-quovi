// frontend/src/components/favoritos/EmptyFavoritos.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const EmptyFavoritos: React.FC = () => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      {/* Icono animado */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1 
        }}
        className="relative mb-8"
      >
        <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
          <Heart className="w-16 h-16 text-orange-400" />
        </div>
        
        {/* Círculos decorativos */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 border-4 border-orange-300 rounded-full"
        />
      </motion.div>

      {/* Texto principal */}
      <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
        Aún no tienes favoritos
      </h2>
      
      <p className="text-gray-600 text-center max-w-md mb-8">
        Explora restaurantes increíbles y guarda tus favoritos para acceder a ellos rápidamente
      </p>

      {/* Botón de acción */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push('/dashboard')}
        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-3 shadow-lg hover:shadow-xl transition-shadow"
      >
        <Search className="w-5 h-5" />
        <span>Explorar restaurantes</span>
      </motion.button>

      {/* Sugerencias */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
        {[
          { icon: Heart, text: 'Guarda tus lugares favoritos' },
          { icon: Search, text: 'Descubre nuevos sabores' },
          { icon: Heart, text: 'Accede rápidamente' },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm"
          >
            <item.icon className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EmptyFavoritos;