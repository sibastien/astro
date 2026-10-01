import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Star, Moon, Sparkles, BookOpen } from 'lucide-react';
import SEOMeta from '@/components/seo/SEOMeta';
import ZodiacCard from '@/components/ui/ZodiacCard';
import CTASection from '@/components/ui/CTASection';
import api from '@/lib/api';

// Static sign data for hero (used as fallback if API is loading)
const SIGNS_STATIC = [
  { slug: 'belier', name: 'Bélier', emoji: '🐏', symbol: '♈', element: 'Feu', modality: 'Cardinal', rulingPlanet: 'Mars', color: '#E25822', shortDesc: 'Courageux et pionnier', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { slug: 'taureau', name: 'Taureau', emoji: '🐂', symbol: '♉', element: 'Terre', modality: 'Fixe', rulingPlanet: 'Vénus', color: '#6B8E23', shortDesc: 'Patient et sensuel', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { slug: 'gemeaux', name: 'Gémeaux', emoji: '👯', symbol: '♊', element: 'Air', modality: 'Mutable', rulingPlanet: 'Mercure', color: '#FFD700', shortDesc: 'Curieux et adaptable', startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
  { slug: 'cancer', name: 'Cancer', emoji: '🦀', symbol: '♋', element: 'Eau', modality: 'Cardinal', rulingPlanet: 'Lune', color: '#C0C0C0', shortDesc: 'Intuitif et protecteur', startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
];

const FEATURES = [
  { icon: Star, title: 'Horoscope du Jour', desc: 'Consultez votre horoscope quotidien pour les 12 signes avec des prévisions détaillées.', to: '/horoscope', color: 'text-gold-400' },
  { icon: Moon, title: 'Phases de Lune', desc: 'Suivez le cycle lunaire et découvrez comment la Lune influence votre énergie.', to: '/lune', color: 'text-celestial-400' },
  { icon: Sparkles, title: 'Compatibilité', desc: 'Explorez vos affinités astrales avec tous les signes du zodiaque.', to: '/compatibilite', color: 'text-blue-400' },
  { icon: BookOpen, title: 'Articles & Guide', desc: 'Approfondissez vos connaissances en astrologie avec nos articles experts.', to: '/articles', color: 'text-green-400' },
];

export default function HomePage() {
  const { data: signsData } = useQuery({
    queryKey: ['zodiac-signs'],
    queryFn: () => api.get('/zodiac').then(r => r.data.data.signs),
  });
  const signs = signsData || SIGNS_STATIC;

  return (
    <>
      <SEOMeta
        title="AstroFrance – Horoscope, Astrologie & Signes du Zodiaque"
        description="Découvrez votre horoscope du jour, votre thème natal et vos compatibilités astrales. La référence française de l'astrologie."
        canonical="/"
      />

      {/* ── HERO ──────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-stars">
        {/* Layered background */}
        <div className="absolute inset-0 bg-cosmic-gradient" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-celestial-600/8 blur-3xl animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gold-500/6 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-sm font-medium mb-8 animate-fade-in-up">
            <span className="animate-twinkle">✦</span>
            Votre guide astrologique en français
            <span className="animate-twinkle" style={{ animationDelay: '1s' }}>✦</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="gold-text">Les étoiles</span>
            <br />
            <span className="text-stardust-100">vous guident</span>
          </h1>

          <p className="text-stardust-300 font-serif text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Horoscopes, thèmes natals, tarot, lune et compatibilité — explorez l'univers de l'astrologie française.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/horoscope" className="btn-gold text-base px-8 py-4">
              Mon horoscope du jour
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/signes-du-zodiaque" className="btn-outline text-base px-8 py-4">
              Les 12 signes
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stardust-500 text-xs animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <span>Découvrir</span>
            <div className="w-px h-8 bg-gradient-to-b from-stardust-500 to-transparent animate-float" />
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-gold-400 font-display text-sm uppercase tracking-widest mb-3">Nos Services</p>
            <h2 className="section-title mb-4">Tout l'univers astral</h2>
            <p className="section-subtitle">Une plateforme complète pour explorer votre carte du ciel et comprendre les influences planétaires.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, to, color }) => (
              <Link key={to} to={to} className="glass-card-hover group p-6 flex flex-col gap-4 text-center">
                <div className={`mx-auto w-12 h-12 rounded-full bg-white/5 flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-stardust-100 group-hover:text-gold-300 transition-colors">{title}</h3>
                <p className="text-stardust-400 text-sm leading-relaxed">{desc}</p>
                <span className={`text-xs font-medium ${color} flex items-center justify-center gap-1 mt-auto`}>
                  Explorer <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ZODIAC PREVIEW ────────────────────────────── */}
      <section className="py-20 px-4 bg-cosmic-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gold-400 font-display text-sm uppercase tracking-widest mb-3">Signes du zodiaque</p>
            <h2 className="section-title mb-4">Quel est votre signe ?</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
            {signs.slice(0, 4).map((sign) => (
              <ZodiacCard key={sign.slug} sign={sign} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/signes-du-zodiaque" className="btn-outline inline-flex items-center gap-2">
              Voir les 12 signes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <CTASection />
    </>
  );
}
