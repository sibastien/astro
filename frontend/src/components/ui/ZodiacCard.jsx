import { Link } from 'react-router-dom';

const ELEMENT_COLORS = {
  'Feu': { bg: 'from-orange-500/20 to-red-500/10', border: 'border-orange-500/30', text: 'text-orange-400', dot: 'bg-orange-400' },
  'Terre': { bg: 'from-green-500/20 to-emerald-500/10', border: 'border-green-500/30', text: 'text-green-400', dot: 'bg-green-400' },
  'Air': { bg: 'from-sky-500/20 to-blue-500/10', border: 'border-sky-500/30', text: 'text-sky-400', dot: 'bg-sky-400' },
  'Eau': { bg: 'from-blue-500/20 to-indigo-500/10', border: 'border-blue-500/30', text: 'text-blue-400', dot: 'bg-blue-400' },
};

export default function ZodiacCard({ sign, showDates = true }) {
  const colors = ELEMENT_COLORS[sign.element] || ELEMENT_COLORS['Feu'];

  return (
    <Link
      to={`/horoscope/${sign.slug}`}
      className={`group relative block rounded-2xl border bg-gradient-to-br ${colors.bg} ${colors.border} p-5 transition-all duration-300 hover:scale-[1.03] hover:shadow-gold-sm hover:border-gold-500/30`}
      aria-label={`Voir l'horoscope ${sign.name}`}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse at top left, ${sign.color}15, transparent 70%)` }}
      />

      <div className="relative flex flex-col items-center text-center gap-3">
        {/* Symbol & Emoji */}
        <div className="relative">
          <span className="text-4xl block group-hover:animate-float">{sign.emoji}</span>
          <span className="absolute -top-1 -right-2 text-xs font-display text-gold-400 opacity-70">
            {sign.symbol}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-display text-lg font-semibold text-stardust-100 group-hover:text-gold-300 transition-colors">
          {sign.name}
        </h3>

        {/* Element badge */}
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 ${colors.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
          {sign.element} · {sign.modality}
        </span>

        {/* Dates */}
        {showDates && (
          <p className="text-stardust-400 text-xs">
            {sign.startDay} {MONTHS[sign.startMonth - 1]} – {sign.endDay} {MONTHS[sign.endMonth - 1]}
          </p>
        )}

        {/* Ruling planet */}
        <p className="text-stardust-400 text-xs">
          ✦ {sign.rulingPlanet}
        </p>
      </div>
    </Link>
  );
}

const MONTHS = ['jan.', 'fév.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
