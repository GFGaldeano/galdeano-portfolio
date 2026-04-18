// src/components/sections/HeroSection.jsx
'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../lib/translations';

export default function HeroSection() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generateStars = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 3 + 2}s`,
      opacity: Math.random() * 0.7 + 0.3
    }));
  };

  const stars = generateStars(200);

  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Starfield Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
        
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
                animationDelay: star.delay,
                animationDuration: star.duration,
              }}
            />
          ))}
        </div>

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="shooting-star"></div>
          <div className="shooting-star" style={{animationDelay: '7s'}}></div>
          <div className="shooting-star" style={{animationDelay: '14s'}}></div>
        </div>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl">
          <motion.h1 
            className="text-2xl md:text-3xl text-cyan-400 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t.greeting}
          </motion.h1>
          
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {t.name}
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl mb-2 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {t.title}
          </motion.p>
          
          <motion.p 
            className="text-lg mb-8 text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {t.subtitle}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <button 
              onClick={() => document.getElementById('acerca')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
            >
              {t.cta}
            </button>
            
            <div className="flex gap-3">
              <a 
                href="#" 
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
              >
                {t.cv}
              </a>
              <a 
                href="https://github.com/GFGaldeano" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
              >
                {t.github}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="flex flex-col items-center text-gray-400">
          <span className="text-sm mb-2">{t.scrollDown}</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-cyan-500 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
