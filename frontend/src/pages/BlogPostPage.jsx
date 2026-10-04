import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Clock, Eye, Calendar, Share2, Tag, ChevronRight, Bookmark, User } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import SEOMeta from '@/components/seo/SEOMeta';
import BlogCard from '@/components/blog/BlogCard';
import JsonLd from '@/components/seo/JsonLd';
import api from '@/lib/api';

export default function BlogPostPage() {
  const { slug } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => api.get(`/blog/${slug}`).then(r => r.data.data.article),
    enabled: !!slug,
  });

  const { data: relatedData } = useQuery({
    queryKey: ['blog-related', slug],
    queryFn: () => api.get(`/blog/${slug}/related?limit=3`).then(r => r.data.data.articles),
    enabled: !!slug && !!data,
  });

  const handleShare = async () => {
    const url = `https://astrofrance.fr/blog/${slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: data?.title, text: data?.excerpt, url });
      } catch { /* cancelled */ }
    } else {
      navigator.clipboard?.writeText(url);
    }
  };

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
          <Link to="/blog" className="btn-gold inline-flex">← Retour au blog</Link>
        </div>
      </div>
    );
  }

  const related = relatedData || [];
  const publishedDate = data.publishedAt ? new Date(data.publishedAt) : null;

  // JSON-LD structured data for this article
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.title,
    description: data.metaDescription || data.excerpt,
    image: data.coverImage || 'https://astrofrance.fr/og-image.jpg',
    datePublished: data.publishedAt,
    dateModified: data.updatedAt || data.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'AstroFrance',
      url: 'https://astrofrance.fr',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AstroFrance',
      logo: {
        '@type': 'ImageObject',
        url: 'https://astrofrance.fr/favicon.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://astrofrance.fr/blog/${slug}`,
    },
    wordCount: data.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0,
    articleSection: data.blogCategory?.name || data.category || 'Astrologie',
    keywords: [
      ...(data.blogTags?.map(t => t.name) || []),
      ...(data.tags || []),
    ].join(', '),
  };

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://astrofrance.fr' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://astrofrance.fr/blog' },
      ...(data.blogCategory ? [{
        '@type': 'ListItem',
        position: 3,
        name: data.blogCategory.name,
        item: `https://astrofrance.fr/blog/categorie/${data.blogCategory.slug}`,
      }] : []),
      { '@type': 'ListItem', position: data.blogCategory ? 4 : 3, name: data.title },
    ],
  };

  return (
    <>
      <SEOMeta
        title={data.metaTitle || data.title}
        description={data.metaDescription || data.excerpt}
        canonical={`/blog/${slug}`}
        image={data.coverImage}
        type="article"
      />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Cover Image */}
      {data.coverImage && (
        <div className="relative h-[40vh] md:h-[55vh] overflow-hidden">
          <img
            src={data.coverImage}
            alt={data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cosmic-950 via-cosmic-950/40 to-transparent" />
        </div>
      )}

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-stardust-500 mb-6 flex-wrap" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-gold-400 transition-colors">Accueil</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/blog" className="hover:text-gold-400 transition-colors">Blog</Link>
          {data.blogCategory && (
            <>
              <ChevronRight className="w-3 h-3" />
              <Link
                to={`/blog/categorie/${data.blogCategory.slug}`}
                className="hover:text-gold-400 transition-colors"
              >
                {data.blogCategory.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3 h-3" />
          <span className="text-stardust-300 truncate max-w-[200px]">{data.title}</span>
        </nav>

        {/* Back + Share */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-stardust-400 hover:text-gold-400 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Blog
          </Link>
          <button
            onClick={handleShare}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-stardust-400 hover:text-gold-400 hover:border-gold-500/30 transition-all"
            title="Partager"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Category Badge */}
        {(data.blogCategory || data.category) && (
          <Link
            to={data.blogCategory ? `/blog/categorie/${data.blogCategory.slug}` : `/blog?category=${data.category}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-celestial-400 uppercase tracking-widest mb-4 hover:text-celestial-300 transition-colors"
          >
            <Bookmark className="w-3 h-3" />
            {data.blogCategory?.name || data.category}
          </Link>
        )}

        {/* Title */}
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-stardust-100 mb-6 leading-tight">
          {data.title}
        </h1>

        {/* Excerpt */}
        <p className="text-stardust-300 font-serif text-xl mb-8 leading-relaxed">
          {data.excerpt}
        </p>

        {/* Meta Info Bar */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-stardust-500 pb-8 mb-8 border-b border-white/5">
          {publishedDate && (
            <time dateTime={data.publishedAt} className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {format(publishedDate, 'd MMMM yyyy', { locale: fr })}
            </time>
          )}
          {data.readingTimeMin && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {data.readingTimeMin} min de lecture
            </span>
          )}
          {data.viewCount > 0 && (
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" /> {data.viewCount.toLocaleString()} vues
            </span>
          )}
        </div>

        {/* Article Content */}
        <div
          className="prose prose-invert prose-gold max-w-none text-stardust-300 leading-relaxed space-y-4
                     prose-headings:text-stardust-100 prose-headings:font-display
                     prose-a:text-gold-400 prose-a:no-underline hover:prose-a:underline
                     prose-strong:text-stardust-100
                     prose-blockquote:border-gold-500/30 prose-blockquote:text-stardust-400
                     prose-code:text-celestial-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                     prose-img:rounded-xl prose-img:border prose-img:border-white/10"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />

        {/* Tags */}
        {((data.blogTags && data.blogTags.length > 0) || (data.tags && data.tags.length > 0)) && (
          <div className="mt-12 pt-8 border-t border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-stardust-500" />
              <span className="text-xs font-mono uppercase tracking-wider text-stardust-500">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.blogTags?.map((tag) => (
                <Link
                  key={tag.id}
                  to={`/blog/tag/${tag.slug}`}
                  className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20 text-sm hover:bg-gold-500/20 transition-all"
                >
                  #{tag.name}
                </Link>
              ))}
              {data.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20 text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Card */}
        <div className="mt-10 p-6 glass-card rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-accent-500/10 border border-accent-500/20 flex items-center justify-center text-accent-400">
            <User className="w-6 h-6" />
          </div>
          <div>
            <p className="font-display font-semibold text-white text-sm">AstroFrance</p>
            <p className="text-xs text-stardust-400">
              Votre référence française en astrologie, tarot et spiritualité.
            </p>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-12 px-4 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <Bookmark className="w-5 h-5 text-gold-400" />
              <h2 className="font-display text-xl font-semibold text-white">Articles Similaires</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((article) => (
                <BlogCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
