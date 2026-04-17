// src/components/sections/SolarSystem.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Users, Code, Database } from 'lucide-react';

export default function SolarSystem() {
  const [selectedExperience, setSelectedExperience] = useState(null);

  const experiences = [
    {
      id: 'dragon',
      name: 'Dragon Pyramid',
      role: 'Fundador & CEO',
      period: '2020 - Presente',
      color: '#4F46E5',
      icon: <Building className="w-6 h-6" />,
      description: 'Empresa especializada en soluciones de Inteligencia Artificial y Tecnologías de la Información. Lidero el desarrollo de productos SaaS escalables y sistemas automatizados.',
      achievements: [
        'Desarrollo de GYM MASTER, SaaS multi-tenant para gestión de gimnasios',
        'Implementación de módulos de IA generativa y analítica de datos',
        'Liderazgo de equipos multidisciplinarios en metodología ágil',
        'Participación en programas de aceleración como NAVES Argentina'
      ],
      technologies: ['Next.js', 'Supabase', 'Docker', 'AI/ML', 'PostgreSQL']
    },
    {
      id: 'aed',
      name: 'AED Digital',
      role: 'Full-stack Developer',
      period: '2025',
      color: '#10B981',
      icon: <Code className="w-6 h-6" />,
      description: 'Desarrollo de sistema de Facturación y Logística como Progressive Web App (PWA) con operación offline y sincronización automática.',
      achievements: [
        'Implementación de soporte offline con IndexedDB',
        'Desarrollo de app instalable para cualquier dispositivo',
        'Integración con servicios de backend mediante Supabase',
        'Mejora de experiencia del usuario y disponibilidad del sistema'
      ],
      technologies: ['Next.js 14', 'Supabase', 'TailwindCSS', 'TypeScript']
    },
    {
      id: 'legislature',
      name: 'Honorable Legislatura de Tucumán',
      role: 'Director de Informática',
      period: '2010 - 2020',
      color: '#F59E0B',
      icon: <Database className="w-6 h-6" />,
      description: 'Liderazgo del área de informática y desarrollo de sistemas administrativos integrales para procesos gubernamentales.',
      achievements: [
        'Diseño y desarrollo de sistemas de gestión de legajos y expedientes',
        'Implementación de módulos de compras y procesos impositivos',
        'Administración de bases de datos PostgreSQL, SQL Server y MySQL',
        'Liderazgo de equipos multidisciplinarios bajo metodología Scrum'
      ],
      technologies: ['PHP', 'PostgreSQL', 'JavaScript', 'Visual FoxPro']
    }
  ];

  return (
    <section className="min-h-screen py-20 bg-gradient-to-b from-black to-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          MI SISTEMA SOLAR PROFESIONAL
        </motion.h2>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 to-purple-500 hidden md:block"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-gray-900 z-10 hidden md:block"></div>
                
                {/* Experience card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div 
                    className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border cursor-pointer hover:border-cyan-500/50 transition-all"
                    onClick={() => setSelectedExperience(exp)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${exp.color}20` }}
                      >
                        <div style={{ color: exp.color }}>
                          {exp.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{exp.name}</h3>
                        <p className="text-cyan-400">{exp.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{exp.period}</p>
                    <p className="text-gray-300">{exp.description.substring(0, 100)}...</p>
                  </div>
                </div>
                
                {/* Empty space for timeline */}
                <div className="w-full md:w-2/12 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Experience Detail Modal */}
        {selectedExperience && (
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: `${selectedExperience.color}20` }}
                    >
                      <div style={{ color: selectedExperience.color }}>
                        {selectedExperience.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedExperience.name}</h3>
                      <p className="text-cyan-400 text-lg">{selectedExperience.role}</p>
                      <p className="text-gray-400">{selectedExperience.period}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedExperience(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <p className="text-gray-300 mb-6">{selectedExperience.description}</p>

                <h4 className="text-lg font-semibold text-white mb-3">Logros Clave:</h4>
                <ul className="space-y-2 mb-6">
                  {selectedExperience.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{achievement}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="text-lg font-semibold text-white mb-3">Tecnologías:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExperience.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-gray-800 text-cyan-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
