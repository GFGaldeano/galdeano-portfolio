'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, FileText, Image as ImageIcon, Video } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

function formatDate(dateString, language) {
  return new Date(dateString).toLocaleDateString(language === 'es' ? 'es-AR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getExcerpt(content, maxLength = 220) {
  if (!content) return '';
  return content.length > maxLength ? `${content.slice(0, maxLength)}...` : content;
}

function getMediaIcon(type) {
  switch (type) {
    case 'image':
      return <ImageIcon className="w-4 h-4" />;
    case 'pdf':
      return <FileText className="w-4 h-4" />;
    case 'video':
      return <Video className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
}

export default function BlogPostCard({ post, index = 0 }) {
  const { language } = useLanguage();

  const labels = {
    es: {
      readMore: 'Leer más',
      publishedOn: 'Publicado el',
      types: {
        image: 'Imagen',
        pdf: 'PDF',
        video: 'Video',
      },
    },
    en: {
      readMore: 'Read more',
      publishedOn: 'Published on',
      types: {
        image: 'Image',
        pdf: 'PDF',
        video: 'Video',
      },
    },
  };

  const t = labels[language];
  const thumbnail = post.thumbnail_url || post.media_url;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group bg-gray-900/60 backdrop-blur-sm border border-cyan-500/10 hover:border-cyan-500/40 rounded-2xl overflow-hidden transition-all"
    >
      {thumbnail && (
        <div className="aspect-video bg-gray-800 overflow-hidden">
          {post.media_type === 'video' ? (
            <img
              src={thumbnail}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <img
              src={thumbnail}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between gap-4 mb-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>
              {t.publishedOn} {formatDate(post.published_at, language)}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 text-cyan-300">
            {getMediaIcon(post.media_type)}
            <span>{t.types[post.media_type] || post.media_type}</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4 leading-tight">
          {post.title}
        </h2>

        <p className="text-gray-300 leading-relaxed mb-6">
          {getExcerpt(post.content)}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
        >
          {t.readMore}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.article>
  );
}