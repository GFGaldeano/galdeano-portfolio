// src/components/sections/SkillsNebula.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Brain, Cloud, Database } from "lucide-react";

export default function SkillsNebula() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const skillCategories = [
    {
      id: "core",
      name: "TECNOLOGÍAS CORE",
      icon: <Zap className="w-5 h-5" />,
      color: "from-cyan-500 to-blue-500",
      skills: [
        { name: "React", level: 95, years: 6 },
        { name: "Next.js", level: 90, years: 4 },
        { name: "Node.js", level: 88, years: 7 },
        { name: "TypeScript", level: 85, years: 5 },
        { name: "Python", level: 80, years: 8 },
      ],
    },
    {
      id: "ai",
      name: "INTELIGENCIA ARTIFICIAL",
      icon: <Brain className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "RAG", level: 75, years: 1 },
        { name: "Vector DB", level: 70, years: 1 },
        { name: "OpenAI API", level: 80, years: 2 },
        { name: "FastAPI", level: 75, years: 2 },
        { name: "Data Analytics", level: 70, years: 3 },
      ],
    },
    {
      id: "cloud",
      name: "CLOUD & DEVOPS",
      icon: <Cloud className="w-5 h-5" />,
      color: "from-yellow-500 to-orange-500",
      skills: [
        { name: "Docker", level: 85, years: 5 },
        { name: "Supabase", level: 80, years: 3 },
        { name: "Vercel", level: 85, years: 2 },
        { name: "CI/CD", level: 80, years: 4 },
        { name: "PostgreSQL", level: 82, years: 6 },
      ],
    },
  ];

  const filteredCategories =
    selectedCategory === "all"
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === selectedCategory);

  return (
    <section
      className="min-h-screen py-20 bg-gradient-to-b from-gray-900/50 to-black"
      id="habilidades"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          NEBULOSA DE HABILIDADES
        </motion.h2>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-3 rounded-full transition-all ${
              selectedCategory === "all"
                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/30"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            TODAS
          </button>
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all flex items-center gap-2 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <div
                className={`flex items-center gap-3 mb-6 p-3 rounded-lg bg-gradient-to-r ${category.color}`}
              >
                {category.icon}
                <h3 className="text-xl font-bold text-white">
                  {category.name}
                </h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">
                        {skill.name}
                      </span>
                      <span className="text-cyan-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <motion.div
                        className={`h-2.5 rounded-full bg-gradient-to-r ${category.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + skillIndex * 0.1,
                        }}
                      ></motion.div>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      {skill.years} años de experiencia
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Summary */}
        <motion.div
          className="mt-16 bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-center text-white mb-6">
            RESUMEN DE HABILIDADES
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-400">15+</div>
              <div className="text-gray-400">Tecnologías</div>
            </div>
            <div>
              {/* Años de experiencia auto-actualizables */}
              <div className="text-3xl font-bold text-purple-400">
                {new Date().getFullYear() - 2000}+ 
              </div>
              <div className="text-gray-400">Experiencia</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">50+</div>
              <div className="text-gray-400">Proyectos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">24/7</div>
              <div className="text-gray-400">Disponible</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
