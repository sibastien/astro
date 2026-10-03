import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sun, 
  Heart, 
  Briefcase, 
  Compass, 
  Calendar, 
  User, 
  Grid, 
  LogOut,
  Orbit,
  Sparkles
} from 'lucide-react';
import { useUserProfile } from '@/context/UserProfileContext';
import { useAuth } from '@/context/AuthContext';
import ExploreDrawer from './ExploreDrawer';
import ProfileModal from '../profile/ProfileModal';

export default function Navbar() {
  const { profile, isOnboardingActive, onboardingStep, updateFocus, resetProfile } = useUserProfile();
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // During onboarding Screen 1, keep navigation extremely minimal
  const isMinimalOnboarding = isOnboardingActive && onboardingStep === 1;

  const currentFocus = profile?.selectedFocus || 'today';

  const DESKTOP_NAV_LINKS = [
    { id: 'home', label: 'Home', action: () => { updateFocus('today'); } },
    { id: 'today', label: 'Today', action: () => { updateFocus('today'); } },
    { id: 'love', label: 'Love', action: () => { updateFocus('love'); } },
    { id: 'career', label: 'Career', action: () => { updateFocus('career'); } },
    { id: 'birth-chart', label: 'Birth Chart', action: () => { updateFocus('birth-chart'); } },
    { id: 'forecast', label: 'Forecast', action: () => { updateFocus('forecast'); } },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#060709]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-lg'
            : 'bg-transparent border-b border-white/[0.04]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group" aria-label="ASTRA Home">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.12] flex items-center justify-center text-accent-400 group-hover:border-accent-500/50 group-hover:text-accent-300 transition-all">
                <Orbit className="w-4 h-4 stroke-[1.75]" />
              </div>
              <div className="flex flex-col">
                <span className="editorial-title text-lg font-bold tracking-tight text-white group-hover:text-accent-300 transition-colors">
                  ASTRA
                </span>
                <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase -mt-1">
                  Astrological AI
                </span>
              </div>
            </Link>

            {/* If minimal onboarding, show almost nothing except subtle sign in */}
            {isMinimalOnboarding ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/connexion"
                  className="text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Sign in
                </Link>
              </div>
            ) : (
              <>
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1 bg-white/[0.02] border border-white/[0.06] p-1 rounded-full">
                  {DESKTOP_NAV_LINKS.map((link) => {
                    const isActive = location.pathname === '/' && currentFocus === link.id;
                    return (
                      <button
                        key={link.id}
                        onClick={link.action}
                        id={`nav-link-${link.id}`}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 ${
                          isActive
                            ? 'bg-white text-space-950 font-bold shadow-subtle'
                            : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                        }`}
                      >
                        {link.label}
                      </button>
                    );
                  })}
                </nav>

                {/* Right controls: Profile chip & Secondary explore */}
                <div className="hidden md:flex items-center gap-3">
                  <button
                    onClick={() => setIsExploreOpen(true)}
                    id="explore-trigger-btn"
                    className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
                    title="Secondary tools & encyclopedia"
                  >
                    <Grid className="w-4 h-4" />
                  </button>

                  {profile ? (
                    <button
                      onClick={() => setIsProfileOpen(true)}
                      id="profile-pill-btn"
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-surface border border-white/[0.12] hover:border-accent-400/40 text-xs font-mono text-slate-200 transition-all"
                    >
                      <span className="text-accent-400 font-display text-sm">
                        {profile?.sunSign?.symbol || '✦'}
                      </span>
                      <span className="font-sans font-medium text-slate-100">
                        {profile?.name}
                      </span>
                    </button>
                  ) : (
                    <Link to="/connexion" className="btn-secondary text-xs px-3.5 py-1.5">
                      Connexion
                    </Link>
                  )}
                </div>

                {/* Mobile top trigger for explore */}
                <div className="md:hidden flex items-center gap-2">
                  <button
                    onClick={() => setIsExploreOpen(true)}
                    className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300"
                    aria-label="Open explore drawer"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      </header>

      {/* ── MOBILE BOTTOM NAVIGATION ───────────────────── */}
      {!isMinimalOnboarding && (
        <nav
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07080d]/95 backdrop-blur-xl border-t border-white/[0.08] px-3 py-2 flex items-center justify-around"
          aria-label="Mobile Navigation"
        >
          {/* Home */}
          <button
            onClick={() => {
              updateFocus('today');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center gap-1 py-1 px-3 text-xs font-mono transition-colors ${
              currentFocus === 'today' ? 'text-accent-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Orbit className="w-4 h-4" />
            <span className="text-[10px]">Home</span>
          </button>

          {/* Today */}
          <button
            onClick={() => {
              updateFocus('today');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center gap-1 py-1 px-3 text-xs font-mono transition-colors ${
              currentFocus === 'today' ? 'text-accent-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span className="text-[10px]">Today</span>
          </button>

          {/* Explore */}
          <button
            onClick={() => setIsExploreOpen(true)}
            id="mobile-nav-explore-btn"
            className="flex flex-col items-center gap-1 py-1 px-3 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Grid className="w-4 h-4" />
            <span className="text-[10px]">Explore</span>
          </button>

          {/* Profile */}
          <button
            onClick={() => setIsProfileOpen(true)}
            id="mobile-nav-profile-btn"
            className="flex flex-col items-center gap-1 py-1 px-3 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
          >
            <User className="w-4 h-4" />
            <span className="text-[10px]">Profile</span>
          </button>
        </nav>
      )}

      {/* Explore Drawer & Profile Modal */}
      <ExploreDrawer isOpen={isExploreOpen} onClose={() => setIsExploreOpen(false)} />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}
