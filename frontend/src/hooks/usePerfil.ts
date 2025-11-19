import { useState } from 'react';
import perfilService, { Perfil, ActualizarPerfilData } from '@/services/perfilService';

// Función helper para actualizar localStorage y notificar al Navigation
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
      
      // Disparar evento para que Navigation se actualice
      window.dispatchEvent(new Event('userUpdated'));
    }
  }
};

export const usePerfil = () => {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const obtenerPerfil = async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await perfilService.obtenerPerfil();
      setPerfil(data);
      updateUserInLocalStorage(data);
    } catch (err: any) {
      setError(err.message || 'Error al obtener perfil');
      console.error('Error obteniendo perfil:', err);
    } finally {
      setCargando(false);
    }
  };

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