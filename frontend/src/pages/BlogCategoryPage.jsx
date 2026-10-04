import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Bookmark, Filter } from 'lucide-react';
import SEOMeta from '@/components/seo/SEOMeta';
import BlogCard from '@/components/blog/BlogCard';
import api from '@/lib/api';

export default function BlogCategoryPage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;

  const { data, isLoading } = useQuery({
    queryKey: ['blog-category', slug, page],
    queryFn: () =>
      api.get('/blog', { params: { category: slug, page, limit: 12 } }).then(r => r.data.data),
    enabled: !!slug,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: () => api.get('/blog/categories').then(r => r.data.data),
  });

  const currentCat = categoriesData?.categories?.find(c => c.slug === slug);
  const posts = data?.articles || [];
  const pagination = data?.pagination;

  return (
    <>
      <SEOMeta
        title={`${currentCat?.name || slug} – Blog Astrologie`}
        description={currentCat?.description || `Retrouvez tous nos articles dans la catégorie ${currentCat?.name || slug}.`}
        canonical={`/blog/categorie/${slug}`}
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

          <div className="flex items-center justify-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-gold-400" />
            <span className="text-gold-400 font-display text-sm uppercase tracking-widest">Catégorie</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {currentCat?.icon && <span className="mr-2">{currentCat.icon}</span>}
            {currentCat?.name || slug}
          </h1>

          {currentCat?.description && (
            <p className="text-stardust-300 text-lg max-w-xl mx-auto">{currentCat.description}</p>
          )}

          <p className="text-stardust-500 text-sm mt-4 font-mono">
            {pagination?.total || 0} article{(pagination?.total || 0) > 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
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
                        setSearchParams({ page: p });
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
              <p className="text-6xl mb-4">📁</p>
              <h2 className="font-display text-2xl text-stardust-100 mb-2">Aucun article dans cette catégorie</h2>
              <Link to="/blog" className="text-gold-400 hover:underline text-sm">← Retour au blog</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
