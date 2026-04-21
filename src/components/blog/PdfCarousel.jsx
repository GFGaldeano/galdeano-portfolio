'use client';

export default function PdfCarousel({ fileUrl, title }) {
  return (
    <div className="bg-gray-900/60 border border-cyan-500/10 rounded-2xl p-4 md:p-6">
      <div className="rounded-xl overflow-hidden border border-gray-800 bg-black">
        <iframe
          src={fileUrl}
          title={title || 'PDF Viewer'}
          className="w-full h-[80vh]"
        />
      </div>

      <div className="mt-4 flex justify-end">
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors text-white"
        >
          Abrir PDF en otra pestaña
        </a>
      </div>
    </div>
  );
}