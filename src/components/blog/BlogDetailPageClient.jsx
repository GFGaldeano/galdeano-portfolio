"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import BlogMediaRenderer from "./BlogMediaRenderer";

function formatDate(dateString, language) {
  return new Date(dateString).toLocaleDateString(
    language === "es" ? "es-AR" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );
}

export default function BlogDetailPageClient({ post }) {
  const { language } = useLanguage();

  const labels = {
    es: {
      back: "Volver al blog",
      publishedOn: "Publicado el",
      multimedia: "Contenido multimedia",
    },
    en: {
      back: "Back to blog",
      publishedOn: "Published on",
      multimedia: "Multimedia content",
    },
  };

  const t = labels[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.back}
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-8">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>
                {t.publishedOn} {formatDate(post.published_at, language)}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              {post.title}
            </h1>

            <div className="text-gray-300 text-lg leading-8 whitespace-pre-wrap break-words">
              {post.content}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              {t.multimedia}
            </h2>
            <BlogMediaRenderer post={post} />
          </div>
        </motion.article>
      </div>
    </div>
  );
}