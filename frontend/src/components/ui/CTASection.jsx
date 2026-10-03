import { Link } from 'react-router-dom';
import { ArrowRight, Orbit } from 'lucide-react';

export default function CTASection({
  title = 'Calibrate your celestial alignment',
  subtitle = 'Create your private personal profile to unlock real-time transit analysis and complete natal ephemeris coordinates.',
  primaryLabel = 'Begin your calibration',
  primaryTo = '/',
  secondaryLabel = 'Explore 12 signs',
  secondaryTo = '/signes-du-zodiaque',
}) {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-cosmic-ambient">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-600/[0.06] blur-[100px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center glass-surface p-8 sm:p-12 card-premium border border-white/[0.08]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 uppercase tracking-widest mb-6">
          <Orbit className="w-3.5 h-3.5 text-accent-400" />
          <span>Ephemeris AI Matrix</span>
        </div>

        <h2 className="editorial-title text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="editorial-sub text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={primaryTo} className="btn-primary text-sm px-6 py-3 w-full sm:w-auto">
            <span>{primaryLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to={secondaryTo} className="btn-secondary text-sm px-6 py-3 w-full sm:w-auto">
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
