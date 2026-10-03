import { Heart, Sparkles, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export default function LoveReadingView({ profile, onSwitchFocus }) {
  const sunSign = profile?.sunSign || { name: 'Scorpion', symbol: '♏', element: 'Eau' };

  return (
    <div className="space-y-10 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="glass-surface p-6 sm:p-8 card-premium relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-pink-500/[0.04] blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3 mb-3">
          <span className="mono-badge text-pink-400 border-pink-500/30 bg-pink-500/10">
            RELATIONAL DYNAMICS
          </span>
          <span className="text-xs font-mono text-slate-500">·</span>
          <span className="text-xs font-mono text-slate-400">
            VENUSIAN HARMONICS
          </span>
        </div>
        <p className="text-xs font-mono text-pink-400 uppercase tracking-widest mb-1">
          Love & Attraction Reading
        </p>
        <h1 className="editorial-title text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Intimacy & Emotional Frequency, {profile?.name || 'Friend'}.
        </h1>
        <p className="editorial-sub text-slate-400 mt-3 max-w-2xl text-sm sm:text-base">
          Calibrated through your {sunSign.name} sun and harmonic elemental resonance. Analyze attraction windows, boundary clarity, and emotional reciprocity.
        </p>
      </div>

      {/* Structured Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-surface p-6 sm:p-7 card-premium space-y-4">
          <div className="flex items-center justify-between">
            <span className="mono-badge text-slate-300">CURRENT WAVE</span>
            <span className="text-sm font-mono text-pink-400 font-bold">89% Resonance</span>
          </div>
          <h2 className="editorial-title text-lg font-bold text-white">
            Emotional Atmosphere
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Your connection to vulnerability is heightened. Deep authentic discussions resonate more powerfully than casual pleasantries. You are drawn to individuals who exhibit quiet emotional security and intellectual honesty.
          </p>
          <div className="pt-3 border-t border-white/[0.06] space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0" />
              <span>Optimal communication timing: Twilight to midnight</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0" />
              <span>Key themes: Transparency, unspoken agreements, shared silence</span>
            </div>
          </div>
        </div>

        <div className="glass-surface p-6 sm:p-7 card-premium space-y-4">
          <div className="flex items-center justify-between">
            <span className="mono-badge text-slate-300">MAGNETIC POLARITY</span>
            <span className="text-sm font-mono text-purple-400 font-bold">High Attraction</span>
          </div>
          <h2 className="editorial-title text-lg font-bold text-white">
            Attraction & Chemistry
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Your aura projects grounded autonomy. In relationships, genuine presence is your strongest magnet. Avoid attempting to decipher ambiguities—direct inquiries will save immense energy and crystallize mutual intent.
          </p>
          <div className="pt-3 border-t border-white/[0.06] space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Complementary elements: Earth and Water polarities</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Actionable posture: Express boundary before resentment forms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Next step recommendation */}
      <div className="glass-surface p-6 card-premium flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-slate-400 uppercase">Next Recommendation</p>
          <p className="text-sm font-medium text-white">Examine how your personal career goals interface with relationship bandwidth</p>
        </div>
        <button
          onClick={() => onSwitchFocus('career')}
          className="btn-secondary text-sm px-4 py-2 shrink-0 flex items-center gap-2"
        >
          <span>View Career Reading</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
