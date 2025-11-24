import { useState } from 'react';
import perfilService, { Perfil, ActualizarPerfilData } from '@/services/perfilService';

/**
 * Actualiza datos del usuario en localStorage y dispara evento
 * para que otros componentes se actualicen
 */
const updateUserInLocalStorage = (perfil: Perfil) => {
  if (typeof window !== 'undefined') {
    const currentUser = localStorage.getItem('user');
    
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      const updatedUser = {
        ...userData,
        fullName: `${perfil.nombre} ${perfil.apellido}`.trim(),
        email: perfil.email,
        foto: perfil.foto 
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Notifica cambios al Navigation
      window.dispatchEvent(new Event('userUpdated'));
    }
  }
};

/**
 * Hook para gestionar perfil de usuario
 * Incluye funciones para obtener, actualizar, subir y eliminar foto
 */
export const usePerfil = () => {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtiene perfil del usuario actual
  const obtenerPerfil = async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await perfilService.obtenerPerfil();
      setPerfil(data);
      updateUserInLocalStorage(data);
    } catch (err: any) {
      setError(err.message || 'Error al obtener perfil');
    } finally {
      setCargando(false);
    }
  };

  // Actualiza datos del perfil (nombre, apellido, email)
  const actualizarPerfil = async (datos: ActualizarPerfilData) => {
    try {
      setCargando(true);
      setError(null);
      const data = await perfilService.actualizarPerfil(datos);
      setPerfil(data);
      updateUserInLocalStorage(data);
    } catch (err: any) {
      setError(err.message || 'Error al actualizar perfil');
      throw err;
    } finally {
      setCargando(false);
    }
  };

  // Sube nueva foto de perfil
  const subirFoto = async (file: File) => {
    try {
      setCargando(true);
      setError(null);
      const data = await perfilService.subirFotoPerfilBase64(file);
      setPerfil(data);
      updateUserInLocalStorage(data);
    } catch (err: any) {
      setError(err.message || 'Error al subir foto');
      throw err;
    } finally {
      setCargando(false);
    }
  };

  // Elimina foto de perfil actual
  const eliminarFoto = async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await perfilService.eliminarFotoPerfil();
      setPerfil(data);
      updateUserInLocalStorage(data);
    } catch (err: any) {
      setError(err.message || 'Error al eliminar foto');
      throw err;
    } finally {
      setCargando(false);
    }
  };

  return {
    perfil,
    cargando,
    error,
    obtenerPerfil,
    actualizarPerfil,
    subirFoto,
    eliminarFoto,
  };
};