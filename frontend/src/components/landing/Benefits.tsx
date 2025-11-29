'use client';

import React, { useRef } from 'react';
import { SearchCheck, HeartHandshake, Zap } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import ParticleBackground from '../common/Particles';

interface Benefit {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}


const Benefits: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const benefits: Benefit[] = [
    {
      id: '01',
      icon: <SearchCheck size={40} className="text-orange-600" />,
      title: 'Búsqueda Inteligente',
      description: 'Encuentra sabores únicos y experiencias auténticas cerca de ti con filtros precisos y sugerencias personalizadas.'
    },
    {
      id: '02', 
      icon: <HeartHandshake size={40} className="text-orange-600" />,
      title: 'Apoyo a lo Local',
      description: 'Cada búsqueda te conecta con los mejores restaurantes y locales de tu comunidad, fortaleciendo la economía.'
    },
    {
      id: '03',
      icon: <Zap size={40} className="text-orange-600" />,
      title: 'Descubrimientos al Instante', 
      description: 'Nuestra plataforma es rápida y ligera, diseñada para que encuentres lo que buscas en segundos, sin complicaciones.'
    }
  ];

  // Variantes de animación para el contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  // Variantes de animación para cada tarjeta
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  return (
    <section ref={ref} className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Partículas de fondo */}
      <ParticleBackground 
        particleCount={50}
        colors={['#ff6b35', '#f7931e', '#2ecc71']}
        className="opacity-60"
      />
      
      {/* Gradiente de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 -z-10" />
      
      {/* Blobs decorativos */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Título y descripción con animación */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-800">
            Descubre una nueva forma de <span className="text-orange-500">explorar</span>
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-slate-600 max-w-2xl mx-auto px-4">
            Quovi no es solo un buscador. Es tu compañero inteligente para encontrar las mejores experiencias locales.
          </p>
        </motion.div>

        {/* Grid de beneficios con animación escalonada */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {benefits.map((benefit) => (
            <motion.div 
              key={benefit.id} 
              className="group relative text-center p-6 sm:p-8"
              variants={cardVariants}
            >
              {/* Efecto de brillo al hover */}
              <div className="absolute inset-0 bg-orange-400/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              
              {/* Card del beneficio */}
              <div className="relative bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-orange-200/50">
                
                {/* Icono con animación */}
                <motion.div 
                  className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-orange-100/80 flex items-center justify-center mb-4 sm:mb-6"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {benefit.icon}
                </motion.div>

                {/* Título */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3 tracking-wide">
                  {benefit.title}
                </h3>

                {/* Descripción */}
                <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA final con animación */}
        <motion.div 
          className="text-center mt-12 sm:mt-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <button className="px-8 sm:px-10 py-3 sm:py-4 bg-slate-800 text-white text-sm sm:text-base rounded-full hover:bg-slate-900 hover:scale-105 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
            Empezar a descubrir
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;