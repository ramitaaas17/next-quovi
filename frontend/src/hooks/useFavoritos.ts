// frontend/src/hooks/useFavoritos.ts

import { useState, useEffect, useCallback } from 'react';
import favoritosService from '@/services/favoritosService';
import { RestauranteConDistancia } from '@/services/restauranteService';

export const useFavoritos = (lat?: number, lng?: number) => {
  const [favoritos, setFavoritos] = useState<RestauranteConDistancia[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      console.error('Error cargando favoritos:', err);
    } finally {
      setCargando(false);
    }
  }, [lat, lng]);

  const agregarFavorito = async (idRestaurante: number) => {
    try {
      await favoritosService.agregarFavorito(idRestaurante);
      await cargarFavoritos(); // Recargar la lista
    } catch (err: any) {
      throw new Error(err.message || 'Error al agregar favorito');
    }
  };

  const eliminarFavorito = async (idRestaurante: number) => {
    try {
      await favoritosService.eliminarFavorito(idRestaurante);
      // Actualizar la lista localmente para feedback inmediato
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