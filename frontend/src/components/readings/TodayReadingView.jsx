import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Zap, 
  Heart, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import api from '@/lib/api';

export default function TodayReadingView({ profile, onSwitchFocus }) {
  const { t, i18n } = useTranslation();
  const [selectedSubTab, setSelectedSubTab] = useState('ALL');

  const sunSign = profile?.sunSign || { slug: 'scorpion', name: 'Scorpion', symbol: '♏', element: 'Eau' };
  const signSlug = sunSign.slug || 'scorpion';

  // Greeting based on time of day
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return t('readings.goodMorning');
    if (hour < 18) return t('readings.goodAfternoon');
    return t('readings.goodEvening');
  }, [t]);

  const todayFormatted = useMemo(() => {
    const locale = (i18n.language || 'en').startsWith('fr') ? 'fr-FR' : 'en-US';
    return new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date());
  }, [i18n.language]);

  // Fetch real horoscope data from API
  const { data: apiHoroscopeData, isLoading } = useQuery({
    queryKey: ['horoscope', signSlug],
    queryFn: async () => {
      try {
        const res = await api.get(`/horoscopes/${signSlug}`);
        return res.data?.data;
      } catch (err) {
        console.warn('API horoscope fetch fallback', err);
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  const isFr = (i18n.language || '').startsWith('fr');

  // Extract general content or fallback to dynamic tailored content
  const generalText = apiHoroscopeData?.horoscopes?.find(h => h.category === 'GENERAL')?.content ||
    (isFr
      ? `Aujourd'hui, votre soleil en ${sunSign.name} est en résonance harmonique avec vos vecteurs d'évolution personnelle. Fiez-vous à votre discernement naturel alors que les mouvements planétaires favorisent une progression mesurée.`
      : `Today positions your ${sunSign.name} sun in harmonic resonance with personal growth vectors. Trust your natural discernment as planetary movements favor measured progress over impulsive action.`);

  const loveText = apiHoroscopeData?.horoscopes?.find(h => h.category === 'AMOUR')?.content ||
    (isFr
      ? `Les échanges émotionnels portent une haute fidélité aujourd'hui. Une ouverture de vulnérabilité permet d'approfondir les liens sincères. Écoutez ce qui demeure inexprimé.`
      : `Emotional communications carry high fidelity today. A rare window of vulnerability unlocks deeper authenticity with close ties. Listen for what remains unsaid in conversations.`);

  const careerText = apiHoroscopeData?.horoscopes?.find(h => h.category === 'TRAVAIL')?.content ||
    (isFr
      ? `La rigueur stratégique produit des résultats exponentiels. Votre discernement analytique est aiguisé, idéal pour structurer vos engagements et finaliser vos priorités.`
      : `Strategic discipline yields compound results. Your analytical capacity is sharpened, making this an ideal cycle for complex problem-solving and finalizing architectural commitments.`);

  const healthText = apiHoroscopeData?.horoscopes?.find(h => h.category === 'SANTE')?.content ||
    (isFr
      ? `Préservez votre équilibre nerveux. Une hydratation équilibrée et une cadence intentionnelle protégeront votre vitalité pour les transits du soir.`
      : `Prioritize nervous system recalibration. Balanced hydration and intentional pacing will preserve vitality for the demanding evening transits.`);

  const SECTIONS = [
    {
      id: 'ENERGY',
      title: t('readings.energy'),
      icon: Zap,
      score: '92%',
      metricLabel: t('readings.vitalityQuotient'),
      content: generalText,
      focus: isFr ? 'Endurance mentale élevée · Équilibre émotionnel stable' : 'High mental endurance · Stable emotional equilibrium',
      bulletPoints: isFr
        ? ['Pic de clarté productive : 10h00 - 13h30', 'Réactivité intuitive supérieure à la moyenne', 'Vitalité somatique favorisée par l\'ancrage']
        : ['Optimal peak productivity: 10:00 - 13:30', 'Intuitive responsiveness elevated above average', 'Physical vitality benefits from mindful grounding'],
      borderHover: 'hover:border-accent-400/40',
    },
    {
      id: 'RELATIONSHIPS',
      title: t('readings.relationships'),
      icon: Heart,
      score: '88%',
      metricLabel: t('readings.harmonicSynergy'),
      content: loveText,
      focus: isFr ? 'Expression authentique · Clarté des limites' : 'Authentic expression · Boundary recognition',
      bulletPoints: isFr
        ? ['Les tensions sous-jacentes s\'apaisent par le dialogue', 'Indice d\'attraction magnétique en hausse en fin d\'après-midi', 'Valeurs partagées renforçant l\'alliance mutuelle']
        : ['Unspoken tension dissolves through transparent dialogue', 'Attraction magnetic index peaks during late afternoon', 'Shared strategic goals reinforce relational bonding'],
      borderHover: 'hover:border-pink-500/30',
    },
    {
      id: 'CAREER',
      title: t('readings.career'),
      icon: Briefcase,
      score: '95%',
      metricLabel: t('readings.strategicLeverage'),
      content: careerText,
      focus: isFr ? 'Clarté d\'exécution · Haute précision de négociation' : 'Execution clarity · High negotiation precision',
      bulletPoints: isFr
        ? ['Rigueur contractuelle et revue structurée favorisées', 'Posture de leadership naturelle et respectée', 'Période propice à l\'arbitrage des priorités clés']
        : ['Contractual clarity and structured review favored', 'Leadership presence commands quiet respect', 'Ideal timing for roadmap refinement and milestone lock'],
      borderHover: 'hover:border-cyanic-400/30',
    },
    {
      id: 'ADVICE',
      title: t('readings.advice'),
      icon: Sparkles,
      score: '97%',
      metricLabel: t('readings.clarityIndex'),
      content: isFr
        ? `${healthText} Ancrez-vous dans l'action délibérée. Préservez votre souveraineté émotionnelle.`
        : `${healthText} Anchor yourself in deliberate action. Maintain emotional sovereignty.`,
      focus: isFr ? 'Prise de décision souveraine · Mantra d\'ancrage' : 'Sovereign decision-making · Daily anchor mantra',
      bulletPoints: isFr
        ? ['Mantra clé : "La clarté précède la vélocité."', 'Évitez les débats superflus avant le milieu du jour', 'Accordez-vous 10 minutes de calme avant le crépuscule']
        : ['Anchor phrase: "Clarity precedes velocity."', 'Avoid unnecessary debates before afternoon transits', 'Dedicate 10 minutes to silence before twilight'],
      borderHover: 'hover:border-emerald-400/30',
    },
  ];

  const filteredSections = selectedSubTab === 'ALL'
    ? SECTIONS
    : SECTIONS.filter(s => s.id === selectedSubTab);

  return (
    <div className="space-y-10 animate-fade-in max-w-5xl mx-auto">
      
      {/* ── HEADER & GREETING ──────────────────────────── */}
      <div className="glass-surface p-6 sm:p-8 card-premium relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent-500/[0.05] blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="mono-badge-accent">
                {todayFormatted}
              </span>
              <span className="text-xs font-mono text-slate-500">·</span>
              <span className="text-xs font-mono text-slate-400">
                {t('readings.realtimeFeed')}
              </span>
            </div>

            <p className="text-xs font-mono text-accent-400 uppercase tracking-widest mb-1">
              {t('readings.todayTitle')}
            </p>
            <h1 className="editorial-title text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              {greeting}, {profile?.name || 'Traveler'}.
            </h1>
          </div>

          {/* Quick celestial profile pill */}
          <div className="flex items-center gap-4 bg-black/40 border border-white/[0.08] px-4 py-3 rounded-lg">
            <div className="text-3xl text-accent-300 font-display">
              {sunSign.symbol}
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-slate-400">
                {t('readings.activePolarity')}
              </p>
              <p className="text-sm font-semibold text-white font-display">
                {sunSign.name}
              </p>
              <p className="text-[11px] font-mono text-slate-400">
                {sunSign.element} · {sunSign.rulingPlanet}
              </p>
            </div>
          </div>
        </div>

        {/* Real-time cosmic summary bar */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <p className="text-slate-500 uppercase tracking-wider">{t('readings.ascendant')}</p>
            <p className="text-slate-200 font-medium mt-0.5">
              {profile?.risingSign?.name || 'Calculated'} {profile?.risingSign?.symbol}
            </p>
          </div>
          <div>
            <p className="text-slate-500 uppercase tracking-wider">{t('readings.moonPhase')}</p>
            <p className="text-slate-200 font-medium mt-0.5">{isFr ? 'Lune Gibbeuse' : 'Gibbous Waxing'}</p>
          </div>
          <div>
            <p className="text-slate-500 uppercase tracking-wider">{t('readings.dailyResonance')}</p>
            <p className="text-accent-400 font-medium mt-0.5">94% Coherence</p>
          </div>
          <div>
            <p className="text-slate-500 uppercase tracking-wider">{t('readings.primaryTransit')}</p>
            <p className="text-slate-200 font-medium mt-0.5">Sun Sextile Saturn</p>
          </div>
        </div>
      </div>

      {/* ── SECTION SELECTOR TABS ─────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {['ALL', 'ENERGY', 'RELATIONSHIPS', 'CAREER', 'ADVICE'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedSubTab(tab)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all ${
                selectedSubTab === tab
                  ? 'bg-accent-500/20 text-accent-300 border border-accent-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'
              }`}
            >
              {tab === 'ALL' ? t('common.all') : tab}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-slate-500">
          {t('common.showing')} {filteredSections.length} {t('common.sections')}
        </span>
      </div>

      {/* ── DIGESTIBLE SECTIONS GRID ──────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.id}
              className={`glass-surface p-6 sm:p-7 card-premium transition-all duration-300 ${section.borderHover} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent-300">
                      <Icon className="w-4 h-4 stroke-[1.75]" />
                    </div>
                    <h2 className="editorial-title text-base font-bold text-white tracking-wider">
                      {section.title}
                    </h2>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-mono font-bold text-slate-200">
                      {section.score}
                    </span>
                    <span className="block text-[10px] font-mono text-slate-500 uppercase">
                      {section.metricLabel}
                    </span>
                  </div>
                </div>

                <p className="text-xs font-mono text-accent-300/90 mb-3 bg-accent-500/[0.06] px-2.5 py-1 rounded inline-block border border-accent-500/10">
                  {section.focus}
                </p>

                <p className="text-slate-300 text-sm leading-relaxed mb-5 font-normal">
                  {section.content}
                </p>

                <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                  {section.bulletPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── RECOMMENDED NEXT STEP ───────────────────────── */}
      <div className="glass-surface p-6 sm:p-8 card-premium border border-accent-500/20 bg-gradient-to-r from-accent-500/[0.06] to-transparent flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-400">
            {t('common.nextStep')}
          </span>
          <h3 className="editorial-title text-lg sm:text-xl font-semibold text-white mt-1 mb-1">
            {t('common.exploreBirthChart')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            {isFr
              ? 'Inspectez les 10 coordonnées planétaires, l\'horizon ascendant et les 12 maisons natales.'
              : 'Inspect all 10 planetary coordinates, rising horizon, and natal houses.'}
          </p>
        </div>

        <button
          onClick={() => onSwitchFocus('birth-chart')}
          className="btn-primary shrink-0 px-5 py-2.5 text-sm"
        >
          <span>{t('common.exploreBirthChart')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
