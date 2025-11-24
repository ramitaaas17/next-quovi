import { useState, useEffect, useCallback } from 'react';
import favoritosService from '@/services/favoritosService';
import { RestauranteConDistancia } from '@/services/restauranteService';

/**
 * Hook para gestionar restaurantes favoritos del usuario
 * Incluye funciones para cargar, agregar y eliminar favoritos
 */
export const useFavoritos = (lat?: number, lng?: number) => {
  const [favoritos, setFavoritos] = useState<RestauranteConDistancia[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carga la lista de favoritos desde el servidor
  const cargarFavoritos = useCallback(async () => {
    if (!favoritosService.isAuthenticated()) {
      setCargando(false);
      setError('Debes iniciar sesión para ver tus favoritos');
      return;
    }

    try {
      setCargando(true);
      setError(null);
      const data = await favoritosService.obtenerFavoritos(lat, lng);
      setFavoritos(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar favoritos');
    } finally {
      setCargando(false);
    }
  }, [lat, lng]);

  // Agrega un restaurante a favoritos
  const agregarFavorito = async (idRestaurante: number) => {
    try {
      await favoritosService.agregarFavorito(idRestaurante);
      await cargarFavoritos();
    } catch (err: any) {
      throw new Error(err.message || 'Error al agregar favorito');
    }
  };

  // Elimina un restaurante de favoritos
  const eliminarFavorito = async (idRestaurante: number) => {
    try {
      await favoritosService.eliminarFavorito(idRestaurante);
      // Actualiza lista localmente para feedback inmediato
      setFavoritos(prev => prev.filter(r => r.idRestaurante !== idRestaurante));
    } catch (err: any) {
      throw new Error(err.message || 'Error al eliminar favorito');
    }
  };

  useEffect(() => {
    cargarFavoritos();
  }, [cargarFavoritos]);

  return {
    favoritos,
    cargando,
    error,
    cargarFavoritos,
    agregarFavorito,
    eliminarFavorito,
  };
};

export default useFavoritos;