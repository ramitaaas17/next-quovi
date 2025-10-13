'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Send, MapPin, Star, Camera, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/landing/Navigation';
import ParticleBackground from '@/components/common/Particles';

interface User {
  id: string;
  fullName: string;
  avatar: string | null;
}

interface Post {
  id: string;
  user: User;
  restaurant: string;
  location: string;
  image: string;
  caption: string;
  rating: number;
  likes: number;
  comments: number;
  timestamp: string;
  liked: boolean;
}

export default function CommunityPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostCaption, setNewPostCaption] = useState('');

  // Posts de ejemplo (estos vendrían de tu API)
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      user: { id: '1', fullName: 'María García', avatar: null },
      restaurant: 'Tacos El Güero',
      location: 'Roma Norte, CDMX',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
      caption: '¡Los mejores tacos al pastor que he probado! 🌮 El sabor es increíble y la atención es excelente',
      rating: 5,
      likes: 24,
      comments: 8,
      timestamp: '2 horas',
      liked: false,
    },
    {
      id: '2',
      user: { id: '2', fullName: 'Carlos Mendoza', avatar: null },
      restaurant: 'Café Central',
      location: 'Condesa, CDMX',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800',
      caption: 'El mejor café de la zona ☕ Ambiente perfecto para trabajar',
      rating: 4,
      likes: 18,
      comments: 5,
      timestamp: '5 horas',
      liked: true,
    },
    {
      id: '3',
      user: { id: '3', fullName: 'Ana Rodríguez', avatar: null },
      restaurant: 'Sushi Bar',
      location: 'Polanco, CDMX',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
      caption: 'Sushi fresco y delicioso 🍣 Totalmente recomendado',
      rating: 5,
      likes: 31,
      comments: 12,
      timestamp: '1 día',
      liked: false,
    },
  ]);

  // Cargar usuario actual
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setCurrentUser({
          id: parsedUser.id,
          fullName: parsedUser.fullName,
          avatar: parsedUser.avatar,
        });
      } else {
        router.push('/');
      }
    }
  }, [router]);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleNewPost = () => {
    // Aquí conectarías con tu API para crear un nuevo post
    console.log('Nuevo post:', newPostCaption);
    setShowNewPost(false);
    setNewPostCaption('');
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

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
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-24">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/dashboard')}
          className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Volver al inicio</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Comunidad</h1>
          <p className="text-gray-600">Descubre lo que otros amantes de la comida están disfrutando</p>
        </motion.div>

        {/* New Post Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setShowNewPost(true)}
          className="w-full mb-6 backdrop-blur-xl border rounded-2xl shadow-lg p-4 flex items-center space-x-3 hover:shadow-xl transition-all duration-300"
          style={{
            background: 'rgba(251, 146, 60, 0.15)',
            borderColor: 'rgba(251, 146, 60, 0.3)',
          }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {currentUser.fullName.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-gray-600">¿Qué estás comiendo hoy?</span>
        </motion.button>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-xl border rounded-3xl shadow-lg overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                borderColor: 'rgba(251, 146, 60, 0.2)',
              }}
            >
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {post.user.fullName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{post.user.fullName}</h3>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{post.restaurant}</span>
                      <span>•</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < post.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Post Image */}
              <div className="relative aspect-square">
                <img
                  src={post.image}
                  alt={post.restaurant}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Post Actions */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center space-x-2 transition-transform hover:scale-110"
                    >
                      <Heart
                        className={`w-6 h-6 transition-colors ${
                          post.liked ? 'text-red-500 fill-red-500' : 'text-gray-600'
                        }`}
                      />
                      <span className="text-sm font-semibold text-gray-700">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 transition-transform hover:scale-110">
                      <MessageCircle className="w-6 h-6 text-gray-600" />
                      <span className="text-sm font-semibold text-gray-700">{post.comments}</span>
                    </button>
                    <button className="transition-transform hover:scale-110">
                      <Share2 className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{post.location}</span>
                  </div>
                </div>

                {/* Post Caption */}
                <div>
                  <p className="text-gray-800">
                    <span className="font-semibold">{post.user.fullName}</span>{' '}
                    {post.caption}
                  </p>
                </div>

                {/* View Comments */}
                {post.comments > 0 && (
                  <button className="text-sm text-gray-500 hover:text-gray-700">
                    Ver los {post.comments} comentarios
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {showNewPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowNewPost(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-orange-400 to-red-500 p-6 text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Compartir experiencia
                </h2>
                <p className="text-white/80 text-sm mt-2">
                  Cuéntanos sobre tu última visita
                </p>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                {/* Restaurant Selection (simulado) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Restaurante
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border border-orange-200/50 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option>Selecciona un restaurante</option>
                    <option>Tacos El Güero</option>
                    <option>Café Central</option>
                    <option>Sushi Bar</option>
                    <option>Pizza Roma</option>
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Calificación
                  </label>
                  <div className="flex items-center space-x-2">
                    {[...Array(5)].map((_, i: number) => (
                      <button
                        key={i}
                        className="transition-transform hover:scale-110"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {}}
                        type="button"
                      >
                        <Star className="w-8 h-8 text-gray-300 hover:text-yellow-400 hover:fill-yellow-400" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Caption */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cuéntanos tu experiencia
                  </label>
                  <textarea
                    value={newPostCaption}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewPostCaption(e.target.value)}
                    placeholder="¿Qué te pareció? Comparte tu opinión..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-orange-200/50 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Image Upload (simulado) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Foto
                  </label>
                  <button className="w-full py-8 border-2 border-dashed border-orange-300 rounded-xl hover:border-orange-400 transition-colors group" type="button">
                    <Camera className="w-12 h-12 text-orange-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm text-gray-600">Click para subir una foto</p>
                  </button>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => setShowNewPost(false)}
                    className="flex-1 px-6 py-3 border border-orange-300/50 text-orange-700 rounded-2xl font-semibold transition-all duration-200 bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:scale-105"
                    type="button"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleNewPost}
                    className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    type="button"
                  >
                    <Send className="w-5 h-5" />
                    <span>Publicar</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}