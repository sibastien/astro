import { useState, useMemo } from 'react';
import { ArrowRight, ArrowLeft, Calendar, Clock, MapPin, Sparkles, Check } from 'lucide-react';
import { calculateSunSign } from '@/context/UserProfileContext';

export default function PersonalInfoStep({ onComplete, onBack }) {
  // Sub-stage within Screen 2:
  // 1: Name
  // 2: Date of birth
  // 3: Time of birth (optional)
  // 4: Place of birth (optional)
  const [subStage, setSubStage] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
  });

  const [error, setError] = useState('');

  // Live astrological feedback when birth date is chosen
  const liveSign = useMemo(() => {
    if (!formData.birthDate) return null;
    return calculateSunSign(formData.birthDate);
  }, [formData.birthDate]);

  const handleNameNext = (e) => {
    e?.preventDefault();
    if (!formData.name.trim()) {
      setError('Please provide your name to personalize your reading.');
      return;
    }
    setError('');
    setSubStage(2);
  };

  const handleDateNext = (e) => {
    e?.preventDefault();
    if (!formData.birthDate) {
      setError('Please select your date of birth.');
      return;
    }
    setError('');
    setSubStage(3);
  };

  const handleTimeNext = (e) => {
    e?.preventDefault();
    setError('');
    setSubStage(4);
  };

  const handleSkipTime = () => {
    setFormData((prev) => ({ ...prev, birthTime: '' }));
    setError('');
    setSubStage(4);
  };

  const handleFinish = (e) => {
    e?.preventDefault();
    setError('');
    onComplete(formData);
  };

  const handleSkipPlace = () => {
    setFormData((prev) => ({ ...prev, birthPlace: '' }));
    onComplete({ ...formData, birthPlace: '' });
  };

  return (
    <div className="min-h-[88vh] flex flex-col justify-center items-center px-4 sm:px-6 py-10 max-w-xl mx-auto">
      {/* Step header & Subtle progress indicator: 01 / 03 or 02 / 04 */}
      <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
        <button
          type="button"
          onClick={() => {
            if (subStage > 1) {
              setSubStage(subStage - 1);
            } else {
              onBack();
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors uppercase tracking-wider"
          aria-label="Previous step"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Profile</span>
          <span className="text-xs font-mono font-medium text-accent-400 bg-accent-500/10 px-2 py-0.5 rounded border border-accent-500/20">
            0{subStage} / 04
          </span>
        </div>
      </div>

      {/* Progressive Step Cards */}
      <div className="w-full glass-surface p-6 sm:p-10 card-premium">

        {/* ── SUB-STAGE 1: NAME ───────────────────────────────── */}
        {subStage === 1 && (
          <form onSubmit={handleNameNext} className="space-y-6 animate-fade-in">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-accent-400 mb-2">
                01 · Identity
              </p>
              <h2 className="editorial-title text-2xl sm:text-3xl font-semibold mb-2">
                First, tell us a little about you.
              </h2>
              <p className="editorial-sub text-sm sm:text-base text-slate-400">
                Your name will be used to calibrate your personal insight stream.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="name-input" className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
                Full name or preferred name
              </label>
              <input
                id="name-input"
                type="text"
                autoFocus
                placeholder="e.g. Clara Dupont"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (error) setError('');
                }}
                className="w-full px-4 py-3.5 bg-black/40 border border-white/[0.12] rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 text-lg transition-all"
              />
              {error && <p className="text-rose-400 text-xs font-mono pt-1">{error}</p>}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                id="name-continue-btn"
                className="btn-primary w-full sm:w-auto px-6 py-3"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* ── SUB-STAGE 2: DATE OF BIRTH ───────────────────────── */}
        {subStage === 2 && (
          <form onSubmit={handleDateNext} className="space-y-6 animate-fade-in">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-accent-400 mb-2">
                02 · Solar Calibration
              </p>
              <h2 className="editorial-title text-2xl sm:text-3xl font-semibold mb-2">
                When were you born?
              </h2>
              <p className="editorial-sub text-sm sm:text-base text-slate-400">
                Your date of birth unlocks your Sun sign and foundational celestial polarity.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="dob-input" className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
                Date of birth
              </label>
              <div className="relative">
                <input
                  id="dob-input"
                  type="date"
                  autoFocus
                  max={new Date().toISOString().split('T')[0]}
                  value={formData.birthDate}
                  onChange={(e) => {
                    setFormData({ ...formData, birthDate: e.target.value });
                    if (error) setError('');
                  }}
                  className="w-full px-4 py-3.5 bg-black/40 border border-white/[0.12] rounded-lg text-slate-100 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 text-base transition-all scheme-dark"
                />
              </div>
              {error && <p className="text-rose-400 text-xs font-mono pt-1">{error}</p>}
            </div>

            {/* Instant Astrological preview */}
            {liveSign && (
              <div className="p-4 rounded-lg bg-accent-500/[0.08] border border-accent-500/20 flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-display text-accent-300">{liveSign.symbol}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-100 font-display">
                      Sun in {liveSign.name} ({liveSign.nameEn})
                    </p>
                    <p className="text-xs text-slate-400 font-mono">
                      Element: {liveSign.element} · Ruler: {liveSign.rulingPlanet}
                    </p>
                  </div>
                </div>
                <span className="mono-badge-accent">Detected</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                id="dob-continue-btn"
                className="btn-primary w-full sm:w-auto px-6 py-3"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* ── SUB-STAGE 3: TIME OF BIRTH (OPTIONAL) ───────────── */}
        {subStage === 3 && (
          <form onSubmit={handleTimeNext} className="space-y-6 animate-fade-in">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-accent-400 mb-2">
                03 · Ascendant & Houses · Optional
              </p>
              <h2 className="editorial-title text-2xl sm:text-3xl font-semibold mb-2">
                Do you know your birth time?
              </h2>
              <p className="editorial-sub text-sm sm:text-base text-slate-400">
                Exact time allows high-precision Ascendant (Rising sign) and house calculations. If you're not sure, you can safely skip.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="time-input" className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
                Birth time (24-hour format)
              </label>
              <div className="relative">
                <input
                  id="time-input"
                  type="time"
                  autoFocus
                  value={formData.birthTime}
                  onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                  className="w-full px-4 py-3.5 bg-black/40 border border-white/[0.12] rounded-lg text-slate-100 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 text-base transition-all scheme-dark"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="submit"
                id="time-continue-btn"
                className="btn-primary w-full sm:w-auto px-6 py-3"
              >
                <span>Save & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                id="time-skip-btn"
                onClick={handleSkipTime}
                className="btn-secondary w-full sm:w-auto px-5 py-3 text-slate-400 hover:text-slate-200"
              >
                Skip for now
              </button>
            </div>
          </form>
        )}

        {/* ── SUB-STAGE 4: PLACE OF BIRTH (OPTIONAL) ──────────── */}
        {subStage === 4 && (
          <form onSubmit={handleFinish} className="space-y-6 animate-fade-in">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-accent-400 mb-2">
                04 · Geographic Horizon · Optional
              </p>
              <h2 className="editorial-title text-2xl sm:text-3xl font-semibold mb-2">
                Where were you born?
              </h2>
              <p className="editorial-sub text-sm sm:text-base text-slate-400">
                Determines the exact latitude and longitude for celestial house projection.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="place-input" className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
                City, Country
              </label>
              <div className="relative">
                <input
                  id="place-input"
                  type="text"
                  autoFocus
                  placeholder="e.g. Paris, France or Lyon"
                  value={formData.birthPlace}
                  onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                  className="w-full px-4 py-3.5 bg-black/40 border border-white/[0.12] rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 text-base transition-all"
                />
              </div>
            </div>

            {/* Quick popular city shortcuts */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-slate-500 font-mono py-1">Quick select:</span>
              {['Paris, France', 'Lyon, France', 'Marseille, France', 'Bruxelles, Belgique', 'Montréal, Canada'].map((city) => (
                <button
                  type="button"
                  key={city}
                  onClick={() => setFormData({ ...formData, birthPlace: city })}
                  className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:border-accent-400/40 hover:text-white transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="submit"
                id="finish-profile-btn"
                className="btn-primary w-full sm:w-auto px-6 py-3"
              >
                <span>Complete Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                id="place-skip-btn"
                onClick={handleSkipPlace}
                className="btn-secondary w-full sm:w-auto px-5 py-3 text-slate-400 hover:text-slate-200"
              >
                Skip for now
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
