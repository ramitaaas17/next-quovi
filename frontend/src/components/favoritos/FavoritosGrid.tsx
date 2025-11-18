// frontend/src/components/favoritos/FavoritosGrid.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { RestauranteConDistancia } from '@/services/restauranteService';
import FavoritoCard from './FavoritoCard';
import MenuModal from './MenuModal';

interface FavoritosGridProps {
  favoritos: RestauranteConDistancia[];
  onEliminarFavorito: (id: number) => Promise<void>;
}

const FavoritosGrid: React.FC<FavoritosGridProps> = ({
  favoritos,
  onEliminarFavorito,
}) => {
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todos');
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState<{
    id: number;
    nombre: string;
  } | null>(null);

  // Obtener categorías únicas
  const categorias = React.useMemo(() => {
    const cats = new Set<string>();
    favoritos.forEach(rest => {
      rest.categorias?.forEach(cat => cats.add(cat.nombreCategoria));
    });
    return ['todos', ...Array.from(cats)];
  }, [favoritos]);

  // Filtrar restaurantes
  const favoritosFiltrados = React.useMemo(() => {
    if (filtroCategoria === 'todos') return favoritos;
    
    return favoritos.filter(rest => 
      rest.categorias?.some(cat => cat.nombreCategoria === filtroCategoria)
    );
  }, [favoritos, filtroCategoria]);

  const handleVerMenu = (id: number, nombre: string) => {
    setRestauranteSeleccionado({ id, nombre });
    setMenuModalOpen(true);
  };

  const handleCerrarMenu = () => {
    setMenuModalOpen(false);
    setRestauranteSeleccionado(null);
  };

  return (
    <div className="space-y-6">
      {/* Filtros */}
      {categorias.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md p-4 border border-gray-100"
        >
          <div className="flex items-center space-x-3 mb-3">
            <Filter className="w-5 h-5 text-orange-500" />
            <span className="font-semibold text-gray-800">Filtrar por categoría</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categorias.map((categoria) => (
              <motion.button
                key={categoria}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFiltroCategoria(categoria)}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                  filtroCategoria === categoria
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {categoria === 'todos' ? 'Todos' : categoria}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Contador de resultados */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          <span className="font-semibold text-gray-800">{favoritosFiltrados.length}</span>
          {' '}restaurante{favoritosFiltrados.length !== 1 ? 's' : ''} 
          {filtroCategoria !== 'todos' && ` en ${filtroCategoria}`}
        </p>
      </div>

      {/* Grid de restaurantes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favoritosFiltrados.map((restaurante, index) => (
          <FavoritoCard
            key={restaurante.idRestaurante}
            restaurante={restaurante}
            onVerMenu={handleVerMenu}
            onEliminar={onEliminarFavorito}
            index={index}
          />
        ))}
      </div>

      {/* Modal de menú */}
      {restauranteSeleccionado && (
        <MenuModal
          isOpen={menuModalOpen}
          onClose={handleCerrarMenu}
          restauranteId={restauranteSeleccionado.id}
          restauranteNombre={restauranteSeleccionado.nombre}
        />
      )}
    </div>
  );
};

export default FavoritosGrid;