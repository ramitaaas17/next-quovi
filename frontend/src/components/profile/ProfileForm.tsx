'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Save, X } from 'lucide-react';

interface ProfileFormProps {
  nombre: string;
  apellido: string;
  email: string;
  provider: string;
  onSave: (data: { nombre: string; apellido: string; email: string }) => Promise<void>;
  onCancel: () => void;
  disabled?: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  nombre: initialNombre,
  apellido: initialApellido,
  email: initialEmail,
  provider,
  onSave,
  onCancel,
  disabled = false
}) => {
  const [formData, setFormData] = useState({
    nombre: initialNombre,
    apellido: initialApellido,
    email: initialEmail,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Actualiza campo del formulario
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpia error del campo al escribir
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Valida campos del formulario
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Envía formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSaving(true);
      await onSave(formData);
    } catch (error: any) {
      setErrors({ submit: error.message || 'Error al guardar cambios' });
    } finally {
      setIsSaving(false);
    }
  };

  // Verifica si hay cambios
  const hasChanges = 
    formData.nombre !== initialNombre ||
    formData.apellido !== initialApellido ||
    formData.email !== initialEmail;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {/* Campo Nombre */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2 sm:mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-md">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
            <span>Nombre</span>
          </div>
        </label>
        <input
          type="text"
          value={formData.nombre}
          onChange={(e) => handleChange('nombre', e.target.value)}
          disabled={disabled || isSaving}
          className={`w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-orange-400 transition-all font-medium text-gray-800 placeholder-gray-400 ${
            errors.nombre 
              ? 'border-red-300 focus:border-red-400' 
              : 'border-orange-200/50 focus:border-orange-400'
          } disabled:bg-gray-50 disabled:cursor-not-allowed`}
          placeholder="Tu nombre"
        />
        {errors.nombre && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.nombre}</p>
        )}
      </div>

      {/* Campo Apellido */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2 sm:mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-md">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
            <span>Apellido</span>
          </div>
        </label>
        <input
          type="text"
          value={formData.apellido}
          onChange={(e) => handleChange('apellido', e.target.value)}
          disabled={disabled || isSaving}
          className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-orange-200/50 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed font-medium text-gray-800 placeholder-gray-400"
          placeholder="Tu apellido (opcional)"
        />
      </div>

      {/* Campo Email */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2 sm:mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-md">
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
            <span>Correo electrónico</span>
          </div>
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          disabled={disabled || isSaving || provider !== 'local'}
          className={`w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-orange-400 transition-all font-medium text-gray-800 placeholder-gray-400 ${
            errors.email 
              ? 'border-red-300 focus:border-red-400' 
              : 'border-orange-200/50 focus:border-orange-400'
          } disabled:bg-gray-50 disabled:cursor-not-allowed`}
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
        )}
        {provider !== 'local' && (
          <p className="text-xs text-gray-500 mt-2">
            No puedes cambiar el email de una cuenta de {provider}
          </p>
        )}
      </div>

      {/* Error general */}
      {errors.submit && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl sm:rounded-2xl text-red-700 text-xs sm:text-sm"
        >
          {errors.submit}
        </motion.div>
      )}

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-xl sm:rounded-2xl font-bold transition-all duration-200 bg-white hover:bg-gray-50 hover:border-gray-400 hover:scale-105 disabled:opacity-50 flex items-center justify-center text-sm sm:text-base"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Cancelar
        </button>
        
        <button
          type="submit"
          disabled={!hasChanges || isSaving || disabled}
          className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl sm:rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Guardar cambios
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;