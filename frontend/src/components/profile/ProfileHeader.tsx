'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield } from 'lucide-react';

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
  // Formatea fecha de registro en español
  const formatFecha = (fecha: string): string => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="relative bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 pt-6 sm:pt-8 pb-16 sm:pb-20 overflow-hidden">
      {/* Patrón de fondo decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Badges informativos */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
          <motion.div
            className="flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-200" />
            <p className="text-white/90 text-xs sm:text-sm font-medium">
              Miembro desde {formatFecha(fechaRegistro)}
            </p>
          </motion.div>

          {emailVerificado && (
            <motion.div
              className="flex items-center space-x-2 bg-green-500/80 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              <span className="text-white text-xs sm:text-sm font-medium">Email verificado</span>
            </motion.div>
          )}
        </div>

        {/* Nombre del usuario */}
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {nombreCompleto}
        </motion.h1>
      </div>
    </div>
  );
};

export default ProfileHeader;