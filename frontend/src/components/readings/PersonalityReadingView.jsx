import { User, Sparkles, Shield, Cpu, ArrowRight } from 'lucide-react';

export default function PersonalityReadingView({ profile, onSwitchFocus }) {
  const sunSign = profile?.sunSign || { name: 'Scorpion', symbol: '♏', element: 'Eau', archetype: "Le Phénix Métamorphique", keywords: ['Intensité', 'Intuition', 'Résilience'] };
  const moonSign = profile?.moonSign || { name: 'Poissons', symbol: '♓', element: 'Eau' };
  const risingSign = profile?.risingSign || { name: 'Capricorne', symbol: '♑', element: 'Terre' };

  return (
    <div className="space-y-10 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="glass-surface p-6 sm:p-8 card-premium relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-purple-500/[0.04] blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3 mb-3">
          <span className="mono-badge text-purple-400 border-purple-500/30 bg-purple-500/10">
            PSYCHOLOGICAL ARCHETYPE
          </span>
          <span className="text-xs font-mono text-slate-500">·</span>
          <span className="text-xs font-mono text-slate-400">
            NATAL SYNTHESIS
          </span>
        </div>
        <p className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-1">
          Personality Blueprint
        </p>
        <h1 className="editorial-title text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          The Triad of Identity, {profile?.name || 'Explorer'}.
        </h1>
        <p className="editorial-sub text-slate-400 mt-3 max-w-2xl text-sm sm:text-base">
          Decoding the intersection of your conscious purpose (Sun), emotional subconscious (Moon), and outward interface (Ascendant).
        </p>
      </div>

      {/* The Big 3 Triad Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-surface p-5 rounded-lg border border-white/[0.08] card-premium">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-accent-400 uppercase">01 · SUN SIGN</span>
            <span className="text-2xl font-display text-accent-300">{sunSign.symbol}</span>
          </div>
          <h3 className="editorial-title text-lg font-bold text-white mb-1">
            {sunSign.name}
          </h3>
          <p className="text-xs text-slate-400 font-mono mb-3">Conscious Will & Core Ego</p>
          <p className="text-xs text-slate-300 leading-relaxed">
            Your fundamental drive and identity. You approach reality with {sunSign.keywords?.slice(0, 2).join(' and ').toLowerCase() || 'clarity'}.
          </p>
        </div>

        <div className="glass-surface p-5 rounded-lg border border-white/[0.08] card-premium">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-pink-400 uppercase">02 · MOON SIGN</span>
            <span className="text-2xl font-display text-pink-300">{moonSign.symbol}</span>
          </div>
          <h3 className="editorial-title text-lg font-bold text-white mb-1">
            {moonSign.name}
          </h3>
          <p className="text-xs text-slate-400 font-mono mb-3">Subconscious & Emotional Safety</p>
          <p className="text-xs text-slate-300 leading-relaxed">
            How you process feelings in private. Governs your visceral instincts and intuitive recovery patterns.
          </p>
        </div>

        <div className="glass-surface p-5 rounded-lg border border-white/[0.08] card-premium">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-cyanic-400 uppercase">03 · ASCENDANT</span>
            <span className="text-2xl font-display text-cyanic-300">{risingSign.symbol}</span>
          </div>
          <h3 className="editorial-title text-lg font-bold text-white mb-1">
            {risingSign.name}
          </h3>
          <p className="text-xs text-slate-400 font-mono mb-3">Physical Lens & First Impression</p>
          <p className="text-xs text-slate-300 leading-relaxed">
            The filter through which the outer world encounters your energy. Dictates your initial response to novel environments.
          </p>
        </div>
      </div>

      {/* Strengths & Shadows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-surface p-6 sm:p-7 card-premium space-y-4">
          <span className="mono-badge text-emerald-400 border-emerald-500/20 bg-emerald-500/10">CORE SUPERPOWERS</span>
          <h2 className="editorial-title text-lg font-bold text-white">Dominant Strengths</h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
              <span><strong>Penetrative Intuition:</strong> Ability to detect incongruence in statements and uncover latent motivations.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
              <span><strong>Metamorphic Resilience:</strong> High psychological endurance during periods of systemic upheaval.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
              <span><strong>Discreet Execution:</strong> Mastery over confidentiality and autonomous project completion.</span>
            </li>
          </ul>
        </div>

        <div className="glass-surface p-6 sm:p-7 card-premium space-y-4">
          <span className="mono-badge text-amber-400 border-amber-500/20 bg-amber-500/10">SHADOW INTEGRATION</span>
          <h2 className="editorial-title text-lg font-bold text-white">Tendencies to Calibrate</h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
              <span><strong>Hyper-vigilance:</strong> Over-interpreting benign silences as deliberate calculated distancing.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
              <span><strong>Reluctance to Delegate:</strong> Believing execution fidelity requires total unilateral control.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
              <span><strong>Emotional Reticence:</strong> Guarding vulnerability until opportunities for authentic communion pass.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Next step */}
      <div className="glass-surface p-6 card-premium flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-slate-400 uppercase">Deeper Alignment</p>
          <p className="text-sm font-medium text-white">Inspect all 12 astrological houses in your interactive Birth Chart</p>
        </div>
        <button
          onClick={() => onSwitchFocus('birth-chart')}
          className="btn-primary text-sm px-4 py-2 shrink-0 flex items-center gap-2"
        >
          <span>Calculate Birth Chart</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
