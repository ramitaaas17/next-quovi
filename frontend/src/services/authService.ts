// frontend/src/services/authService.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface GoogleLoginRequest {
  googleId: string;
  email: string;
  nombre: string;
  apellido?: string;
  foto?: string;
}

export interface User {
  id: number;
  email: string;
  fullName: string;
  avatar: string;
  emailVerificado: boolean;
  provider: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  usuario: User;
  message: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

class AuthService {
  private getHeaders(includeAuth: boolean = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // Guardar token en localStorage
  saveToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  // Obtener token de localStorage
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  // Eliminar token de localStorage
  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }

  // Guardar datos del usuario
  saveUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  // Obtener datos del usuario
  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch (e) {
          console.error('Error parsing user data:', e);
          return null;
        }
      }
    }
    return null;
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // LOGIN
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // Guardar token y usuario
      this.saveToken(data.token);
      this.saveUser(data.usuario);

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // REGISTRO
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar usuario');
      }

      // Guardar token y usuario
      this.saveToken(data.token);
      this.saveUser(data.usuario);

      return data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  // LOGIN CON GOOGLE
  async loginWithGoogle(credential: string): Promise<AuthResponse> {
    try {
      // Decodificar el JWT de Google para obtener los datos del usuario
      const decoded: any = this.decodeGoogleToken(credential);
      
      const googleData: GoogleLoginRequest = {
        googleId: decoded.sub,
        email: decoded.email,
        nombre: decoded.given_name || '',
        apellido: decoded.family_name || '',
        foto: decoded.picture || '',
      };

      const response = await fetch(`${API_BASE_URL}/auth/login/google`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(googleData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión con Google');
      }

      // Guardar token y usuario
      this.saveToken(data.token);
      this.saveUser(data.usuario);

      return data;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  }

  // Decodificar token de Google (JWT)
  private decodeGoogleToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding Google token:', error);
      throw new Error('Token de Google inválido');
    }
  }

  // LOGOUT
  async logout(): Promise<void> {
    try {
      const token = this.getToken();
      if (!token) {
        this.removeToken();
        return;
      }

      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: this.getHeaders(true),
      });

      // Limpiar datos locales
      this.removeToken();
    } catch (error) {
      console.error('Logout error:', error);
      // Aunque falle, limpiamos los datos locales
      this.removeToken();
    }
  }

  // VERIFICAR TOKEN
  async verifyToken(): Promise<boolean> {
    try {
      const token = this.getToken();
      if (!token) {
        return false;
      }

      const response = await fetch(`${API_BASE_URL}/perfil`, {
        method: 'GET',
        headers: this.getHeaders(true),
      });

      return response.ok;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  }
}

// Exportar instancia única del servicio
export const authService = new AuthService();
export default authService;