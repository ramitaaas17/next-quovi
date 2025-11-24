const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

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

/**
 * Servicio para gestionar perfil de usuario
 * Incluye actualización de datos y gestión de foto de perfil
 */
class PerfilService {
  /**
   * Genera headers con token de autenticación
   */
  private getAuthHeaders(): HeadersInit {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  /**
   * Procesa respuesta del servidor y valida JSON
   */
  private async handleResponse(response: Response) {
    const contentType = response.headers.get('content-type');
    
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('El servidor no respondió con JSON válido');
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en la petición');
    }

    return data;
  }

  // Obtiene datos del perfil actual
  async obtenerPerfil(): Promise<Perfil> {
    try {
      const response = await fetch(`${API_URL}/perfil`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      const result = await this.handleResponse(response);
      return result.data;
    } catch (error: any) {
      throw new Error(error.message || 'Error al obtener perfil');
    }
  }

  // Actualiza datos del perfil (nombre, apellido, email)
  async actualizarPerfil(datos: ActualizarPerfilData): Promise<Perfil> {
    try {
      const response = await fetch(`${API_URL}/perfil`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(datos),
      });

      const result = await this.handleResponse(response);
      return result.data;
    } catch (error: any) {
      throw new Error(error.message || 'Error al actualizar perfil');
    }
  }

  /**
   * Sube foto de perfil en formato base64
   * Comprime y redimensiona la imagen antes de enviar
   */
  async subirFotoPerfilBase64(file: File): Promise<Perfil> {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('No se proporcionó ningún archivo'));
        return;
      }

      if (!file.type.startsWith('image/')) {
        reject(new Error('El archivo debe ser una imagen'));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        reject(new Error('La imagen no debe superar los 5MB'));
        return;
      }

      const reader = new FileReader();
      
      reader.onloadend = async () => {
        try {
          const base64String = reader.result as string;
          
          // Carga imagen en elemento temporal
          const img = document.createElement('img');
          img.src = base64String;
          
          await new Promise((resolve) => {
            img.onload = resolve;
          });
          
          // Redimensiona imagen a máximo 800x800
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Comprime a JPEG con calidad 70%
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          const base64Data = compressedBase64.split(',')[1];
          
          if (!base64Data) {
            throw new Error('Error al procesar la imagen');
          }

          const extension = 'jpg';
          const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
          
          const response = await fetch(`${API_URL}/perfil/foto/base64`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token && { Authorization: `Bearer ${token}` })
            },
            body: JSON.stringify({
              imageData: base64Data,
              extension: extension
            }),
          });

          const result = await this.handleResponse(response);
          resolve(result.data);
        } catch (error: any) {
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(new Error('Error al leer el archivo'));
      };

      reader.readAsDataURL(file);
    });
  }

  // Elimina foto de perfil actual
  async eliminarFotoPerfil(): Promise<Perfil> {
    try {
      const response = await fetch(`${API_URL}/perfil/foto`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      const result = await this.handleResponse(response);
      return result.data;
    } catch (error: any) {
      throw new Error(error.message || 'Error al eliminar foto');
    }
  }
}

const perfilService = new PerfilService();
export default perfilService;