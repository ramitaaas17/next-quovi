const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Interfaces de datos
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
  dia: number;
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

// Interfaces de peticiones
export interface ObtenerRestaurantesCercanosRequest {
  latitud: number;
  longitud: number;
  radio?: number;
}

export interface BuscarRestaurantesRequest {
  termino?: string;
  categoria?: string;
  idCategoria?: number;
  latitud?: number;
  longitud?: number;
  radio?: number;
}

export interface FiltrosAvanzados {
  distancia?: number;
  precioMin?: number;
  precioMax?: number;
  caracteristicas?: string[];
}

/**
 * Servicio para gestionar restaurantes
 * Incluye búsqueda, filtros, favoritos y utilidades
 */
class RestauranteService {
  /**
   * Genera headers con autenticación opcional
   */
  private getHeaders(includeAuth: boolean = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth && typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // Obtiene todos los restaurantes
  async obtenerTodosLosRestaurantes(): Promise<Restaurante[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/restaurantes`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Error al obtener restaurantes');
      }

      const data = await response.json();
      return data.data;
    } catch (error: any) {
      throw error;
    }
  }

  // Obtiene restaurante por ID
  async obtenerRestaurantePorID(id: number): Promise<Restaurante> {
    try {
      const response = await fetch(`${API_BASE_URL}/restaurantes/${id}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Restaurante no encontrado');
      }

      const data = await response.json();
      return data.data;
    } catch (error: any) {
      throw error;
    }
  }

  // Obtiene restaurantes cercanos a una ubicación
  async obtenerRestaurantesCercanos(
    latitud: number,
    longitud: number,
    radio: number = 5
  ): Promise<RestauranteConDistancia[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/restaurantes/cercanos`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ latitud, longitud, radio }),
      });

      if (!response.ok) {
        throw new Error('Error al buscar restaurantes cercanos');
      }

      const data = await response.json();
      return data.data;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Busca restaurantes con filtros avanzados
   * Soporta término, categoría (nombre o ID), ubicación y radio
   */
  async buscarRestaurantes(
    filtros: BuscarRestaurantesRequest
  ): Promise<RestauranteConDistancia[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/restaurantes/buscar`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(filtros),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al buscar restaurantes');
      }

      const data = await response.json();
      return data.data;
    } catch (error: any) {
      throw error;
    }
  }

  // Busca por término simple (retrocompatibilidad)
  async buscarPorTermino(
    termino: string,
    latitud?: number,
    longitud?: number,
    radio?: number
  ): Promise<RestauranteConDistancia[]> {
    return this.buscarRestaurantes({
      termino,
      latitud,
      longitud,
      radio,
    });
  }

  // Busca por nombre de categoría
  async buscarPorCategoria(
    nombreCategoria: string,
    latitud?: number,
    longitud?: number,
    radio?: number
  ): Promise<RestauranteConDistancia[]> {
    return this.buscarRestaurantes({
      categoria: nombreCategoria,
      latitud,
      longitud,
      radio,
    });
  }

  // Busca por ID de categoría
  async buscarPorIDCategoria(
    idCategoria: number,
    latitud?: number,
    longitud?: number,
    radio?: number
  ): Promise<RestauranteConDistancia[]> {
    return this.buscarRestaurantes({
      idCategoria,
      latitud,
      longitud,
      radio,
    });
  }

  // Obtiene lista de categorías disponibles
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
      throw error;
    }
  }

  // Obtiene restaurantes de una categoría específica
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
      throw error;
    }
  }

  // Obtiene lista de ciudades disponibles
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
      throw error;
    }
  }

  // Obtiene favoritos del usuario con ubicación opcional
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
      throw error;
    }
  }

  // Agrega restaurante a favoritos
  async agregarFavorito(idRestaurante: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/favoritos`, {
        method: 'POST',
        headers: this.getHeaders(true),
        body: JSON.stringify({ idRestaurante }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al agregar favorito');
      }
    } catch (error: any) {
      throw error;
    }
  }

  // Elimina restaurante de favoritos
  async eliminarFavorito(idRestaurante: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/favoritos/${idRestaurante}`, {
        method: 'DELETE',
        headers: this.getHeaders(true),
      });

      if (!response.ok) {
        throw new Error('Error al eliminar favorito');
      }
    } catch (error: any) {
      throw error;
    }
  }

  // Obtiene platillos de un restaurante
  async obtenerPlatillosPorRestaurante(idRestaurante: number): Promise<Platillo[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/restaurantes/${idRestaurante}/platillos`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Error al obtener platillos');
      }

      const data = await response.json();
      return data.data || [];
    } catch (error: any) {
      throw error;
    }
  }

  // Formatea precio en pesos mexicanos
  formatearPrecio(precio: number): string {
    if (precio === 0) return 'Gratis';
    return `$${precio.toFixed(2)} MXN`;
  }

  // Formatea distancia en metros o kilómetros
  formatearDistancia(km: number): string {
    if (km < 1) {
      return `${Math.round(km * 1000)} m`;
    }
    return `${km.toFixed(1)} km`;
  }

  // Obtiene rango de precio en símbolos $
  obtenerRangoPrecio(precioPromedio?: number): string {
    if (!precioPromedio || precioPromedio === 0) return '$';
    if (precioPromedio < 100) return '$';
    if (precioPromedio < 300) return '$$';
    if (precioPromedio < 500) return '$$$';
    return '$$$$';
  }

  // Obtiene emoji representativo de la categoría
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
      'Pizza': '🍕',
      'Sushi': '🍣',
      'Café': '☕',
      'Saludable': '🥗',
      'Antojitos': '🫔',
      'Desayunos': '🍳',
    };

    return mapeo[nombreCategoria] || '🍽️';
  }

  // Obtiene color de badge para la categoría
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
      'Pizza': 'bg-orange-500',
      'Sushi': 'bg-pink-500',
      'Café': 'bg-blue-500',
      'Saludable': 'bg-green-500',
      'Antojitos': 'bg-yellow-600',
      'Desayunos': 'bg-orange-400',
    };

    return mapeo[nombreCategoria] || 'bg-gray-500';
  }
}

export const restauranteService = new RestauranteService();
export default restauranteService;