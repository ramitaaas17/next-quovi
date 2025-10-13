'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation as NavigationIcon } from 'lucide-react';
import Navigation from '@/components/landing/Navigation';
import SearchBar from '@/components/common/SearchBar';
import ParticleBackground from '@/components/common/Particles';

// Interfaces
interface Restaurant {
  id: number;
  name: string;
  type: string;
  color: string;
  x?: string;
  y?: string;
  coords?: [number, number];
}

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLocateMe: () => void;
}

// Declarar tipo para Leaflet en el objeto global window
declare global {
  interface Window {
    L: any;
  }
}

// Map Controls Component
const MapControls: React.FC<MapControlsProps> = ({ onZoomIn, onZoomOut, onLocateMe }) => {
  return (
    <div className="absolute top-4 left-4 z-10 space-y-2">
      {/* Zoom Controls */}
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
      
      {/* Location Button */}
      <button 
        onClick={onLocateMe}
        className="w-12 h-12 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
      >
        <NavigationIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

// Real Map Component usando OpenStreetMap
const RealMapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);

  useEffect(() => {
    // Cargar Leaflet dinámicamente
    const loadLeaflet = async (): Promise<void> => {
      // Cargar CSS de Leaflet
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css';
      document.head.appendChild(link);

      // Cargar JS de Leaflet
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.js';
      
      script.onload = () => {
        if (mapRef.current && window.L) {
          // Inicializar mapa centrado en Ciudad de México
          const map = window.L.map(mapRef.current, {
            zoomControl: false, // Deshabilitamos los controles por defecto
            attributionControl: false // Deshabilitamos la atribución por defecto
          }).setView([19.4326, -99.1332], 13);

          // Agregar tile layer con estilo personalizado
          window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          // Crear icono personalizado para restaurantes
          const createCustomIcon = (emoji: string, color: string) => {
            return window.L.divIcon({
              className: 'custom-marker',
              html: `
                <div class="relative">
                  <div class="w-12 h-12 ${color} rounded-full flex items-center justify-center shadow-lg border-3 border-white hover:scale-110 transition-transform duration-200 cursor-pointer">
                    <span class="text-white text-lg">${emoji}</span>
                  </div>
                  <div class="absolute top-10 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-current ${color.replace('bg-', 'text-')}"></div>
                </div>
              `,
              iconSize: [48, 60],
              iconAnchor: [24, 48]
            });
          };

          // Agregar marcadores de restaurantes
          const restaurants: Restaurant[] = [
            { id: 1, name: "Tacos El Güero", coords: [19.4350, -99.1400], type: "🌮", color: "bg-red-500" },
            { id: 2, name: "Pizza Roma", coords: [19.4300, -99.1280], type: "🍕", color: "bg-orange-500" },
            { id: 3, name: "Café Central", coords: [19.4380, -99.1250], type: "☕", color: "bg-blue-500" },
            { id: 4, name: "Green Bowl", coords: [19.4280, -99.1350], type: "🥗", color: "bg-green-500" },
            { id: 5, name: "Burger House", coords: [19.4420, -99.1200], type: "🍔", color: "bg-purple-500" },
            { id: 6, name: "Sushi Bar", coords: [19.4250, -99.1180], type: "🍣", color: "bg-pink-500" },
          ];

          restaurants.forEach(restaurant => {
            if (restaurant.coords) {
              const marker = window.L.marker(restaurant.coords, {
                icon: createCustomIcon(restaurant.type, restaurant.color)
              }).addTo(map);

              marker.bindPopup(`
                <div class="text-center p-2">
                  <div class="text-lg mb-2">${restaurant.type}</div>
                  <div class="font-semibold text-gray-800">${restaurant.name}</div>
                  <button class="mt-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm hover:shadow-lg transition-shadow">
                    Ver menú
                  </button>
                </div>
              `);
            }
          });

          // Agregar marcador de ubicación actual
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

          window.L.marker([19.4326, -99.1332], { icon: currentLocationIcon }).addTo(map)
            .bindPopup('Tu ubicación actual');

          setMapInstance(map);
        }
      };

      document.head.appendChild(script);
    };

    loadLeaflet();

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [mapInstance]);

  const handleZoomIn = (): void => {
    if (mapInstance) mapInstance.zoomIn();
  };

  const handleZoomOut = (): void => {
    if (mapInstance) mapInstance.zoomOut();
  };

  const handleLocateMe = (): void => {
    if (mapInstance) {
      mapInstance.setView([19.4326, -99.1332], 15);
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

      {/* Etiqueta de ubicación */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-gray-200">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-blue-500" />
          <span className="font-semibold text-gray-700">Ciudad de México</span>
        </div>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded text-xs text-gray-500">
        © OpenStreetMap contributors
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function MapDashboard() {
  const handleSearch = (searchTerm: string): void => {
    console.log('Buscando:', searchTerm);
    // Aquí puedes implementar la lógica de búsqueda
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground 
        particleCount={40}
        colors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']}
        className="absolute inset-0"
      />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/80 via-orange-50/80 to-pink-50/80 backdrop-blur-sm"></div>

      {/* Navigation Component */}
      <div className="relative z-50">
        <Navigation />
      </div>

{/* Main Content */}
      <div className="relative z-10 h-screen flex flex-col">
        {/* Search Section - Fixed at top */}
        <div className="pt-20 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <SearchBar 
            onSearch={handleSearch}
            showLocationFilter={true}
            placeholder="¿Antojo de tacos al pastor o un café con leche?"
          />
        </div>

        {/* Map Section - Takes remaining space */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 pb-24 max-w-7xl mx-auto w-full">
          <RealMapComponent />
        </div>
      </div>
    </div>
  );
}