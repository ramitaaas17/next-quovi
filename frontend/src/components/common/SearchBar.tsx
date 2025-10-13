'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, MapPin, Sliders, X, Pizza, Coffee, Salad, Beef, Fish } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (searchTerm: string) => void;
  showLocationFilter?: boolean;
  className?: string;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "¿Antojo de tacos al pastor o un café con leche?", 
  onSearch,
  showLocationFilter = true,
  className = "",
  initialValue = ""
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialValue);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    foodType: 'Todos los tipos',
    priceRange: 'Cualquier precio',
    distance: 'Cualquier distancia'
  });

  const handleSubmit = (): void => {
    if (onSearch) {
      onSearch(searchTerm);
    }
    console.log('Búsqueda:', { searchTerm, filters });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterType: string, value: string): void => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const applyFilters = (): void => {
    console.log('Aplicando filtros:', filters);
    if (onSearch) {
      onSearch(searchTerm);
    }
    setShowFilters(false);
  };

  const clearFilters = (): void => {
    setFilters({
      foodType: 'Todos los tipos',
      priceRange: 'Cualquier precio',
      distance: 'Cualquier distancia'
    });
    setSearchTerm('');
    setShowFilters(false);
  };

  // Icono personalizado para Tacos
  const TacosIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  );

  // Categorías con iconos en lugar de emojis
  const categories = [
    { icon: <TacosIcon />, label: 'Tacos', id: 'tacos' },
    { icon: <Pizza className="w-5 h-5" />, label: 'Pizza', id: 'pizza' },
    { icon: <Beef className="w-5 h-5" />, label: 'Burgers', id: 'burgers' },
    { icon: <Fish className="w-5 h-5" />, label: 'Sushi', id: 'sushi' },
    { icon: <Coffee className="w-5 h-5" />, label: 'Café', id: 'cafe' },
    { icon: <Salad className="w-5 h-5" />, label: 'Saludable', id: 'saludable' },
  ];

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Main Search Bar - Simplificado sin conflictos de motion */}
      <div 
        className={`relative backdrop-blur-xl border rounded-full shadow-2xl overflow-hidden mb-6 transition-all duration-300 ${
          isFocused ? 'scale-102 shadow-orange-400/40' : 'hover:shadow-orange-300/30'
        }`}
        style={{
          background: 'rgba(251, 146, 60, 0.15)',
          borderColor: 'rgba(251, 146, 60, 0.3)',
          boxShadow: isFocused 
            ? '0 25px 50px -12px rgba(251, 146, 60, 0.4), 0 0 0 1px rgba(251, 146, 60, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)' 
            : '0 20px 25px -5px rgba(251, 146, 60, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(251, 146, 60, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        <div className="flex items-center px-6 py-4">
          {/* Location indicator */}
          {showLocationFilter && (
            <div className="flex items-center space-x-2 mr-4 pr-4 border-r border-orange-300/50">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-700 hidden sm:inline">CDMX</span>
            </div>
          )}
          
          {/* Search Input - Sin wrapper motion */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="flex-1 text-gray-700 placeholder-gray-500 bg-transparent border-none outline-none text-base font-medium"
            autoComplete="off"
            spellCheck="false"
          />
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2 ml-4">
            {/* Voice Search Button */}
            <button
              type="button"
              className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                hoveredButton === 'voice'
                  ? 'bg-blue-500 shadow-lg transform scale-110'
                  : 'bg-white/60 hover:bg-blue-50'
              }`}
              onMouseEnter={() => setHoveredButton('voice')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <Mic className={`w-4 h-4 ${hoveredButton === 'voice' ? 'text-white' : 'text-blue-500'}`} />
            </button>
            
            {/* Filters Button */}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                hoveredButton === 'filters' || showFilters
                  ? 'bg-orange-500 shadow-lg transform scale-110'
                  : 'bg-white/60 hover:bg-orange-50'
              }`}
              onMouseEnter={() => setHoveredButton('filters')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {showFilters ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <Sliders className={`w-4 h-4 ${hoveredButton === 'filters' ? 'text-white' : 'text-orange-500'}`} />
              )}
            </button>
            
            {/* Search Button */}
            <button
              onClick={handleSubmit}
              className="relative flex items-center justify-center w-12 h-10 rounded-full bg-red-500 hover:bg-red-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ml-2"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Categories - Estilo original restaurado */}
      <motion.div 
        className="flex flex-wrap justify-center gap-3 mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, staggerChildren: 0.1 }}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 group overflow-hidden"
            style={{
              background: hoveredButton === category.id 
                ? 'rgba(251, 146, 60, 0.8)' 
                : 'rgba(255, 255, 255, 0.6)',
              boxShadow: hoveredButton === category.id
                ? '0 8px 20px rgba(251, 146, 60, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
                : '0 3px 10px rgba(251, 146, 60, 0.1), inset 0 1px 0 rgba(255,255,255,0.4)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(251, 146, 60, 0.2)'
            }}
            onMouseEnter={() => setHoveredButton(category.id)}
            onMouseLeave={() => setHoveredButton(null)}
            whileHover={{ 
              y: -6,
              scale: 1.1,
              transition: { 
                y: { type: "spring", stiffness: 300, damping: 25 },
                scale: { type: "spring", stiffness: 250, damping: 20 },
                duration: 0.4
              }
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
          >
            {/* Efecto de ondas al hacer hover */}
            {hoveredButton === category.id && (
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
            
            <div className="w-5 h-5 z-10 relative" style={{ color: hoveredButton === category.id ? '#ffffff' : '#fb923c' }}>
              {category.icon}
            </div>
            
            {/* Tooltip mejorado */}
            <AnimatePresence>
              {hoveredButton === category.id && (
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
                    {category.label}
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
          </motion.button>
        ))}
      </motion.div>

      {/* Filters Panel - Simplificado */}
      {showFilters && (
        <div
          className="backdrop-blur-xl border rounded-3xl shadow-2xl overflow-hidden mb-4 animate-in slide-in-from-top-4 duration-300"
          style={{
            background: 'rgba(251, 146, 60, 0.15)',
            borderColor: 'rgba(251, 146, 60, 0.3)',
            boxShadow: '0 25px 50px -12px rgba(251, 146, 60, 0.4), 0 0 0 1px rgba(251, 146, 60, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
          }}
        >
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Food Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-orange-800 mb-3">
                  Tipo de comida
                </label>
                <select 
                  className="w-full border border-orange-300/50 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all font-medium"
                  value={filters.foodType}
                  onChange={(e) => handleFilterChange('foodType', e.target.value)}
                >
                  <option>Todos los tipos</option>
                  <option>Mexicana</option>
                  <option>Italiana</option>
                  <option>Japonesa</option>
                  <option>Americana</option>
                  <option>Saludable</option>
                  <option>Cafeterías</option>
                </select>
              </div>
              
              {/* Price Filter */}
              <div>
                <label className="block text-sm font-semibold text-orange-800 mb-3">
                  Rango de precio
                </label>
                <select 
                  className="w-full border border-orange-300/50 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all font-medium"
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                >
                  <option>Cualquier precio</option>
                  <option>$ - Económico (hasta $150)</option>
                  <option>$$ - Moderado ($150-$300)</option>
                  <option>$$$ - Premium ($300+)</option>
                </select>
              </div>
              
              {/* Distance Filter */}
              <div>
                <label className="block text-sm font-semibold text-orange-800 mb-3">
                  Distancia máxima
                </label>
                <select 
                  className="w-full border border-orange-300/50 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all font-medium"
                  value={filters.distance}
                  onChange={(e) => handleFilterChange('distance', e.target.value)}
                >
                  <option>Cualquier distancia</option>
                  <option>Menos de 500m</option>
                  <option>Menos de 1 km</option>
                  <option>Menos de 3 km</option>
                  <option>Menos de 5 km</option>
                </select>
              </div>
            </div>
            
            {/* Filter Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-orange-300/30">
              <button 
                onClick={applyFilters}
                className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Aplicar filtros
              </button>
              <button 
                onClick={clearFilters}
                className="flex-1 sm:flex-none px-6 py-3 border border-orange-300/50 text-orange-700 rounded-2xl font-semibold transition-all duration-200 bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:scale-105"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;