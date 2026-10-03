import { Calendar, Moon, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

export default function ForecastReadingView({ profile, onSwitchFocus }) {
  const sunSign = profile?.sunSign || { name: 'Scorpion', symbol: '♏', element: 'Eau' };

  const UPCOMING_EVENTS = [
    {
      date: 'In 2 days · Oct 5',
      title: 'First Quarter Moon in Capricorn',
      type: 'LUNATION',
      impact: 'Execution Catalyst',
      desc: 'Grounding lunar transit. Bridges visionary concepts into practical, measurable milestones. High focus for professional deliverables.',
    },
    {
      date: 'In 5 days · Oct 8',
      title: 'Mercury Enters Scorpio',
      type: 'INGRESS',
      impact: 'Mental Acuity Peak',
      desc: 'Communication shifts from superficial pleasantries to rigorous investigative depth. Ideal period for contracts, diagnostics, and candid negotiations.',
    },
    {
      date: 'In 11 days · Oct 14',
      title: 'Solar Eclipse Alignment',
      type: 'ECLIPSE',
      impact: 'Karmic Pivot Window',
      desc: 'A significant recalibration in relational dynamics and resource distribution. Avoid irreversible emotional reactions during this 48-hour corridor.',
    },
    {
      date: 'In 19 days · Oct 22',
      title: 'Sun Ingress Into Scorpio',
      type: 'SOLAR INGRESS',
      impact: 'Annual Power Cycle',
      desc: 'Your annual vitality renewal. High regenerative capacity, self-actualization momentum, and elevated personal authority.',
    },
  ];

  return (
    <div className="space-y-10 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="glass-surface p-6 sm:p-8 card-premium relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-500/[0.04] blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3 mb-3">
          <span className="mono-badge text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
            PROJECTION MATRIX
          </span>
          <span className="text-xs font-mono text-slate-500">·</span>
          <span className="text-xs font-mono text-slate-400">
            30-DAY CELESTIAL HORIZON
          </span>
        </div>
        <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1">
          Planetary Forecast
        </p>
        <h1 className="editorial-title text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Upcoming Transits & Cycles, {profile?.name || 'Observer'}.
        </h1>
        <p className="editorial-sub text-slate-400 mt-3 max-w-2xl text-sm sm:text-base">
          Anticipate major celestial shifts. Track lunation milestones, retrograde horizons, and strategic timing opportunities.
        </p>
      </div>

      {/* Timeline of upcoming events */}
      <div className="space-y-4">
        {UPCOMING_EVENTS.map((event, idx) => (
          <div
            key={idx}
            className="glass-surface p-5 sm:p-6 card-premium flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-500/30 transition-all"
          >
            <div className="space-y-1 sm:max-w-2xl">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  {event.date}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-[10px] font-mono text-slate-400 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.06]">
                  {event.type}
                </span>
              </div>
              <h3 className="editorial-title text-base sm:text-lg font-bold text-white">
                {event.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {event.desc}
              </p>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="text-xs font-mono font-medium text-slate-300 block">
                {event.impact}
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                Resonance: High
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Next step recommendation */}
      <div className="glass-surface p-6 card-premium flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-slate-400 uppercase">Daily Integration</p>
          <p className="text-sm font-medium text-white">Return to Today's immediate transits & focus metrics</p>
        </div>
        <button
          onClick={() => onSwitchFocus('today')}
          className="btn-primary text-sm px-4 py-2 shrink-0 flex items-center gap-2"
        >
          <span>Return to Today's Reading</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
