// src/components/layout/Header.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../lib/translations';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const navItems = [
    { name: t.nav.inicio, href: '#inicio' },
    { name: t.nav.acerca, href: '#acerca' },
    { name: t.nav.proyectos, href: '#proyectos' },
    { name: t.nav.habilidades, href: '#habilidades' },
    { name: t.nav.contacto, href: '#contacto' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center cursor-pointer"
            onClick={scrollToTop}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-lg font-bold text-white">GG</span>
            </div>
            <span className="text-xl font-bold text-white">Galdeano.dev</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <a 
                    href={item.href} 
                    className="text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <div className="hidden md:flex bg-gray-800/50 rounded-full p-1">
              <button 
                onClick={() => toggleLanguage('es')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  language === 'es' 
                    ? 'bg-cyan-600 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                🇪🇸 ES
              </button>
              <button 
                onClick={() => toggleLanguage('en')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  language === 'en' 
                    ? 'bg-cyan-600 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                🇺🇸 EN
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div 
            className="md:hidden bg-gray-900/90 backdrop-blur-sm rounded-b-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <ul className="py-4 space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="block px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-gray-800 rounded transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Mobile Language Toggle */}
            <div className="flex justify-center gap-2 pb-4">
              <button 
                onClick={() => toggleLanguage('es')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  language === 'es' 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                🇪🇸 ES
              </button>
              <button 
                onClick={() => toggleLanguage('en')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  language === 'en' 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                🇺🇸 EN
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
