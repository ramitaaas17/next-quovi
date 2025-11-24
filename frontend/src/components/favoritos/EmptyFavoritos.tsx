'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Pantalla mostrada cuando el usuario no tiene favoritos guardados
const EmptyFavoritos: React.FC = () => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 sm:py-20 px-4"
    >
      {/* Icono animado central */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1 
        }}
        className="relative mb-6 sm:mb-8"
      >
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
          <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-orange-400" />
        </div>
        
        {/* Animacion de pulso */}
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

      {/* Mensaje principal */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 text-center">
        Aún no tienes favoritos
      </h2>
      
      <p className="text-sm sm:text-base text-gray-600 text-center max-w-md mb-6 sm:mb-8 px-4">
        Explora restaurantes increíbles y guarda tus favoritos para acceder a ellos rápidamente
      </p>

      {/* Boton de exploracion */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push('/dashboard')}
        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center space-x-2 sm:space-x-3 shadow-lg hover:shadow-xl transition-shadow"
      >
        <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Explorar restaurantes</span>
      </motion.button>

      {/* Tarjetas de sugerencias */}
      <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl w-full px-4">
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
            <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mx-auto mb-2" />
            <p className="text-xs sm:text-sm text-gray-600">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EmptyFavoritos;