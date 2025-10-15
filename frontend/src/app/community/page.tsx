'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/landing/Navigation';
import ParticleBackground from '@/components/common/Particles';
import CommunityHeader from '@/components/communityComp/CommunityHeader';
import NewPostButton from '@/components/communityComp/NewPostButton';
import PostCard from '@/components/communityComp/PostCard';
import NewPostModal from '@/components/communityComp/NewPostModal';

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

  // Load current user
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setCurrentUser({
            id: parsedUser.id,
            fullName: parsedUser.fullName,
            avatar: parsedUser.avatar,
          });
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user');
          router.push('/');
        }
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

  const handleNewPost = (caption: string, rating: number) => {
    console.log('Nuevo post:', { caption, rating });
    // Aquí conectarías con tu API
    setShowNewPost(false);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground 
        particleCount={30}
        colors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']}
        className="absolute inset-0"
      />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/80 via-orange-50/80 to-pink-50/80 backdrop-blur-sm"></div>

      {/* Navigation */}
      <div className="relative z-50">
        <Navigation />
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-32 pb-20 sm:pb-24">
        <CommunityHeader />
        
        <NewPostButton 
          user={currentUser} 
          onClick={() => setShowNewPost(true)} 
        />

        {/* Posts Feed */}
        <div className="space-y-4 sm:space-y-6">
          {posts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              index={index}
              onLike={handleLike}
            />
          ))}
        </div>

        {/* Empty State - si no hay posts */}
        {posts.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-gray-500 text-base sm:text-lg">
              No hay publicaciones aún. ¡Sé el primero en compartir!
            </p>
          </div>
        )}
      </main>

      {/* New Post Modal */}
      <NewPostModal
        isOpen={showNewPost}
        onClose={() => setShowNewPost(false)}
        onSubmit={handleNewPost}
      />
    </div>
  );
}