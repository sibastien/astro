import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Zap, 
  Heart, 
  Briefcase, 
  Sparkles, 
  Compass, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import api from '@/lib/api';

export default function TodayReadingView({ profile, onSwitchFocus }) {
  const [selectedSubTab, setSelectedSubTab] = useState('ALL');

  const sunSign = profile?.sunSign || { slug: 'scorpion', name: 'Scorpion', symbol: '♏', element: 'Eau' };
  const signSlug = sunSign.slug || 'scorpion';

  // Greeting based on time of day
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const todayFormatted = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date());
  }, []);

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

  // Extract general content or fallback to dynamic tailored content
  const generalText = apiHoroscopeData?.horoscopes?.find(h => h.category === 'GENERAL')?.content ||
    `Today positions your ${sunSign.name} sun in harmonic resonance with personal growth vectors. Trust your natural discernment as planetary movements favor measured progress over impulsive action. Keep your core intentions aligned with your inner rhythm.`;

  const loveText = apiHoroscopeData?.horoscopes?.find(h => h.category === 'AMOUR')?.content ||
    `Emotional communications carry high fidelity today. A rare window of vulnerability unlocks deeper authenticity with close ties. Listen for what remains unsaid in conversations.`;

  const careerText = apiHoroscopeData?.horoscopes?.find(h => h.category === 'TRAVAIL')?.content ||
    `Strategic discipline yields compound results. Your analytical capacity is sharpened, making this an ideal cycle for complex problem-solving and finalizing architectural commitments.`;

  const healthText = apiHoroscopeData?.horoscopes?.find(h => h.category === 'SANTE')?.content ||
    `Prioritize nervous system recalibration. Balanced hydration and intentional pacing will preserve vitality for the demanding evening transits.`;

  const SECTIONS = [
    {
      id: 'ENERGY',
      title: 'ENERGY',
      icon: Zap,
      score: '92%',
      metricLabel: 'Vitality Quotient',
      content: generalText,
      focus: 'High mental endurance · Stable emotional equilibrium',
      bulletPoints: [
        'Optimal peak productivity: 10:00 - 13:30',
        'Intuitive responsiveness elevated above average',
        'Physical vitality benefits from mindful grounding',
      ],
      borderHover: 'hover:border-accent-400/40',
    },
    {
      id: 'RELATIONSHIPS',
      title: 'RELATIONSHIPS',
      icon: Heart,
      score: '88%',
      metricLabel: 'Harmonic Synergy',
      content: loveText,
      focus: 'Authentic expression · Boundary recognition',
      bulletPoints: [
        'Unspoken tension dissolves through transparent dialogue',
        'Attraction magnetic index peaks during late afternoon',
        'Shared strategic goals reinforce relational bonding',
      ],
      borderHover: 'hover:border-pink-500/30',
    },
    {
      id: 'CAREER',
      title: 'CAREER',
      icon: Briefcase,
      score: '95%',
      metricLabel: 'Strategic Leverage',
      content: careerText,
      focus: 'Execution clarity · High negotiation precision',
      bulletPoints: [
        'Contractual clarity and structured review favored',
        'Leadership presence commands quiet respect',
        'Ideal timing for roadmap refinement and milestone lock',
      ],
      borderHover: 'hover:border-cyanic-400/30',
    },
    {
      id: 'ADVICE',
      title: 'ADVICE',
      icon: Sparkles,
      score: '97%',
      metricLabel: 'Clarity Index',
      content: `${healthText} Anchor yourself in deliberate action. When faced with diverging perspectives, rely on your core principles rather than immediate consensus. Maintain emotional sovereignty.`,
      focus: 'Sovereign decision-making · Daily anchor mantra',
      bulletPoints: [
        'Anchor phrase: "Clarity precedes velocity."',
        'Avoid unnecessary debates before afternoon transits',
        'Dedicate 10 minutes to silence before twilight',
      ],
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
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent-500/[0.05] blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="mono-badge-accent">
                {todayFormatted}
              </span>
              <span className="text-xs font-mono text-slate-500">·</span>
              <span className="text-xs font-mono text-slate-400">
                EPHEMERIS REAL-TIME FEED
              </span>
            </div>

            <p className="text-xs font-mono text-accent-400 uppercase tracking-widest mb-1">
              Today's Reading
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
                Active Polarity
              </p>
              <p className="text-sm font-semibold text-white font-display">
                {sunSign.name} ({sunSign.nameEn})
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
            <p className="text-slate-500 uppercase tracking-wider">Ascendant</p>
            <p className="text-slate-200 font-medium mt-0.5">
              {profile?.risingSign?.name || 'Calculated'} {profile?.risingSign?.symbol}
            </p>
          </div>
          <div>
            <p className="text-slate-500 uppercase tracking-wider">Moon Phase</p>
            <p className="text-slate-200 font-medium mt-0.5">Gibbous Waxing</p>
          </div>
          <div>
            <p className="text-slate-500 uppercase tracking-wider">Daily Resonance</p>
            <p className="text-accent-400 font-medium mt-0.5">94% Coherence</p>
          </div>
          <div>
            <p className="text-slate-500 uppercase tracking-wider">Primary Transit</p>
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
              {tab}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-slate-500">
          Showing {filteredSections.length} intelligence section{filteredSections.length > 1 ? 's' : ''}
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
                {/* Header with minimal icon and score */}
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

                {/* Sub-focus label */}
                <p className="text-xs font-mono text-accent-300/90 mb-3 bg-accent-500/[0.06] px-2.5 py-1 rounded inline-block border border-accent-500/10">
                  {section.focus}
                </p>

                {/* Main reading paragraph */}
                <p className="text-slate-300 text-sm leading-relaxed mb-5 font-normal">
                  {section.content}
                </p>

                {/* Bullet points for immediate scannability */}
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

      {/* ── "WHAT SHOULD I DO NEXT?" GUIDED ACTION ─────── */}
      <div className="glass-surface p-6 sm:p-8 card-premium border border-accent-500/20 bg-gradient-to-r from-accent-500/[0.06] to-transparent flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-400">
            Recommended Next Step
          </span>
          <h3 className="editorial-title text-lg sm:text-xl font-semibold text-white mt-1 mb-1">
            Deepen your insights with your full Birth Chart
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            You've explored today's immediate transits. Inspect all 10 planetary coordinates, rising horizon, and natal houses.
          </p>
        </div>

        <button
          onClick={() => onSwitchFocus('birth-chart')}
          className="btn-primary shrink-0 px-5 py-2.5 text-sm"
        >
          <span>Explore Birth Chart</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
