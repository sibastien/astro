import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, TrendingUp, Clock, Filter, Rss, ChevronRight, Bookmark, Tag } from 'lucide-react';
import SEOMeta from '@/components/seo/SEOMeta';
import BlogCard from '@/components/blog/BlogCard';
import api from '@/lib/api';

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';
  const activePage = parseInt(searchParams.get('page')) || 1;
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: () => api.get('/blog/categories').then(r => r.data.data),
  });

  // Fetch featured posts
  const { data: featuredData } = useQuery({
    queryKey: ['blog-featured'],
    queryFn: () => api.get('/blog/featured?limit=3').then(r => r.data.data),
  });

  // Fetch main post list
  const { data: postsData, isLoading } = useQuery({
    queryKey: ['blog-posts', activeCategory, activePage],
    queryFn: () =>
      api.get('/blog', {
        params: {
          page: activePage,
          limit: 9,
          ...(activeCategory ? { category: activeCategory } : {}),
        },
      }).then(r => r.data.data),
  });

  // Fetch tags
  const { data: tagsData } = useQuery({
    queryKey: ['blog-tags'],
    queryFn: () => api.get('/blog/tags').then(r => r.data.data),
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/blog/recherche?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const setCategory = (slug) => {
    const params = new URLSearchParams();
    if (slug) params.set('category', slug);
    setSearchParams(params);
  };

  const categories = categoriesData?.categories || [];
  const featured = featuredData?.articles || [];
  const posts = postsData?.articles || [];
  const pagination = postsData?.pagination;
  const tags = tagsData?.tags || [];

  return (
    <>
      <SEOMeta
        title="Blog Astrologie – Articles, Guides & Conseils"
        description="Découvrez nos articles sur l'astrologie, le tarot, les phases de la lune et la spiritualité. Guides complets et conseils d'experts."
        canonical="/blog"
      />

      {/* ── Hero Section ──────────────────────────────────── */}
      <section className="relative py-20 md:py-28 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-gradient opacity-95" />
        <div className="absolute inset-0 bg-stars opacity-30" />

        {/* Decorative orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-celestial-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Bookmark className="w-4 h-4 text-gold-400" />
            <span className="text-gold-400 font-display text-sm uppercase tracking-[0.2em]">
              Blog & Découverte
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            L'Univers <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-celestial-400 to-accent-400">Astrologique</span>
          </h1>

          <p className="text-stardust-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Explorez nos articles, guides et analyses pour approfondir votre compréhension
            des astres, du tarot et des cycles cosmiques.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stardust-500" />
            <input
              type="text"
              id="blog-search-input"
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-stardust-500 text-base focus:outline-none focus:border-gold-500/40 focus:ring-1 focus:ring-gold-500/20 transition-all"
            />
          </form>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs font-mono text-stardust-500">
            <span>{pagination?.total || 0} articles</span>
            <span>{categories.length} catégories</span>
            <a href="/rss.xml" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-gold-400 transition-colors">
              <Rss className="w-3 h-3" /> Flux RSS
            </a>
          </div>
        </div>
      </section>

      {/* ── Featured Posts ────────────────────────────────── */}
      {featured.length > 0 && !activeCategory && activePage === 1 && (
        <section className="py-12 px-4 border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-5 h-5 text-gold-400" />
              <h2 className="font-display text-xl font-semibold text-white">À la Une</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map((article, i) => (
                <BlogCard key={article.id} article={article} featured={i === 0} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Category Filter Bar ──────────────────────────── */}
      <section className="py-6 px-4 border-b border-white/5 sticky top-16 sm:top-20 z-30 bg-[#060709]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          <Filter className="w-4 h-4 text-stardust-500 hidden sm:block" />
          <button
            onClick={() => setCategory('')}
            id="blog-cat-all"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              !activeCategory
                ? 'bg-gold-500/20 border-gold-500/40 text-gold-300'
                : 'bg-white/5 border-white/10 text-stardust-400 hover:border-gold-500/30 hover:text-gold-300'
            }`}
          >
            Tous
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.slug)}
              id={`blog-cat-${cat.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border flex items-center gap-1.5 ${
                activeCategory === cat.slug
                  ? 'bg-gold-500/20 border-gold-500/40 text-gold-300'
                  : 'bg-white/5 border-white/10 text-stardust-400 hover:border-gold-500/30 hover:text-gold-300'
              }`}
            >
              {cat.icon && <span>{cat.icon}</span>}
              {cat.name}
              {cat._count?.articles > 0 && (
                <span className="text-xs opacity-60">({cat._count.articles})</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ── Posts Grid + Sidebar ──────────────────────────── */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          {/* Main Grid */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-4 h-4 text-stardust-500" />
              <h2 className="font-display text-lg font-semibold text-stardust-200">
                {activeCategory
                  ? `Articles : ${categories.find(c => c.slug === activeCategory)?.name || activeCategory}`
                  : 'Derniers Articles'}
              </h2>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="glass-card h-72 animate-pulse rounded-2xl" />
                ))}
              </div>
            ) : posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {posts.map((article) => (
                    <BlogCard key={article.id} article={article} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination?.pages > 1 && (
                  <div className="flex justify-center gap-2 mt-12">
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set('page', p);
                          setSearchParams(params);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-10 h-10 rounded-full text-sm font-medium transition-all duration-200 ${
                          p === activePage
                            ? 'bg-gold-500/30 border border-gold-500/50 text-gold-300'
                            : 'bg-white/5 border border-white/10 text-stardust-400 hover:border-gold-500/30'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-6xl mb-4">📝</p>
                <h3 className="font-display text-2xl text-stardust-100 mb-2">Aucun article trouvé</h3>
                <p className="text-stardust-400">De nouveaux articles seront publiés prochainement.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 space-y-8">
            {/* Tags Cloud */}
            {tags.length > 0 && (
              <div className="glass-card p-5 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-gold-400" />
                  <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider">Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 20).map((tag) => (
                    <Link
                      key={tag.id}
                      to={`/blog/tag/${tag.slug}`}
                      className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-stardust-400 hover:border-gold-500/30 hover:text-gold-300 transition-all"
                    >
                      #{tag.name}
                      {tag._count?.articles > 0 && (
                        <span className="ml-1 opacity-50">({tag._count.articles})</span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Archive Link */}
            <div className="glass-card p-5 rounded-2xl">
              <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-3">
                Archives
              </h3>
              <Link
                to="/blog/archives"
                className="flex items-center gap-2 text-stardust-400 hover:text-gold-400 text-sm transition-colors"
              >
                <Clock className="w-4 h-4" />
                Voir les archives
                <ChevronRight className="w-3 h-3 ml-auto" />
              </Link>
            </div>

            {/* RSS */}
            <div className="glass-card p-5 rounded-2xl">
              <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-3">
                S'abonner
              </h3>
              <a
                href="/rss.xml"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-stardust-400 hover:text-gold-400 text-sm transition-colors"
              >
                <Rss className="w-4 h-4" />
                Flux RSS
                <ChevronRight className="w-3 h-3 ml-auto" />
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
