'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Newspaper, RefreshCcw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import BlogPostCard from '../../components/blog/BlogPostCard';

export default function BlogPage() {
  const { language } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const labels = {
    es: {
      title: 'BLOG TÉCNICO',
      subtitle: 'Noticias, informes y contenido multimedia sobre desarrollo, arquitectura, IA y productos reales.',
      back: 'Volver al portfolio',
      loading: 'Cargando publicaciones...',
      empty: 'Aún no hay publicaciones visibles.',
      retry: 'Reintentar',
    },
    en: {
      title: 'TECHNICAL BLOG',
      subtitle: 'News, reports and multimedia content about development, architecture, AI and real-world products.',
      back: 'Back to portfolio',
      loading: 'Loading posts...',
      empty: 'There are no visible posts yet.',
      retry: 'Retry',
    },
  };

  const t = labels[language];

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/blog/posts', {
        cache: 'no-store',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error loading blog posts');
      }

      setPosts(data.posts || []);
    } catch (err) {
      setError(err.message || 'Error loading blog posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

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

        {loading && (
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-10 text-center text-gray-300">
            {t.loading}
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-500/10 rounded-2xl border border-red-500/20 p-8 text-center">
            <p className="text-red-300 mb-4">{error}</p>
            <button
              onClick={loadPosts}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors"
            >
              <RefreshCcw className="w-4 h-4" />
              {t.retry}
            </button>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-10 text-center text-gray-300">
            {t.empty}
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
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