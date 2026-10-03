import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import SEOMeta from '@/components/seo/SEOMeta';
import HoroscopeCard from '@/components/ui/HoroscopeCard';
import api from '@/lib/api';

const CATEGORIES = [
  { key: 'GENERAL', label: 'General' },
  { key: 'AMOUR', label: 'Love' },
  { key: 'TRAVAIL', label: 'Career' },
  { key: 'SANTE', label: 'Vitality' },
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
        title="Daily Astrological Transits – 12 Signs – ASTRA"
        description="Comprehensive daily planetary transits for all 12 zodiac archetypes. Relationships, strategic timing, and somatic vitality."
        canonical="/horoscope"
      />

      <div className="min-h-screen bg-cosmic-ambient py-16 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-300 text-xs font-mono uppercase tracking-wider">
              <span>{today}</span>
            </div>
            <h1 className="editorial-title text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Daily Transit Intelligence
            </h1>
            <p className="editorial-sub text-slate-400 text-sm sm:text-base">
              Real-time solar transits and planetary harmonics synthesized across all 12 celestial archetypes.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center justify-center gap-2 flex-wrap pb-4 border-b border-white/[0.06]">
            {CATEGORIES.map(({ key, label }) => (
              <button
                key={key}
                id={`category-${key.toLowerCase()}`}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all border ${
                  key === 'GENERAL'
                    ? 'bg-accent-500/20 border-accent-500/30 text-accent-300'
                    : 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div>
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="glass-surface h-48 animate-pulse rounded-xl" />
                ))}
              </div>
            )}

            {isError && (
              <div className="text-center py-20 text-slate-400 font-mono text-sm">
                <p>Daily ephemeris feeds are currently recalculating.</p>
              </div>
            )}

            {data && data.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {data.map((horoscope) => (
                  <HoroscopeCard key={horoscope.id} horoscope={horoscope} compact />
                ))}
              </div>
            )}

            {data && data.length === 0 && (
              <div className="text-center py-20 font-mono text-sm text-slate-400">
                <p>Daily transits will refresh at 00:00 UTC.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
