'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Mail,
  Trash2,
  CheckCircle,
  Circle,
  Search,
  RefreshCw,
  LogOut,
  Inbox,
  CheckSquare,
  Square,
  Calendar,
  User,
  ExternalLink,
  Eye,
  EyeOff,
  X,
  Newspaper,
  Upload,
  Pencil,
  Save,
  FileText,
  Image as ImageIcon,
  Video,
  Loader2,
  PlusCircle,
} from 'lucide-react';

const INITIAL_BLOG_FORM = {
  title: '',
  content: '',
  mediaType: 'image',
  isVisible: true,
};

export default function AdminDashboard() {
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [stats, setStats] = useState({ total: 0, new: 0, read: 0 });

  const [visitStats, setVisitStats] = useState({
    visitors: 0,
    last_visit: null,
  });

  const [blogPosts, setBlogPosts] = useState([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogSubmitting, setBlogSubmitting] = useState(false);
  const [blogRefreshing, setBlogRefreshing] = useState(false);
  const [blogForm, setBlogForm] = useState(INITIAL_BLOG_FORM);
  const [blogFile, setBlogFile] = useState(null);
  const [blogError, setBlogError] = useState('');
  const [blogSuccess, setBlogSuccess] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);

  const filteredMessages = useMemo(() => {
    return messages.filter(
      (msg) =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [messages, searchTerm]);

  const loadMessages = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/messages?filter=${filter}`);
      const data = await response.json();

      if (response.ok) {
        setMessages(data.messages);
        setStats({
          total: data.pagination.total,
          new: data.messages.filter((m) => !m.is_read).length,
          read: data.messages.filter((m) => m.is_read).length,
        });
      }
    } catch (error) {
      console.error('Error cargando mensajes:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadVisitStats = async () => {
    try {
      const response = await fetch('/api/visits');
      if (!response.ok) return;

      const data = await response.json();

      setVisitStats({
        visitors: data.visitors || 0,
        last_visit: data.last_visit || null,
      });
    } catch (error) {
      console.error('Error cargando visitas:', error);
    }
  };

  const loadBlogPosts = async (showSpinner = true) => {
    if (showSpinner) setBlogLoading(true);
    else setBlogRefreshing(true);

    try {
      const response = await fetch('/api/blog/posts?scope=admin', {
        cache: 'no-store',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al cargar posts del blog');
      }

      setBlogPosts(data.posts || []);
    } catch (error) {
      console.error('Error cargando posts del blog:', error);
      setBlogError(error.message || 'Error al cargar posts del blog');
    } finally {
      setBlogLoading(false);
      setBlogRefreshing(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/messages');

        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }

        await Promise.all([loadMessages(), loadVisitStats(), loadBlogPosts()]);
      } catch (error) {
        router.push('/admin/login');
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    loadMessages();
  }, [filter]);

  const markAsRead = async (id, is_read) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_read: !is_read }),
      });

      if (response.ok) {
        loadMessages();
      }
    } catch (error) {
      console.error('Error actualizando mensaje:', error);
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este mensaje?')) return;

    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
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

  const handleLogout = async () => {
    if (confirm('¿Cerrar sesión?')) {
      router.push('/admin/login');
    }
  };

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
      year: 'numeric',
    });
  };

  const formatDateLong = (dateString) => {
    if (!dateString) return 'Sin fecha';

    return new Date(dateString).toLocaleString('es-AR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const formatLastVisit = (dateString) => {
    if (!dateString) return 'Sin registros';

    return new Date(dateString).toLocaleString('es-AR', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  };

  const resetBlogForm = () => {
    setBlogForm(INITIAL_BLOG_FORM);
    setBlogFile(null);
    setEditingPostId(null);
    setBlogError('');
    setBlogSuccess('');
  };

  const handleBlogInputChange = (field, value) => {
    setBlogForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const uploadBlogMedia = async () => {
    if (!blogFile) return null;

    const formData = new FormData();
    formData.append('mediaType', blogForm.mediaType);
    formData.append('file', blogFile);

    const response = await fetch('/api/blog/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'No se pudo subir el archivo multimedia');
    }

    return data.asset;
  };

  const handleCreateOrUpdatePost = async (e) => {
    e.preventDefault();

    setBlogError('');
    setBlogSuccess('');

    if (!blogForm.title.trim()) {
      setBlogError('El título es obligatorio.');
      return;
    }

    if (!blogForm.content.trim()) {
      setBlogError('El contenido es obligatorio.');
      return;
    }

    if (!editingPostId && !blogFile) {
      setBlogError('Debes seleccionar un archivo multimedia.');
      return;
    }

    setBlogSubmitting(true);

    try {
      let uploadedAsset = null;
      const existingPost = blogPosts.find((post) => post.id === editingPostId);

      if (blogFile) {
        uploadedAsset = await uploadBlogMedia();
      }

      const payload = {
        title: blogForm.title.trim(),
        content: blogForm.content.trim(),
        is_visible: blogForm.isVisible,
      };

      if (uploadedAsset) {
        payload.media_type = uploadedAsset.media_type;
        payload.media_url = uploadedAsset.media_url;
        payload.media_public_id = uploadedAsset.media_public_id;
        payload.media_resource_type = uploadedAsset.media_resource_type;
        payload.thumbnail_url = uploadedAsset.thumbnail_url;
      } else if (!editingPostId) {
        payload.media_type = blogForm.mediaType;
      } else if (existingPost) {
        payload.media_type = existingPost.media_type;
        payload.media_url = existingPost.media_url;
        payload.media_public_id = existingPost.media_public_id;
        payload.media_resource_type = existingPost.media_resource_type;
        payload.thumbnail_url = existingPost.thumbnail_url;
      }

      const url = editingPostId
        ? `/api/blog/posts/${editingPostId}`
        : '/api/blog/posts';

      const method = editingPostId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo guardar el post');
      }

      setBlogSuccess(
        editingPostId
          ? 'Post actualizado correctamente.'
          : 'Post creado correctamente.'
      );

      resetBlogForm();
      await loadBlogPosts(false);
    } catch (error) {
      console.error('Error guardando post:', error);
      setBlogError(error.message || 'No se pudo guardar el post');
    } finally {
      setBlogSubmitting(false);
    }
  };

  const handleEditPost = (post) => {
    setEditingPostId(post.id);
    setBlogForm({
      title: post.title || '',
      content: post.content || '',
      mediaType: post.media_type || 'image',
      isVisible: !!post.is_visible,
    });
    setBlogFile(null);
    setBlogError('');
    setBlogSuccess('');
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleDeletePost = async (postId) => {
    if (
      !confirm(
        '¿Seguro que deseas eliminar este post? También se borrará el archivo multimedia asociado.'
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/blog/posts/${postId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo eliminar el post');
      }

      setBlogSuccess('Post eliminado correctamente.');

      if (editingPostId === postId) {
        resetBlogForm();
      }

      await loadBlogPosts(false);
    } catch (error) {
      console.error('Error eliminando post:', error);
      setBlogError(error.message || 'No se pudo eliminar el post');
    }
  };

  const handleToggleVisibility = async (post) => {
    try {
      const response = await fetch(`/api/blog/posts/${post.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_visible: !post.is_visible,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo actualizar la visibilidad');
      }

      setBlogSuccess(
        !post.is_visible
          ? 'Post marcado como visible.'
          : 'Post ocultado correctamente.'
      );

      await loadBlogPosts(false);
    } catch (error) {
      console.error('Error actualizando visibilidad:', error);
      setBlogError(
        error.message || 'No se pudo actualizar la visibilidad del post'
      );
    }
  };

  const getMediaBadge = (type) => {
    switch (type) {
      case 'image':
        return {
          label: 'Imagen',
          icon: <ImageIcon className="w-4 h-4" />,
        };
      case 'pdf':
        return {
          label: 'PDF',
          icon: <FileText className="w-4 h-4" />,
        };
      case 'video':
        return {
          label: 'Video',
          icon: <Video className="w-4 h-4" />,
        };
      default:
        return {
          label: type || 'Archivo',
          icon: <FileText className="w-4 h-4" />,
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center gap-4">
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
                onClick={async () => {
                  await Promise.all([
                    loadMessages(),
                    loadVisitStats(),
                    loadBlogPosts(false),
                  ]);
                }}
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
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/20">
                <Eye className="w-8 h-8 text-cyan-400" />
              </div>

              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Cantidad de visitas
                </p>
                <h2 className="text-3xl font-bold text-white">
                  {visitStats.visitors}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Última visita: {formatLastVisit(visitStats.last_visit)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

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

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
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

            <div className="flex gap-2 flex-wrap">
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

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
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
                  <div className="flex justify-between items-start mb-2 gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      {!msg.is_read ? (
                        <Circle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-gray-600 flex-shrink-0" />
                      )}
                      <h3 className="font-semibold text-white truncate">
                        {msg.name}
                      </h3>
                    </div>

                    <span className="text-xs text-gray-500 whitespace-nowrap">
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

          <div className="lg:col-span-2">
            {selectedMessage ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-800">
                  <div className="flex justify-between items-start mb-4 gap-4">
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

                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar size={18} />
                      <span>
                        {new Date(selectedMessage.created_at).toLocaleString(
                          'es-AR'
                        )}
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

                <div className="p-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">
                    MENSAJE:
                  </h3>
                  <div className="bg-gray-800/30 rounded-lg p-4 text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </div>
                </div>

                <div className="p-6 border-t border-gray-800 flex flex-wrap gap-3">
                  <button
                    onClick={() =>
                      markAsRead(
                        selectedMessage.id,
                        selectedMessage.is_read
                      )
                    }
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
                    href={`mailto:${selectedMessage.email}?subject=Re: ${
                      selectedMessage.subject || 'Tu mensaje'
                    }`}
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

        <section className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-800 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <Newspaper className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Administrador del Blog Técnico
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Crea, edita, elimina y controla la visibilidad de las
                    publicaciones del blog.
                  </p>
                </div>
              </div>

              <button
                onClick={() => loadBlogPosts(false)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors"
              >
                {blogRefreshing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                Recargar posts
              </button>
            </div>

            <div className="p-6">
              {blogError && (
                <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300">
                  {blogError}
                </div>
              )}

              {blogSuccess && (
                <div className="mb-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-300">
                  {blogSuccess}
                </div>
              )}

              <form onSubmit={handleCreateOrUpdatePost} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-300 mb-2">
                      Título del post
                    </label>
                    <input
                      type="text"
                      value={blogForm.title}
                      onChange={(e) =>
                        handleBlogInputChange('title', e.target.value)
                      }
                      placeholder="Ej: Arquitectura multi-tenant con Next.js y Supabase"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-300 mb-2">
                      Contenido / narración
                    </label>
                    <textarea
                      rows={8}
                      value={blogForm.content}
                      onChange={(e) =>
                        handleBlogInputChange('content', e.target.value)
                      }
                      placeholder="Escribe aquí el contenido completo del post..."
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none resize-y"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Tipo de multimedia
                    </label>
                    <select
                      value={blogForm.mediaType}
                      onChange={(e) =>
                        handleBlogInputChange('mediaType', e.target.value)
                      }
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="image">Imagen</option>
                      <option value="pdf">PDF</option>
                      <option value="video">Video</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <label className="w-full">
                      <span className="block text-sm text-gray-300 mb-2">
                        Archivo multimedia
                      </span>
                      <input
                        type="file"
                        accept={
                          blogForm.mediaType === 'image'
                            ? 'image/*'
                            : blogForm.mediaType === 'pdf'
                            ? 'application/pdf'
                            : 'video/*'
                        }
                        onChange={(e) => setBlogFile(e.target.files?.[0] || null)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-300 file:mr-4 file:px-4 file:py-2 file:border-0 file:rounded-lg file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
                      />
                    </label>
                  </div>

                  <div className="md:col-span-2 flex items-center gap-3">
                    <input
                      id="isVisible"
                      type="checkbox"
                      checked={blogForm.isVisible}
                      onChange={(e) =>
                        handleBlogInputChange('isVisible', e.target.checked)
                      }
                      className="w-4 h-4 accent-cyan-500"
                    />
                    <label htmlFor="isVisible" className="text-sm text-gray-300">
                      Publicar como visible
                    </label>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={blogSubmitting}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-white font-medium"
                  >
                    {blogSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : editingPostId ? (
                      <Save className="w-4 h-4" />
                    ) : (
                      <PlusCircle className="w-4 h-4" />
                    )}
                    {editingPostId ? 'Guardar cambios' : 'Crear post'}
                  </button>

                  {(editingPostId || blogFile || blogForm.title || blogForm.content) && (
                    <button
                      type="button"
                      onClick={resetBlogForm}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors text-gray-200"
                    >
                      <X className="w-4 h-4" />
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-800 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Posts cargados</h3>
                <p className="text-sm text-gray-400">
                  Total de publicaciones: {blogPosts.length}
                </p>
              </div>
            </div>

            <div className="p-6">
              {blogLoading ? (
                <div className="py-12 text-center text-gray-400">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-cyan-400" />
                  Cargando publicaciones...
                </div>
              ) : blogPosts.length === 0 ? (
                <div className="py-12 text-center text-gray-400">
                  <Newspaper className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                  No hay publicaciones cargadas todavía.
                </div>
              ) : (
                <div className="grid gap-5">
                  {blogPosts.map((post) => {
                    const media = getMediaBadge(post.media_type);

                    return (
                      <div
                        key={post.id}
                        className="bg-gray-950/60 border border-gray-800 rounded-2xl p-5"
                      >
                        <div className="grid lg:grid-cols-[220px_1fr] gap-5">
                          <div className="rounded-xl overflow-hidden border border-gray-800 bg-black h-[160px] flex items-center justify-center">
                            {post.thumbnail_url ? (
                              <img
                                src={post.thumbnail_url}
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            ) : post.media_type === 'image' && post.media_url ? (
                              <img
                                src={post.media_url}
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-gray-500 flex flex-col items-center gap-2">
                                {media.icon}
                                <span className="text-sm">{media.label}</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-4">
                            <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 text-cyan-300 text-sm">
                                    {media.icon}
                                    {media.label}
                                  </span>

                                  <span
                                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                                      post.is_visible
                                        ? 'bg-green-500/10 text-green-300 border border-green-500/20'
                                        : 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20'
                                    }`}
                                  >
                                    {post.is_visible ? (
                                      <>
                                        <Eye className="w-4 h-4" />
                                        Visible
                                      </>
                                    ) : (
                                      <>
                                        <EyeOff className="w-4 h-4" />
                                        Oculto
                                      </>
                                    )}
                                  </span>
                                </div>

                                <h4 className="text-xl font-bold text-white break-words">
                                  {post.title}
                                </h4>

                                <div className="text-sm text-gray-400 mt-2 space-y-1">
                                  <p>
                                    <span className="text-gray-500">Slug:</span>{' '}
                                    {post.slug}
                                  </p>
                                  <p>
                                    <span className="text-gray-500">Publicado:</span>{' '}
                                    {formatDateLong(post.published_at)}
                                  </p>
                                  <p>
                                    <span className="text-gray-500">Actualizado:</span>{' '}
                                    {formatDateLong(post.updated_at)}
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={() => handleEditPost(post)}
                                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 transition-colors"
                                >
                                  <Pencil className="w-4 h-4" />
                                  Editar
                                </button>

                                <button
                                  onClick={() => handleToggleVisibility(post)}
                                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                    post.is_visible
                                      ? 'bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20'
                                      : 'bg-green-500/10 text-green-300 hover:bg-green-500/20'
                                  }`}
                                >
                                  {post.is_visible ? (
                                    <>
                                      <EyeOff className="w-4 h-4" />
                                      Ocultar
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="w-4 h-4" />
                                      Mostrar
                                    </>
                                  )}
                                </button>

                                <button
                                  onClick={() => handleDeletePost(post.id)}
                                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Eliminar
                                </button>

                                <a
                                  href={`/blog/${post.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600/20 text-cyan-300 hover:bg-cyan-600/30 transition-colors"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  Ver post
                                </a>
                              </div>
                            </div>

                            <p className="text-gray-300 leading-relaxed line-clamp-3">
                              {post.content}
                            </p>

                            <div className="flex flex-wrap gap-3">
                              {post.media_url && (
                                <a
                                  href={post.media_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                                >
                                  <Upload className="w-4 h-4" />
                                  Abrir multimedia
                                </a>
                              )}

                              {post.thumbnail_url && (
                                <a
                                  href={post.thumbnail_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300 transition-colors"
                                >
                                  <ImageIcon className="w-4 h-4" />
                                  Ver miniatura
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}