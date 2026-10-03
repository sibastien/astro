import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SEOMeta from '@/components/seo/SEOMeta';
import ZodiacCard from '@/components/ui/ZodiacCard';
import api from '@/lib/api';

const ELEMENTS = ['All', 'Feu', 'Terre', 'Air', 'Eau'];

const ELEMENT_META = {
  'Feu': { label: 'Fire', desc: 'Kinetic initiative, catalytic willpower, and expressive sovereignty.', signs: ['Bélier', 'Lion', 'Sagittaire'] },
  'Terre': { label: 'Earth', desc: 'Material architecture, strategic patience, and somatic grounding.', signs: ['Taureau', 'Vierge', 'Capricorne'] },
  'Air': { label: 'Air', desc: 'Conceptual velocity, relational bridge-building, and systemic inquiry.', signs: ['Gémeaux', 'Balance', 'Verseau'] },
  'Eau': { label: 'Water', desc: 'Subconscious depth, instinctual resonance, and metamorphic healing.', signs: ['Cancer', 'Scorpion', 'Poissons'] },
};

export default function ZodiacPage() {
  const [activeElement, setActiveElement] = useState('All');

  const { data, isLoading } = useQuery({
    queryKey: ['zodiac-signs'],
    queryFn: () => api.get('/zodiac').then(r => r.data.data.signs),
    staleTime: 60 * 60 * 1000,
  });

  const filtered = data
    ? data.filter(s => activeElement === 'All' || s.element === activeElement)
    : [];

  return (
    <>
      <SEOMeta
        title="12 Zodiac Archetypes — Celestial Catalog — ASTRA"
        description="Comprehensive astrological analysis of the 12 tropical zodiac archetypes. Modal dynamics, planetary rulers, and elemental coordinates."
        canonical="/signes-du-zodiaque"
      />

      <div className="min-h-screen bg-cosmic-ambient py-16 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-300 text-xs font-mono uppercase tracking-wider">
              <span>CELESTIAL CATALOG</span>
            </div>
            <h1 className="editorial-title text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              The 12 Zodiac Archetypes
            </h1>
            <p className="editorial-sub text-slate-400 text-sm sm:text-base">
              Each sign represents a distinct psychological polarity within the 360° celestial wheel, shaped by elemental modality and planetary rulership.
            </p>
          </div>

          {/* Element Filter */}
          <div className="flex items-center justify-center gap-2 flex-wrap pb-4 border-b border-white/[0.06]">
            {ELEMENTS.map((el) => (
              <button
                key={el}
                id={`element-filter-${el.toLowerCase()}`}
                onClick={() => setActiveElement(el)}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all border ${
                  activeElement === el
                    ? 'bg-accent-500/20 border-accent-500/30 text-accent-300'
                    : 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {el === 'All' ? 'All Polarities' : `${el} Element`}
              </button>
            ))}
          </div>

          {/* Element meta explanation */}
          {activeElement !== 'All' && ELEMENT_META[activeElement] && (
            <div className="glass-surface p-6 text-center max-w-2xl mx-auto card-premium animate-fade-in">
              <span className="mono-badge text-accent-300 mb-2 inline-block">
                ELEMENT {activeElement.toUpperCase()}
              </span>
              <p className="text-slate-200 text-sm leading-relaxed mb-2">
                {ELEMENT_META[activeElement].desc}
              </p>
              <p className="text-xs font-mono text-slate-400">
                Archetypes: {ELEMENT_META[activeElement].signs.join(' · ')}
              </p>
            </div>
          )}

          {/* Signs Grid */}
          <div>
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="glass-surface h-48 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filtered.map((sign) => (
                  <ZodiacCard key={sign.slug} sign={sign} showDates />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
