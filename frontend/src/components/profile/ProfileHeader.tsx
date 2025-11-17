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
  const formatFecha = (fecha: string): string => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="relative bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 pt-8 pb-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-4">
          <motion.div
            className="flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-yellow-200" />
            <p className="text-white/90 text-sm font-medium">
              Miembro desde {formatFecha(fechaRegistro)}
            </p>
          </motion.div>

          {emailVerificado && (
            <motion.div
              className="flex items-center space-x-2 bg-green-500/80 backdrop-blur-md px-4 py-2 rounded-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Shield className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Email verificado</span>
            </motion.div>
          )}
        </div>

        <motion.h1 
          className="text-4xl font-bold text-white text-center"
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