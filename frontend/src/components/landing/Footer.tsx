import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-orange-50 via-white to-green-50 text-gray-800 pt-16 pb-8 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                <span className="text-white font-bold text-2xl">Q</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Quovi
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed max-w-md mb-6">
              Tu destino para experiencias únicas que combinan lo mejor de la innovación y la tradición. 
              Descubre sabores auténticos y vive momentos inolvidables.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-800 relative inline-block">
              Enlaces Rápidos
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600"></span>
            </h3>
            <ul className="space-y-3">
              {['Inicio', 'Nosotros', 'Servicios', 'Restaurantes', 'Blog', 'Contacto'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-gray-600 hover:text-orange-500 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-800 relative inline-block">
              Contacto
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-green-500 to-green-600"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0">
                  <Mail className="w-4 h-4 text-orange-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Email</p>
                  <a href="mailto:info@quovi.com" className="text-gray-700 hover:text-orange-500 transition-colors">
                    info@quovi.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0">
                  <Phone className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <a href="tel:+521234567890" className="text-gray-700 hover:text-green-500 transition-colors">
                    +52 123 456 7890
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0">
                  <MapPin className="w-4 h-4 text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Ubicación</p>
                  <p className="text-gray-700">Ciudad de México, MX</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-600 text-sm">
            © 2025 Quovi. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#privacy" className="text-gray-600 hover:text-orange-500 transition-colors">
              Privacidad
            </a>
            <a href="#terms" className="text-gray-600 hover:text-orange-500 transition-colors">
              Términos
            </a>
            <a href="#cookies" className="text-gray-600 hover:text-orange-500 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;