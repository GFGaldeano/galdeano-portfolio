'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronUp, Github, Linkedin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../lib/translations';

export default function SpaceFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].footer;

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigationLinks = [
    { name: translations[language].nav.inicio, href: '#inicio' },
    { name: translations[language].nav.acerca, href: '#acerca' },
    { name: translations[language].nav.proyectos, href: '#proyectos' },
    { name: translations[language].nav.habilidades, href: '#habilidades' },
    { name: translations[language].nav.contacto, href: '#contacto' },
  ];

  const resourceLinks = [
    { name: t.documentation },
    { name: t.specs },
    { name: t.openSource },
    {
      name: t.blog,
      href: '/blog',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-950 to-black border-t border-cyan-500/10 mt-20">
      <div className="container mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg mb-4">
                GG
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Galdeano.dev</h3>
              <p className="text-gray-400 leading-relaxed">{t.description}</p>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://github.com/GFGaldeano"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-cyan-500/40 hover:text-cyan-400 transition-all text-gray-300"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/gustavo-galdeano/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-cyan-500/40 hover:text-cyan-400 transition-all text-gray-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-4">{t.navigation}</h4>
            <ul className="space-y-3">
              {navigationLinks.map((item) => (
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

          <div>
            <h4 className="text-white font-semibold text-lg mb-4">{t.resources}</h4>
            <ul className="space-y-3">
              {resourceLinks.map((item) => (
                <li key={item.name}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.target}
                      rel={item.rel}
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <span className="text-gray-500">{item.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-4">{t.newsletter}</h4>
            <p className="text-gray-400 leading-relaxed mb-4">{t.newsletterText}</p>

            <button className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors text-white font-medium">
              {t.subscribe}
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Gustavo Galdeano. {t.rights}
            </p>
            <p className="text-gray-500 text-sm mt-1">{t.designed}</p>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{t.privacy}</span>
            <span>{t.terms}</span>
            <span>{t.cookies}</span>
          </div>
        </div>
      </div>

      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-500/20 transition-colors"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </footer>
  );
}