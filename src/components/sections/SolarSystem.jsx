// src/components/sections/SolarSystem.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Code, Database, User } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../lib/translations';

export default function SolarSystem() {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const { language } = useLanguage();
  const t = translations[language];

  const experiences = [
    {
      id: 'luui',
      name: 'LUUI',
      role: 'Technical Team Leader - Back Office',
      location: language === 'es' ? 'Pichincha - Ecuador' : 'Pichincha - Ecuador',
      period: language === 'es' ? '2026 - Presente' : '2026 - Present',
      color: '#22C55E',
      icon: <Building className="w-6 h-6" />,
      description: language === 'es'
        ? 'Actualmente me desempeño como Team Leader del frente de Back Office en LUUI, una plataforma HealthTech orientada al cuidado integral de adultos mayores.'
        : 'I currently serve as Team Leader for the Back Office front at LUUI, a HealthTech platform focused on comprehensive care for older adults.',
      achievements: language === 'es' ? [
        'Diseño y coordinación del panel administrativo web del Back Office',
        'Colaboración en la definición de la arquitectura funcional y su integración con el ecosistema general del producto',
        'Trabajo sobre módulos de monitoreo operativo, validación de profesionales, seguimiento de atenciones, gestión administrativa y soporte a procesos de pagos y reportes',
        'Participación en decisiones técnicas transversales sobre la estructura base del proyecto, estándares de desarrollo y organización del flujo de trabajo',
        'Revisión técnica de entregables y coordinación entre frontend, backend y base de datos',
        'Análisis de infraestructura y consolidación del modelo de datos que soporta la operación de la plataforma'
      ] : [
        'Design and coordination of the Back Office web admin panel',
        'Collaboration in defining the functional architecture and its integration with the overall product ecosystem',
        'Work on modules related to operational monitoring, professional validation, appointment follow-up, administrative management, and support for payments and reporting processes',
        'Participation in cross-functional technical decisions related to the project foundation, development standards, and workflow organization',
        'Technical review of deliverables and coordination across frontend, backend, and database teams',
        'Infrastructure analysis and consolidation of the data model supporting platform operations'
      ],
      technologies: [
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'APIs',
        'Authentication',
        'Data Modeling',
        'Technical Documentation',
        'Team Leadership'
      ]
    },
    {
      id: 'eduassistant',
      name: 'Eduassistant',
      role: 'Python Backend Developer | RAG & AI Systems',
      location: language === 'es' ? 'Santiago de Chile - Chile' : 'Santiago de Chile - Chile',
      period: language === 'es' ? '2026 - Presente' : '2026 - Present',
      color: '#EC4899',
      icon: <Code className="w-6 h-6" />,
      description: language === 'es'
        ? 'Desarrollo de RAG-LIA, una API orientada a inteligencia artificial conversacional, diseñada para brindar acompañamiento y contención a estudiantes con riesgo de deserción académica.'
        : 'Development of RAG-LIA, an API oriented to conversational artificial intelligence, designed to provide support and containment to students at risk of academic dropout.',
      achievements: language === 'es' ? [
        'Desarrollo de la arquitectura backend con FastAPI',
        'Configuración del entorno con Docker',
        'Implementación del endpoint de salud y estructura inicial de la API',
        'Integración de PostgreSQL con la extensión pgvector',
        'Creación de modelos y migraciones iniciales con SQLAlchemy y Alembic',
        'Implementación de servicio de generación de embeddings',
        'Pruebas funcionales con proveedores de modelos para IA',
        'Validación técnica del flujo para integración con Laravel'
      ] : [
        'Backend architecture development with FastAPI',
        'Environment configuration with Docker',
        'Health endpoint implementation and initial API structure',
        'PostgreSQL integration with pgvector extension',
        'Model creation and initial migrations with SQLAlchemy and Alembic',
        'Embedding generation service implementation',
        'Functional testing with AI model providers',
        'Technical flow validation for Laravel integration'
      ],
      technologies: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Docker', 'SQLAlchemy', 'Alembic']
    },
    {
      id: 'dragon',
      name: 'Dragon Pyramid',
      role: language === 'es' ? 'Fundador & CEO' : 'Founder & CEO',
      location: language === 'es' ? 'Tucumán - Argentina' : 'Tucumán - Argentina',
      period: language === 'es' ? '2020 - Presente' : '2020 - Present',
      color: '#4F46E5',
      icon: <Building className="w-6 h-6" />,
      description: language === 'es'
        ? 'Empresa especializada en soluciones de Inteligencia Artificial y Tecnologías de la Información. Lidero el desarrollo de productos SaaS escalables y sistemas automatizados.'
        : 'Company specialized in Artificial Intelligence and Information Technology solutions. I lead the development of scalable SaaS products and automated systems.',
      achievements: language === 'es' ? [
        'Desarrollo de GYM MASTER, SaaS multi-tenant para gestión de gimnasios',
        'Implementación de módulos de IA generativa y analítica de datos',
        'Liderazgo de equipos multidisciplinarios en metodología ágil',
        'Participación en programas de aceleración como NAVES Argentina'
      ] : [
        'Development of GYM MASTER, multi-tenant SaaS for gym management',
        'Implementation of generative AI and data analytics modules',
        'Leadership of multidisciplinary teams in agile methodology',
        'Participation in acceleration programs like NAVES Argentina'
      ],
      technologies: ['Next.js', 'Supabase', 'Docker', 'AI/ML', 'PostgreSQL']
    },
    {
      id: 'aed',
      name: 'AED Digital',
      role: 'Full-stack Developer',
      location: language === 'es' ? 'Piura - Perú' : 'Piura - Peru',
      period: '2025',
      color: '#10B981',
      icon: <Code className="w-6 h-6" />,
      description: language === 'es'
        ? 'Desarrollo de sistema de Facturación y Logística como Progressive Web App (PWA) con operación offline y sincronización automática.'
        : 'Development of Billing and Logistics system as Progressive Web App (PWA) with offline operation and automatic synchronization.',
      achievements: language === 'es' ? [
        'Implementación de soporte offline con IndexedDB',
        'Desarrollo de app instalable para cualquier dispositivo',
        'Integración con servicios de backend mediante Supabase',
        'Mejora de experiencia del usuario y disponibilidad del sistema'
      ] : [
        'Offline support implementation with IndexedDB',
        'Installable app development for any device',
        'Backend services integration via Supabase',
        'User experience and system availability improvement'
      ],
      technologies: ['Next.js 14', 'Supabase', 'TailwindCSS', 'TypeScript']
    },
    {
      id: 'legislature',
      name: language === 'es' ? 'Honorable Legislatura de Tucumán' : 'Honorable Legislature of Tucumán',
      role: 'ISI - DBA - PROGRAMADOR - PROJECT LIDER',
      location: language === 'es' ? 'Tucumán - Argentina' : 'Tucumán - Argentina',
      period: '2010 - 2020',
      color: '#F59E0B',
      icon: <Database className="w-6 h-6" />,
      description: language === 'es'
        ? 'Liderazgo del área de informática y desarrollo de sistemas administrativos integrales para procesos gubernamentales.'
        : 'Leadership of the IT area and development of comprehensive administrative systems for government processes.',
      achievements: language === 'es' ? [
        'Diseño y desarrollo de sistemas de gestión de legajos y expedientes',
        'Implementación de módulos de compras y procesos impositivos',
        'Administración de bases de datos PostgreSQL, SQL Server y MySQL',
        'Liderazgo de equipos multidisciplinarios bajo metodología Scrum'
      ] : [
        'Design and development of file and records management systems',
        'Implementation of purchasing and tax process modules',
        'PostgreSQL, SQL Server and MySQL database administration',
        'Leadership of multidisciplinary teams under Scrum methodology'
      ],
      technologies: ['PHP', 'PostgreSQL', 'JavaScript', 'Visual FoxPro']
    },
    {
      id: 'creative',
      name: language === 'es' ? 'Editor de Audio y Video - Diseño Gráfico' : 'Audio & Video Editor - Graphic Design',
      role: 'Freelance',
      location: language === 'es' ? 'Tucumán - Argentina' : 'Tucumán - Argentina',
      period: language === 'es' ? '2017 - Presente' : '2017 - Present',
      color: '#8B5CF6',
      icon: <User className="w-6 h-6" />,
      description: language === 'es'
        ? 'Servicios profesionales de edición de audio, video y diseño gráfico para diversos clientes y proyectos.'
        : 'Professional audio, video editing and graphic design services for various clients and projects.',
      achievements: language === 'es' ? [
        'Edición de contenido multimedia para eventos y producciones',
        'Diseño de identidad visual y material gráfico',
        'Producción de contenido para redes sociales y marketing',
        'Colaboración en proyectos de comunicación institucional'
      ] : [
        'Multimedia content editing for events and productions',
        'Visual identity and graphic material design',
        'Content production for social media and marketing',
        'Collaboration on institutional communication projects'
      ],
      technologies: ['Adobe Premiere', 'After Effects', 'Photoshop', 'Illustrator', 'Audition']
    },
    {
      id: 'rentas',
      name: language === 'es'
        ? 'Dirección General de Rentas Provincias de Tucumán'
        : 'General Directorate of Revenue of Tucumán Province',
      role: language === 'es' ? 'Pasante' : 'Intern',
      location: language === 'es' ? 'Tucumán - Argentina' : 'Tucumán - Argentina',
      period: language === 'es' ? '2005 - 2007' : '2005 - 2007',
      color: '#06B6D4',
      icon: <Database className="w-6 h-6" />,
      description: language === 'es'
        ? 'Desarrollo y mantenimiento de software para la gestión tributaria, asegurando eficiencia y precisión en los procesos fiscales.'
        : 'Development and maintenance of software for tax management, ensuring efficiency and accuracy in fiscal processes.',
      achievements: language === 'es' ? [
        'Desarrollo y mantenimiento de software de gestión tributaria con Visual FoxPro, PostgreSQL, HTML y PHP',
        'Control de calidad y testing de aplicaciones para garantizar el cumplimiento de estándares y la estabilidad del sistema',
        'Auditoría de bases de datos para verificar la integridad, consistencia y seguridad de la información crítica',
        'Soporte a procesos fiscales mediante soluciones tecnológicas orientadas a la eficiencia operativa'
      ] : [
        'Development and maintenance of tax management software using Visual FoxPro, PostgreSQL, HTML and PHP',
        'Quality control and application testing to ensure standards compliance and system stability',
        'Database auditing to verify the integrity, consistency and security of critical information',
        'Support for fiscal processes through technology solutions focused on operational efficiency'
      ],
      technologies: ['Visual FoxPro', 'PostgreSQL', 'HTML', 'PHP']
    },
    {
      id: 'utn',
      name: language === 'es' ? 'Universidad Tecnológica Nacional' : 'National Technological University',
      role: language === 'es'
        ? 'Profesor auxiliar de Diseño de Interfaz Gráfica'
        : 'Assistant Professor of Graphic Interface Design',
      location: language === 'es' ? 'Tucumán - Argentina' : 'Tucumán - Argentina',
      period: language === 'es' ? '2005 - 2006' : '2005 - 2006',
      color: '#14B8A6',
      icon: <User className="w-6 h-6" />,
      description: language === 'es'
        ? 'Profesor auxiliar de la cátedra de Diseño de Interfaz Gráfica en la Universidad Tecnológica Nacional - Facultad Regional Tucumán.'
        : 'Assistant professor in the Graphic Interface Design course at the National Technological University - Tucumán Regional Faculty.',
      achievements: language === 'es' ? [
        'Acompañamiento académico en la cátedra de Diseño de Interfaz Gráfica',
        'Apoyo en la formación de estudiantes en conceptos de interfaz y diseño visual',
        'Participación docente avalada por el profesor Ricardo Adra, fundador del grupo Proymes',
        'Colaboración en actividades de enseñanza y seguimiento de trabajos prácticos'
      ] : [
        'Academic support in the Graphic Interface Design course',
        'Assistance in training students in interface concepts and visual design',
        'Teaching role endorsed by Professor Ricardo Adra, founder of the Proymes group',
        'Collaboration in teaching activities and follow-up of practical assignments'
      ],
      technologies: ['UI Design', 'Graphic Interface Design', 'Teaching', 'Visual Design']
    }
  ];

  return (
    <section id="acerca" className="min-h-screen py-20 bg-gradient-to-b from-black to-gray-900/50">
      <div className="container mx-auto px-4">
        {/* About Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-4xl font-bold text-white">{t.about.title}</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <p className="text-gray-300 text-lg leading-relaxed">{t.about.description}</p>
              </div>

              <div className="md:col-span-1 flex justify-center md:justify-end">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>

                  <div className="relative overflow-hidden rounded-2xl border border-gray-700">
                    <motion.img
                      src="/images/about-profile.png"
                      alt="Gustavo Galdeano - Profile"
                      className="w-full h-auto max-w-[280px] max-h-[360px] object-cover transform group-hover:scale-105 transition duration-500"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  </div>

                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-500 rounded-full animate-pulse"></div>
                  <div
                    className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-500 rounded-full animate-pulse"
                    style={{ animationDelay: '0.5s' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {t.about.experienceTitle}
        </motion.h2>

        <div className="relative">
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
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-gray-900 z-10 hidden md:block"></div>

                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div
                    className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border cursor-pointer hover:border-cyan-500/50 transition-all"
                    onClick={() => setSelectedExperience(exp)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${exp.color}20` }}>
                        <div style={{ color: exp.color }}>{exp.icon}</div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{exp.name}</h3>
                        <p className="text-cyan-400">{exp.role}</p>
                        <p className="text-gray-400 text-sm">{exp.location}</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{exp.period}</p>
                    <p className="text-gray-300">{exp.description.substring(0, 100)}...</p>
                  </div>
                </div>

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
                      <p className="text-gray-400">{selectedExperience.location}</p>
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

                <h4 className="text-lg font-semibold text-white mb-3">{t.experience.keyAchievements}:</h4>
                <ul className="space-y-2 mb-6">
                  {selectedExperience.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{achievement}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="text-lg font-semibold text-white mb-3">{t.experience.technologies}:</h4>
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