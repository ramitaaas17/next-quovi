import React from 'react';
import { motion } from 'framer-motion';

interface User {
  fullName: string;
  avatar: string | null;
}

interface NewPostButtonProps {
  user: User;
  onClick: () => void;
}

export default function NewPostButton({ user, onClick }: NewPostButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onClick={onClick}
      className="w-full mb-4 sm:mb-6 backdrop-blur-xl border rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 flex items-center space-x-3 hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
      style={{
        background: 'rgba(251, 146, 60, 0.15)',
        borderColor: 'rgba(251, 146, 60, 0.3)',
      }}
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-white font-semibold text-base sm:text-lg">
          {user.fullName.charAt(0).toUpperCase()}
        </span>
      </div>
      <span className="text-gray-600 text-sm sm:text-base">
        ¿Qué estás comiendo hoy?
      </span>
    </motion.button>
  );
}