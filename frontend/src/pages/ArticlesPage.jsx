import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SEOMeta from '@/components/seo/SEOMeta';
import ArticleCard from '@/components/ui/ArticleCard';
import api from '@/lib/api';

const CATEGORIES = ['Tous', 'Astrologie', 'Tarot', 'Lune', 'Numérologie', 'Spiritualité'];

export default function ArticlesPage() {
  const [category, setCategory] = useState('Tous');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['articles', category, page],
    queryFn: () =>
      api.get('/articles', {
        params: { page, limit: 9, ...(category !== 'Tous' ? { category } : {}) },
      }).then(r => r.data.data),
  });

  return (
    <>
      <SEOMeta
        title="Articles Astrologie – Guides & Conseils"
        description="Approfondissez vos connaissances astrologiques avec nos articles sur l'astrologie, le tarot, la lune et la spiritualité."
        canonical="/articles"
      />

      {/* Header */}
      <section className="relative py-20 px-4 text-center bg-stars overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-gradient opacity-95" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-gold-400 font-display text-sm uppercase tracking-widest mb-3">Savoir & Découverte</p>
          <h1 className="section-title mb-4">Articles & Guides</h1>
          <p className="section-subtitle">Explorez notre bibliothèque astrologique pour approfondir votre compréhension des astres.</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`article-cat-${cat.toLowerCase().replace(/\s/g, '-')}`}
              onClick={() => { setCategory(cat); setPage(1); }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                category === cat
                  ? 'bg-gold-500/20 border-gold-500/40 text-gold-300'
                  : 'bg-white/5 border-white/10 text-stardust-400 hover:border-gold-500/30 hover:text-gold-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="glass-card h-64 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : data?.articles?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.articles.map((article, i) => (
                  <ArticleCard key={article.id} article={article} featured={i === 0 && page === 1} />
                ))}
              </div>

              {/* Pagination */}
              {data.pagination?.pages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: data.pagination.pages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
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
              <p className="text-6xl mb-4">📚</p>
              <h2 className="font-display text-2xl text-stardust-100 mb-2">Articles en préparation</h2>
              <p className="text-stardust-400">De nouveaux articles seront publiés prochainement.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
