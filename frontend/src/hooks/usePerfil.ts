import { useState } from 'react';
import perfilService, { Perfil, ActualizarPerfilData } from '@/services/perfilService';

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