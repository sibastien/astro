import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEOMeta from '@/components/seo/SEOMeta';

const SIGNS = [
  { name: 'Bélier', slug: 'belier', emoji: '🐏' }, { name: 'Taureau', slug: 'taureau', emoji: '🐂' },
  { name: 'Gémeaux', slug: 'gemeaux', emoji: '👯' }, { name: 'Cancer', slug: 'cancer', emoji: '🦀' },
  { name: 'Lion', slug: 'lion', emoji: '🦁' }, { name: 'Vierge', slug: 'vierge', emoji: '👼' },
  { name: 'Balance', slug: 'balance', emoji: '⚖️' }, { name: 'Scorpion', slug: 'scorpion', emoji: '🦂' },
  { name: 'Sagittaire', slug: 'sagittaire', emoji: '🏹' }, { name: 'Capricorne', slug: 'capricorne', emoji: '🐐' },
  { name: 'Verseau', slug: 'verseau', emoji: '🏺' }, { name: 'Poissons', slug: 'poissons', emoji: '🐟' },
];

export default function CompatibilitePage() {
  const navigate = useNavigate();
  const [signA, setSignA] = useState('');
  const [signB, setSignB] = useState('');

  const handleCheck = () => {
    if (signA && signB) navigate(`/compatibilite/${signA}/${signB}`);
  };

  return (
    <>
      <SEOMeta
        title="Compatibilité Astrologique – Affinités entre Signes"
        description="Découvrez la compatibilité astrologique entre tous les signes du zodiaque. Amour, amitié et travail."
        canonical="/compatibilite"
      />
      <section className="relative py-20 px-4 bg-stars overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-gradient opacity-95" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-gold-400 font-display text-sm uppercase tracking-widest mb-3">Affinités astrales</p>
          <div className="text-6xl mb-4 animate-float">💫</div>
          <h1 className="section-title mb-4">Compatibilité Astrologique</h1>
          <p className="section-subtitle mb-10">Choisissez deux signes pour découvrir leurs affinités en amour, amitié et travail.</p>

          <div className="glass-card p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {[
                { id: 'sign-a', label: 'Premier signe', value: signA, onChange: setSignA },
                { id: 'sign-b', label: 'Second signe', value: signB, onChange: setSignB },
              ].map(({ id, label, value, onChange }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm font-medium text-stardust-300 mb-2">{label}</label>
                  <select
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-cosmic-800 border border-white/10 text-stardust-100 focus:outline-none focus:border-gold-500/60 transition-all"
                  >
                    <option value="">Choisir un signe</option>
                    {SIGNS.map(s => (
                      <option key={s.slug} value={s.slug}>{s.emoji} {s.name}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <button
              id="compatibility-check-btn"
              onClick={handleCheck}
              disabled={!signA || !signB}
              className="btn-gold w-full py-3 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Vérifier la compatibilité ✨
            </button>

            <p className="text-stardust-500 text-xs mt-4">
              Base de données des compatibilités disponible en Phase 2.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
