import { Link } from 'react-router-dom';
import { Clock, Eye, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function ArticleCard({ article, featured = false }) {
  const publishedDate = article.publishedAt
    ? format(new Date(article.publishedAt), 'd MMM yyyy', { locale: fr })
    : null;

  return (
    <Link
      to={`/articles/${article.slug}`}
      className={`group glass-card-hover flex flex-col overflow-hidden transition-all duration-300 ${
        featured ? 'md:flex-row' : ''
      }`}
      aria-label={`Lire l'article: ${article.title}`}
    >
      {/* Cover Image */}
      {article.coverImage && (
        <div className={`relative overflow-hidden ${featured ? 'md:w-2/5 h-48 md:h-auto' : 'h-48'}`}>
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cosmic-900/60 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className={`flex flex-col flex-1 p-5 ${featured ? 'md:p-7' : ''}`}>
        {/* Category badge */}
        {article.category && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-celestial-400 mb-3">
            <Tag className="w-3 h-3" />
            {article.category}
          </span>
        )}

        {/* Title */}
        <h3 className={`font-display font-semibold text-stardust-100 group-hover:text-gold-300 transition-colors mb-2 ${
          featured ? 'text-xl md:text-2xl' : 'text-base'
        }`}>
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className={`text-stardust-400 text-sm leading-relaxed flex-1 ${featured ? 'line-clamp-3' : 'line-clamp-2'}`}>
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 mt-4 text-xs text-stardust-500">
          {publishedDate && <span>{publishedDate}</span>}
          {article.readingTimeMin && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readingTimeMin} min
            </span>
          )}
          {article.viewCount > 0 && (
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {article.viewCount}
            </span>
          )}
        </div>

        {/* Tags */}
        {article.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
