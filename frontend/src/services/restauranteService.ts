// frontend/src/services/restauranteService.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// ========== INTERFACES ==========

export interface Ciudad {
  idCiudad: number;
  nombreCiudad: string;
  estado: string;
  pais: string;
  latitud?: number;
  longitud?: number;
}

export interface Categoria {
  idCategoria: number;
  nombreCategoria: string;
  descripcion?: string;
  icono?: string;
}

export interface Caracteristica {
  idCaracteristica: number;
  nombreCaracteristica: string;
  descripcion?: string;
  icono?: string;
}

export interface Horario {
  dia: number; // 1=Lunes, 7=Domingo
  apertura: string;
  cierre: string;
  cerrado: boolean;
}

export interface Platillo {
  idPlatillo: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  ingredientes?: string;
  imagen?: string;
  disponible: boolean;
  destacado: boolean;
}

export interface ImagenRestaurante {
  idImagen: number;
  url: string;
  esPrincipal: boolean;
  orden: number;
}

export interface Restaurante {
  idRestaurante: number;
  nombre: string;
  direccion: string;
  latitud: number;
  longitud: number;
  telefono?: string;
  sitioweb?: string;
  descripcion?: string;
  precioPromedio?: number;
  calificacionPromedio: number;
  totalReseñas: number;
  activo: boolean;
  fechaRegistro: string;
  ciudad?: Ciudad;
  categorias?: Categoria[];
  caracteristicas?: Caracteristica[];
  platillos?: Platillo[];
  horarios?: Horario[];
  imagenes?: ImagenRestaurante[];
}

export interface RestauranteConDistancia extends Restaurante {
  distanciaKm: number;
  tiempoEstimado: string;
  estaAbierto: boolean;
  horarioHoy?: string;
  esFavorito?: boolean;
}

export interface ObtenerRestaurantesCercanosRequest {
  latitud: number;
  longitud: number;
  radio?: number; // en kilómetros
}

export interface BuscarRestaurantesRequest {
  termino: string;
  latitud?: number;
  longitud?: number;
  radio?: number;
}

// ========== SERVICIO ==========

class RestauranteService {
  private getHeaders(includeAuth: boolean = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth && typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // ===== RESTAURANTES =====

  // Obtener todos los restaurantes
  async obtenerTodosLosRestaurantes(): Promise<Restaurante[]> {
    try {
      console.log(' Obteniendo todos los restaurantes...');
      
      const response = await fetch(`${API_BASE_URL}/restaurantes`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Error al obtener restaurantes');
      }

      const data = await response.json();
      console.log(' Restaurantes obtenidos:', data.total);
      return data.data;
    } catch (error: any) {
      console.error(' Error obteniendo restaurantes:', error);
      throw error;
    }
  }

  // Obtener un restaurante por ID
  async obtenerRestaurantePorID(id: number): Promise<Restaurante> {
    try {
      console.log('📍 Obteniendo restaurante ID:', id);
      
      const response = await fetch(`${API_BASE_URL}/restaurantes/${id}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Restaurante no encontrado');
      }

      const data = await response.json();
      console.log(' Restaurante obtenido:', data.data.nombre);
      return data.data;
    } catch (error: any) {
      console.error(' Error obteniendo restaurante:', error);
      throw error;
    }
  }

  // Obtener restaurantes cercanos
  async obtenerRestaurantesCercanos(
    latitud: number,
    longitud: number,
    radio: number = 5
  ): Promise<RestauranteConDistancia[]> {
    try {
      console.log('📍 Buscando restaurantes cercanos...', { latitud, longitud, radio });
      
      const response = await fetch(`${API_BASE_URL}/restaurantes/cercanos`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ latitud, longitud, radio }),
      });

      if (!response.ok) {
        throw new Error('Error al buscar restaurantes cercanos');
      }

      const data = await response.json();
      console.log(' Restaurantes cercanos encontrados:', data.total);
      return data.data;
    } catch (error: any) {
      console.error(' Error buscando restaurantes cercanos:', error);
      throw error;
    }
  }

  // Buscar restaurantes por término
  async buscarRestaurantes(
    termino: string,
    latitud?: number,
    longitud?: number,
    radio?: number
  ): Promise<RestauranteConDistancia[]> {
    try {
      console.log('🔍 Buscando restaurantes:', termino);
      
      const body: BuscarRestaurantesRequest = {
        termino,
        latitud,
        longitud,
        radio,
      };

      const response = await fetch(`${API_BASE_URL}/restaurantes/buscar`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Error al buscar restaurantes');
      }

      const data = await response.json();
      console.log(' Búsqueda completada:', data.total, 'resultados');
      return data.data;
    } catch (error: any) {
      console.error(' Error en búsqueda:', error);
      throw error;
    }
  }

  // ===== CATEGORÍAS =====

  // Obtener todas las categorías
  async obtenerCategorias(): Promise<Categoria[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/categorias`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Error al obtener categorías');
      }

      const data = await response.json();
      return data.data;
    } catch (error: any) {
      console.error('❌ Error obteniendo categorías:', error);
      throw error;
    }
  }

  // Obtener restaurantes por categoría
  async obtenerRestaurantesPorCategoria(
    idCategoria: number,
    lat?: number,
    lng?: number
  ): Promise<RestauranteConDistancia[]> {
    try {
      let url = `${API_BASE_URL}/categorias/${idCategoria}/restaurantes`;
      
      const params = new URLSearchParams();
      if (lat !== undefined) params.append('lat', lat.toString());
      if (lng !== undefined) params.append('lng', lng.toString());
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Error al obtener restaurantes de la categoría');
      }

      const data = await response.json();
      return data.data;
    } catch (error: any) {
      console.error(' Error obteniendo restaurantes por categoría:', error);
      throw error;
    }
  }

  // ===== CIUDADES =====

  // Obtener todas las ciudades
  async obtenerCiudades(): Promise<Ciudad[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/ciudades`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Error al obtener ciudades');
      }

      const data = await response.json();
      return data.data;
    } catch (error: any) {
      console.error(' Error obteniendo ciudades:', error);
      throw error;
    }
  }

  // ===== FAVORITOS (requieren autenticación) =====

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
        headers: this.getHeaders(true),
      });

      if (!response.ok) {
        throw new Error('Error al obtener favoritos');
      }

      const data = await response.json();
      return data.data;
    } catch (error: any) {
      console.error(' Error obteniendo favoritos:', error);
      throw error;
    }
  }

  // Agregar restaurante a favoritos
  async agregarFavorito(idRestaurante: number): Promise<void> {
    try {
      console.log(' Agregando a favoritos:', idRestaurante);
      
      const response = await fetch(`${API_BASE_URL}/favoritos`, {
        method: 'POST',
        headers: this.getHeaders(true),
        body: JSON.stringify({ idRestaurante }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al agregar favorito');
      }

      console.log(' Agregado a favoritos exitosamente');
    } catch (error: any) {
      console.error(' Error agregando favorito:', error);
      throw error;
    }
  }

  // Eliminar restaurante de favoritos
  async eliminarFavorito(idRestaurante: number): Promise<void> {
    try {
      console.log(' Eliminando de favoritos:', idRestaurante);
      
      const response = await fetch(`${API_BASE_URL}/favoritos/${idRestaurante}`, {
        method: 'DELETE',
        headers: this.getHeaders(true),
      });

      if (!response.ok) {
        throw new Error('Error al eliminar favorito');
      }

      console.log(' Eliminado de favoritos exitosamente');
    } catch (error: any) {
      console.error(' Error eliminando favorito:', error);
      throw error;
    }
  }

  // ===== UTILIDADES =====

  // Formatear precio
  formatearPrecio(precio: number): string {
    if (precio === 0) return 'Gratis';
    return `$${precio.toFixed(2)} MXN`;
  }

  // Formatear distancia
  formatearDistancia(km: number): string {
    if (km < 1) {
      return `${Math.round(km * 1000)} m`;
    }
    return `${km.toFixed(1)} km`;
  }

  // Obtener rango de precio
  obtenerRangoPrecio(precioPromedio?: number): string {
    if (!precioPromedio || precioPromedio === 0) return '$';
    if (precioPromedio < 100) return '$';
    if (precioPromedio < 300) return '$$';
    if (precioPromedio < 500) return '$$$';
    return '$$$$';
  }

  // Obtener emoji de categoría
  obtenerEmojiCategoria(nombreCategoria: string): string {
    const mapeo: Record<string, string> = {
      'Mexicana': '🌮',
      'Italiana': '🍕',
      'Japonesa': '🍣',
      'Cafetería': '☕',
      'Comida Saludable': '🥗',
      'Hamburguesas': '🍔',
      'Mariscos': '🦐',
      'Tacos': '🌮',
      'Postres': '🍰',
      'Internacional': '🍽️',
    };

    return mapeo[nombreCategoria] || '🍽️';
  }

  // Obtener color por categoría
  obtenerColorCategoria(nombreCategoria: string): string {
    const mapeo: Record<string, string> = {
      'Mexicana': 'bg-red-500',
      'Italiana': 'bg-orange-500',
      'Japonesa': 'bg-pink-500',
      'Cafetería': 'bg-blue-500',
      'Comida Saludable': 'bg-green-500',
      'Hamburguesas': 'bg-purple-500',
      'Mariscos': 'bg-cyan-500',
      'Tacos': 'bg-red-600',
      'Postres': 'bg-pink-400',
      'Internacional': 'bg-gray-600',
    };

    return mapeo[nombreCategoria] || 'bg-gray-500';
  }
}

// Exportar instancia única del servicio
export const restauranteService = new RestauranteService();
export default restauranteService;