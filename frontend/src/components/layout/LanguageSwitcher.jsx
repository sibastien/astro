import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ compact = false }) {
  const { i18n } = useTranslation();

  const currentLang = (i18n.language || 'en').startsWith('fr') ? 'fr' : 'en';

  const toggleLanguage = () => {
    const nextLang = currentLang === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(nextLang);
  };

  if (compact) {
    return (
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[11px] font-mono text-slate-300 uppercase transition-all"
        title="Switch language / Changer de langue"
        aria-label="Switch language"
      >
        <Globe className="w-3 h-3 text-accent-400" />
        <span>{currentLang.toUpperCase()}</span>
      </button>
    );
  }

  return (
    <div className="inline-flex items-center p-0.5 rounded-lg bg-black/40 border border-white/[0.08] text-[11px] font-mono">
      <button
        onClick={() => i18n.changeLanguage('en')}
        className={`px-2 py-1 rounded transition-all ${
          currentLang === 'en'
            ? 'bg-white/[0.1] text-white font-bold shadow-sm'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => i18n.changeLanguage('fr')}
        className={`px-2 py-1 rounded transition-all ${
          currentLang === 'fr'
            ? 'bg-white/[0.1] text-white font-bold shadow-sm'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        FR
      </button>
    </div>
  );
}
