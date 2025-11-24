import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  restaurantId: number;
  initialIsFavorite?: boolean;
  onToggle?: (isFavorite: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Boton para marcar/desmarcar restaurantes como favoritos
const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  restaurantId,
  initialIsFavorite = false,
  onToggle,
  size = 'md',
  className = ''
}) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  // Agregar o quitar de favoritos
  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debes iniciar sesión para guardar favoritos');
      return;
    }

    setIsLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
      
      if (isFavorite) {
        // Quitar de favoritos
        await fetch(`${API_URL}/favoritos/${restaurantId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        setIsFavorite(false);
        onToggle?.(false);
      } else {
        // Agregar a favoritos
        await fetch(`${API_URL}/favoritos`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ idRestaurante: restaurantId })
        });
        
        setIsFavorite(true);
        onToggle?.(true);
      }
    } catch (error) {
      alert('Error al actualizar favoritos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`${sizeClasses[size]} bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-colors ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <Heart 
        className={`${iconSizes[size]} transition-colors ${
          isFavorite 
            ? 'fill-red-500 text-red-500' 
            : 'text-gray-600'
        }`}
      />
    </motion.button>
  );
};

export default FavoriteButton;