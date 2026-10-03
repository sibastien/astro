import { useUserProfile } from '@/context/UserProfileContext';
import TodayReadingView from './TodayReadingView';
import LoveReadingView from './LoveReadingView';
import CareerReadingView from './CareerReadingView';
import PersonalityReadingView from './PersonalityReadingView';
import BirthChartReadingView from './BirthChartReadingView';
import ForecastReadingView from './ForecastReadingView';
import { Sun, Heart, Briefcase, User, Compass, Calendar, Edit3, Sparkles } from 'lucide-react';

const FOCUS_TABS = [
  { id: 'today', label: 'Today', icon: Sun },
  { id: 'love', label: 'Love', icon: Heart },
  { id: 'career', label: 'Career', icon: Briefcase },
  { id: 'personality', label: 'Personality', icon: User },
  { id: 'birth-chart', label: 'Birth Chart', icon: Compass },
  { id: 'forecast', label: 'Forecast', icon: Calendar },
];

export default function PersonalizedDashboard({ onOpenProfile }) {
  const { profile, updateFocus } = useUserProfile();
  const currentFocus = profile?.selectedFocus || 'today';

  const handleSelectFocus = (focusId) => {
    updateFocus(focusId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cosmic-ambient pt-24 pb-28 px-4 sm:px-6 relative">
      {/* Precision grid background */}
      <div className="absolute inset-0 bg-precision-grid pointer-events-none opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        
        {/* Top persistent control bar for Desktop & Tablet */}
        <div className="glass-surface p-2 card-premium flex items-center justify-between gap-2 overflow-x-auto">
          {/* Focus Pills */}
          <div className="flex items-center gap-1.5 shrink-0">
            {FOCUS_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentFocus === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSelectFocus(tab.id)}
                  id={`dashboard-tab-${tab.id}`}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-space-950 font-bold shadow-subtle'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 stroke-[1.75]" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* User profile capsule with edit trigger */}
          <button
            onClick={onOpenProfile}
            id="profile-trigger-btn"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-xs font-mono text-slate-300 transition-colors shrink-0 ml-auto"
            title="Edit profile & birth calibration"
          >
            <span className="text-accent-400 font-display text-base">
              {profile?.sunSign?.symbol || '✦'}
            </span>
            <span className="hidden sm:inline font-sans text-slate-200 font-medium">
              {profile?.name}
            </span>
            <span className="text-[10px] text-slate-500 hidden md:inline">
              ({profile?.sunSign?.name})
            </span>
            <Edit3 className="w-3 h-3 text-slate-400" />
          </button>
        </div>

        {/* Dynamic reading view */}
        <main>
          {currentFocus === 'today' && (
            <TodayReadingView profile={profile} onSwitchFocus={handleSelectFocus} />
          )}
          {currentFocus === 'love' && (
            <LoveReadingView profile={profile} onSwitchFocus={handleSelectFocus} />
          )}
          {currentFocus === 'career' && (
            <CareerReadingView profile={profile} onSwitchFocus={handleSelectFocus} />
          )}
          {currentFocus === 'personality' && (
            <PersonalityReadingView profile={profile} onSwitchFocus={handleSelectFocus} />
          )}
          {currentFocus === 'birth-chart' && (
            <BirthChartReadingView profile={profile} onSwitchFocus={handleSelectFocus} />
          )}
          {currentFocus === 'forecast' && (
            <ForecastReadingView profile={profile} onSwitchFocus={handleSelectFocus} />
          )}
        </main>

      </div>
    </div>
  );
}
