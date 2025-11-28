import { 
  Sun, 
  CloudRain, 
  Cloud, 
  Snowflake,
  Heart,
  Users,
  User,
  Home,
  MapPin,
  Car,
  Plane,
  Candy,
  Pizza,
  Utensils,
  Wallet,
  CreditCard,
  Gem,
  type LucideIcon
} from 'lucide-react';

export interface QuestionOption {
  value: string;
  label: string;
  Icon: LucideIcon;
  gradient: string;
  description?: string;
}

export interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: QuestionOption[];
}

/**
 * Definición de todas las preguntas y opciones del wizard "Descubre"
 * Usa iconos de Lucide React en lugar de emojis
 */
export const discoverQuestions: Question[] = [
  {
    id: 'clima',
    title: '¿Cómo está el clima?',
    subtitle: 'Buscaremos lugares perfectos para hoy',
    options: [
      { 
        value: 'soleado', 
        label: 'Soleado', 
        Icon: Sun, 
        gradient: 'from-yellow-400 to-orange-500',
        description: 'Terrazas y lugares al aire libre'
      },
      { 
        value: 'lluvioso', 
        label: 'Lluvioso', 
        Icon: CloudRain, 
        gradient: 'from-blue-400 to-blue-600',
        description: 'Lugares acogedores bajo techo'
      },
      { 
        value: 'nublado', 
        label: 'Nublado', 
        Icon: Cloud, 
        gradient: 'from-gray-400 to-gray-600',
        description: 'Ambiente tranquilo y fresco'
      },
      { 
        value: 'frio', 
        label: 'Frío', 
        Icon: Snowflake, 
        gradient: 'from-cyan-400 to-blue-500',
        description: 'Comida caliente y reconfortante'
      },
    ]
  },
  {
    id: 'ocasion',
    title: '¿Cuál es tu plan?',
    subtitle: 'Cada momento merece el lugar perfecto',
    options: [
      { 
        value: 'cita', 
        label: 'Cita romántica', 
        Icon: Heart, 
        gradient: 'from-pink-400 to-rose-500',
        description: 'Ambiente íntimo y romántico'
      },
      { 
        value: 'amigos', 
        label: 'Con amigos', 
        Icon: Users, 
        gradient: 'from-purple-400 to-pink-500',
        description: 'Lugares animados y divertidos'
      },
      { 
        value: 'solo', 
        label: 'Solo/a', 
        Icon: User, 
        gradient: 'from-indigo-400 to-purple-500',
        description: 'Espacios tranquilos para ti'
      },
      { 
        value: 'familia', 
        label: 'En familia', 
        Icon: Home, 
        gradient: 'from-green-400 to-emerald-500',
        description: 'Lugares familiares y cómodos'
      },
    ]
  },
  {
    id: 'distancia',
    title: '¿Qué tan lejos quieres ir?',
    subtitle: 'La aventura comienza aquí',
    options: [
      { 
        value: 'cerca', 
        label: 'Cerca (0-2 km)', 
        Icon: MapPin, 
        gradient: 'from-green-400 to-teal-500',
        description: 'A pocos pasos de ti'
      },
      { 
        value: 'explorar', 
        label: 'Explorar (2-8 km)', 
        Icon: Car, 
        gradient: 'from-blue-400 to-cyan-500',
        description: 'Vale la pena el viaje'
      },
      { 
        value: 'lejos', 
        label: 'Aventura (8+ km)', 
        Icon: Plane, 
        gradient: 'from-orange-400 to-red-500',
        description: 'Para una experiencia especial'
      },
    ]
  },
  {
    id: 'antojo',
    title: '¿Qué se te antoja?',
    subtitle: 'Tu paladar es el protagonista',
    options: [
      { 
        value: 'dulce', 
        label: 'Algo dulce', 
        Icon: Candy, 
        gradient: 'from-pink-400 to-rose-500',
        description: 'Postres y dulces'
      },
      { 
        value: 'salado', 
        label: 'Algo salado', 
        Icon: Pizza, 
        gradient: 'from-orange-400 to-amber-500',
        description: 'Comida sustanciosa'
      },
      { 
        value: 'ambos', 
        label: 'Me gustan ambos', 
        Icon: Utensils, 
        gradient: 'from-purple-400 to-indigo-500',
        description: 'Lo mejor de ambos mundos'
      },
    ]
  },
  {
    id: 'presupuesto',
    title: '¿Cuál es tu presupuesto?',
    subtitle: 'Hay opciones deliciosas para todos',
    options: [
      { 
        value: 'bajo', 
        label: 'Económico ($-$$)', 
        Icon: Wallet, 
        gradient: 'from-green-400 to-emerald-500',
        description: 'Hasta $150 por persona'
      },
      { 
        value: 'medio', 
        label: 'Moderado ($$-$$$)', 
        Icon: CreditCard, 
        gradient: 'from-blue-400 to-indigo-500',
        description: '$150-$400 por persona'
      },
      { 
        value: 'alto', 
        label: 'Premium ($$$-$$$$)', 
        Icon: Gem, 
        gradient: 'from-purple-400 to-pink-500',
        description: '$400+ por persona'
      },
    ]
  }
];