import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import SEOMeta from '@/components/seo/SEOMeta';
import HoroscopeCard from '@/components/ui/HoroscopeCard';
import api from '@/lib/api';

const CATEGORIES = [
  { key: 'GENERAL', label: 'Général', emoji: '⭐' },
  { key: 'AMOUR', label: 'Amour', emoji: '❤️' },
  { key: 'TRAVAIL', label: 'Travail', emoji: '💼' },
  { key: 'SANTE', label: 'Santé', emoji: '🌿' },
];

export default function HoroscopePage() {
  const today = format(new Date(), 'EEEE d MMMM yyyy', { locale: fr });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['horoscopes', 'today'],
    queryFn: () => api.get('/horoscopes/today').then(r => r.data.data.horoscopes),
    staleTime: 10 * 60 * 1000,
  });

  return (
    <>
      <SEOMeta
        title="Horoscope du Jour – Les 12 Signes"
        description="Consultez votre horoscope du jour pour les 12 signes du zodiaque. Amour, travail, santé et prévisions générales."
        canonical="/horoscope"
      />

      {/* Header */}
      <section className="relative py-20 px-4 text-center bg-stars overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-gradient opacity-90" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-gold-400 font-display text-sm uppercase tracking-widest mb-3">Prévisions astrales</p>
          <h1 className="section-title mb-4">Horoscope du Jour</h1>
          <p className="section-subtitle capitalize">{today}</p>
        </div>
      </section>

      {/* Category Filter (visual only – backend handles per-category) */}
      <section className="py-8 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
          {CATEGORIES.map(({ key, label, emoji }) => (
            <button
              key={key}
              id={`category-${key.toLowerCase()}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                key === 'GENERAL'
                  ? 'bg-gold-500/20 border-gold-500/40 text-gold-300'
                  : 'bg-white/5 border-white/10 text-stardust-400 hover:border-gold-500/30 hover:text-gold-300'
              }`}
            >
              {emoji} {label}
            </button>
          ))}
        </div>
      </section>

      {/* Horoscope Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="glass-card h-48 animate-pulse" />
              ))}
            </div>
          )}

          {isError && (
            <div className="text-center py-20 text-stardust-400">
              <p className="text-4xl mb-4">🌌</p>
              <p>Les horoscopes du jour seront bientôt disponibles.</p>
            </div>
          )}

          {data && data.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {data.map((horoscope) => (
                <HoroscopeCard key={horoscope.id} horoscope={horoscope} compact />
              ))}
            </div>
          )}

          {data && data.length === 0 && (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">⭐</p>
              <h2 className="font-display text-2xl text-stardust-100 mb-2">Horoscopes en préparation</h2>
              <p className="text-stardust-400">Les prévisions du jour seront publiées prochainement.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
