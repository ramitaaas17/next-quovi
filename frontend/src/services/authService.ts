// src/services/authService.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  location: string;
}

export const authService = {
  async login(data: LoginData) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al iniciar sesión');
    }

    const result = await response.json();
    
    // Guardar token
    if (result.token) {
      localStorage.setItem('auth_token', result.token);
    }

    return result;
  },

  async register(data: RegisterData) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al registrarse');
    }

    const result = await response.json();
    
    // Guardar token
    if (result.token) {
      localStorage.setItem('auth_token', result.token);
    }

    return result;
  },

  async logout() {
    const token = localStorage.getItem('auth_token');
    
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
        console.error('Error en logout:', error);
      }
    }
    
    localStorage.removeItem('auth_token');
  },

  getToken() {
    return localStorage.getItem('auth_token');
  },
};