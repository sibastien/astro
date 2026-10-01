import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Clock, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import SEOMeta from '@/components/seo/SEOMeta';
import api from '@/lib/api';

export default function ArticlePage() {
  const { slug } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => api.get(`/articles/${slug}`).then(r => r.data.data.article),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl animate-float mb-4">📖</div>
          <p className="text-stardust-400">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <p className="text-6xl mb-4">📭</p>
          <h1 className="font-display text-2xl text-stardust-100 mb-4">Article introuvable</h1>
          <Link to="/articles" className="btn-gold inline-flex">← Retour aux articles</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOMeta
        title={data.metaTitle || data.title}
        description={data.metaDescription || data.excerpt}
        canonical={`/articles/${slug}`}
        image={data.coverImage}
        type="article"
      />

      {/* Cover */}
      {data.coverImage && (
        <div className="relative h-[40vh] md:h-[55vh] overflow-hidden">
          <img src={data.coverImage} alt={data.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-cosmic-950 via-cosmic-950/40 to-transparent" />
        </div>
      )}

      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Back */}
        <Link to="/articles" className="inline-flex items-center gap-2 text-stardust-400 hover:text-gold-400 text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Articles
        </Link>

        {/* Category */}
        {data.category && (
          <span className="text-xs font-medium text-celestial-400 uppercase tracking-widest mb-4 block">{data.category}</span>
        )}

        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-stardust-100 mb-6 leading-tight">
          {data.title}
        </h1>

        <p className="text-stardust-300 font-serif text-xl mb-8 leading-relaxed">{data.excerpt}</p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-stardust-500 pb-8 mb-8 border-b border-white/5">
          {data.publishedAt && (
            <time dateTime={data.publishedAt}>
              {format(new Date(data.publishedAt), 'd MMMM yyyy', { locale: fr })}
            </time>
          )}
          {data.readingTimeMin && (
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {data.readingTimeMin} min de lecture</span>
          )}
          {data.viewCount > 0 && (
            <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {data.viewCount} vues</span>
          )}
        </div>

        {/* Content */}
        <div
          className="prose prose-invert prose-gold max-w-none text-stardust-300 leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />

        {/* Tags */}
        {data.tags?.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20 text-sm">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </>
  );
}
