import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * CTASection – reusable call-to-action block
 */
export default function CTASection({
  title = 'Découvrez votre destinée',
  subtitle = 'Inscrivez-vous gratuitement pour accéder à votre thème natal personnalisé et des horoscopes exclusifs.',
  primaryLabel = 'Commencer gratuitement',
  primaryTo = '/inscription',
  secondaryLabel = 'En savoir plus',
  secondaryTo = '/signes-du-zodiaque',
}) {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-celestial-gradient opacity-5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-celestial-600/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Decorative stars */}
        <div className="flex justify-center gap-2 mb-6 text-gold-400/60">
          {['✦', '✧', '✦', '✧', '✦'].map((s, i) => (
            <span key={i} className="text-sm animate-twinkle" style={{ animationDelay: `${i * 0.4}s` }}>
              {s}
            </span>
          ))}
        </div>

        <h2 className="section-title mb-4">{title}</h2>
        <p className="section-subtitle mb-10">{subtitle}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={primaryTo} className="btn-gold text-base px-8 py-4 w-full sm:w-auto">
            {primaryLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to={secondaryTo} className="btn-outline text-base px-8 py-4 w-full sm:w-auto">
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
