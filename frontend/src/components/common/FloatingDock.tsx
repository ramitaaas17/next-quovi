'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

interface DockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

interface FloatingDockProps {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  items,
  desktopClassName = '',
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Animación suave del mouse
  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  return (
    <div 
      className={`flex items-center justify-center ${desktopClassName}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredItem(null);
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <motion.div 
        className="relative flex items-center space-x-3 backdrop-blur-xl border rounded-full px-6 py-3 shadow-2xl"
        style={{
          background: 'rgba(251, 146, 60, 0.15)',
          borderColor: 'rgba(251, 146, 60, 0.3)',
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(251, 146, 60, 0.4), 0 0 0 1px rgba(251, 146, 60, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)' 
            : '0 20px 25px -5px rgba(251, 146, 60, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(251, 146, 60, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
          y: isHovered ? -1 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        {/* Efecto de brillo sutil con tonos naranjas */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            opacity: isHovered ? [0, 0.2, 0] : 0,
          }}
          transition={{
            duration: 3,
            repeat: isHovered ? Infinity : 0,
            ease: "linear"
          }}
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(251, 146, 60, 0.3) 50%, transparent 100%)',
          }}
        />

        {items.map((item, index) => (
          <motion.div
            key={item.title}
            className="relative z-10"
            onHoverStart={() => setHoveredItem(item.title)}
            onHoverEnd={() => setHoveredItem(null)}
            whileHover={{ 
              y: -6,
              scale: 1.1,
              transition: { 
                y: { type: "spring", stiffness: 300, damping: 25 },
                scale: { type: "spring", stiffness: 250, damping: 20 },
                duration: 0.4
              }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
          >
            <a
              href={item.href}
              className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 group overflow-hidden"
              style={{
                background: hoveredItem === item.title 
                  ? 'rgba(251, 146, 60, 0.8)' 
                  : 'rgba(255, 255, 255, 0.6)',
                boxShadow: hoveredItem === item.title
                  ? '0 8px 20px rgba(251, 146, 60, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
                  : '0 3px 10px rgba(251, 146, 60, 0.1), inset 0 1px 0 rgba(255,255,255,0.4)'
              }}
            >
              {/* Efecto de ondas al hacer hover */}
              {hoveredItem === item.title && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ scale: 0, opacity: 0.4 }}
                  animate={{ scale: 1.2, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{
                    background: 'radial-gradient(circle, rgba(251, 146, 60, 0.5) 0%, transparent 70%)'
                  }}
                />
              )}
              
              <motion.div 
                className="w-5 h-5 z-10 relative"
                animate={{
                  color: hoveredItem === item.title ? '#ffffff' : '#ea580c',
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {item.icon}
              </motion.div>
              
              {/* Tooltip mejorado */}
              <AnimatePresence>
                {hoveredItem === item.title && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: -50, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.9 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 25,
                      opacity: { duration: 0.3 }
                    }}
                    className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none z-20"
                  >
                    <div className="bg-orange-900/90 text-orange-100 text-sm font-medium px-3 py-2 rounded-full whitespace-nowrap shadow-2xl border border-orange-600/50">
                      {item.title}
                      {/* Flecha del tooltip */}
                      <motion.div 
                        className="absolute top-full left-1/2 transform -translate-x-1/2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="border-4 border-transparent border-t-orange-900" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </a>
          </motion.div>
        ))}

        {/* Indicador de mouse (efecto magnético sutil) */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            x,
            y,
            scale: isHovered ? 1 : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </motion.div>

      {/* Estilos para la animación shimmer */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
};