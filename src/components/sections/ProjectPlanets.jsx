'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProjectPlanets() {
  // Declarar projects antes de usarlo
  const projects = [
    {
      id: 'gym-master',
      name: 'GYM MASTER SaaS',
      category: 'saas',
      color: 'from-indigo-500 to-purple-600',
      description: 'Plataforma SaaS multi-tenant para gestión de gimnasios con módulos de análisis y automatización impulsados por IA',
      technologies: ['Next.js 14', 'Supabase', 'PostgreSQL', 'Docker', 'AI/ML'],
      images: [
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1517917808971-7a9a6c1c8a5f?w=400&h=300&fit=crop'
      ],
      metrics: {
        clients: '50+',
        users: '10K+',
        revenue: '$2M+'
      }
    },
    {
      id: 'rag-lia',
      name: 'RAG-LIA Asistente Académico',
      category: 'ai',
      color: 'from-pink-500 to-rose-600',
      description: 'Asistente conversacional con IA para apoyo académico y retención estudiantil',
      technologies: ['FastAPI', 'pgvector', 'OpenAI', 'Docker'],
      images: [
        'https://images.unsplash.com/photo-1677442135722-5f11d4d4c2d8?w=400&h=300&fit=crop'
      ],
      metrics: {
        institutions: '3',
        students: '1.5K+',
        accuracy: '92%'
      }
    },
    {
      id: 'ecommerce',
      name: 'Plataforma E-Commerce',
      category: 'ecommerce',
      color: 'from-emerald-500 to-teal-600',
      description: 'Plataforma de comercio electrónico automatizada con inventario en tiempo real',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      images: [
        'https://images.unsplash.com/photo-1551836022-d5d88e0aef3a?w=400&h=300&fit=crop'
      ],
      metrics: {
        stores: '25+',
        orders: '50K+',
        uptime: '99.9%'
      }
    }
  ];

  // Ahora podemos usar projects[0] sin problemas
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  return (
    <section className="min-h-screen py-20 bg-gradient-to-b from-black to-gray-900/50" id="proyectos">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          PROYECTOS PLANETARIOS
        </motion.h2>
        
        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`bg-gradient-to-br ${project.color} rounded-2xl p-6 cursor-pointer transform transition-transform hover:scale-105`}
              onClick={() => handleProjectSelect(project)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-black/30 rounded-xl p-4 mb-4">
                <div className="aspect-video bg-gray-800 rounded-lg mb-3 overflow-hidden">
                  <img 
                    src={project.images[0]} 
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                <p className="text-gray-200 text-sm">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Project Details */}
        {selectedProject && (
          <motion.div 
            className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Images */}
              <div>
                <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden mb-4">
                  <img 
                    src={selectedProject.images[currentImageIndex]} 
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {selectedProject.images.length > 1 && (
                  <div className="flex gap-2">
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          index === currentImageIndex ? 'bg-cyan-500' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Info */}
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {selectedProject.name}
                </h3>
                
                <p className="text-gray-300 mb-6">
                  {selectedProject.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-cyan-400 font-semibold mb-2">TECNOLOGÍAS:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-cyan-900/50 text-cyan-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(selectedProject.metrics).map(([key, value]) => (
                    <div key={key} className="text-center bg-gray-800/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-cyan-400">{value}</div>
                      <div className="text-sm text-gray-400 capitalize">
                        {key === 'clients' ? 'Clientes' : 
                         key === 'users' ? 'Usuarios' : 
                         key === 'revenue' ? 'Ingresos' : 
                         key === 'institutions' ? 'Instituciones' : 
                         key === 'students' ? 'Estudiantes' : 
                         key === 'accuracy' ? 'Precisión' : 
                         key === 'stores' ? 'Tiendas' : 
                         key === 'orders' ? 'Pedidos' : 
                         key === 'uptime' ? 'Disponibilidad' : key}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <button className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded-lg transition-colors">
                    LIVE DEMO
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg transition-colors">
                    CÓDIGO FUENTE
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
