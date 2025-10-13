'use client';

import React from 'react';
import { SearchCheck, HeartHandshake, Zap } from 'lucide-react';

interface Benefit {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Benefits: React.FC = () => {
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

  return (
    <section id="benefits" className="py-24 sm:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl">
            Descubre una nueva forma de <span className="text-orange-500">explorar</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
            Quovi no es solo un buscador. Es tu compañero inteligente para encontrar las mejores experiencias locales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="group relative text-center p-8 transition-all duration-300">
              <div className="absolute inset-0 bg-orange-400/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              
              <div className="relative bg-white/60 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-8 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-orange-200/50">
                <div className="mx-auto w-20 h-20 rounded-2xl bg-orange-100/80 flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-wide">
                  {benefit.title}
                </h3>

                {/* Descripción */}
                <p className="text-slate-500 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action opcional */}
        <div className="text-center mt-20">
          <button className="px-10 py-4 bg-slate-800 text-white rounded-full hover:bg-slate-900 transition-colors font-semibold shadow-lg">
            Empezar a descubrir
          </button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;