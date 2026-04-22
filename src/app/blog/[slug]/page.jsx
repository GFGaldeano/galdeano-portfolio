"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, RefreshCcw } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import BlogMediaRenderer from "../../../components/blog/BlogMediaRenderer";

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

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { language } = useLanguage();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const labels = {
    es: {
      back: "Volver al blog",
      loading: "Cargando publicación...",
      retry: "Reintentar",
      publishedOn: "Publicado el",
      notFound: "No se encontró la publicación solicitada.",
      multimedia: "Contenido multimedia",
    },
    en: {
      back: "Back to blog",
      loading: "Loading post...",
      retry: "Retry",
      publishedOn: "Published on",
      notFound: "The requested post was not found.",
      multimedia: "Multimedia content",
    },
  };

  const t = labels[language];

  const loadPost = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`/api/blog/posts/slug/${slug}`, {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.notFound);
      }

      setPost(data.post);
    } catch (err) {
      setError(err.message || t.notFound);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      loadPost();
    }
  }, [slug]);

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

        {loading && (
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-10 text-center text-gray-300">
            {t.loading}
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-500/10 rounded-2xl border border-red-500/20 p-8 text-center">
            <p className="text-red-300 mb-4">{error}</p>
            <button
              onClick={loadPost}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors"
            >
              <RefreshCcw className="w-4 h-4" />
              {t.retry}
            </button>
          </div>
        )}

        {!loading && !error && post && (
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
        )}
      </div>
    </div>
  );
}