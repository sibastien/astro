import { ArrowRight, Compass } from 'lucide-react';

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 py-12 text-center overflow-hidden">
      {/* Subtle ambient focal glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full bg-accent-600/[0.07] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-cyanic-400/[0.04] blur-[80px] pointer-events-none" />

      {/* Center content */}
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Subtle geometric emblem */}
        <div className="mb-8 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-surface border border-white/[0.08] text-xs font-mono text-slate-300 tracking-wider uppercase animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse-subtle" />
          Astrological Intelligence System
        </div>

        {/* Headline */}
        <h1 className="editorial-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 tracking-tight animate-fade-in">
          Discover what the stars say about you.
        </h1>

        {/* Supporting text */}
        <p className="editorial-sub text-lg sm:text-xl text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in">
          Create your personal profile and begin your reading.
        </p>

        {/* Primary button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in">
          <button
            onClick={onStart}
            id="begin-reading-btn"
            className="btn-primary text-base px-8 py-3.5 group flex items-center gap-3 w-full sm:w-auto"
          >
            <span>Begin your reading</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Subtle credibility markers */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex items-center justify-center gap-8 text-xs font-mono text-slate-500 uppercase tracking-widest">
          <span>Ephemeris Precision</span>
          <span>·</span>
          <span>Private & Encrypted</span>
          <span>·</span>
          <span>Instant Alignment</span>
        </div>
      </div>
    </div>
  );
}
