'use client';

import { useState, useEffect } from 'react';

export interface Ubicacion {
  latitud: number;
  longitud: number;
}

export interface GeolocationState {
  ubicacion: Ubicacion | null;
  error: string | null;
  cargando: boolean;
}

/**
 * Hook para obtener la ubicación GPS del usuario
 * @param watchPosition - Si es true, actualiza la ubicación continuamente
 */
export const useGeolocation = (watchPosition: boolean = false) => {
  const [state, setState] = useState<GeolocationState>({
    ubicacion: null,
    error: null,
    cargando: true,
  });

  useEffect(() => {
    // Verifica soporte de geolocalización
    if (!navigator.geolocation) {
      setState({
        ubicacion: null,
        error: 'La geolocalización no está soportada por tu navegador',
        cargando: false,
      });
      return;
    }

    const onSuccess = (position: GeolocationPosition) => {
      setState({
        ubicacion: {
          latitud: position.coords.latitude,
          longitud: position.coords.longitude,
        },
        error: null,
        cargando: false,
      });
    };

    const onError = (error: GeolocationPositionError) => {
      let errorMessage = 'Error al obtener ubicación';
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Permiso de ubicación denegado. Por favor, habilita los permisos de ubicación.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Información de ubicación no disponible.';
          break;
        case error.TIMEOUT:
          errorMessage = 'Se agotó el tiempo de espera para obtener la ubicación.';
          break;
      }

      setState({
        ubicacion: null,
        error: errorMessage,
        cargando: false,
      });
    };

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    let watchId: number | undefined;

    if (watchPosition) {
      // Modo continuo: actualiza posición cuando cambia
      watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);
    } else {
      // Obtiene ubicación una sola vez
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    }

    // Cleanup: detiene seguimiento al desmontar componente
    return () => {
      if (watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchPosition]);

  // Solicita ubicación nuevamente
  const refrescarUbicacion = () => {
    setState(prev => ({ ...prev, cargando: true }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          ubicacion: {
            latitud: position.coords.latitude,
            longitud: position.coords.longitude,
          },
          error: null,
          cargando: false,
        });
      },
      (error) => {
        setState(prev => ({
          ...prev,
          error: 'Error al actualizar ubicación',
          cargando: false,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return {
    ...state,
    refrescarUbicacion,
  };
};

export default useGeolocation;