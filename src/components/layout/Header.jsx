'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../lib/translations';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const navItems = [
    { name: t.nav.inicio, href: '#inicio', type: 'anchor' },
    { name: t.nav.acerca, href: '#acerca', type: 'anchor' },
    { name: t.nav.proyectos, href: '#proyectos', type: 'anchor' },
    { name: t.nav.habilidades, href: '#habilidades', type: 'anchor' },
    { name: t.nav.blog, href: '/blog', type: 'route' },
    { name: t.nav.contacto, href: '#contacto', type: 'anchor' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20"
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 cursor-pointer"
          onClick={scrollToTop}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">GG</span>
          </div>
          <span className="text-white font-bold text-xl">Galdeano.dev</span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) =>
            item.type === 'route' ? (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  {item.name}
                </Link>
              </motion.div>
            ) : (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-gray-300 hover:text-cyan-400 transition-colors"
              >
                {item.name}
              </motion.a>
            )
          )}
        </div>

        {/* Language Toggle & Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <div className="hidden md:flex items-center bg-gray-800 rounded-full p-1">
            <button
              onClick={() => toggleLanguage('es')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                language === 'es'
                  ? 'bg-cyan-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => toggleLanguage('en')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                language === 'en'
                  ? 'bg-cyan-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-gray-900/95 border-t border-cyan-500/20"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) =>
              item.type === 'route' ? (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  {item.name}
                </a>
              )
            )}

            {/* Mobile Language Toggle */}
            <div className="flex items-center space-x-2 pt-4 border-t border-gray-700">
              <button
                onClick={() => toggleLanguage('es')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  language === 'es'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => toggleLanguage('en')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  language === 'en'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}