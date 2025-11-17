// frontend/src/services/perfilService.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

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

const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

const getAuthHeaders = (): HeadersInit => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

class PerfilService {
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
    
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...user, ...data.data }));
    }

    return data.data;
  }

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
    
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...user, foto: data.data.foto }));
    }

    return data.data;
  }

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
    
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...user, foto: '' }));
    }

    return data.data;
  }

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
    
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...user, ...data.data }));
    }

    return data.data;
  }

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

    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }
}

export const perfilService = new PerfilService();
export default perfilService;