// frontend/src/services/perfilService.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Tipos
export interface Perfil {
  idUsuario: number;
  nombreUsuario: string;
  email: string;
  nombre: string;
  apellido: string;
  foto: string;
  provider: string;
  emailVerificado: boolean;
  fechaRegistro: string;
}

export interface ActualizarPerfilData {
  nombre: string;
  apellido: string;
  email: string;
}

export interface CambiarPasswordData {
  passwordActual: string;
  passwordNueva: string;
}

// Helper para obtener el token
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper para headers con autenticación
const getAuthHeaders = (): HeadersInit => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

class PerfilService {
  // Obtener perfil del usuario autenticado
  async obtenerPerfil(): Promise<Perfil> {
    const response = await fetch(`${API_URL}/perfil`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener perfil');
    }

    const data = await response.json();
    return data.data;
  }

  // Actualizar información del perfil
  async actualizarPerfil(datos: ActualizarPerfilData): Promise<Perfil> {
    const response = await fetch(`${API_URL}/perfil`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(datos),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al actualizar perfil');
    }

    const data = await response.json();
    
    // Actualizar localStorage
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...user, ...data.data }));
    }

    return data.data;
  }

  // Subir foto de perfil (multipart)
  async subirFotoPerfil(file: File): Promise<Perfil> {
    const formData = new FormData();
    formData.append('foto', file);

    const token = getToken();
    const response = await fetch(`${API_URL}/perfil/foto`, {
      method: 'POST',
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al subir foto');
    }

    const data = await response.json();
    
    // Actualizar localStorage
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...user, ...data.data }));
    }

    return data.data;
  }

  // Subir foto de perfil (base64)
  async subirFotoPerfilBase64(imageData: string, extension: string): Promise<Perfil> {
    const response = await fetch(`${API_URL}/perfil/foto/base64`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ imageData, extension }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al subir foto');
    }

    const data = await response.json();
    
    // Actualizar localStorage
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...user, ...data.data }));
    }

    return data.data;
  }

  // Eliminar foto de perfil
  async eliminarFotoPerfil(): Promise<Perfil> {
    const response = await fetch(`${API_URL}/perfil/foto`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al eliminar foto');
    }

    const data = await response.json();
    
    // Actualizar localStorage
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...user, ...data.data }));
    }

    return data.data;
  }

  // Cambiar contraseña
  async cambiarPassword(datos: CambiarPasswordData): Promise<void> {
    const response = await fetch(`${API_URL}/perfil/cambiar-password`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(datos),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al cambiar contraseña');
    }
  }

  // Actualizar nombre de usuario
  async actualizarNombreUsuario(nombreUsuario: string): Promise<Perfil> {
    const response = await fetch(`${API_URL}/perfil/nombre-usuario`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ nombreUsuario }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al actualizar nombre de usuario');
    }

    const data = await response.json();
    
    // Actualizar localStorage
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...user, ...data.data }));
    }

    return data.data;
  }

  // Eliminar cuenta
  async eliminarCuenta(password: string): Promise<void> {
    const response = await fetch(`${API_URL}/perfil/cuenta`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al eliminar cuenta');
    }

    // Limpiar localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }
}

export const perfilService = new PerfilService();
export default perfilService;