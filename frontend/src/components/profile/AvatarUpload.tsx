'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Trash2, Upload, X } from 'lucide-react';
import Image from 'next/image';

interface AvatarUploadProps {
  currentAvatar?: string;
  userName: string;
  onUpload: (file: File) => Promise<void>;
  onDelete?: () => Promise<void>;
  disabled?: boolean;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  currentAvatar,
  userName,
  onUpload,
  onDelete,
  disabled = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (file: File) => {
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida');
      return;
    }

    // Validar tamaño (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no debe superar los 5MB');
      return;
    }

    // Crear preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Subir archivo
    handleUpload(file);
  };

  const handleUpload = async (file: File) => {
    try {
      setIsUploading(true);
      await onUpload(file);
      setPreview(null);
    } catch (error) {
      console.error('Error al subir imagen:', error);
      alert('Error al subir la imagen');
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    
    try {
      setIsUploading(true);
      await onDelete();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error al eliminar foto:', error);
      alert('Error al eliminar la foto');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const displayImage = preview || currentAvatar;

  return (
    <>
      <div className="flex flex-col items-center">
        {/* Avatar Container */}
        <motion.div 
          className="relative group"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Anillo externo animado */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(45deg, rgba(251,146,60,0.5), rgba(249,115,22,0.5))',
              padding: '4px',
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-red-500" />
          </motion.div>
          
          {/* Avatar */}
          <div 
            className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl overflow-hidden cursor-pointer"
            onClick={() => !disabled && fileInputRef.current?.click()}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {displayImage ? (
              <Image 
                src={displayImage.startsWith('http') ? displayImage : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}${displayImage}`}
                alt={userName}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-red-500">
                {userName.charAt(0).toUpperCase()}
              </span>
            )}

            {/* Overlay con botones */}
            {!disabled && (
              <motion.div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </motion.button>

                  {currentAvatar && onDelete && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-red-500/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteConfirm(true);
                      }}
                    >
                      <Trash2 className="w-5 h-5 text-white" />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}

            {/* Drag & Drop overlay */}
            {dragActive && (
              <div className="absolute inset-0 bg-blue-500/60 backdrop-blur-sm flex items-center justify-center z-10">
                <Upload className="w-8 h-8 text-white animate-bounce" />
              </div>
            )}
          </div>
          
          {/* Botón de cámara mejorado */}
          {!disabled && (
            <motion.button 
              className="absolute bottom-2 right-2 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all group"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </motion.button>
          )}
        </motion.div>

        {/* Input oculto */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
          }}
          disabled={disabled || isUploading}
        />

        {/* Instrucciones */}
        {!disabled && (
          <p className="text-sm text-gray-500 mt-4 text-center">
            Haz clic o arrastra una imagen<br />
            <span className="text-xs">PNG, JPG, GIF hasta 5MB</span>
          </p>
        )}
      </div>

      {/* Modal de confirmación para eliminar */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-br from-red-400 to-red-500 p-6 text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  ¿Eliminar foto de perfil?
                </h3>
              </div>

              <div className="p-6">
                <p className="text-center text-gray-600 mb-6">
                  Esta acción no se puede deshacer. Tu foto de perfil será eliminada permanentemente.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isUploading}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold transition-all duration-200 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isUploading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 disabled:opacity-50 flex items-center justify-center"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Eliminando...
                      </>
                    ) : (
                      'Eliminar'
                    )}
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

export default AvatarUpload;