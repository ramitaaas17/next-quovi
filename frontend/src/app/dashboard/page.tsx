// frontend/src/app/dashboard/page.tsx (o donde esté MapDashboard)
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation as NavigationIcon, AlertCircle, Loader2 } from 'lucide-react';
import Navigation from '@/components/landing/Navigation';
import SearchBar from '@/components/common/SearchBar';
import ParticleBackground from '@/components/common/Particles';
import RestaurantDetailsPanel from '@/components/dashboard/RestaurantDetailsPanel';
import RouteDisplay from '@/components/dashboard/RouteDisplay';
import useGeolocation from '@/hooks/useGeolocation';
import restauranteService, { RestauranteConDistancia } from '@/services/restauranteService';

declare global {
  interface Window {
    L: any;
  }
}

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLocateMe: () => void;
}

const MapControls: React.FC<MapControlsProps> = ({ onZoomIn, onZoomOut, onLocateMe }) => {
  return (
    <div className="absolute top-4 left-4 z-10 space-y-2">
      <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <button 
          onClick={onZoomIn}
          className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 border-b border-gray-200 transition-colors"
        >
          <span className="text-xl font-light">+</span>
        </button>
        <button 
          onClick={onZoomOut}
          className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <span className="text-xl font-light">−</span>
        </button>
      </div>
      
      <button 
        onClick={onLocateMe}
        className="w-12 h-12 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
      >
        <NavigationIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

interface RealMapComponentProps {
  onRestaurantClick: (restaurant: RestauranteConDistancia) => void;
  userLocation: [number, number] | null;
  restaurantes: RestauranteConDistancia[];
}

const RealMapComponent: React.FC<RealMapComponentProps> = ({ 
  onRestaurantClick, 
  userLocation,
  restaurantes 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const loadLeaflet = async (): Promise<void> => {
      if (!document.querySelector('link[href*="leaflet.min.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css';
        document.head.appendChild(link);
      }

      if (!window.L) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.js';
        
        script.onload = () => {
          initMap();
        };
        
        document.head.appendChild(script);
      } else {
        initMap();
      }
    };

    const initMap = () => {
      if (mapRef.current && window.L && !mapInstanceRef.current) {
        const centerLocation = userLocation || [19.4326, -99.1332];
        
        const map = window.L.map(mapRef.current, {
          zoomControl: false,
          attributionControl: false
        }).setView(centerLocation, 13);

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        mapInstanceRef.current = map;
      }
    };

    loadLeaflet();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && window.L) {
      // Limpiar marcadores existentes
      mapInstanceRef.current.eachLayer((layer: any) => {
        if (layer instanceof window.L.Marker) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });

      // Agregar marcador de ubicación del usuario
      if (userLocation) {
        const currentLocationIcon = window.L.divIcon({
          className: 'current-location-marker',
          html: `
            <div class="relative">
              <div class="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
              <div class="absolute inset-0 w-6 h-6 bg-blue-400 rounded-full opacity-30 animate-ping"></div>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        window.L.marker(userLocation, { icon: currentLocationIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup('Tu ubicación actual');
      }

      // Agregar marcadores de restaurantes
      restaurantes.forEach(rest => {
        const emoji = restauranteService.obtenerEmojiCategoria(
          rest.categorias?.[0]?.nombreCategoria || 'Internacional'
        );

        const customIcon = window.L.icon({
          iconUrl: '/images/quoviPin.png',
          iconSize: [64, 80],    
          iconAnchor: [32, 80],    
          popupAnchor: [0, -80]   
        });

        const marker = window.L.marker([rest.latitud, rest.longitud], {
          icon: customIcon
        }).addTo(mapInstanceRef.current);

        marker.on('click', () => {
          onRestaurantClick(rest);
        });

        const precioRange = restauranteService.obtenerRangoPrecio(rest.precioPromedio);
        const statusBadge = rest.estaAbierto 
          ? '<span style="background: #10b981; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px;">Abierto</span>'
          : '<span style="background: #6b7280; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px;">Cerrado</span>';

        marker.bindPopup(`
          <div style="text-align: center; padding: 8px;">
            <div style="font-size: 24px; margin-bottom: 8px;">${emoji}</div>
            <div style="font-weight: 600; color: #1f2937;">${rest.nombre}</div>
            <div style="font-size: 13px; color: #6b7280; margin: 4px 0;">
              ${rest.categorias?.[0]?.nombreCategoria || ''} • ${precioRange}
            </div>
            <div style="margin: 6px 0;">${statusBadge}</div>
            ${rest.distanciaKm > 0 ? `
              <div style="font-size: 12px; color: #6b7280;">
                ${restauranteService.formatearDistancia(rest.distanciaKm)} • ${rest.tiempoEstimado}
              </div>
            ` : ''}
          </div>
        `);
      });

      // Ajustar vista si hay restaurantes
      if (restaurantes.length > 0) {
        const bounds = window.L.latLngBounds(
          restaurantes.map(r => [r.latitud, r.longitud])
        );
        if (userLocation) {
          bounds.extend(userLocation);
        }
        mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [restaurantes, userLocation, onRestaurantClick]);

  const handleZoomIn = (): void => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = (): void => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleLocateMe = (): void => {
    if (mapInstanceRef.current && userLocation) {
      mapInstanceRef.current.setView(userLocation, 15);
    }
  };

  return (
    <div className="w-full h-[60vh] bg-gray-100 rounded-2xl overflow-hidden shadow-2xl relative">
      <div ref={mapRef} className="w-full h-full"></div>
      
      <MapControls 
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onLocateMe={handleLocateMe}
      />

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-gray-200">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-blue-500" />
          <span className="font-semibold text-gray-700">Ciudad de México</span>
          {restaurantes.length > 0 && (
            <span className="text-xs text-gray-500">• {restaurantes.length} restaurantes</span>
          )}
        </div>
      </div>

      <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded text-xs text-gray-500">
        © OpenStreetMap contributors
      </div>
    </div>
  );
};

export default function MapDashboard() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestauranteConDistancia | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showRoute, setShowRoute] = useState(false);
  const [restaurantes, setRestaurantes] = useState<RestauranteConDistancia[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeBusqueda, setMensajeBusqueda] = useState<string>('');

  const { ubicacion, error: errorUbicacion, cargando: cargandoUbicacion, refrescarUbicacion } = useGeolocation(false);

  const userLocation: [number, number] | null = ubicacion 
    ? [ubicacion.latitud, ubicacion.longitud] 
    : null;

  // Cargar restaurantes cercanos inicialmente
  useEffect(() => {
    const cargarRestaurantesIniciales = async () => {
      if (!ubicacion) return;

      try {
        setCargando(true);
        setMensajeBusqueda('Cargando restaurantes cercanos...');
        
        const data = await restauranteService.obtenerRestaurantesCercanos(
          ubicacion.latitud,
          ubicacion.longitud,
          10
        );

        // Cargar favoritos si el usuario está autenticado
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const favResponse = await restauranteService.obtenerFavoritos(
              ubicacion.latitud,
              ubicacion.longitud
            );
            const favIds = new Set(favResponse.map((r) => r.idRestaurante));
            
            const dataConFavoritos = data.map(r => ({
              ...r,
              esFavorito: favIds.has(r.idRestaurante)
            }));
            
            setRestaurantes(dataConFavoritos);
          } catch (err) {
            console.error('Error loading favorites:', err);
            setRestaurantes(data);
          }
        } else {
          setRestaurantes(data);
        }

        setMensajeBusqueda(`${data.length} restaurantes cercanos`);
      } catch (error) {
        console.error('Error loading restaurants:', error);
        setMensajeBusqueda('Error al cargar restaurantes');
      } finally {
        setCargando(false);
      }
    };

    cargarRestaurantesIniciales();
  }, [ubicacion]);

  // Escuchar eventos de búsqueda
  useEffect(() => {
    const handleSearchResults = (event: CustomEvent) => {
      console.log('🎯 Evento de búsqueda recibido:', event.detail);
      
      const { data, total, filtros } = event.detail;
      
      setRestaurantes(data || []);
      setCargando(false);
      
      // Generar mensaje descriptivo
      let mensaje = `${total} resultado${total !== 1 ? 's' : ''}`;
      if (filtros?.categoria) {
        mensaje += ` de ${filtros.categoria}`;
      }
      if (filtros?.termino) {
        mensaje += ` para "${filtros.termino}"`;
      }
      
      setMensajeBusqueda(mensaje);
    };

    const handleSearchError = (event: CustomEvent) => {
      console.error('❌ Error en búsqueda:', event.detail);
      setMensajeBusqueda('Error en la búsqueda');
      setCargando(false);
    };

    window.addEventListener('searchResults', handleSearchResults as EventListener);
    window.addEventListener('searchError', handleSearchError as EventListener);

    return () => {
      window.removeEventListener('searchResults', handleSearchResults as EventListener);
      window.removeEventListener('searchError', handleSearchError as EventListener);
    };
  }, []);

  const handleRestaurantClick = (restaurant: RestauranteConDistancia) => {
    setSelectedRestaurant(restaurant);
    setShowDetails(true);
  };

  const handleShowRoute = () => {
    setShowDetails(false);
    setShowRoute(true);
  };

  const routeData = selectedRestaurant ? {
    distance: selectedRestaurant.distanciaKm,
    duration: selectedRestaurant.tiempoEstimado,
    steps: [
      {
        instruction: `Dirígete hacia ${selectedRestaurant.nombre}`,
        distance: `${(selectedRestaurant.distanciaKm * 0.6).toFixed(1)} km`
      },
      {
        instruction: `Continúa por ${selectedRestaurant.direccion}`,
        distance: `${(selectedRestaurant.distanciaKm * 0.3).toFixed(1)} km`
      },
      {
        instruction: `Tu destino ${selectedRestaurant.nombre} estará a la derecha`,
        distance: `${(selectedRestaurant.distanciaKm * 0.1).toFixed(1)} km`
      }
    ]
  } : undefined;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground 
        particleCount={40}
        colors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']}
        className="absolute inset-0"
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/80 via-orange-50/80 to-pink-50/80 backdrop-blur-sm"></div>

      <div className="relative z-50">
        <Navigation />
      </div>

      <div className="relative z-10 h-screen flex flex-col">
        <div className="pt-20 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <SearchBar 
            onSearch={(resultados) => {
              console.log('✅ Resultados recibidos en onSearch:', resultados.length);
            }}
            showLocationFilter={true}
            placeholder="¿Antojo de tacos al pastor o un café con leche?"
            userLocation={ubicacion ? { lat: ubicacion.latitud, lng: ubicacion.longitud } : undefined}
          />

          {errorUbicacion && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">No pudimos obtener tu ubicación</p>
                <p className="text-xs text-yellow-700 mt-1">{errorUbicacion}</p>
                <button
                  onClick={refrescarUbicacion}
                  className="mt-2 text-xs font-medium text-yellow-800 hover:text-yellow-900 underline"
                >
                  Intentar nuevamente
                </button>
              </div>
            </div>
          )}

          {(cargando || cargandoUbicacion) && (
            <div className="mt-4 bg-white rounded-xl p-4 flex items-center justify-center space-x-3">
              <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
              <span className="text-sm text-gray-600">
                {cargandoUbicacion ? 'Obteniendo ubicación...' : 'Cargando restaurantes...'}
              </span>
            </div>
          )}

          {mensajeBusqueda && !cargando && (
            <div className="mt-4 bg-white rounded-xl p-3 text-center">
              <span className="text-sm font-medium text-gray-700">{mensajeBusqueda}</span>
            </div>
          )}
        </div>

        <div className="flex-1 px-4 sm:px-6 lg:px-8 pb-24 max-w-7xl mx-auto w-full">
          <RealMapComponent 
            onRestaurantClick={handleRestaurantClick}
            userLocation={userLocation}
            restaurantes={restaurantes}
          />
        </div>
      </div>

      <RestaurantDetailsPanel
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        restaurant={selectedRestaurant ? {
          id: selectedRestaurant.idRestaurante,
          name: selectedRestaurant.nombre,
          category: selectedRestaurant.categorias?.[0]?.nombreCategoria || 'Restaurante',
          rating: selectedRestaurant.calificacionPromedio,
          reviews: selectedRestaurant.totalReseñas,
          distance: selectedRestaurant.distanciaKm,
          estimatedTime: selectedRestaurant.tiempoEstimado,
          address: selectedRestaurant.direccion,
          phone: selectedRestaurant.telefono,
          website: selectedRestaurant.sitioweb,
          imageUrl: selectedRestaurant.imagenes?.[0]?.url,
          isOpenNow: selectedRestaurant.estaAbierto,
          openingHours: selectedRestaurant.horarioHoy,
          price: restauranteService.obtenerRangoPrecio(selectedRestaurant.precioPromedio),
          description: selectedRestaurant.descripcion,
          isFavorite: selectedRestaurant.esFavorito || false,
        } : null}
        onShowRoute={handleShowRoute}
      />

      <RouteDisplay
        isVisible={showRoute}
        onClose={() => setShowRoute(false)}
        startLocation={userLocation || [19.4326, -99.1332]}
        endLocation={selectedRestaurant ? [selectedRestaurant.latitud, selectedRestaurant.longitud] : userLocation || [19.4326, -99.1332]}
        restaurantName={selectedRestaurant?.nombre || ''}
        routeData={routeData}
      />
    </div>
  );
}