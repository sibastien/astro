import { Moon, Orbit, ShieldCheck } from 'lucide-react';
import SEOMeta from '@/components/seo/SEOMeta';
import CTASection from '@/components/ui/CTASection';

const PHASES = [
  { symbol: '🌑', name: 'New Moon (Nouvelle Lune)', desc: 'Subconscious reset, intention germination, zero illumination window.' },
  { symbol: '🌓', name: 'First Quarter (Premier Quartier)', desc: 'Kinetic momentum, tactical decision-making, friction overcoming.' },
  { symbol: '🌕', name: 'Full Moon (Pleine Lune)', desc: 'Illumination zenith, subconscious culmination, polarity harvest.' },
  { symbol: '🌗', name: 'Last Quarter (Dernier Quartier)', desc: 'Analytical review, energetic release, structural refinement.' },
];

export default function LunePage() {
  return (
    <>
      <SEOMeta
        title="Lunar Cycles & Ingress Calibration — ASTRA"
        description="Precision tracking of lunar ephemeris phases and somatic biorhythms."
        canonical="/lune"
      />
      <div className="min-h-screen bg-cosmic-ambient py-16 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-300 text-xs font-mono uppercase tracking-wider">
              <span>LUNAR ILLUMINATION ENGINE</span>
            </div>
            <h1 className="editorial-title text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Lunar Phases & Biorhythms
            </h1>
            <p className="editorial-sub text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Real-time synodic lunation tracking. Understand how lunar gravity coordinates with your daily mental bandwidth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PHASES.map(({ symbol, name, desc }) => (
              <div key={name} className="glass-surface p-6 rounded-xl border border-white/[0.08] card-premium flex gap-4 items-start">
                <span className="text-3xl font-display text-accent-300 flex-shrink-0">{symbol}</span>
                <div>
                  <h3 className="editorial-title text-base font-bold text-white mb-1.5">{name}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <CTASection
            title="Calibrate your personal transits"
            subtitle="Connect your birth coordinates to receive automated lunar ingress alerts."
            primaryLabel="Calibrate now"
            primaryTo="/"
          />

        </div>
      </div>
    </>
  );
}
