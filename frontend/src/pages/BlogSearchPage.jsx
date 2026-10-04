import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, ArrowLeft } from 'lucide-react';
import SEOMeta from '@/components/seo/SEOMeta';
import BlogCard from '@/components/blog/BlogCard';
import api from '@/lib/api';

export default function BlogSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page')) || 1;
  const [input, setInput] = useState(query);

  const { data, isLoading } = useQuery({
    queryKey: ['blog-search', query, page],
    queryFn: () =>
      api.get('/blog/search', { params: { q: query, page, limit: 12 } }).then(r => r.data.data),
    enabled: !!query,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setSearchParams({ q: input.trim() });
    }
  };

  const posts = data?.articles || [];
  const pagination = data?.pagination;

  return (
    <>
      <SEOMeta
        title={query ? `Recherche: ${query} – Blog` : 'Recherche – Blog'}
        description={`Résultats de recherche pour "${query}" dans le blog AstroFrance.`}
        canonical={`/blog/recherche${query ? `?q=${encodeURIComponent(query)}` : ''}`}
        noIndex
      />

      {/* Header */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-gradient opacity-95" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-stardust-400 hover:text-gold-400 text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Retour au blog
          </Link>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
            Rechercher un article
          </h1>

          <form onSubmit={handleSearch} className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stardust-500" />
            <input
              type="text"
              id="blog-search-page-input"
              placeholder="Rechercher..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-stardust-500 text-base focus:outline-none focus:border-gold-500/40 focus:ring-1 focus:ring-gold-500/20 transition-all"
              autoFocus
            />
          </form>

          {query && (
            <p className="text-stardust-500 text-sm mt-4 font-mono">
              {pagination?.total || 0} résultat{(pagination?.total || 0) > 1 ? 's' : ''} pour "{query}"
            </p>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {!query ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🔍</p>
              <p className="text-stardust-400">Entrez un terme de recherche pour trouver des articles.</p>
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card h-72 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((article) => (
                  <BlogCard key={article.id} article={article} />
                ))}
              </div>

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
                        p === page
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
              <p className="text-6xl mb-4">🔭</p>
              <h2 className="font-display text-2xl text-stardust-100 mb-2">Aucun résultat</h2>
              <p className="text-stardust-400">Essayez avec d'autres mots-clés.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
