import { X, Sun, Heart, Briefcase, User, Compass, Calendar, Moon, Sparkles, BookOpen, Orbit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserProfile } from '@/context/UserProfileContext';

export default function ExploreDrawer({ isOpen, onClose }) {
  const { updateFocus } = useUserProfile();

  if (!isOpen) return null;

  const PRIMARY_READINGS = [
    { id: 'today', title: 'Today', desc: 'Daily transit energy & advice', icon: Sun },
    { id: 'love', title: 'Love & Intimacy', desc: 'Emotional currents & attraction', icon: Heart },
    { id: 'career', title: 'Career & Leverage', desc: 'Strategic timing & financial horizon', icon: Briefcase },
    { id: 'personality', title: 'Personality Blueprint', desc: 'Core archetypes & triad synthesis', icon: User },
    { id: 'birth-chart', title: 'Birth Chart (Natal)', desc: 'Ephemeris planetary mapping & houses', icon: Compass },
    { id: 'forecast', title: 'Forecast & Transits', desc: '30-day projection matrix', icon: Calendar },
  ];

  const SECONDARY_MODULES = [
    { to: '/blog', title: 'Blog Astrologie', desc: 'Guides, analyses cosmiques et actualités', icon: BookOpen },
    { to: '/signes-du-zodiaque', title: '12 Zodiac Signs', desc: 'In-depth astronomical sign catalog', icon: Orbit },
    { to: '/lune', title: 'Lunar Cycles & Phases', desc: 'Real-time moon illumination tracking', icon: Moon },
    { to: '/compatibilite', title: 'Resonance & Synergy', desc: 'Multi-sign compatibility matrix', icon: Sparkles },
    { to: '/tarot', title: 'Tarot Archetypes', desc: 'Symbolic meditation cards', icon: Compass },
    { to: '/articles', title: 'Editorial Articles', desc: 'Astrological research & knowledge', icon: BookOpen },
  ];

  const handleSelectReading = (focusId) => {
    updateFocus(focusId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md h-full bg-[#0a0c12] border-l border-white/[0.08] p-6 flex flex-col justify-between overflow-y-auto">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
              <span className="editorial-title text-base font-bold text-white uppercase tracking-wider">
                Explore Matrix
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05]"
              aria-label="Close explore drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Intelligence Readings */}
          <div className="mb-6">
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">
              Personalized Intelligence Readings
            </p>
            <div className="space-y-2">
              {PRIMARY_READINGS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectReading(item.id)}
                    className="w-full text-left p-3 rounded-lg glass-surface hover:bg-white/[0.05] border border-white/[0.06] hover:border-accent-500/30 transition-all flex items-center gap-3.5 group"
                  >
                    <div className="w-8 h-8 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent-300 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4 stroke-[1.75]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-accent-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Modules */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">
              Secondary Encyclopedias & Tools
            </p>
            <div className="space-y-2">
              {SECONDARY_MODULES.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className="p-3 rounded-lg bg-black/40 hover:bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] transition-all flex items-center gap-3.5 group block"
                  >
                    <div className="w-8 h-8 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4 stroke-[1.75]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-6 mt-6 border-t border-white/[0.06] text-center text-xs font-mono text-slate-600">
          ASTRA v2.4 · Ephemeris 360° AI
        </div>

      </div>
    </div>
  );
}
