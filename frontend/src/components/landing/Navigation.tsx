'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Search, User, Heart, LogOut, Users } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { FloatingDock } from '@/components/common/FloatingDock';
import Image from 'next/image';

interface DockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  location: string;
  avatar: string | null;
  createdAt: string;
}

const Navigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Verificar si el usuario está autenticado
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      // Limpiar datos del usuario
      localStorage.removeItem('user');
      localStorage.setItem('skipLoader', 'true');
      
      // Redirigir al home
      router.push('/');
    }
  };

  // Items del dock según el estado de autenticación
  const dockItems: DockItem[] = isAuthenticated
    ? [
        {
          title: 'Inicio',
          icon: <Home className="w-5 h-5" />,
          href: '/dashboard',
        },
        {
          title: 'Búsqueda',
          icon: <Search className="w-5 h-5" />,
          href: '/dashboard',
        },
        {
          title: 'Comunidad',
          icon: <Users className="w-5 h-5" />,
          href: '/community',
        },
        {
          title: 'Favoritos',
          icon: <Heart className="w-5 h-5" />,
          href: '/favorites',
        },
        {
          title: 'Perfil',
          icon: <User className="w-5 h-5" />,
          href: '/profile',
        },
        {
          title: 'Cerrar Sesión',
          icon: <LogOut className="w-5 h-5" />,
          href: '#logout',
        },
      ]
    : [
        {
          title: 'Inicio',
          icon: <Home className="w-5 h-5" />,
          href: '/',
        },
      ];

  // Handler para clicks en el dock
  const handleDockClick = (e: React.MouseEvent, href: string) => {
    if (href === '#logout') {
      e.preventDefault();
      setShowLogoutConfirm(true);
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo con Mascota */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => router.push(isAuthenticated ? '/dashboard' : '/')}
            >
              {/* Contenedor de la mascota */}
              <div className="relative">
                
                {/* Contenedor principal de la mascota */}
                <div className="relative w-14 h-14 r flex items-center justify-center ">
                  {/* Imagen de la mascota */}
                  <Image
                    src="/images/quoviMain.png"
                    alt="Quovi Mascot"
                    width={48} 
                    height={48}
                    priority
                  />

                </div>
              </div>
              
              {/* Texto Quovi con mejor tipografía y colores */}
              <div className="flex flex-col">
                <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 bg-clip-text text-transparent group-hover:from-orange-500 group-hover:via-red-500 group-hover:to-pink-500 transition-all duration-300">
                  Quovi
                </span>
                <span className="text-xs text-orange-600/70 font-medium -mt-1 group-hover:text-orange-500 transition-colors duration-300">
                  Encuentra tu sabor
                </span>
              </div>
            </motion.div>

            {/* User Info (solo si está autenticado) */}
            {isAuthenticated && user && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-orange-200/50 shadow-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                  {user.fullName}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </nav>

      {/* Floating Dock - Solo visible en dashboard y páginas protegidas */}
      {isAuthenticated && pathname !== '/' && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div onClick={(e) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');
            if (link) {
              handleDockClick(e, link.getAttribute('href') || '');
            }
          }}>
            <FloatingDock items={dockItems} />
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Logout */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLogoutConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-orange-400 to-red-500 p-6 text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <LogOut className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  ¿Cerrar sesión?
                </h2>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-center text-gray-600 mb-6">
                  ¿Estás seguro de que quieres cerrar sesión? Podrás volver cuando quieras.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={(_: React.MouseEvent<HTMLButtonElement>) => setShowLogoutConfirm(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold transition-all duration-200 hover:bg-gray-50 hover:border-gray-400 hover:scale-105"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;