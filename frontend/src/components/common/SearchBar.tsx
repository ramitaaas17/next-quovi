import React, { useState } from 'react';
import { Search, Mic, MapPin, Sliders, X, Pizza, Coffee, Salad, Beef, Fish } from 'lucide-react';
import restauranteService, { BuscarRestaurantesRequest } from '@/services/restauranteService';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (resultados: any[]) => void;
  showLocationFilter?: boolean;
  className?: string;
  initialValue?: string;
  userLocation?: { lat: number; lng: number };
}

interface Filtros {
  foodType: string;
  priceRange: string;
  distance: string;
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
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<Filtros>({
    foodType: 'Todos los tipos',
    priceRange: 'Cualquier precio',
    distance: 'Cualquier distancia'
  });

  const categoryMap: Record<string, string> = {
    'Tacos': 'Tacos',
    'Pizzas': 'Pizzas',
    'Argentina': 'Argentina',
    'Mariscos': 'Mariscos',
    'Cafetería': 'Cafetería',
    'Vegana': 'Vegana',
  };

  const TacosIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  );

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

      if (filters.distance !== 'Cualquier distancia') {
        searchFilters.radio = parseFloat(filters.distance);
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

  const handleFilterChange = (filterType: string, value: string): void => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const applyFilters = (): void => {
    setShowFilters(false);
    handleSubmit();
  };

  const clearFilters = (): void => {
    setFilters({
      foodType: 'Todos los tipos',
      priceRange: 'Cualquier precio',
      distance: 'Cualquier distancia'
    });
    setSearchTerm('');
    setActiveCategory(null);
    setShowFilters(false);
    setError(null);
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
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
          {showLocationFilter && (
            <div className="flex items-center space-x-2 mr-4 pr-4 border-r border-orange-300/50">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-700 hidden sm:inline">CDMX</span>
            </div>
          )}
          
          {activeCategory && (
            <div className="flex items-center gap-2 mr-3 px-3 py-1.5 bg-orange-500 text-white rounded-full text-sm font-medium">
              <span>{categories.find(c => c.id === activeCategory)?.label}</span>
              <button
                onClick={() => setActiveCategory(null)}
                className="hover:bg-orange-600 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={activeCategory ? `Buscando ${categories.find(c => c.id === activeCategory)?.label}...` : placeholder}
            className="flex-1 text-gray-700 placeholder-gray-500 bg-transparent border-none outline-none text-base font-medium"
            autoComplete="off"
            spellCheck="false"
            disabled={isSearching}
          />
          
          <div className="flex items-center space-x-2 ml-4">
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
            
            <button
              onClick={handleSubmit}
              disabled={isSearching}
              className="relative flex items-center justify-center w-12 h-10 rounded-full bg-red-500 hover:bg-red-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              disabled={isSearching}
              className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 group overflow-hidden ${
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
              {isActive && (
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{
                    background: 'radial-gradient(circle, rgba(251, 146, 60, 0.4) 0%, transparent 70%)'
                  }}
                />
              )}
              
              <div 
                className="w-5 h-5 z-10 relative transition-transform duration-300" 
                style={{ 
                  color: isActive || hoveredButton === category.id ? '#ffffff' : '#fb923c',
                  transform: isActive ? 'scale(1.2)' : 'scale(1)'
                }}
              >
                {category.icon}
              </div>
              
              {hoveredButton === category.id && !isActive && (
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none z-20"
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

      {isSearching && (
        <div className="text-center text-orange-600 text-sm font-medium animate-pulse">
          Buscando restaurantes...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 text-sm font-medium bg-red-50 py-2 px-4 rounded-lg">
          {error}
        </div>
      )}

      {showFilters && (
        <div className="mt-4 p-4 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-orange-200">
          <h3 className="text-lg font-bold text-orange-800 mb-3">Filtros Avanzados</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Distancia (km)</label>
              <select
                value={filters.distance}
                onChange={(e) => handleFilterChange('distance', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option>Cualquier distancia</option>
                <option>1</option>
                <option>3</option>
                <option>5</option>
                <option>10</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option>Cualquier precio</option>
                <option>$</option>
                <option>$$</option>
                <option>$$$</option>
                <option>$$$$</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={applyFilters}
                disabled={isSearching}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50"
              >
                Aplicar
              </button>
              <button
                onClick={clearFilters}
                disabled={isSearching}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50"
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