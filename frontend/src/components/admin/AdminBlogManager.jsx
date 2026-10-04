import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  FileText, 
  Globe, 
  Sparkles, 
  Image as ImageIcon, 
  Tag as TagIcon, 
  FolderPlus, 
  Calendar, 
  Search,
  ExternalLink,
  ChevronLeft,
  Sliders,
  Clock,
  Layers
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';

export default function AdminBlogManager() {
  const queryClient = useQueryClient();
  const [currentTab, setCurrentTab] = useState('list'); // 'list' | 'editor'
  const [statusFilter, setStatusFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [page, setPage] = useState(1);
  const [editingPost, setEditingPost] = useState(null);

  // New Category modal state
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('✨');

  // Form state for WordPress-style editor
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    status: 'PUBLISHED',
    isFeatured: false,
    blogCategoryId: '',
    tagInput: '',
    selectedTagIds: [],
    metaTitle: '',
    metaDescription: '',
  });

  // 1. Fetch Admin Posts
  const { data: postsData, isLoading: isPostsLoading, refetch: refetchPosts } = useQuery({
    queryKey: ['admin', 'blog-posts', page, statusFilter],
    queryFn: async () => {
      const res = await api.get('/blog/admin/posts', {
        params: {
          page,
          limit: 15,
          ...(statusFilter ? { status: statusFilter } : {}),
        },
      });
      return res.data?.data;
    },
  });

  // 2. Fetch Categories
  const { data: categoriesData, refetch: refetchCategories } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const res = await api.get('/blog/categories');
      return res.data?.data;
    },
  });

  // 3. Fetch Tags
  const { data: tagsData, refetch: refetchTags } = useQuery({
    queryKey: ['blog-tags'],
    queryFn: async () => {
      const res = await api.get('/blog/tags');
      return res.data?.data;
    },
  });

  // 4. Create Post Mutation
  const createPostMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await api.post('/blog/admin/posts', payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Article créé et enregistré avec succès !');
      queryClient.invalidateQueries(['admin', 'blog-posts']);
      queryClient.invalidateQueries(['blog-posts']);
      setCurrentTab('list');
      resetForm();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Erreur lors de la création de l\'article.');
    },
  });

  // 5. Update Post Mutation
  const updatePostMutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await api.put(`/blog/admin/posts/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Article mis à jour avec succès !');
      queryClient.invalidateQueries(['admin', 'blog-posts']);
      queryClient.invalidateQueries(['blog-posts']);
      setCurrentTab('list');
      resetForm();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Erreur lors de la mise à jour.');
    },
  });

  // 6. Delete Post Mutation
  const deletePostMutation = useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/blog/admin/posts/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Article supprimé.');
      queryClient.invalidateQueries(['admin', 'blog-posts']);
      queryClient.invalidateQueries(['blog-posts']);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Erreur lors de la suppression.');
    },
  });

  // 7. Create Category Mutation
  const createCategoryMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await api.post('/blog/admin/categories', payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Catégorie ajoutée !');
      refetchCategories();
      setIsCategoryModalOpen(false);
      setNewCatName('');
      setNewCatDesc('');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Erreur lors de la création de la catégorie.');
    },
  });

  const categories = categoriesData?.categories || [];
  const tags = tagsData?.tags || [];
  const articles = postsData?.articles || [];
  const pagination = postsData?.pagination;

  // Filter client-side by search
  const filteredArticles = articles.filter(a => 
    !searchFilter || 
    a.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    a.slug.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const resetForm = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImage: '',
      status: 'PUBLISHED',
      isFeatured: false,
      blogCategoryId: categories[0]?.id || '',
      tagInput: '',
      selectedTagIds: [],
      metaTitle: '',
      metaDescription: '',
    });
  };

  const handleStartCreate = () => {
    resetForm();
    if (categories.length > 0 && !formData.blogCategoryId) {
      setFormData(prev => ({ ...prev, blogCategoryId: categories[0].id }));
    }
    setCurrentTab('editor');
  };

  const handleStartEdit = (article) => {
    setEditingPost(article);
    setFormData({
      title: article.title || '',
      slug: article.slug || '',
      excerpt: article.excerpt || '',
      content: article.content || '',
      coverImage: article.coverImage || '',
      status: article.status || 'DRAFT',
      isFeatured: article.isFeatured || false,
      blogCategoryId: article.blogCategory?.id || '',
      tagInput: '',
      selectedTagIds: article.blogTags?.map(t => t.id) || [],
      metaTitle: article.metaTitle || '',
      metaDescription: article.metaDescription || '',
    });
    setCurrentTab('editor');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Le titre de l\'article est requis.');
      return;
    }

    const payload = {
      title: formData.title.trim(),
      excerpt: formData.excerpt.trim(),
      content: formData.content.trim(),
      coverImage: formData.coverImage.trim() || null,
      status: formData.status,
      isFeatured: formData.isFeatured,
      blogCategoryId: formData.blogCategoryId || null,
      tagIds: formData.selectedTagIds,
      metaTitle: formData.metaTitle.trim() || formData.title.trim(),
      metaDescription: formData.metaDescription.trim() || (formData.excerpt.trim().slice(0, 160)),
    };

    if (editingPost) {
      updatePostMutation.mutate({ id: editingPost.id, payload });
    } else {
      createPostMutation.mutate(payload);
    }
  };

  // Helper for inserting markdown tags into content textarea
  const insertFormatting = (syntaxStart, syntaxEnd = '') => {
    const textarea = document.getElementById('blog-content-textarea');
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = `${syntaxStart}${selected || 'texte'}${syntaxEnd}`;
    const nextVal = text.substring(0, start) + replacement + text.substring(end);
    setFormData(prev => ({ ...prev, content: nextVal }));
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + syntaxStart.length, start + syntaxStart.length + (selected ? selected.length : 5));
    }, 50);
  };

  return (
    <div className="space-y-6">
      {/* ── Top Header ────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-400" />
            <h3 className="text-lg font-bold text-white editorial-title">
              Éditeur & Gestionnaire de Blog
            </h3>
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/30 text-gold-300">
              WordPress Style
            </span>
          </div>
          <p className="text-xs text-stardust-400 mt-1">
            Rédigez, programmez et publiez vos articles avec optimisation SEO complète et métadonnées structurées.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {currentTab === 'editor' ? (
            <button
              onClick={() => { setCurrentTab('list'); resetForm(); }}
              className="btn-secondary text-xs px-3.5 py-2 flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Retour à la liste</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsCategoryModalOpen(true)}
                className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5"
                title="Créer une catégorie"
              >
                <FolderPlus className="w-3.5 h-3.5 text-gold-400" />
                <span>Nouvelle Catégorie</span>
              </button>
              <button
                onClick={handleStartCreate}
                className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 shadow-gold"
              >
                <Plus className="w-4 h-4" />
                <span>Nouvel Article</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── TAB 1: POSTS LIST ──────────────────────────────── */}
      {currentTab === 'list' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl bg-black/40 border border-white/[0.06]">
            {/* Status pills */}
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <button
                onClick={() => { setStatusFilter(''); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  statusFilter === ''
                    ? 'bg-gold-500/20 border-gold-500/40 text-gold-300 font-semibold'
                    : 'bg-white/[0.03] border-white/[0.08] text-stardust-400 hover:text-white'
                }`}
              >
                Tous ({pagination?.total ?? 0})
              </button>
              <button
                onClick={() => { setStatusFilter('PUBLISHED'); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  statusFilter === 'PUBLISHED'
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-semibold'
                    : 'bg-white/[0.03] border-white/[0.08] text-stardust-400 hover:text-white'
                }`}
              >
                Publiés
              </button>
              <button
                onClick={() => { setStatusFilter('DRAFT'); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  statusFilter === 'DRAFT'
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 font-semibold'
                    : 'bg-white/[0.03] border-white/[0.08] text-stardust-400 hover:text-white'
                }`}
              >
                Brouillons
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stardust-500" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3.5 py-1.5 rounded-lg bg-black/60 border border-white/[0.08] text-xs text-white placeholder-stardust-500 font-mono focus:outline-none focus:border-gold-500/40"
              />
            </div>
          </div>

          {/* Articles Table */}
          <div className="glass-surface rounded-2xl border border-white/[0.08] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/[0.06] text-stardust-500 font-mono uppercase tracking-wider text-[10px] bg-white/[0.02]">
                    <th className="py-3 px-4 font-semibold">Titre & Slug</th>
                    <th className="py-3 px-3 font-semibold">Catégorie</th>
                    <th className="py-3 px-3 font-semibold">Statut</th>
                    <th className="py-3 px-3 font-semibold">À la une</th>
                    <th className="py-3 px-3 font-semibold">Vues</th>
                    <th className="py-3 px-3 font-semibold">Date</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {isPostsLoading ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-stardust-400 font-mono">
                        Chargement des articles...
                      </td>
                    </tr>
                  ) : filteredArticles.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-stardust-500 font-mono">
                        <p className="text-3xl mb-2">✍️</p>
                        <p className="text-sm text-stardust-300">Aucun article trouvé.</p>
                        <button
                          onClick={handleStartCreate}
                          className="mt-3 text-gold-400 hover:underline text-xs"
                        >
                          Créer votre premier article
                        </button>
                      </td>
                    </tr>
                  ) : (
                    filteredArticles.map((article) => (
                      <tr key={article.id} className="hover:bg-white/[0.02] transition-colors group">
                        {/* Title & Slug */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white group-hover:text-gold-300 transition-colors line-clamp-1 max-w-sm">
                            {article.title}
                          </div>
                          <div className="text-[11px] font-mono text-stardust-500 truncate max-w-xs">
                            /blog/{article.slug}
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono bg-white/[0.04] border border-white/[0.08] text-stardust-300">
                            {article.blogCategory?.icon && <span>{article.blogCategory.icon}</span>}
                            <span>{article.blogCategory?.name || article.category || 'Non classé'}</span>
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold border ${
                            article.status === 'PUBLISHED'
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                              : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                          }`}>
                            {article.status === 'PUBLISHED' ? 'Publié' : 'Brouillon'}
                          </span>
                        </td>

                        {/* Featured */}
                        <td className="py-3.5 px-3">
                          {article.isFeatured ? (
                            <span className="text-[10px] font-mono text-gold-400 flex items-center gap-1 font-semibold">
                              <Sparkles className="w-3 h-3 text-gold-400" />
                              Oui
                            </span>
                          ) : (
                            <span className="text-stardust-600 font-mono text-[11px]">—</span>
                          )}
                        </td>

                        {/* Views */}
                        <td className="py-3.5 px-3 font-mono text-stardust-400">
                          {article.viewCount ?? 0}
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-3 font-mono text-stardust-500 text-[11px]">
                          {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('fr-FR') : 'Non publié'}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {article.status === 'PUBLISHED' && (
                              <a
                                href={`/blog/${article.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg text-stardust-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                                title="Voir l'article sur le site"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button
                              onClick={() => handleStartEdit(article)}
                              className="p-1.5 rounded-lg text-stardust-400 hover:text-gold-300 hover:bg-white/[0.06] transition-colors"
                              title="Modifier l'article"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Supprimer définitivement "${article.title}" ?`)) {
                                  deletePostMutation.mutate(article.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-stardust-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {pagination && pagination.pages > 1 && (
              <div className="flex items-center justify-between p-4 border-t border-white/[0.06] text-xs font-mono text-stardust-400">
                <span>Page {pagination.page} sur {pagination.pages}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-3 py-1 rounded bg-white/[0.04] border border-white/[0.08] disabled:opacity-30"
                  >
                    Précédent
                  </button>
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={page >= pagination.pages}
                    className="px-3 py-1 rounded bg-white/[0.04] border border-white/[0.08] disabled:opacity-30"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB 2: WORDPRESS-STYLE EDITOR ──────────────────── */}
      {currentTab === 'editor' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Title, Excerpt, Content */}
            <div className="lg:col-span-2 space-y-5">
              
              {/* Title input */}
              <div className="glass-surface p-5 rounded-2xl border border-white/[0.08] space-y-3">
                <label className="block text-xs font-mono uppercase tracking-wider text-stardust-400 font-semibold">
                  Titre de l'article *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Mercure Rétrograde en 2026 : Guide & Conseils Pratiques"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/[0.12] text-lg font-display text-white placeholder-stardust-600 focus:outline-none focus:border-gold-500/50"
                />

                {/* Auto Permalink preview */}
                <div className="flex items-center gap-2 text-xs font-mono text-stardust-500">
                  <Globe className="w-3.5 h-3.5 text-gold-400/80" />
                  <span>Permalien : </span>
                  <span className="text-gold-400/90 truncate">
                    https://astrofrance.fr/blog/{formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || 'votre-article'}
                  </span>
                </div>
              </div>

              {/* Excerpt */}
              <div className="glass-surface p-5 rounded-2xl border border-white/[0.08] space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-stardust-400 font-semibold">
                  Extrait (Chapô / Résumé court)
                </label>
                <textarea
                  rows={3}
                  placeholder="Un résumé concis pour les cartes de prévisualisation et les moteurs de recherche..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-black/60 border border-white/[0.12] text-xs text-stardust-200 placeholder-stardust-600 leading-relaxed focus:outline-none focus:border-gold-500/50"
                />
              </div>

              {/* Content Body Editor with Formatting Bar */}
              <div className="glass-surface p-5 rounded-2xl border border-white/[0.08] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                  <label className="text-xs font-mono uppercase tracking-wider text-stardust-400 font-semibold">
                    Contenu de l'article (HTML ou Markdown)
                  </label>
                  
                  {/* Quick format helper buttons */}
                  <div className="flex items-center gap-1 text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => insertFormatting('<h2>', '</h2>')}
                      className="px-2 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-stardust-300"
                      title="Titre H2"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('<h3>', '</h3>')}
                      className="px-2 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-stardust-300"
                      title="Titre H3"
                    >
                      H3
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('<strong>', '</strong>')}
                      className="px-2 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-stardust-300 font-bold"
                      title="Gras"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('<em>', '</em>')}
                      className="px-2 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-stardust-300 italic"
                      title="Italique"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('<blockquote><p>', '</p></blockquote>')}
                      className="px-2 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-stardust-300"
                      title="Citation"
                    >
                      « »
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('<p>', '</p>')}
                      className="px-2 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-stardust-300"
                      title="Paragraphe"
                    >
                      &lt;p&gt;
                    </button>
                  </div>
                </div>

                <textarea
                  id="blog-content-textarea"
                  rows={16}
                  placeholder="Rédigez ici le contenu de votre article... Vous pouvez utiliser du HTML propre (<p>, <h2>, <ul>, <li>, <blockquote>) ou du texte enrichi."
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full p-4 rounded-xl bg-black/60 border border-white/[0.12] text-sm text-stardust-100 placeholder-stardust-600 font-mono leading-relaxed focus:outline-none focus:border-gold-500/50"
                />
              </div>

              {/* WordPress-Style SEO Box (Yoast / RankMath Style) */}
              <div className="glass-surface p-5 rounded-2xl border border-gold-500/20 space-y-4 bg-gold-950/[0.03]">
                <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
                  <Globe className="w-4 h-4 text-gold-400" />
                  <h4 className="text-sm font-semibold text-white editorial-title">
                    Optimisation SEO & Prévisualisation Google
                  </h4>
                </div>

                {/* Google SERP Snippet Preview */}
                <div className="p-4 rounded-xl bg-black/80 border border-white/[0.08] space-y-1 text-left">
                  <div className="flex items-center gap-1.5 text-xs text-stardust-400 font-mono">
                    <span className="text-emerald-400">https://astrofrance.fr</span>
                    <span>› blog ›</span>
                    <span className="text-stardust-500">
                      {formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30) || 'article'}
                    </span>
                  </div>
                  <div className="text-base text-blue-400 hover:underline font-medium cursor-pointer">
                    {formData.metaTitle || formData.title || 'Titre de votre article sur AstroFrance'} | AstroFrance
                  </div>
                  <div className="text-xs text-stardust-400 leading-relaxed line-clamp-2">
                    {formData.metaDescription || formData.excerpt || 'Découvrez notre analyse complète et nos prédictions astrologiques sur AstroFrance, la référence astrologique française.'}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Meta Title */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-stardust-400">
                      <span>Meta Title SEO</span>
                      <span className={formData.metaTitle.length > 60 ? 'text-amber-400' : 'text-emerald-400'}>
                        {formData.metaTitle.length} / 60
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder={formData.title || 'Titre SEO pour Google'}
                      value={formData.metaTitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/[0.1] text-xs text-white placeholder-stardust-600 font-mono focus:outline-none focus:border-gold-500/40"
                    />
                  </div>

                  {/* Meta Description */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-stardust-400">
                      <span>Meta Description SEO</span>
                      <span className={formData.metaDescription.length > 160 ? 'text-amber-400' : 'text-emerald-400'}>
                        {formData.metaDescription.length} / 160
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder={formData.excerpt || 'Description courte affichée dans Google'}
                      value={formData.metaDescription}
                      onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/[0.1] text-xs text-white placeholder-stardust-600 font-mono focus:outline-none focus:border-gold-500/40"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Right 1 Col: Publishing Meta, Categories, Tags, Cover Image */}
            <div className="space-y-5">
              
              {/* Publication Box */}
              <div className="glass-surface p-5 rounded-2xl border border-white/[0.08] space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-stardust-400 font-semibold pb-2 border-b border-white/[0.06]">
                  Publication
                </h4>

                {/* Status selector */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-stardust-400 block">Statut</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/[0.1] text-xs text-white font-mono focus:outline-none focus:border-gold-500/40 cursor-pointer"
                  >
                    <option value="PUBLISHED">Publié (En ligne)</option>
                    <option value="DRAFT">Brouillon (Non visible)</option>
                  </select>
                </div>

                {/* Featured checkbox */}
                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] cursor-pointer hover:bg-white/[0.04] transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                    className="w-4 h-4 rounded border-white/20 bg-black/40 text-gold-500 focus:ring-gold-500/30 accent-gold-500"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white block">À la une (Featured)</span>
                    <span className="text-[10px] text-stardust-500 block">Afficher en tête de la page blog</span>
                  </div>
                </label>

                {/* Action buttons */}
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="submit"
                    disabled={createPostMutation.isPending || updatePostMutation.isPending}
                    className="btn-primary w-full py-2.5 text-xs font-semibold uppercase tracking-wider font-mono shadow-gold flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {createPostMutation.isPending || updatePostMutation.isPending
                        ? 'Enregistrement...'
                        : editingPost
                        ? 'Mettre à jour l\'article'
                        : 'Publier l\'article'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setCurrentTab('list'); resetForm(); }}
                    className="btn-secondary w-full py-2 text-xs text-stardust-400"
                  >
                    Annuler
                  </button>
                </div>
              </div>

              {/* Category Box */}
              <div className="glass-surface p-5 rounded-2xl border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-stardust-400 font-semibold">
                    Catégorie
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsCategoryModalOpen(true)}
                    className="text-[11px] font-mono text-gold-400 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Nouvelle
                  </button>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-colors text-xs ${
                        formData.blogCategoryId === cat.id
                          ? 'bg-gold-500/15 border border-gold-500/30 text-gold-200'
                          : 'bg-white/[0.02] border border-transparent text-stardust-300 hover:bg-white/[0.04]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="blogCategory"
                        value={cat.id}
                        checked={formData.blogCategoryId === cat.id}
                        onChange={() => setFormData(prev => ({ ...prev, blogCategoryId: cat.id }))}
                        className="accent-gold-500"
                      />
                      <span>{cat.icon || '📁'}</span>
                      <span className="font-medium">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tags Box */}
              <div className="glass-surface p-5 rounded-2xl border border-white/[0.08] space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-stardust-400 font-semibold pb-2 border-b border-white/[0.06]">
                  Tags (Mots-clés)
                </h4>

                {/* Available tags pill selector */}
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                  {tags.map((tag) => {
                    const isSelected = formData.selectedTagIds.includes(tag.id);
                    return (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            selectedTagIds: isSelected
                              ? prev.selectedTagIds.filter(id => id !== tag.id)
                              : [...prev.selectedTagIds, tag.id],
                          }));
                        }}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all border ${
                          isSelected
                            ? 'bg-gold-500/20 border-gold-500/50 text-gold-300 font-semibold'
                            : 'bg-white/[0.02] border-white/[0.08] text-stardust-400 hover:border-gold-500/30 hover:text-stardust-200'
                        }`}
                      >
                        #{tag.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Featured Image Box */}
              <div className="glass-surface p-5 rounded-2xl border border-white/[0.08] space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-stardust-400 font-semibold pb-2 border-b border-white/[0.06]">
                  Image à la Une
                </h4>

                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.coverImage}
                  onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/[0.1] text-xs text-white placeholder-stardust-600 font-mono focus:outline-none focus:border-gold-500/40"
                />

                {formData.coverImage ? (
                  <div className="relative rounded-xl overflow-hidden h-36 border border-white/[0.1] bg-black">
                    <img
                      src={formData.coverImage}
                      alt="Prévisualisation"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                ) : (
                  <div className="h-28 rounded-xl border border-dashed border-white/[0.1] flex flex-col items-center justify-center text-stardust-600 text-xs gap-1">
                    <ImageIcon className="w-5 h-5" />
                    <span>Collez l'URL de votre image</span>
                  </div>
                )}
              </div>

            </div>

          </div>
        </form>
      )}

      {/* ── MODAL: CREATE CATEGORY ────────────────────────── */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="max-w-md w-full glass-surface border border-white/[0.12] p-6 rounded-2xl space-y-4">
            <h4 className="text-base font-bold text-white editorial-title">
              Ajouter une nouvelle catégorie
            </h4>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-mono text-stardust-400 block mb-1">Nom de la catégorie *</label>
                <input
                  type="text"
                  placeholder="Ex: Astrologie Karmique"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/[0.1] text-xs text-white placeholder-stardust-600 font-mono focus:outline-none focus:border-gold-500/40"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-stardust-400 block mb-1">Emoji / Icône</label>
                <input
                  type="text"
                  placeholder="Ex: 🔮, 🌙, 🪐"
                  value={newCatIcon}
                  onChange={(e) => setNewCatIcon(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/[0.1] text-xs text-white placeholder-stardust-600 font-mono focus:outline-none focus:border-gold-500/40"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-stardust-400 block mb-1">Description (Optionnelle)</label>
                <textarea
                  rows={2}
                  placeholder="Courte description pour la page de catégorie et le SEO..."
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-black/60 border border-white/[0.1] text-xs text-white placeholder-stardust-600 leading-relaxed focus:outline-none focus:border-gold-500/40"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="btn-secondary text-xs px-3.5 py-1.5"
              >
                Annuler
              </button>
              <button
                type="button"
                disabled={!newCatName.trim() || createCategoryMutation.isPending}
                onClick={() => {
                  createCategoryMutation.mutate({
                    name: newCatName.trim(),
                    description: newCatDesc.trim(),
                    icon: newCatIcon.trim(),
                  });
                }}
                className="btn-primary text-xs px-4 py-1.5 disabled:opacity-50"
              >
                {createCategoryMutation.isPending ? 'Création...' : 'Créer la catégorie'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
