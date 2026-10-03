import { Link } from 'react-router-dom';
import { Orbit, ShieldCheck, Cpu } from 'lucide-react';
import { useUserProfile } from '@/context/UserProfileContext';

export default function Footer() {
  const { isOnboardingActive, onboardingStep } = useUserProfile();

  // If on Screen 1 of onboarding, do not show footer to keep experience clean & full-screen
  if (isOnboardingActive && onboardingStep === 1) {
    return null;
  }

  const QUICK_LINKS = [
    { label: 'Today Transit', to: '/' },
    { label: 'Zodiac Signs', to: '/signes-du-zodiaque' },
    { label: 'Moon Phases', to: '/lune' },
    { label: 'Compatibility', to: '/compatibilite' },
    { label: 'Tarot Archetypes', to: '/tarot' },
    { label: 'Articles & Research', to: '/articles' },
  ];

  return (
    <footer className="border-t border-white/[0.08] bg-[#060709] text-slate-400 text-xs font-sans pb-16 md:pb-8 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/[0.06]">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-accent-400">
                <Orbit className="w-3.5 h-3.5 stroke-[1.75]" />
              </div>
              <span className="editorial-title text-base font-bold text-white tracking-tight">
                ASTRA
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed">
              Precision astrological intelligence platform. Mathematical celestial ephemeris engine synthesizing natal transits, psychological archetypes, and harmonic timing vectors.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-accent-400" />
                Zero tracking of personal birth records
              </span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-mono text-[11px] text-slate-300 uppercase tracking-widest mb-3">
              Platform
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ephemeris Specs */}
          <div>
            <h4 className="font-mono text-[11px] text-slate-300 uppercase tracking-widest mb-3">
              Calibration Standard
            </h4>
            <div className="space-y-1.5 text-slate-500 font-mono text-[11px]">
              <p>House System: Placidus 360°</p>
              <p>Zodiac: Tropical & Topocentric</p>
              <p>Ephemeris: Swiss DE431 Ref</p>
              <p>Interface: Neural Synthesis v2.4</p>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <p>© {new Date().getFullYear()} ASTRA Intelligence. All rights reserved.</p>
          <p className="text-slate-600">Designed for personal clarity and strategic timing.</p>
        </div>
      </div>
    </footer>
  );
}
