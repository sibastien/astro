import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Orbit } from 'lucide-react';
import SEOMeta from '@/components/seo/SEOMeta';

const SIGNS = [
  { name: 'Bélier', slug: 'belier', symbol: '♈' },
  { name: 'Taureau', slug: 'taureau', symbol: '♉' },
  { name: 'Gémeaux', slug: 'gemeaux', symbol: '♊' },
  { name: 'Cancer', slug: 'cancer', symbol: '♋' },
  { name: 'Lion', slug: 'lion', symbol: '♌' },
  { name: 'Vierge', slug: 'vierge', symbol: '♍' },
  { name: 'Balance', slug: 'balance', symbol: '♎' },
  { name: 'Scorpion', slug: 'scorpion', symbol: '♏' },
  { name: 'Sagittaire', slug: 'sagittaire', symbol: '♐' },
  { name: 'Capricorne', slug: 'capricorne', symbol: '♑' },
  { name: 'Verseau', slug: 'verseau', symbol: '♒' },
  { name: 'Poissons', slug: 'poissons', symbol: '♓' },
];

export default function CompatibilitePage() {
  const navigate = useNavigate();
  const [signA, setSignA] = useState('');
  const [signB, setSignB] = useState('');
  const [simulatedResult, setSimulatedResult] = useState(null);

  const handleCheck = () => {
    if (!signA || !signB) return;
    const a = SIGNS.find(s => s.slug === signA);
    const b = SIGNS.find(s => s.slug === signB);

    // Compute harmonic resonance
    const hash = (signA.length * 7 + signB.length * 11) % 25 + 75;
    setSimulatedResult({
      signA: a,
      signB: b,
      score: `${hash}%`,
      dynamics: 'Harmonic elemental synergy. Communication and collaborative execution are strongly reinforced by complementary planetary rulers.',
    });
  };

  return (
    <>
      <SEOMeta
        title="Astrological Synergy & Compatibility Matrix — ASTRA"
        description="Analyze energetic resonance and interpersonal dynamics between zodiac archetypes."
        canonical="/compatibilite"
      />

      <div className="min-h-screen bg-cosmic-ambient py-16 px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-300 text-xs font-mono uppercase tracking-wider">
              <span>SYNERGY MATRIX</span>
            </div>
            <h1 className="editorial-title text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Harmonic Compatibility
            </h1>
            <p className="editorial-sub text-slate-400 text-sm sm:text-base">
              Select two archetypes to calibrate cross-elemental polarity, intellectual resonance, and long-term stability.
            </p>
          </div>

          {/* Form */}
          <div className="glass-surface p-8 card-premium border border-white/[0.08]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {[
                { id: 'sign-a', label: 'First Archetype', value: signA, onChange: setSignA },
                { id: 'sign-b', label: 'Second Archetype', value: signB, onChange: setSignB },
              ].map(({ id, label, value, onChange }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    {label}
                  </label>
                  <select
                    id={id}
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.value);
                      setSimulatedResult(null);
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/[0.12] text-white focus:outline-none focus:border-accent-500 transition-all font-sans text-sm"
                  >
                    <option value="">Select sign</option>
                    {SIGNS.map(s => (
                      <option key={s.slug} value={s.slug}>{s.symbol} {s.name}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <button
              id="compatibility-check-btn"
              onClick={handleCheck}
              disabled={!signA || !signB}
              className="btn-primary w-full py-3 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
            >
              <span>Calculate Resonance Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Calculated Result */}
            {simulatedResult && (
              <div className="mt-8 pt-6 border-t border-white/[0.08] animate-fade-in space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl text-accent-300 font-display">{simulatedResult.signA.symbol}</span>
                    <span className="text-xs font-mono text-slate-500">×</span>
                    <span className="text-2xl text-accent-300 font-display">{simulatedResult.signB.symbol}</span>
                    <span className="text-sm font-semibold text-white font-display ml-2">
                      {simulatedResult.signA.name} & {simulatedResult.signB.name}
                    </span>
                  </div>
                  <span className="mono-badge-accent font-bold text-sm">
                    {simulatedResult.score} Synergy
                  </span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {simulatedResult.dynamics}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
