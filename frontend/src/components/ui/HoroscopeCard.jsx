import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const CATEGORY_LABELS = {
  GENERAL: 'Général',
  AMOUR: '❤️ Amour',
  TRAVAIL: '💼 Travail',
  SANTE: '🌿 Santé',
  ARGENT: '💰 Argent',
  FAMILLE: '👨‍👩‍👧 Famille',
};

export default function HoroscopeCard({ horoscope, compact = false }) {
  const sign = horoscope.zodiacSign || {};

  return (
    <Link
      to={`/horoscope/${sign.slug}`}
      className="group glass-card-hover block p-5 md:p-6 transition-all duration-300"
      aria-label={`Horoscope ${sign.name} – ${CATEGORY_LABELS[horoscope.category] || 'Général'}`}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl group-hover:animate-float">{sign.emoji}</span>
          <div>
            <h3 className="font-display text-base font-semibold text-stardust-100 group-hover:text-gold-300 transition-colors">
              {sign.name}
            </h3>
            <span className="text-xs text-stardust-400">{CATEGORY_LABELS[horoscope.category]}</span>
          </div>
        </div>

        {/* Star rating */}
        {horoscope.rating && (
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < horoscope.rating ? 'text-gold-400' : 'text-stardust-600'}`}
                fill={i < horoscope.rating ? 'currentColor' : 'none'}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <p className={`text-stardust-300 text-sm leading-relaxed ${compact ? 'line-clamp-3' : 'line-clamp-4'}`}>
        {horoscope.content}
      </p>

      {/* Lucky info */}
      {!compact && (horoscope.luckyNumber || horoscope.luckyColor) && (
        <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-3 text-xs text-stardust-400">
          {horoscope.luckyNumber && (
            <span className="flex items-center gap-1">
              🍀 Chiffre chanceux: <strong className="text-gold-400">{horoscope.luckyNumber}</strong>
            </span>
          )}
          {horoscope.luckyColor && (
            <span className="flex items-center gap-1">
              🎨 Couleur: <strong className="text-gold-400">{horoscope.luckyColor}</strong>
            </span>
          )}
        </div>
      )}

      {/* Keywords */}
      {horoscope.keywords?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {horoscope.keywords.slice(0, 3).map((kw) => (
            <span key={kw} className="text-xs px-2 py-0.5 rounded-full bg-celestial-500/10 text-celestial-400 border border-celestial-500/20">
              {kw}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
