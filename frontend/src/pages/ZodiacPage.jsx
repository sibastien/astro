import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SEOMeta from '@/components/seo/SEOMeta';
import ZodiacCard from '@/components/ui/ZodiacCard';
import api from '@/lib/api';

const ELEMENTS = ['Tous', 'Feu', 'Terre', 'Air', 'Eau'];

export default function ZodiacPage() {
  const [activeElement, setActiveElement] = useState('Tous');

  const { data, isLoading } = useQuery({
    queryKey: ['zodiac-signs'],
    queryFn: () => api.get('/zodiac').then(r => r.data.data.signs),
    staleTime: 60 * 60 * 1000, // 1 hour – signs don't change
  });

  const filtered = data
    ? data.filter(s => activeElement === 'Tous' || s.element === activeElement)
    : [];

  const ELEMENT_META = {
    'Feu': { emoji: '🔥', desc: 'Passion, énergie et courage.', signs: ['Bélier', 'Lion', 'Sagittaire'] },
    'Terre': { emoji: '🌿', desc: 'Stabilité, pragmatisme et persévérance.', signs: ['Taureau', 'Vierge', 'Capricorne'] },
    'Air': { emoji: '💨', desc: 'Intellect, communication et liberté.', signs: ['Gémeaux', 'Balance', 'Verseau'] },
    'Eau': { emoji: '🌊', desc: 'Intuition, sensibilité et profondeur.', signs: ['Cancer', 'Scorpion', 'Poissons'] },
  };

  return (
    <>
      <SEOMeta
        title="Les 12 Signes du Zodiaque – Guide Complet"
        description="Découvrez les 12 signes du zodiaque : Bélier, Taureau, Gémeaux, Cancer, Lion, Vierge, Balance, Scorpion, Sagittaire, Capricorne, Verseau, Poissons."
        canonical="/signes-du-zodiaque"
      />

      {/* Header */}
      <section className="relative py-20 px-4 text-center bg-stars overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-gradient opacity-95" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-gold-400 font-display text-sm uppercase tracking-widest mb-3">Guide Astrologique</p>
          <h1 className="section-title mb-4">Les 12 Signes du Zodiaque</h1>
          <p className="section-subtitle">Chaque signe possède une personnalité unique façonnée par son élément, sa planète maîtresse et sa modalité.</p>
        </div>
      </section>

      {/* Element Filter */}
      <section className="py-8 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
          {ELEMENTS.map((el) => (
            <button
              key={el}
              id={`element-filter-${el.toLowerCase()}`}
              onClick={() => setActiveElement(el)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeElement === el
                  ? 'bg-gold-500/20 border-gold-500/40 text-gold-300'
                  : 'bg-white/5 border-white/10 text-stardust-400 hover:border-gold-500/30 hover:text-gold-300'
              }`}
            >
              {ELEMENT_META[el]?.emoji || '✨'} {el}
            </button>
          ))}
        </div>
      </section>

      {/* Signs Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Element description */}
          {activeElement !== 'Tous' && ELEMENT_META[activeElement] && (
            <div className="glass-card p-6 mb-10 text-center max-w-2xl mx-auto">
              <span className="text-4xl block mb-3">{ELEMENT_META[activeElement].emoji}</span>
              <h2 className="font-display text-xl text-stardust-100 mb-2">Élément {activeElement}</h2>
              <p className="text-stardust-400">{ELEMENT_META[activeElement].desc}</p>
              <p className="text-stardust-500 text-sm mt-2">{ELEMENT_META[activeElement].signs.join(' · ')}</p>
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="glass-card h-44 animate-pulse rounded-2xl" />
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
      </section>
    </>
  );
}
