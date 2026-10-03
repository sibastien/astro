import { Link } from 'react-router-dom';

const MONTHS = ['jan.', 'fév.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

export default function ZodiacCard({ sign, showDates = true }) {
  return (
    <Link
      to={`/horoscope/${sign.slug}`}
      className="group relative block glass-surface rounded-xl border border-white/[0.08] hover:border-accent-400/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-accent card-premium"
      aria-label={`View astrological profile for ${sign.name}`}
    >
      <div className="flex flex-col items-center text-center gap-3">
        {/* Astronomical Symbol */}
        <div className="w-12 h-12 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-2xl text-accent-300 font-display group-hover:border-accent-500/30 group-hover:scale-105 transition-all">
          {sign.symbol || '✦'}
        </div>

        {/* Name */}
        <div>
          <h3 className="editorial-title text-base font-bold text-white group-hover:text-accent-300 transition-colors">
            {sign.name}
          </h3>
          {sign.nameEn && (
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
              {sign.nameEn}
            </span>
          )}
        </div>

        {/* Element badge */}
        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
          {sign.element} · {sign.modality}
        </span>

        {/* Dates */}
        {showDates && (
          <p className="text-slate-400 text-xs font-mono">
            {sign.startDay} {MONTHS[sign.startMonth - 1]} – {sign.endDay} {MONTHS[sign.endMonth - 1]}
          </p>
        )}

        {/* Ruling planet */}
        <p className="text-slate-500 text-[11px] font-mono">
          Ruler: {sign.rulingPlanet}
        </p>
      </div>
    </Link>
  );
}
