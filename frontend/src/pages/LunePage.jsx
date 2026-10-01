import SEOMeta from '@/components/seo/SEOMeta';
import CTASection from '@/components/ui/CTASection';

const PHASES = [
  { icon: '🌑', name: 'Nouvelle Lune', desc: 'Intentions, nouveaux départs, semences.' },
  { icon: '🌒', name: 'Premier Quartier', desc: 'Action, décisions, dépassement des obstacles.' },
  { icon: '🌕', name: 'Pleine Lune', desc: 'Accomplissement, révélations, lâcher-prise.' },
  { icon: '🌘', name: 'Dernier Quartier', desc: 'Bilan, purification, préparation.' },
];

export default function LunePage() {
  return (
    <>
      <SEOMeta
        title="Calendrier Lunaire – Phases de la Lune"
        description="Suivez les phases de la lune et découvrez leur influence sur votre énergie, vos émotions et votre vie quotidienne."
        canonical="/lune"
      />
      <section className="relative py-20 px-4 text-center bg-stars overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-gradient opacity-95" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-7xl mb-6 animate-float">🌕</div>
          <h1 className="section-title mb-4">Phases de la Lune</h1>
          <p className="section-subtitle">Calendrier lunaire complet, rituels et guidance émotionnelle. Disponible en Phase 2.</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PHASES.map(({ icon, name, desc }) => (
            <div key={name} className="glass-card p-6 flex gap-4">
              <span className="text-4xl flex-shrink-0">{icon}</span>
              <div>
                <h3 className="font-display text-lg font-semibold text-stardust-100 mb-1">{name}</h3>
                <p className="text-stardust-400 text-sm">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CTASection title="Suivez les étoiles" subtitle="Créez un compte pour recevoir des alertes lunaires personnalisées." primaryLabel="Commencer gratuitement" />
    </>
  );
}
