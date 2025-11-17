// frontend/src/hooks/usePerfil.ts
import { useState, useCallback } from 'react';
import perfilService, { Perfil, ActualizarPerfilData, CambiarPasswordData } from '@/services/perfilService';

interface UsePerfilReturn {
  perfil: Perfil | null;
  cargando: boolean;
  error: string | null;
  obtenerPerfil: () => Promise<void>;
  actualizarPerfil: (datos: ActualizarPerfilData) => Promise<void>;
  subirFoto: (file: File) => Promise<void>;
  eliminarFoto: () => Promise<void>;
  cambiarPassword: (datos: CambiarPasswordData) => Promise<void>;
  eliminarCuenta: (password: string) => Promise<void>;
}

export const usePerfil = (): UsePerfilReturn => {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const obtenerPerfil = useCallback(async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await perfilService.obtenerPerfil();
      setPerfil(data);
    } catch (err: any) {
      setError(err.message);
      console.error('Error al obtener perfil:', err);
    } finally {
      setCargando(false);
    }
  }, []);

  const actualizarPerfil = useCallback(async (datos: ActualizarPerfilData) => {
    try {
      setCargando(true);
      setError(null);
      const data = await perfilService.actualizarPerfil(datos);
      setPerfil(data);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setCargando(false);
    }
  }, []);

  const subirFoto = useCallback(async (file: File) => {
    try {
      setCargando(true);
      setError(null);
      const data = await perfilService.subirFotoPerfil(file);
      setPerfil(data);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setCargando(false);
    }
  }, []);

  const eliminarFoto = useCallback(async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await perfilService.eliminarFotoPerfil();
      setPerfil(data);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setCargando(false);
    }
  }, []);

  const cambiarPassword = useCallback(async (datos: CambiarPasswordData) => {
    try {
      setCargando(true);
      setError(null);
      await perfilService.cambiarPassword(datos);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setCargando(false);
    }
  }, []);

  const eliminarCuenta = useCallback(async (password: string) => {
    try {
      setCargando(true);
      setError(null);
      await perfilService.eliminarCuenta(password);
      setPerfil(null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setCargando(false);
    }
  }, []);

  return {
    perfil,
    cargando,
    error,
    obtenerPerfil,
    actualizarPerfil,
    subirFoto,
    eliminarFoto,
    cambiarPassword,
    eliminarCuenta,
  };
};

export default usePerfil;