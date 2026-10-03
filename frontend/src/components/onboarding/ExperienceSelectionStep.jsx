import { Sun, Heart, Briefcase, User, Compass, Calendar, ArrowRight } from 'lucide-react';

const EXPERIENCE_OPTIONS = [
  {
    id: 'today',
    badge: 'DAILY TRANSITS',
    title: 'TODAY',
    description: 'Your energy and guidance for today',
    detail: 'Real-time solar & lunar currents, biorhythm clarity index, and daily focus vectors.',
    icon: Sun,
    accentGlow: 'hover:border-accent-400/40',
  },
  {
    id: 'love',
    badge: 'RELATIONAL DYNAMICS',
    title: 'LOVE',
    description: 'Relationships, attraction and emotional energy',
    detail: 'Venusian harmonic aspects, interpersonal resonance, and emotional vulnerability windows.',
    icon: Heart,
    accentGlow: 'hover:border-pink-500/40',
  },
  {
    id: 'career',
    badge: 'STRATEGIC ALIGNMENT',
    title: 'CAREER',
    description: 'Work, ambition and financial direction',
    detail: 'Midheaven trajectory, Saturnian discipline timing, and capital expansion cycles.',
    icon: Briefcase,
    accentGlow: 'hover:border-cyanic-400/40',
  },
  {
    id: 'personality',
    badge: 'PSYCHOLOGICAL ARCHETYPE',
    title: 'PERSONALITY',
    description: 'Understand your strengths and tendencies',
    detail: 'Triad synthesis (Sun / Moon / Rising), shadow integration, and elemental equilibrium.',
    icon: User,
    accentGlow: 'hover:border-purple-400/40',
  },
  {
    id: 'birth-chart',
    badge: 'CELESTIAL EPHEMERIS',
    title: 'BIRTH CHART',
    description: 'Explore your complete astrological profile',
    detail: '360° planetary coordinate mapping, 12 natal houses, and major harmonic aspects.',
    icon: Compass,
    accentGlow: 'hover:border-indigo-400/40',
  },
  {
    id: 'forecast',
    badge: 'PROJECTION MATRIX',
    title: 'FORECAST',
    description: "See what's coming next",
    detail: 'Upcoming planetary ingresses, lunation shifts, and quarterly opportunity windows.',
    icon: Calendar,
    accentGlow: 'hover:border-emerald-400/40',
  },
];

export default function ExperienceSelectionStep({ userName, sunSign, onSelect }) {
  return (
    <div className="min-h-[90vh] flex flex-col justify-center px-4 sm:px-6 py-12 max-w-6xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-300 text-xs font-mono tracking-wider uppercase mb-4">
          <span>{sunSign?.symbol || '✦'}</span>
          <span>Calibrated for {userName || 'You'}</span>
        </div>
        <h2 className="editorial-title text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
          What would you like to explore first?
        </h2>
        <p className="editorial-sub text-base sm:text-lg text-slate-400">
          Your celestial coordinates are mapped. Select your primary intelligence lens to generate your opening report.
        </p>
      </div>

      {/* Large Premium Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in">
        {EXPERIENCE_OPTIONS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              id={`experience-option-${item.id}`}
              className={`group text-left p-6 sm:p-7 glass-surface rounded-xl border border-white/[0.08] transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-glow-accent ${item.accentGlow} flex flex-col justify-between`}
            >
              <div>
                {/* Header row with minimal line icon and badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white group-hover:border-accent-400/30 transition-colors">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.06]">
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="editorial-title text-xl font-bold text-white mb-2 tracking-tight group-hover:text-accent-300 transition-colors">
                  {item.title}
                </h3>

                {/* Main description */}
                <p className="text-slate-200 text-sm font-medium mb-2 leading-snug">
                  {item.description}
                </p>

                {/* Technical / luxury detail */}
                <p className="text-slate-400 text-xs leading-relaxed">
                  {item.detail}
                </p>
              </div>

              {/* Action trigger */}
              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-white transition-colors">
                <span>Enter reading</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-accent-400" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
