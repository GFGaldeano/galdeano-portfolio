// src/components/layout/SpaceFooter.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, Github, Linkedin, Mail, Twitter } from 'lucide-react';

export default function SpaceFooter() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gradient-to-t from-gray-900 to-black border-t border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-xl font-bold text-white">GG</span>
              </div>
              <span className="text-2xl font-bold text-white">Galdeano.dev</span>
            </div>
            <p className="text-gray-400">
              Construyendo el futuro con código, IA y visión espacial.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/GFGaldeano" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/gustavo-galdeano" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:gustavo_galdeano@yahoo.com.ar" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">NAVEGACIÓN</h3>
            <ul className="space-y-2">
              {[
                { name: 'Inicio', href: '#inicio' },
                { name: 'Acerca', href: '#acerca' },
                { name: 'Proyectos', href: '#proyectos' },
                { name: 'Habilidades', href: '#habilidades' },
                { name: 'Contacto', href: '#contacto' }
              ].map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">RECURSOS</h3>
            <ul className="space-y-2">
              {[
                'Documentación',
                'Especificaciones Técnicas',
                'Proyectos Open Source',
                'Blog Técnico'
              ].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">BOLETÍN ESPACIAL</h3>
            <p className="text-gray-400 mb-4">
              Suscríbete para recibir actualizaciones sobre proyectos y artículos técnicos.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white text-sm"
              />
              <button className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-r-lg text-sm transition-colors">
                OK
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Credits */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              <p>© {new Date().getFullYear()} Gustavo Galdeano. Todos los derechos reservados.</p>
              <p className="mt-1">Diseñado con ❤️ y código en Argentina</p>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                Términos de Uso
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-cyan-600 hover:bg-cyan-700 rounded-full flex items-center justify-center shadow-lg z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronUp size={24} className="text-white" />
        </motion.button>
      )}
    </footer>
  );
}
