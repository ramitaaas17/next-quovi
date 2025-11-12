'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation as NavigationIcon } from 'lucide-react';
import Navigation from '@/components/landing/Navigation';
import SearchBar from '@/components/common/SearchBar';
import ParticleBackground from '@/components/common/Particles';
import RestaurantDetailsPanel from '@/components/dashboard/RestaurantDetailsPanel';
import RouteDisplay from '@/components/dashboard/RouteDisplay';

// Interfaces
interface Restaurant {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  distance: number;
  estimatedTime: string;
  address: string;
  phone?: string;
  website?: string;
  imageUrl?: string;
  isOpenNow: boolean;
  openingHours?: string;
  price: string;
  description?: string;
  coords: [number, number];
  type: string;
  color: string;
}

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLocateMe: () => void;
}

declare global {
  interface Window {
    L: any;
  }
}

// Map Controls Component
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

// Real Map Component
const RealMapComponent: React.FC<{
  onRestaurantClick: (restaurant: Restaurant) => void;
}> = ({ onRestaurantClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const loadLeaflet = async (): Promise<void> => {
      // Cargar CSS de Leaflet
      if (!document.querySelector('link[href*="leaflet.min.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css';
        document.head.appendChild(link);
      }

      // Cargar JS de Leaflet
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
        const map = window.L.map(mapRef.current, {
          zoomControl: false,
          attributionControl: false
        }).setView([19.4326, -99.1332], 13);

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

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

        // Datos de restaurantes
        const restaurants: Restaurant[] = [
          {
            id: 1,
            name: "Tacos El Güero",
            coords: [19.4350, -99.1400],
            type: "🌮",
            color: "bg-red-500",
            category: "Comida Mexicana",
            rating: 4.5,
            reviews: 127,
            distance: 1.2,
            estimatedTime: "5-10 min",
            address: "Av. Insurgentes Sur 1234, Roma Norte, CDMX",
            phone: "+52 55 1234 5678",
            website: "https://tacosguero.com",
            imageUrl: undefined,
            isOpenNow: true,
            openingHours: "Lun-Dom: 9:00 AM - 10:00 PM",
            price: "$$",
            description: "Los mejores tacos al pastor de la colonia Roma. Con más de 20 años de experiencia."
          },
          {
            id: 2,
            name: "Pizza Roma",
            coords: [19.4300, -99.1280],
            type: "🍕",
            color: "bg-orange-500",
            category: "Comida Italiana",
            rating: 4.3,
            reviews: 89,
            distance: 0.8,
            estimatedTime: "3-8 min",
            address: "Calle Orizaba 56, Roma Norte, CDMX",
            phone: "+52 55 2345 6789",
            imageUrl: undefined,
            isOpenNow: true,
            openingHours: "Mar-Dom: 1:00 PM - 11:00 PM",
            price: "$$$",
            description: "Auténtica pizza napolitana con ingredientes importados de Italia."
          },
          {
            id: 3,
            name: "Café Central",
            coords: [19.4380, -99.1250],
            type: "☕",
            color: "bg-blue-500",
            category: "Cafetería",
            rating: 4.7,
            reviews: 203,
            distance: 0.5,
            estimatedTime: "2-5 min",
            address: "Av. Álvaro Obregón 99, Roma Norte, CDMX",
            phone: "+52 55 3456 7890",
            website: "https://cafecentral.mx",
            imageUrl: undefined,
            isOpenNow: true,
            openingHours: "Lun-Vie: 7:00 AM - 9:00 PM",
            price: "$$",
            description: "Café de especialidad con granos de origen mexicano tostados artesanalmente."
          },
          {
            id: 4,
            name: "Green Bowl",
            coords: [19.4280, -99.1350],
            type: "🥗",
            color: "bg-green-500",
            category: "Comida Saludable",
            rating: 4.6,
            reviews: 156,
            distance: 1.0,
            estimatedTime: "4-9 min",
            address: "Calle Colima 234, Roma Sur, CDMX",
            imageUrl: undefined,
            isOpenNow: true,
            openingHours: "Lun-Sáb: 8:00 AM - 8:00 PM",
            price: "$$$",
            description: "Bowls saludables con ingredientes orgánicos y opciones veganas."
          },
          {
            id: 5,
            name: "Burger House",
            coords: [19.4420, -99.1200],
            type: "🍔",
            color: "bg-purple-500",
            category: "Hamburguesas",
            rating: 4.4,
            reviews: 178,
            distance: 1.5,
            estimatedTime: "6-12 min",
            address: "Av. Chapultepec 456, Juárez, CDMX",
            phone: "+52 55 4567 8901",
            imageUrl: undefined,
            isOpenNow: false,
            openingHours: "Mié-Lun: 12:00 PM - 10:00 PM",
            price: "$$",
            description: "Hamburguesas gourmet con carne 100% de res y pan artesanal."
          },
          {
            id: 6,
            name: "Sushi Bar",
            coords: [19.4250, -99.1180],
            type: "🍣",
            color: "bg-pink-500",
            category: "Comida Japonesa",
            rating: 4.8,
            reviews: 234,
            distance: 1.3,
            estimatedTime: "5-11 min",
            address: "Calle Frontera 78, Roma Sur, CDMX",
            phone: "+52 55 5678 9012",
            website: "https://sushibar.mx",
            imageUrl: undefined,
            isOpenNow: true,
            openingHours: "Lun-Dom: 1:00 PM - 11:00 PM",
            price: "$$$$",
            description: "Sushi fresco preparado por chef japonés con más de 15 años de experiencia."
          }
        ];

        restaurants.forEach(restaurant => {
          if (restaurant.coords) {
            const marker = window.L.marker(restaurant.coords, {
              icon: createCustomIcon(restaurant.type, restaurant.color)
            }).addTo(map);

            marker.on('click', () => {
              onRestaurantClick(restaurant);
            });

            marker.bindPopup(`
              <div class="text-center p-2">
                <div class="text-lg mb-2">${restaurant.type}</div>
                <div class="font-semibold text-gray-800">${restaurant.name}</div>
                <div class="text-sm text-gray-600 mt-1">${restaurant.category}</div>
                <div class="flex items-center justify-center mt-2">
                  <span class="text-yellow-500">★</span>
                  <span class="text-sm font-medium ml-1">${restaurant.rating}</span>
                </div>
              </div>
            `);
          }
        });

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

  const handleZoomIn = (): void => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = (): void => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleLocateMe = (): void => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([19.4326, -99.1332], 15);
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
        </div>
      </div>

      <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded text-xs text-gray-500">
        © OpenStreetMap contributors
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function MapDashboard() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showRoute, setShowRoute] = useState(false);

  const userLocation: [number, number] = [19.4326, -99.1332];

  const handleSearch = (searchTerm: string): void => {
    console.log('Buscando:', searchTerm);
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowDetails(true);
  };

  const handleShowRoute = () => {
    setShowDetails(false);
    setShowRoute(true);
  };

  const routeData = selectedRestaurant ? {
    distance: selectedRestaurant.distance,
    duration: selectedRestaurant.estimatedTime,
    steps: [
      {
        instruction: "Dirígete al norte por Av. Insurgentes Sur hacia Calle Durango",
        distance: "400 m"
      },
      {
        instruction: "Gira a la derecha en Calle Durango",
        distance: "300 m"
      },
      {
        instruction: `Tu destino ${selectedRestaurant.name} estará a la derecha`,
        distance: "50 m"
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
            onSearch={handleSearch}
            showLocationFilter={true}
            placeholder="¿Antojo de tacos al pastor o un café con leche?"
          />
        </div>

        <div className="flex-1 px-4 sm:px-6 lg:px-8 pb-24 max-w-7xl mx-auto w-full">
          <RealMapComponent onRestaurantClick={handleRestaurantClick} />
        </div>
      </div>

      <RestaurantDetailsPanel
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        restaurant={selectedRestaurant}
        onShowRoute={handleShowRoute}
      />

      <RouteDisplay
        isVisible={showRoute}
        onClose={() => setShowRoute(false)}
        startLocation={userLocation}
        endLocation={selectedRestaurant?.coords || userLocation}
        restaurantName={selectedRestaurant?.name || ''}
        routeData={routeData}
      />
    </div>
  );
}