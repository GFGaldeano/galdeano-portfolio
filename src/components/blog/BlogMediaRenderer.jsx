'use client';

import dynamic from 'next/dynamic';

const PdfCarousel = dynamic(() => import('./PdfCarousel'), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-900/60 border border-cyan-500/10 rounded-2xl p-6 text-gray-300">
      Cargando PDF...
    </div>
  ),
});

export default function BlogMediaRenderer({ post }) {
  if (!post?.media_url || !post?.media_type) return null;

  if (post.media_type === 'image') {
    return (
      <div className="rounded-2xl overflow-hidden border border-cyan-500/10 bg-gray-900/50">
        <img
          src={post.media_url}
          alt={post.title}
          className="w-full h-auto object-cover"
        />
      </div>
    );
  }

  if (post.media_type === 'video') {
    return (
      <div className="rounded-2xl overflow-hidden border border-cyan-500/10 bg-gray-900/50">
        <video controls className="w-full h-auto" preload="metadata">
          <source src={post.media_url} />
          Tu navegador no soporta video HTML5.
        </video>
      </div>
    );
  }

  if (post.media_type === 'pdf') {
    return <PdfCarousel fileUrl={post.media_url} title={post.title} />;
  }

  return null;
}