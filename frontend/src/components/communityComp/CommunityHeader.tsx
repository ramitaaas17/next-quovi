import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CommunityHeaderProps {
  onBack?: () => void;
}

export default function CommunityHeader({ onBack }: CommunityHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="mb-6 sm:mb-8">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={handleBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 mb-4 sm:mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium text-sm sm:text-base">Volver al inicio</span>
      </motion.button>

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
          Comunidad
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Descubre lo que otros amantes de la comida están disfrutando
        </p>
      </motion.div>
    </div>
  );
}