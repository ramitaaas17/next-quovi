// frontend/src/services/favoritosService.ts

import { RestauranteConDistancia, Platillo } from './restauranteService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

class FavoritosService {
  private getAuthHeaders(): HeadersInit {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Obtener favoritos del usuario
  async obtenerFavoritos(lat?: number, lng?: number): Promise<RestauranteConDistancia[]> {
    try {
      let url = `${API_BASE_URL}/favoritos`;
      
      const params = new URLSearchParams();
      if (lat !== undefined) params.append('lat', lat.toString());
      if (lng !== undefined) params.append('lng', lng.toString());
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Error al obtener favoritos');
      }

      const data = await response.json();
      return data.data || [];
    } catch (error: any) {
      console.error('❌ Error obteniendo favoritos:', error);
      throw error;
    }
  }

  // Agregar restaurante a favoritos
  async agregarFavorito(idRestaurante: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/favoritos`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ idRestaurante }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al agregar favorito');
      }
    } catch (error: any) {
      console.error('❌ Error agregando favorito:', error);
      throw error;
    }
  }

  // Eliminar restaurante de favoritos
  async eliminarFavorito(idRestaurante: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/favoritos/${idRestaurante}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Error al eliminar favorito');
      }
    } catch (error: any) {
      console.error('❌ Error eliminando favorito:', error);
      throw error;
    }
  }

  // Obtener platillos de un restaurante
  async obtenerPlatillos(idRestaurante: number): Promise<Platillo[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/restaurantes/${idRestaurante}/platillos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener platillos');
      }

      const data = await response.json();
      return data.data || [];
    } catch (error: any) {
      console.error('❌ Error obteniendo platillos:', error);
      throw error;
    }
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('token');
    return !!token;
  }
}

export const favoritosService = new FavoritosService();
export default favoritosService;