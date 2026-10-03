import SEOMeta from '@/components/seo/SEOMeta';
import CTASection from '@/components/ui/CTASection';
import { Compass, Sparkles } from 'lucide-react';

export default function TarotPage() {
  return (
    <>
      <SEOMeta
        title="Archetypal Tarot & Symbolic System — ASTRA"
        description="Archetypal tarot hermeneutics and symbolic contemplation matrix."
        canonical="/tarot"
      />
      <div className="min-h-screen bg-cosmic-ambient py-20 px-4 flex items-center justify-center relative">
        <div className="max-w-2xl mx-auto text-center glass-surface p-10 card-premium border border-white/[0.08]">
          <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent-300 mx-auto mb-6">
            <Compass className="w-6 h-6 stroke-[1.5]" />
          </div>
          <span className="mono-badge text-accent-300 uppercase mb-3 inline-block">
            HERMENEUTIC ENGINE
          </span>
          <h1 className="editorial-title text-3xl sm:text-4xl font-bold text-white mb-4">
            Symbolic Tarot Archetypes
          </h1>
          <p className="editorial-sub text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
            Integrating 78 Major & Minor Arcanes with natal planetary houses to provide structural psychological reflection.
          </p>
          <div className="p-4 rounded-lg bg-black/40 border border-white/[0.06] text-xs font-mono text-slate-400">
            Phase 2 Synthesis Engine currently in neural training.
          </div>
        </div>
      </div>
    </>
  );
}
