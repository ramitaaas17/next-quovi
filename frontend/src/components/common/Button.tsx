'use client';

import React, { useState, useEffect } from 'react';
import { Utensils } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Props del componente (sin cambios)
interface ConfettiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  className?: string;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'default' | 'lg';
}

// Utility function (sin cambios)
const cn = (...classes: (string | boolean | undefined | null)[]) => {
  return classes.filter(Boolean).join(' ');
};

const ConfettiButton: React.FC<ConfettiButtonProps> = ({
  children,
  onClick,
  loading = false,
  className = '',
  icon: Icon = Utensils,
  variant = 'primary',
  size = 'default',
}) => {
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  
  useEffect(() => {
    // Lógica de carga del script (sin cambios)
    if (!(window as any).confetti) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js";
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  const triggerConfetti = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (scriptLoaded && (window as any).confetti) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      const confetti = (window as any).confetti;
      
      const brandColors = ['#FF8A65', '#FFAB91', '#FFB74D', '#FFCC80', '#FBE9E7', '#FFF3E0'];

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x, y },
        colors: brandColors
      });
    }
    onClick && onClick(e);
  };

  const variants = {
    primary:   "bg-gradient-to-br from-[#FFF3E0] to-[#FBE9E7] text-[#FF8A65] shadow-[#FFCCBC]/80 focus:ring-[#FFCCBC]",
    secondary: "bg-[#FBE9E7]/60 backdrop-blur-lg text-[#FF7043] border border-white/80 shadow-[#FFAB91]/20 focus:ring-[#FFCCBC]",
    success:   "bg-gradient-to-br from-[#A7F3D0] to-[#99F6E4] text-[#065F46] shadow-[#A7F3D0]/70 focus:ring-[#D1FAE5]",
    danger:    "bg-gradient-to-br from-[#FBCFE8] to-[#FECDD3] text-[#9F1239] shadow-[#FBCFE8]/70 focus:ring-[#FCE7F3]"
  };

  const sizes = {
    sm: "py-2 px-4 text-sm rounded-lg",
    default: "py-4 px-6 rounded-2xl",
    lg: "py-5 px-8 text-lg rounded-3xl"
  };

  return (
    <button
      onClick={triggerConfetti}
      disabled={loading}
      className={cn(
        "relative w-full font-semibold",
        "shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300",
        "focus:outline-none focus:ring-4",
        "active:scale-95 overflow-hidden group",
        "disabled:cursor-not-allowed disabled:opacity-75",
        variants[variant],
        sizes[size],
        className
      )}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? ( 
          <> 
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" /> 
            Procesando... 
          </> 
        ) : ( 
          <> 
            <Icon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" /> 
            {children} 
          </> 
        )}
      </span>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </div>
    </button>
  );
};

export default ConfettiButton;