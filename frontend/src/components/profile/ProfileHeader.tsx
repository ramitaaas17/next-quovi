'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Shield } from 'lucide-react';

interface ProfileHeaderProps {
  nombreCompleto: string;
  fechaRegistro: string;
  emailVerificado: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  nombreCompleto,
  fechaRegistro,
  emailVerificado
}) => {
  const formatFecha = (fecha: string): string => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="relative bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 p-10 overflow-hidden rounded-t-[2.5rem]">
      {/* Patrón decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>
      
      {/* Sparkles decorativos */}
      <motion.div
        className="absolute top-8 right-12"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sparkles className="w-6 h-6 text-yellow-200" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-12 left-16"
        animate={{
          rotate: [360, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Heart className="w-5 h-5 text-pink-200" />
      </motion.div>

      <div className="relative text-center">
        {/* Título */}
        <motion.h1 
          className="text-3xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {nombreCompleto}
        </motion.h1>
        
        {/* Info adicional */}
        <motion.div
          className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Sparkles className="w-4 h-4 text-yellow-200" />
          <p className="text-white/90 text-sm font-medium">
            Miembro desde {formatFecha(fechaRegistro)}
          </p>
        </motion.div>

        {/* Badge de verificación */}
        {emailVerificado && (
          <motion.div
            className="mt-4 inline-flex items-center space-x-2 bg-green-500/80 backdrop-blur-md px-4 py-2 rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Shield className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">Email verificado</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;