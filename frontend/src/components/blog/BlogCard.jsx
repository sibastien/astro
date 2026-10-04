import { Link } from 'react-router-dom';
import { Clock, Eye, Bookmark, Sparkles, Tag, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function BlogCard({ article, featured = false }) {
  if (!article) return null;

  const publishedDate = article.publishedAt
    ? format(new Date(article.publishedAt), 'd MMMM yyyy', { locale: fr })
    : null;

  const categoryName = article.blogCategory?.name || article.category || 'Astrologie';
  const categorySlug = article.blogCategory?.slug;
  const categoryIcon = article.blogCategory?.icon;

  const tags = article.blogTags?.length > 0 
    ? article.blogTags 
    : (article.tags || []).map(t => ({ id: t, name: t, slug: t.toLowerCase().replace(/\s+/g, '-') }));

  return (
    <article
      className={`group relative flex flex-col rounded-2xl overflow-hidden glass-surface border border-white/[0.08] hover:border-gold-500/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(234,179,8,0.12)] ${
        featured ? 'md:flex-row md:col-span-2 lg:col-span-3' : ''
      }`}
    >
      {/* Cover Image */}
      <div className={`relative overflow-hidden bg-space-950 ${featured ? 'md:w-1/2 h-64 md:h-auto min-h-[260px]' : 'h-52'}`}>
        {article.coverImage ? (
          <img
            src={article.coverImage}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-950/60 via-purple-950/40 to-space-950 flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-gold-400/30 group-hover:text-gold-400/60 transition-colors" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-transparent opacity-80" />

        {/* Featured Badge */}
        {(featured || article.isFeatured) && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-gold-500/20 text-gold-300 border border-gold-500/40 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              À la une
            </span>
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute bottom-3 left-4 z-10">
          {categorySlug ? (
            <Link
              to={`/blog/categorie/${categorySlug}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/60 backdrop-blur-md text-gold-300 border border-gold-500/30 hover:bg-gold-500/20 transition-colors"
            >
              {categoryIcon && <span>{categoryIcon}</span>}
              <span>{categoryName}</span>
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/60 backdrop-blur-md text-gold-300 border border-gold-500/30">
              {categoryIcon && <span>{categoryIcon}</span>}
              <span>{categoryName}</span>
            </span>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className={`flex flex-col flex-1 p-5 sm:p-6 justify-between ${featured ? 'md:p-8' : ''}`}>
        <div className="space-y-3">
          {/* Metadata Top Bar */}
          <div className="flex items-center gap-3 text-[11px] font-mono text-stardust-500">
            {publishedDate && (
              <span>{publishedDate}</span>
            )}
            {article.readingTimeMin && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gold-400/70" />
                  {article.readingTimeMin} min
                </span>
              </>
            )}
            {article.viewCount > 0 && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {article.viewCount.toLocaleString()}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className={`font-display font-bold text-white group-hover:text-gold-300 transition-colors duration-200 leading-snug ${
            featured ? 'text-2xl md:text-3xl' : 'text-lg line-clamp-2'
          }`}>
            <Link to={`/blog/${article.slug}`} className="hover:underline">
              {article.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className={`text-stardust-300 text-sm leading-relaxed ${
            featured ? 'line-clamp-3 md:line-clamp-4' : 'line-clamp-2'
          }`}>
            {article.excerpt}
          </p>
        </div>

        {/* Card Footer: Tags & Read more */}
        <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-hidden max-h-6">
            {tags.slice(0, featured ? 4 : 2).map((t) => (
              <Link
                key={t.id || t.slug}
                to={`/blog/tag/${t.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="text-[11px] font-mono text-stardust-400 hover:text-gold-300 transition-colors"
              >
                #{t.name}
              </Link>
            ))}
          </div>

          {/* Read button */}
          <Link
            to={`/blog/${article.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors group-hover:translate-x-1 duration-200 ml-auto shrink-0"
            aria-label={`Lire l'article ${article.title}`}
          >
            <span>Lire</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
