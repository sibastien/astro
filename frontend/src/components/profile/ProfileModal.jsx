import { useState } from 'react';
import { X, Calendar, Clock, MapPin, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUserProfile } from '@/context/UserProfileContext';

export default function ProfileModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const { profile, updateProfile, resetProfile } = useUserProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    birthDate: profile?.birthDate || '',
    birthTime: profile?.birthTime || '',
    birthPlace: profile?.birthPlace || '',
  });

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleReset = () => {
    if (window.confirm('Reset your profile and restart the guided onboarding? / Réinitialiser votre profil ?')) {
      resetProfile();
      onClose();
    }
  };

  const sunSign = profile?.sunSign || {};
  const moonSign = profile?.moonSign || {};
  const risingSign = profile?.risingSign || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-surface card-premium border border-white/[0.12] p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
          aria-label="Close profile modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-accent-500/10 border border-accent-500/20 text-accent-300 text-xs font-mono uppercase mb-2">
            <span>{t('profileModal.title')}</span>
          </div>
          <h2 className="editorial-title text-2xl font-bold text-white">
            {profile?.name || t('common.profile')}
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            {t('profileModal.subtitle')}
          </p>
        </div>

        {/* View mode */}
        {!isEditing ? (
          <div className="space-y-6">
            {/* Celestial Triad */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-lg bg-black/40 border border-white/[0.06] text-center">
              <div>
                <span className="text-2xl text-accent-300 font-display">{sunSign.symbol}</span>
                <p className="text-[11px] font-mono text-slate-400 mt-1 uppercase">{t('profileModal.sun')}</p>
                <p className="text-xs font-semibold text-white">{sunSign.name}</p>
              </div>
              <div className="border-x border-white/[0.06]">
                <span className="text-2xl text-pink-300 font-display">{moonSign.symbol}</span>
                <p className="text-[11px] font-mono text-slate-400 mt-1 uppercase">{t('profileModal.moon')}</p>
                <p className="text-xs font-semibold text-white">{moonSign.name}</p>
              </div>
              <div>
                <span className="text-2xl text-cyanic-300 font-display">{risingSign.symbol}</span>
                <p className="text-[11px] font-mono text-slate-400 mt-1 uppercase">{t('profileModal.rising')}</p>
                <p className="text-xs font-semibold text-white">{risingSign.name}</p>
              </div>
            </div>

            {/* Birth details list */}
            <div className="space-y-3 text-xs font-mono text-slate-300 divide-y divide-white/[0.04]">
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-400 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-accent-400" />
                  {t('profileModal.dob')}
                </span>
                <span className="text-white font-medium">{profile?.birthDate || 'Not specified'}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-400 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-accent-400" />
                  {t('profileModal.time')}
                </span>
                <span className="text-white font-medium">{profile?.birthTime || '12:00'}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-400 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-accent-400" />
                  {t('profileModal.place')}
                </span>
                <span className="text-white font-medium">{profile?.birthPlace || 'Global Horizon'}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-400">{t('profileModal.element')}</span>
                <span className="text-accent-300 font-semibold">{sunSign.element}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/[0.06]">
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary w-full text-xs py-2.5"
              >
                {t('common.edit')}
              </button>
              <button
                onClick={handleReset}
                className="btn-secondary w-full text-xs py-2.5 text-rose-300 hover:text-rose-200 border-rose-500/20 hover:border-rose-500/40"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1" />
                {t('common.reset')}
              </button>
            </div>
          </div>
        ) : (
          /* Edit mode */
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                {t('onboarding.nameLabel')}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-black/50 border border-white/[0.12] rounded-lg text-white text-sm focus:border-accent-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                {t('onboarding.dobLabel')}
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-black/50 border border-white/[0.12] rounded-lg text-white text-sm focus:border-accent-500 focus:outline-none scheme-dark"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                {t('onboarding.timeLabel')}
              </label>
              <input
                type="time"
                value={formData.birthTime}
                onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-black/50 border border-white/[0.12] rounded-lg text-white text-sm focus:border-accent-500 focus:outline-none scheme-dark"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                {t('onboarding.placeLabel')}
              </label>
              <input
                type="text"
                value={formData.birthPlace}
                onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-black/50 border border-white/[0.12] rounded-lg text-white text-sm focus:border-accent-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                type="submit"
                className="btn-primary w-full text-xs py-2.5"
              >
                {t('profileModal.saveRecalibrate')}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn-secondary w-full text-xs py-2.5"
              >
                {t('common.cancel')}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
