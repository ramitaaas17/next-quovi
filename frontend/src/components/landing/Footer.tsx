import React from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import ParticleBackground from '../common/Particles';

/**
 * Footer con fondo animado y diseño limpio
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'info@quovi.com', href: 'mailto:info@quovi.com', color: 'orange' },
    { icon: Phone, label: 'Teléfono', value: '+52 5562503477', href: 'tel:+525562503477', color: 'green' },
    { icon: MapPin, label: 'Ubicación', value: 'Ciudad de México, MX', href: null, color: 'red' }
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 text-gray-800 pt-16 sm:pt-20 pb-8 overflow-hidden">
      
      {/* Partículas de fondo */}
      <ParticleBackground 
        particleCount={40}
        colors={['#ff6b35', '#f7931e', '#2ecc71']}
        className="opacity-50"
      />
      
      {/* Blobs decorativos */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 mb-12">
          
          {/* Sección de marca */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
              {/* Imagen de mascota */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16">
                <Image
                  src="/images/quoviPin.png"
                  alt="Quovi"
                  width={64}
                  height={64}
                  className="object-contain transform hover:scale-110 transition-transform"
                />
              </div>
              <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Quovi
              </span>
            </div>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0 mb-6">
              Tu destino para experiencias únicas que combinan lo mejor de la innovación y la tradición. 
              Descubre sabores auténticos y vive momentos inolvidables.
            </p>
            
            {/* Redes sociales */}
            <div className="flex justify-center lg:justify-start space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="w-11 h-11 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md hover:shadow-xl hover:-translate-y-1 hover:bg-orange-500 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="font-bold text-xl sm:text-2xl mb-6 text-gray-800 text-center lg:text-left">
              Contacto
            </h3>
            <ul className="space-y-5">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all flex-shrink-0">
                    <info.icon className={`w-5 h-5 text-${info.color}-500`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">{info.label}</p>
                    {info.href ? (
                      <a href={info.href} className={`text-base sm:text-lg font-medium text-gray-700 hover:text-orange-500 transition-colors`}>
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-base sm:text-lg font-medium text-gray-700">{info.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divisor decorativo */}
        <div className="relative h-px mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-300/50 to-transparent"></div>
        </div>

        {/* Sección inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-600 text-sm text-center md:text-left">
            © {currentYear} Quovi. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#privacy" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">
              Privacidad
            </a>
            <a href="#terms" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">
              Términos
            </a>
            <a href="#cookies" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;