import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, MapPin, Star } from 'lucide-react';

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

interface PostCardProps {
  post: Post;
  index: number;
  onLike: (postId: string) => void;
}

export default function PostCard({ post, index, onLike }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="backdrop-blur-xl border rounded-2xl lg:rounded-3xl shadow-lg overflow-hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'rgba(251, 146, 60, 0.2)',
      }}
    >
      {/* Post Header */}
      <header className="p-3 sm:p-4 flex items-start sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm sm:text-base">
              {post.user.fullName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
              {post.user.fullName}
            </h3>
            <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{post.restaurant}</span>
              <span className="flex-shrink-0">•</span>
              <span className="flex-shrink-0">{post.timestamp}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-0.5 sm:space-x-1 flex-shrink-0">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 sm:w-4 sm:h-4 ${
                i < post.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </header>

      {/* Post Image */}
      <div className="relative aspect-square">
        <img
          src={post.image}
          alt={post.restaurant}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Post Actions */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => onLike(post.id)}
              className="flex items-center space-x-1 sm:space-x-2 transition-transform hover:scale-110 active:scale-95"
              aria-label={post.liked ? 'Quitar me gusta' : 'Me gusta'}
            >
              <Heart
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
                  post.liked ? 'text-red-500 fill-red-500' : 'text-gray-600'
                }`}
              />
              <span className="text-xs sm:text-sm font-semibold text-gray-700">
                {post.likes}
              </span>
            </button>
            <button 
              className="flex items-center space-x-1 sm:space-x-2 transition-transform hover:scale-110 active:scale-95"
              aria-label="Ver comentarios"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              <span className="text-xs sm:text-sm font-semibold text-gray-700">
                {post.comments}
              </span>
            </button>
            <button 
              className="transition-transform hover:scale-110 active:scale-95"
              aria-label="Compartir"
            >
              <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
          </div>
          <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate max-w-[120px] sm:max-w-none">{post.location}</span>
          </div>
        </div>

        {/* Post Caption */}
        <div className="text-sm sm:text-base">
          <p className="text-gray-800 break-words">
            <span className="font-semibold">{post.user.fullName}</span>{' '}
            {post.caption}
          </p>
        </div>

        {/* View Comments */}
        {post.comments > 0 && (
          <button className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors">
            Ver los {post.comments} comentarios
          </button>
        )}
      </div>
    </motion.article>
  );
}