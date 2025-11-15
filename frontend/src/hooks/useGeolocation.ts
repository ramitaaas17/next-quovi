// frontend/src/hooks/useGeolocation.ts
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

export const useGeolocation = (watchPosition: boolean = false) => {
  const [state, setState] = useState<GeolocationState>({
    ubicacion: null,
    error: null,
    cargando: true,
  });

  useEffect(() => {
    // Verificar si el navegador soporta geolocalización
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
      
      console.log('📍 Ubicación obtenida:', {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy + 'm',
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

      console.error('❌ Error de geolocalización:', errorMessage);
    };

    const options: PositionOptions = {
      enableHighAccuracy: true, // Alta precisión (puede consumir más batería)
      timeout: 10000, // Timeout de 10 segundos
      maximumAge: 0, // No usar caché
    };

    let watchId: number | undefined;

    if (watchPosition) {
      // Modo continuo: actualizar posición cuando cambie
      watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);
      console.log('🎯 Modo de seguimiento de ubicación activado');
    } else {
      // Obtener ubicación una sola vez
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
      console.log('📍 Obteniendo ubicación actual...');
    }

    // Cleanup: detener el seguimiento cuando el componente se desmonte
    return () => {
      if (watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId);
        console.log('🛑 Seguimiento de ubicación detenido');
      }
    };
  }, [watchPosition]);

  // Función para solicitar ubicación nuevamente
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
        console.log('🔄 Ubicación actualizada');
      },
      (error) => {
        setState(prev => ({
          ...prev,
          error: 'Error al actualizar ubicación',
          cargando: false,
        }));
        console.error('❌ Error al actualizar ubicación:', error);
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