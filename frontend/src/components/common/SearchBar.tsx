// frontend/src/components/common/SearchBar.tsx
import React, { useState } from 'react';
import { Search, MapPin, X, Pizza, Coffee, Salad, Beef, Fish } from 'lucide-react';
import restauranteService, { BuscarRestaurantesRequest } from '@/services/restauranteService';
import DiscoverButton from '../discover/DiscoverButton';
import DiscoverModal from '../discover/DiscoverModal';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (resultados: any[]) => void;
  showLocationFilter?: boolean;
  className?: string;
  initialValue?: string;
  userLocation?: { lat: number; lng: number };
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Antojo de tacos al pastor o un cafe con leche?", 
  onSearch,
  showLocationFilter = true,
  className = "",
  initialValue = "",
  userLocation
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialValue);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDiscoverModalOpen, setIsDiscoverModalOpen] = useState(false);

  // Ícono de taco mejorado
  const TacosIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 8.5c0-1.5-1.5-2.5-3-2.5-1 0-2 .5-2.5 1.5-.5-1-1.5-1.5-2.5-1.5s-2 .5-2.5 1.5C10 6.5 9 6 8 6c-1.5 0-3 1-3 2.5 0 .5.2 1 .5 1.5L3 16c-.5 1 0 2 1 2.5.3.2.7.5 1.5.5H18c.8 0 1.2-.3 1.5-.5 1-.5 1.5-1.5 1-2.5l-2.5-6c.3-.5.5-1 .5-1.5zm-13 1c0-.3.2-.5.5-.5h.3l1.7 6H6.5L8 9.5zm3 0h1.5c.3 0 .5.2.5.5v6h-2.5l-1.5-6h1.5zM13 15.5v-6c0-.3.2-.5.5-.5h1.5l1.5 6h-3.5zm4.5 0l-1.5-6h.3c.3 0 .5.2.5.5L16 15.5z"/>
    </svg>
  );

  const categoryMap: Record<string, string> = {
    'Tacos': 'Tacos',
    'Pizzas': 'Pizzas',
    'Argentina': 'Argentina',
    'Mariscos': 'Mariscos',
    'Cafetería': 'Cafetería',
    'Vegana': 'Vegana',
  };

  const categories = [
    { icon: <TacosIcon />, label: 'Tacos', id: 'Tacos' },
    { icon: <Pizza className="w-5 h-5" />, label: 'Pizza', id: 'Pizzas' },
    { icon: <Beef className="w-5 h-5" />, label: 'Parrilla', id: 'Argentina' },
    { icon: <Fish className="w-5 h-5" />, label: 'Mariscos', id: 'Mariscos' },
    { icon: <Coffee className="w-5 h-5" />, label: 'Cafe', id: 'Cafetería' },
    { icon: <Salad className="w-5 h-5" />, label: 'Saludable', id: 'Vegana' },
  ];

  const handleSubmit = async (): Promise<void> => {
    if (!searchTerm && !activeCategory) {
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const searchFilters: BuscarRestaurantesRequest = {};

      if (searchTerm) {
        searchFilters.termino = searchTerm;
      }

      if (activeCategory) {
        searchFilters.categoria = categoryMap[activeCategory];
      }

      if (userLocation) {
        searchFilters.latitud = userLocation.lat;
        searchFilters.longitud = userLocation.lng;
      }

      const resultados = await restauranteService.buscarRestaurantes(searchFilters);

      if (onSearch) {
        onSearch(resultados);
      }

      window.dispatchEvent(new CustomEvent('searchResults', { 
        detail: { 
          data: resultados,
          total: resultados.length,
          filtros: searchFilters
        } 
      }));

    } catch (error: any) {
      setError(error.message || 'Error al buscar restaurantes');
      
      window.dispatchEvent(new CustomEvent('searchError', { 
        detail: { error: error.message } 
      }));
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setError(null);
    
    if (e.target.value && activeCategory) {
      setActiveCategory(null);
    }
  };

  const handleCategoryClick = async (categoryId: string): Promise<void> => {
    const newCategory = activeCategory === categoryId ? null : categoryId;
    setActiveCategory(newCategory);
    setError(null);

    if (!newCategory) {
      return;
    }

    setIsSearching(true);

    try {
      const searchFilters: BuscarRestaurantesRequest = {
        categoria: categoryMap[newCategory],
      };

      if (userLocation) {
        searchFilters.latitud = userLocation.lat;
        searchFilters.longitud = userLocation.lng;
        searchFilters.radio = 10;
      }

      const resultados = await restauranteService.buscarRestaurantes(searchFilters);

      if (onSearch) {
        onSearch(resultados);
      }

      window.dispatchEvent(new CustomEvent('searchResults', { 
        detail: { 
          data: resultados,
          total: resultados.length,
          filtros: searchFilters
        } 
      }));

    } catch (error: any) {
      setError(error.message || 'Error al buscar por categoria');
      
      window.dispatchEvent(new CustomEvent('searchError', { 
        detail: { error: error.message } 
      }));
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <div className={`w-full max-w-4xl mx-auto px-4 sm:px-0 ${className}`}>
        {/* Barra de búsqueda principal */}
        <div 
          className={`relative backdrop-blur-xl border rounded-full shadow-2xl overflow-hidden mb-4 sm:mb-6 transition-all duration-300 ${
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
          <div className="flex items-center px-3 sm:px-6 py-3 sm:py-4 gap-2">
            {/* Ubicación - oculta en móviles pequeños */}
            {showLocationFilter && (
              <div className="hidden sm:flex items-center space-x-2 pr-3 sm:pr-4 border-r border-orange-300/50">
                <MapPin className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-700">CDMX</span>
              </div>
            )}
            
            {/* Categoría activa */}
            {activeCategory && (
              <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 bg-orange-500 text-white rounded-full text-xs sm:text-sm font-medium">
                <span className="hidden sm:inline">{categories.find(c => c.id === activeCategory)?.label}</span>
                <span className="sm:hidden">{categories.find(c => c.id === activeCategory)?.label.slice(0, 3)}</span>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="hover:bg-orange-600 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            
            {/* Input de búsqueda */}
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={activeCategory ? `Buscando ${categories.find(c => c.id === activeCategory)?.label}...` : placeholder}
              className="flex-1 text-gray-700 placeholder-gray-500 bg-transparent border-none outline-none text-sm sm:text-base font-medium min-w-0"
              autoComplete="off"
              spellCheck="false"
              disabled={isSearching}
            />
            
            {/* Botones de acción */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Botón Descubre */}
              <DiscoverButton onClick={() => setIsDiscoverModalOpen(true)} />
              
              {/* Botón de búsqueda */}
              <button
                onClick={handleSubmit}
                disabled={isSearching}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-10 rounded-full bg-red-500 hover:bg-red-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Categorías - diseño responsive */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                disabled={isSearching}
                className={`relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-500 group overflow-hidden ${
                  isActive ? 'ring-2 ring-orange-500 ring-offset-2' : ''
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{
                  background: isActive 
                    ? 'rgba(251, 146, 60, 0.9)' 
                    : hoveredButton === category.id 
                      ? 'rgba(251, 146, 60, 0.8)' 
                      : 'rgba(255, 255, 255, 0.6)',
                  boxShadow: isActive
                    ? '0 12px 24px rgba(251, 146, 60, 0.5), inset 0 1px 0 rgba(255,255,255,0.3)'
                    : hoveredButton === category.id
                      ? '0 8px 20px rgba(251, 146, 60, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
                      : '0 3px 10px rgba(251, 146, 60, 0.1), inset 0 1px 0 rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(251, 146, 60, 0.2)',
                  transform: isActive ? 'scale(1.1)' : 'scale(1)'
                }}
                onMouseEnter={() => setHoveredButton(category.id)}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {/* Animación de pulso para categoría activa */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{
                      background: 'radial-gradient(circle, rgba(251, 146, 60, 0.4) 0%, transparent 70%)'
                    }}
                  />
                )}
                
                {/* Ícono de categoría */}
                <div 
                  className="w-4 h-4 sm:w-5 sm:h-5 z-10 relative transition-transform duration-300" 
                  style={{ 
                    color: isActive || hoveredButton === category.id ? '#ffffff' : '#fb923c',
                    transform: isActive ? 'scale(1.2)' : 'scale(1)'
                  }}
                >
                  {category.icon}
                </div>
                
                {/* Tooltip - solo en desktop */}
                {hoveredButton === category.id && !isActive && (
                  <div
                    className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 pointer-events-none z-20"
                    style={{ top: '-55px' }}
                  >
                    <div className="bg-orange-900/90 text-orange-100 text-sm font-medium px-3 py-2 rounded-full whitespace-nowrap shadow-2xl border border-orange-600/50">
                      {category.label}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                        <div className="border-4 border-transparent border-t-orange-900" />
                      </div>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Estados de carga y error */}
        {isSearching && (
          <div className="text-center text-orange-600 text-xs sm:text-sm font-medium animate-pulse">
            Buscando restaurantes...
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 text-xs sm:text-sm font-medium bg-red-50 py-2 px-4 rounded-lg">
            {error}
          </div>
        )}
      </div>

      {/* Modal de Descubre - ✅ FIX: userLocation correctamente pasado */}
      <DiscoverModal
        isOpen={isDiscoverModalOpen}
        onClose={() => setIsDiscoverModalOpen(false)}
        userLocation={userLocation || null}
      />
    </>
  );
};

export default SearchBar;