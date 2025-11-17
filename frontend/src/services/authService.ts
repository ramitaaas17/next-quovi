// frontend/src/services/authService.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

interface LoginResponse {
  token: string;
  usuario: {
    idUsuario: number;
    email: string;
    nombre: string;
    apellido: string;
    nombreUsuario: string;
    foto: string;
    provider: string;
    emailVerificado: boolean;
    fechaRegistro: string;
  };
  message: string;
}

interface RegisterResponse {
  token: string;
  usuario: {
    idUsuario: number;
    email: string;
    nombre: string;
    apellido: string;
    nombreUsuario: string;
    foto: string;
    provider: string;
    emailVerificado: boolean;
    fechaRegistro: string;
  };
  message: string;
}

interface GoogleLoginData {
  googleId: string;
  email: string;
  nombre: string;
  apellido?: string;
  foto?: string;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

class AuthService {
  // Login con email y password
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al iniciar sesión');
    }

    const data = await response.json();
    
    // ✅ GUARDAR TOKEN Y USUARIO EN LOCALSTORAGE
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        id: data.usuario.idUsuario,
        email: data.usuario.email,
        fullName: `${data.usuario.nombre} ${data.usuario.apellido}`,
        nombre: data.usuario.nombre,
        apellido: data.usuario.apellido,
        nombreUsuario: data.usuario.nombreUsuario,
        avatar: data.usuario.foto,
        provider: data.usuario.provider,
        emailVerificado: data.usuario.emailVerificado,
        createdAt: data.usuario.fechaRegistro,
      }));
    }

    return data;
  }

  // Registro
  async register(formData: RegisterData): Promise<RegisterResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al registrar usuario');
    }

    const data = await response.json();
    
    // ✅ GUARDAR TOKEN Y USUARIO EN LOCALSTORAGE
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        id: data.usuario.idUsuario,
        email: data.usuario.email,
        fullName: `${data.usuario.nombre} ${data.usuario.apellido}`,
        nombre: data.usuario.nombre,
        apellido: data.usuario.apellido,
        nombreUsuario: data.usuario.nombreUsuario,
        avatar: data.usuario.foto,
        provider: data.usuario.provider,
        emailVerificado: data.usuario.emailVerificado,
        createdAt: data.usuario.fechaRegistro,
      }));
    }

    return data;
  }

  // Login con Google
  async loginWithGoogle(googleData: GoogleLoginData): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(googleData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al iniciar sesión con Google');
    }

    const data = await response.json();
    
    // ✅ GUARDAR TOKEN Y USUARIO EN LOCALSTORAGE
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        id: data.usuario.idUsuario,
        email: data.usuario.email,
        fullName: `${data.usuario.nombre} ${data.usuario.apellido}`,
        nombre: data.usuario.nombre,
        apellido: data.usuario.apellido,
        nombreUsuario: data.usuario.nombreUsuario,
        avatar: data.usuario.foto,
        provider: data.usuario.provider,
        emailVerificado: data.usuario.emailVerificado,
        createdAt: data.usuario.fechaRegistro,
      }));
    }

    return data;
  }

  // Logout
  async logout(): Promise<void> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (token) {
      try {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Error al cerrar sesión en el servidor:', error);
      }
    }

    // Limpiar localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('token');
    return !!token;
  }

  // Obtener token actual
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }

  // Obtener usuario actual
  getCurrentUser(): any | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}

export const authService = new AuthService();
export default authService;