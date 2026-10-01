import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Star } from 'lucide-react';
import SEOMeta from '@/components/seo/SEOMeta';
import api from '@/lib/api';

const CATEGORY_INFO = [
  { key: 'GENERAL', label: 'Général', emoji: '⭐' },
  { key: 'AMOUR', label: 'Amour', emoji: '❤️' },
  { key: 'TRAVAIL', label: 'Travail', emoji: '💼' },
  { key: 'SANTE', label: 'Santé', emoji: '🌿' },
  { key: 'ARGENT', label: 'Argent', emoji: '💰' },
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl animate-float mb-4">⭐</div>
          <p className="text-stardust-400">Consultation des astres...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <p className="text-6xl mb-4">🌌</p>
          <h1 className="font-display text-2xl text-stardust-100 mb-2">Signe introuvable</h1>
          <Link to="/horoscope" className="btn-gold mt-6 inline-flex">← Retour</Link>
        </div>
      </div>
    );
  }

  const { sign, horoscopes } = data;
  const general = horoscopes?.find(h => h.category === 'GENERAL');

  return (
    <>
      <SEOMeta
        title={`Horoscope ${sign.name} du Jour`}
        description={`Découvrez l'horoscope du ${sign.name} aujourd'hui. Amour, travail, santé et prévisions générales pour le signe du ${sign.name}.`}
        canonical={`/horoscope/${slug}`}
      />

      {/* Header */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-gradient" />
        <div className="absolute inset-0 bg-stars opacity-30" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: sign.color }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Link to="/horoscope" className="inline-flex items-center gap-2 text-stardust-400 hover:text-gold-400 text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Tous les signes
          </Link>

          <div className="text-8xl mb-4 animate-float">{sign.emoji}</div>
          <div className="text-gold-400 font-display text-2xl mb-2">{sign.symbol}</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-stardust-100 mb-4">{sign.name}</h1>

          <div className="flex flex-wrap justify-center gap-3 text-sm mb-6">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stardust-300">
              {sign.element}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stardust-300">
              {sign.modality}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stardust-300">
              ✦ {sign.rulingPlanet}
            </span>
          </div>

          <p className="text-stardust-300 font-serif text-lg max-w-2xl mx-auto">{sign.shortDesc}</p>
        </div>
      </section>

      {/* Horoscopes Grid */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {horoscopes && horoscopes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {horoscopes.map((h) => {
                const cat = CATEGORY_INFO.find(c => c.key === h.category) || CATEGORY_INFO[0];
                return (
                  <div key={h.id} className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{cat.emoji}</span>
                      <div>
                        <h2 className="font-display text-lg font-semibold text-stardust-100">{cat.label}</h2>
                        {h.rating && (
                          <div className="flex gap-0.5 mt-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < h.rating ? 'text-gold-400' : 'text-stardust-600'}`} fill={i < h.rating ? 'currentColor' : 'none'} />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-stardust-300 leading-relaxed">{h.content}</p>
                    {(h.luckyNumber || h.luckyColor) && (
                      <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-4 text-xs text-stardust-400">
                        {h.luckyNumber && <span>🍀 Chiffre: <strong className="text-gold-400">{h.luckyNumber}</strong></span>}
                        {h.luckyColor && <span>🎨 Couleur: <strong className="text-gold-400">{h.luckyColor}</strong></span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">{sign.emoji}</p>
              <h2 className="font-display text-2xl text-stardust-100 mb-2">Horoscope en préparation</h2>
              <p className="text-stardust-400">Les prévisions du jour pour {sign.name} seront publiées prochainement.</p>
            </div>
          )}

          {/* Sign Description */}
          {sign.description && (
            <div className="mt-12 glass-card p-8">
              <h2 className="font-display text-2xl font-semibold text-stardust-100 mb-4">À propos du {sign.name}</h2>
              <p className="text-stardust-300 leading-relaxed font-serif text-lg">{sign.description}</p>

              {sign.strengths?.length > 0 && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-display text-sm uppercase tracking-widest text-gold-400 mb-3">Forces</h3>
                    <ul className="space-y-1">
                      {sign.strengths.map(s => <li key={s} className="text-stardust-300 text-sm flex items-center gap-2"><span className="text-green-400">✦</span>{s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-display text-sm uppercase tracking-widest text-gold-400 mb-3">Défis</h3>
                    <ul className="space-y-1">
                      {sign.weaknesses.map(w => <li key={w} className="text-stardust-300 text-sm flex items-center gap-2"><span className="text-red-400">✦</span>{w}</li>)}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
