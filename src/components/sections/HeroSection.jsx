'use client';

import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useState, Suspense } from 'react';

function AnimatedStars() {
  return (
    <Stars 
      radius={100} 
      depth={50} 
      count={5000} 
      factor={4} 
      saturation={0} 
      fade 
    />
  );
}

export default function HeroSection() {
  const [language, setLanguage] = useState('es');

  const content = {
    es: {
      greeting: "HOLA, SOY",
      name: "GUSTAVO GALDEANO",
      title: "FULL STACK ENGINEER | AI ARCHITECT",
      subtitle: "Fundador @ Dragon Pyramid",
      cta: "EXPLORAR MI UNIVERSO",
      cv: "Ver CV",
      github: "GitHub",
      linkedin: "LinkedIn"
    },
    en: {
      greeting: "HELLO, I'M",
      name: "GUSTAVO GALDEANO",
      title: "FULL STACK ENGINEER | AI ARCHITECT",
      subtitle: "Founder @ Dragon Pyramid",
      cta: "EXPLORE MY UNIVERSE",
      cv: "View CV",
      github: "GitHub",
      linkedin: "LinkedIn"
    }
  };

  const currentContent = content[language];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Suspense fallback={null}>
            <AnimatedStars />
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} />
          </Suspense>
        </Canvas>
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
            {currentContent.greeting}
          </motion.h1>
          
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {currentContent.name}
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl mb-2 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {currentContent.title}
          </motion.p>
          
          <motion.p 
            className="text-lg mb-8 text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {currentContent.subtitle}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
              {currentContent.cta}
            </button>
            
            <div className="flex gap-3">
              <a 
                href="#" 
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
              >
                {currentContent.cv}
              </a>
              <a 
                href="https://github.com/GFGaldeano" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
              >
                {currentContent.github}
              </a>
            </div>
          </motion.div>
          
          {/* Language Toggle */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <div className="bg-gray-800/50 rounded-full p-1 flex">
              <button 
                onClick={() => setLanguage('es')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  language === 'es' 
                    ? 'bg-cyan-600 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                🇪🇸 ES
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  language === 'en' 
                    ? 'bg-cyan-600 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                🇺🇸 EN
              </button>
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
          <span className="text-sm mb-2">SCROLL DOWN</span>
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
