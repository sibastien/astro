import { Briefcase, TrendingUp, Target, ShieldCheck, ArrowRight } from 'lucide-react';

export default function CareerReadingView({ profile, onSwitchFocus }) {
  const sunSign = profile?.sunSign || { name: 'Scorpion', symbol: '♏', element: 'Eau' };

  return (
    <div className="space-y-10 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="glass-surface p-6 sm:p-8 card-premium relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-cyanic-500/[0.04] blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3 mb-3">
          <span className="mono-badge text-cyanic-400 border-cyanic-500/30 bg-cyanic-500/10">
            STRATEGIC TRAJECTORY
          </span>
          <span className="text-xs font-mono text-slate-500">·</span>
          <span className="text-xs font-mono text-slate-400">
            MIDHEAVEN & AMBITION
          </span>
        </div>
        <p className="text-xs font-mono text-cyanic-400 uppercase tracking-widest mb-1">
          Career & Financial Intelligence
        </p>
        <h1 className="editorial-title text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Ambition, Leverage & Capital, {profile?.name || 'Partner'}.
        </h1>
        <p className="editorial-sub text-slate-400 mt-3 max-w-2xl text-sm sm:text-base">
          Targeting your career velocity based on Saturnian discipline cycles and {sunSign.name} leadership modalities.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-surface p-6 sm:p-7 card-premium space-y-4">
          <div className="flex items-center justify-between">
            <span className="mono-badge text-slate-300">EXECUTION INDEX</span>
            <span className="text-sm font-mono text-cyanic-400 font-bold">96% High Focus</span>
          </div>
          <h2 className="editorial-title text-lg font-bold text-white">
            Current Professional Momentum
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            The prevailing celestial transits incentivize structural consolidation. Projects requiring deep technical rigor, contractual precision, or confidential architecture are positioned for outsized success. Cut noise and execute high-impact priorities.
          </p>
          <div className="pt-3 border-t border-white/[0.06] space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Target className="w-3.5 h-3.5 text-cyanic-400 shrink-0" />
              <span>Core edge: Penetrating analysis and unwavering commitment</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-3.5 h-3.5 text-cyanic-400 shrink-0" />
              <span>Best negotiation phase: Early mornings before 11:30</span>
            </div>
          </div>
        </div>

        <div className="glass-surface p-6 sm:p-7 card-premium space-y-4">
          <div className="flex items-center justify-between">
            <span className="mono-badge text-slate-300">FINANCIAL HORIZON</span>
            <span className="text-sm font-mono text-emerald-400 font-bold">Stable Ingress</span>
          </div>
          <h2 className="editorial-title text-lg font-bold text-white">
            Financial & Resource Strategy
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Capital preservation paired with long-term compound positioning is strongly favored over high-volatility speculation. Avoid hasty expenditures driven by transient social validation; allocate toward sovereign assets and skill accumulation.
          </p>
          <div className="pt-3 border-t border-white/[0.06] space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Investment vector: Infrastructure, tools, specialized training</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Risk posture: Controlled asymmetric upside</span>
            </div>
          </div>
        </div>
      </div>

      {/* Next step */}
      <div className="glass-surface p-6 card-premium flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-slate-400 uppercase">Suggested Exploration</p>
          <p className="text-sm font-medium text-white">Explore your foundational psychological archetype & core strengths</p>
        </div>
        <button
          onClick={() => onSwitchFocus('personality')}
          className="btn-secondary text-sm px-4 py-2 shrink-0 flex items-center gap-2"
        >
          <span>View Personality Blueprint</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
