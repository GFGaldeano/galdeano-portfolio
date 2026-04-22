'use client';

import { ExternalLink, Download, FileText } from 'lucide-react';

export default function PdfCarousel({ fileUrl, title }) {
  return (
    <div className="bg-gradient-to-b from-gray-900/80 to-black/70 border border-cyan-500/15 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.08)]">
      {/* Header tipo visor */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-5 py-4 border-b border-gray-800 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-cyan-400" />
          </div>

          <div className="min-w-0">
            <p className="text-white font-semibold truncate">
              {title || 'Documento PDF'}
            </p>
            <p className="text-sm text-gray-400 truncate">
              Vista previa del documento
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-cyan-300 border border-cyan-500/10">
            PDF
          </span>

          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors text-white text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            Abrir
          </a>

          <a
            href={fileUrl}
            download
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-gray-200 text-sm font-medium border border-gray-700"
          >
            <Download className="w-4 h-4" />
            Descargar
          </a>
        </div>
      </div>

      {/* Área del documento */}
      <div className="p-4 md:p-6 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.08),_transparent_35%),linear-gradient(to_bottom,_rgba(17,24,39,0.7),_rgba(0,0,0,0.9))]">
        <div className="mx-auto max-w-5xl rounded-2xl overflow-hidden border border-gray-800 bg-black shadow-2xl">
          <div className="h-10 bg-gray-950 border-b border-gray-800 flex items-center px-4 gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/70"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/70"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/70"></span>
            <div className="ml-3 text-xs text-gray-500 truncate">
              {title || 'Documento PDF'}
            </div>
          </div>

          <iframe
            src={fileUrl}
            title={title || 'PDF Viewer'}
            className="w-full h-[75vh] md:h-[85vh] bg-white"
          />
        </div>
      </div>
    </div>
  );
}