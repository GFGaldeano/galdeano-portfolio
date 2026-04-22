"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Newspaper } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import BlogPostCard from "./BlogPostCard";

export default function BlogIndexPageClient({ posts = [] }) {
  const { language } = useLanguage();

  const labels = {
    es: {
      title: "BLOG TÉCNICO",
      subtitle:
        "Noticias, informes y contenido multimedia sobre desarrollo, arquitectura, IA y productos reales.",
      back: "Volver al portfolio",
      empty: "Aún no hay publicaciones visibles.",
    },
    en: {
      title: "TECHNICAL BLOG",
      subtitle:
        "News, reports and multimedia content about development, architecture, AI and real-world products.",
      back: "Back to portfolio",
      empty: "There are no visible posts yet.",
    },
  };

  const t = labels[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <Newspaper className="w-7 h-7 text-cyan-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{t.title}</h1>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
              {t.subtitle}
            </p>
          </motion.div>
        </div>

        {posts.length === 0 ? (
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-10 text-center text-gray-300">
            {t.empty}
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            {posts.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}