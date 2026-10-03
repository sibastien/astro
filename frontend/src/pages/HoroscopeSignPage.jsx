import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Sparkles, Orbit, CheckCircle2 } from 'lucide-react';
import SEOMeta from '@/components/seo/SEOMeta';
import api from '@/lib/api';

const CATEGORY_INFO = [
  { key: 'GENERAL', label: 'General Transit' },
  { key: 'AMOUR', label: 'Relational Resonance' },
  { key: 'TRAVAIL', label: 'Strategic Ambition' },
  { key: 'SANTE', label: 'Somatic Vitality' },
  { key: 'ARGENT', label: 'Capital Flow' },
];

export default function HoroscopeSignPage() {
  const { slug } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['horoscope-sign', slug],
    queryFn: () => api.get(`/horoscopes/${slug}`).then(r => r.data.data),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cosmic-ambient flex items-center justify-center">
        <div className="text-center font-mono text-xs text-slate-400">
          <div className="w-8 h-8 rounded-full border border-accent-400 border-t-transparent animate-spin mx-auto mb-3" />
          <p>Synthesizing ephemeris stream...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-cosmic-ambient flex items-center justify-center text-center px-4">
        <div className="glass-surface p-8 max-w-md card-premium">
          <h1 className="editorial-title text-xl font-bold text-white mb-2">Sign Profile Unavailable</h1>
          <p className="text-xs text-slate-400 mb-6">Unable to resolve celestial coordinates for this sign.</p>
          <Link to="/horoscope" className="btn-primary text-xs px-4 py-2 inline-flex">Return to Index</Link>
        </div>
      </div>
    );
  }

  const { sign, horoscopes } = data;

  return (
    <>
      <SEOMeta
        title={`${sign.name} — Planetary Reading — ASTRA`}
        description={`Astrological analysis and daily transits for ${sign.name}. Element: ${sign.element}, Ruler: ${sign.rulingPlanet}.`}
        canonical={`/horoscope/${slug}`}
      />

      <div className="min-h-screen bg-cosmic-ambient py-16 px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto space-y-10">
          
          {/* Back button */}
          <Link
            to="/horoscope"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Signs</span>
          </Link>

          {/* Hero Header */}
          <div className="glass-surface p-8 sm:p-10 card-premium relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-accent-500/10 border border-accent-500/20 text-accent-300 text-xs font-mono uppercase mb-3">
                  <span>ASTRONOMICAL ARCHETYPE</span>
                </div>
                <h1 className="editorial-title text-4xl sm:text-5xl font-bold text-white mb-2">
                  {sign.name}
                </h1>
                {sign.nameEn && (
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">
                    {sign.nameEn}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
                  <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08]">
                    Element: {sign.element}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08]">
                    Modality: {sign.modality}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08]">
                    Ruler: {sign.rulingPlanet}
                  </span>
                </div>
              </div>

              {/* Large glyph badge */}
              <div className="w-24 h-24 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-5xl font-display text-accent-300 shrink-0">
                {sign.symbol || '✦'}
              </div>
            </div>

            {sign.shortDesc && (
              <p className="mt-6 pt-6 border-t border-white/[0.06] text-slate-300 text-sm leading-relaxed max-w-3xl">
                {sign.shortDesc}
              </p>
            )}
          </div>

          {/* Categorized Transits */}
          <div className="space-y-4">
            <h2 className="editorial-title text-xl font-bold text-white">
              Active Transit Intelligence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {horoscopes && horoscopes.map((h) => {
                const cat = CATEGORY_INFO.find(c => c.key === h.category) || CATEGORY_INFO[0];
                return (
                  <div key={h.id} className="glass-surface p-6 card-premium space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="mono-badge text-accent-300">{cat.label}</span>
                      {h.rating && (
                        <span className="text-xs font-mono text-slate-400">
                          Coherence: {h.rating}/5
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {h.content}
                    </p>
                    {h.keywords?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {h.keywords.map(kw => (
                          <span key={kw} className="text-[10px] font-mono text-slate-400 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.06]">
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
