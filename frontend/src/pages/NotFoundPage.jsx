import { Link } from 'react-router-dom';
import SEOMeta from '@/components/seo/SEOMeta';

export default function NotFoundPage() {
  return (
    <>
      <SEOMeta title="Page introuvable (404)" noIndex />
      <div className="min-h-screen flex items-center justify-center px-4 bg-stars">
        <div className="absolute inset-0 bg-cosmic-gradient" />
        <div className="relative z-10 text-center max-w-lg">
          <div className="text-8xl mb-6 animate-float">🌌</div>
          <h1 className="font-display text-6xl font-bold gold-text mb-4">404</h1>
          <h2 className="font-display text-2xl text-stardust-100 mb-4">Page introuvable</h2>
          <p className="text-stardust-400 mb-8">
            Les étoiles ont cherché, mais cette page n'existe pas dans notre cosmos.
          </p>
          <Link to="/" className="btn-gold inline-flex">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </>
  );
}
