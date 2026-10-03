import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const CATEGORY_LABELS = {
  GENERAL: 'General Transit',
  AMOUR: 'Relational Resonance',
  TRAVAIL: 'Strategic Ambition',
  SANTE: 'Somatic Vitality',
  ARGENT: 'Capital Flow',
  FAMILLE: 'Lineage Dynamics',
};

export default function HoroscopeCard({ horoscope, compact = false }) {
  const sign = horoscope.zodiacSign || {};

  return (
    <Link
      to={`/horoscope/${sign.slug}`}
      className="group glass-surface p-5 sm:p-6 rounded-xl border border-white/[0.08] hover:border-accent-400/40 transition-all duration-300 hover:-translate-y-1 block card-premium"
      aria-label={`Horoscope ${sign.name} – ${CATEGORY_LABELS[horoscope.category] || 'General'}`}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-xl font-display text-accent-300">
            {sign.symbol || '✦'}
          </div>
          <div>
            <h3 className="editorial-title text-base font-bold text-white group-hover:text-accent-300 transition-colors">
              {sign.name}
            </h3>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              {CATEGORY_LABELS[horoscope.category] || 'Daily Transit'}
            </span>
          </div>
        </div>

        {/* Coherence rating */}
        {horoscope.rating && (
          <div className="flex items-center gap-1 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.06] text-xs font-mono text-slate-300">
            <span className="text-accent-400">★</span>
            <span>{horoscope.rating}/5</span>
          </div>
        )}
      </div>

      {/* Content */}
      <p className={`text-slate-300 text-xs sm:text-sm leading-relaxed ${compact ? 'line-clamp-3' : 'line-clamp-4'}`}>
        {horoscope.content}
      </p>

      {/* Keywords */}
      {horoscope.keywords?.length > 0 && (
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
          {horoscope.keywords.slice(0, 3).map((kw) => (
            <span key={kw} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-slate-400 border border-white/[0.06]">
              {kw}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
