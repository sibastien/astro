import SEOMeta from '@/components/seo/SEOMeta';
import CTASection from '@/components/ui/CTASection';

export default function TarotPage() {
  return (
    <>
      <SEOMeta
        title="Tarot en Ligne – Tirage du Jour"
        description="Consultez votre tirage de tarot quotidien et découvrez les messages des arcanes pour vous guider."
        canonical="/tarot"
      />
      <section className="relative min-h-[60vh] flex items-center justify-center px-4 bg-stars overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-gradient opacity-95" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-celestial-600/10 blur-3xl" />
        <div className="relative z-10 text-center max-w-2xl">
          <p className="text-gold-400 font-display text-sm uppercase tracking-widest mb-4">Bientôt disponible</p>
          <div className="text-7xl mb-6 animate-float">🃏</div>
          <h1 className="section-title mb-4">Tarot Astrologique</h1>
          <p className="section-subtitle">Tirage des arcanes, carte du jour et interprétations approfondies. Disponible en Phase 2.</p>
        </div>
      </section>
      <CTASection title="Soyez notifié du lancement" subtitle="Inscrivez-vous pour recevoir une alerte dès que le tarot sera disponible." primaryLabel="M'inscrire" />
    </>
  );
}
