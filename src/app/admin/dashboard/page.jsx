// src/app/admin/dashboard/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Mail,
  Trash2,
  CheckCircle,
  Circle,
  Search,
  Filter,
  RefreshCw,
  LogOut,
  Inbox,
  CheckSquare,
  Square,
  Calendar,
  User,
  ExternalLink,
  Eye,
  X
} from 'lucide-react';

export default function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, new, read
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [stats, setStats] = useState({ total: 0, new: 0, read: 0 });
  const router = useRouter();

  // Verificar sesión al cargar
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/messages');
        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }
        loadMessages();
      } catch (error) {
        router.push('/admin/login');
      }
    };
    checkSession();
  }, []);

  // Cargar mensajes
  const loadMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/messages?filter=${filter}`);
      const data = await response.json();
      
      if (response.ok) {
        setMessages(data.messages);
        setStats({
          total: data.pagination.total,
          new: data.messages.filter(m => !m.is_read).length,
          read: data.messages.filter(m => m.is_read).length
        });
      }
    } catch (error) {
      console.error('Error cargando mensajes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Marcar como leído
  const markAsRead = async (id, is_read) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_read: !is_read })
      });

      if (response.ok) {
        loadMessages();
      }
    } catch (error) {
      console.error('Error actualizando mensaje:', error);
    }
  };

  // Eliminar mensaje
  const deleteMessage = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este mensaje?')) return;

    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        loadMessages();
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error('Error eliminando mensaje:', error);
    }
  };

  // Logout
  const handleLogout = async () => {
    if (confirm('¿Cerrar sesión?')) {
      router.push('/admin/login');
    }
  };

  // Filtrar mensajes por búsqueda
  const filteredMessages = messages.filter(msg =>
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Ahora mismo';
    if (minutes < 60) return `Hace ${minutes}m`;
    if (hours < 24) return `Hace ${hours}h`;
    if (days < 7) return `Hace ${days}d`;
    
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando mensajes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                <p className="text-xs text-gray-400">galdeano.dev</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={loadMessages}
                className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                title="Recargar"
              >
                <RefreshCw size={20} />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden md:inline">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <Inbox className="w-10 h-10 text-cyan-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Nuevos</p>
                <p className="text-3xl font-bold text-cyan-400">{stats.new}</p>
              </div>
              <Circle className="w-10 h-10 text-cyan-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Leídos</p>
                <p className="text-3xl font-bold text-green-400">{stats.read}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
          </motion.div>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, email o asunto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Filtros */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  filter === 'all'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Inbox size={18} />
                Todos
              </button>
              <button
                onClick={() => setFilter('new')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  filter === 'new'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Circle size={18} />
                Nuevos
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  filter === 'read'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <CheckCircle size={18} />
                Leídos
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Mensajes */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Panel de mensajes */}
          <div className="lg:col-span-1 space-y-3">
            {filteredMessages.length === 0 ? (
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 text-center">
                <Inbox className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No hay mensajes</p>
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border cursor-pointer transition-all ${
                    selectedMessage?.id === msg.id
                      ? 'border-cyan-500 bg-gray-800/50'
                      : 'border-gray-800 hover:border-gray-700'
                  } ${!msg.is_read ? 'border-l-4 border-l-cyan-500' : ''}`}
                  onClick={() => setSelectedMessage(msg)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {!msg.is_read ? (
                        <Circle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-gray-600 flex-shrink-0" />
                      )}
                      <h3 className="font-semibold text-white truncate">
                        {msg.name}
                      </h3>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(msg.created_at)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">{msg.email}</p>
                  {msg.subject && (
                    <p className="text-sm text-cyan-400 truncate mt-1">
                      {msg.subject}
                    </p>
                  )}
                </motion.div>
              ))
            )}
          </div>

          {/* Panel de detalle */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden"
              >
                {/* Header del mensaje */}
                <div className="p-6 border-b border-gray-800">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">
                          {selectedMessage.name}
                        </h2>
                        <a
                          href={`mailto:${selectedMessage.email}`}
                          className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1"
                        >
                          {selectedMessage.email}
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar size={18} />
                      <span className="text-sm">
                        {new Date(selectedMessage.created_at).toLocaleString('es-AR')}
                      </span>
                    </div>
                  </div>

                  {selectedMessage.subject && (
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-cyan-400 font-medium">
                        📝 {selectedMessage.subject}
                      </p>
                    </div>
                  )}
                </div>

                {/* Cuerpo del mensaje */}
                <div className="p-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">MENSAJE:</h3>
                  <div className="bg-gray-800/30 rounded-lg p-4 text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </div>
                </div>

                {/* Acciones */}
                <div className="p-6 border-t border-gray-800 flex flex-wrap gap-3">
                  <button
                    onClick={() => markAsRead(selectedMessage.id, selectedMessage.is_read)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedMessage.is_read
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-cyan-600 text-white hover:bg-cyan-700'
                    }`}
                  >
                    {selectedMessage.is_read ? (
                      <>
                        <Square size={18} />
                        Marcar como no leído
                      </>
                    ) : (
                      <>
                        <CheckSquare size={18} />
                        Marcar como leído
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Tu mensaje'}`}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Mail size={18} />
                    Responder
                  </a>

                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                  >
                    <Trash2 size={18} />
                    Eliminar
                  </button>

                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <X size={18} />
                    Cerrar
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-12 border border-gray-800 text-center h-full flex items-center justify-center">
                <div>
                  <Eye className="w-20 h-20 text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">
                    Selecciona un mensaje para ver los detalles
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
