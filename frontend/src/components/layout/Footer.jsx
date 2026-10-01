import { Link } from 'react-router-dom';
import { Star, Mail, Send, MessageCircle } from 'lucide-react';

const ZODIAC_SIGNS = [
  { name: 'Bélier', slug: 'belier' },
  { name: 'Taureau', slug: 'taureau' },
  { name: 'Gémeaux', slug: 'gemeaux' },
  { name: 'Cancer', slug: 'cancer' },
  { name: 'Lion', slug: 'lion' },
  { name: 'Vierge', slug: 'vierge' },
  { name: 'Balance', slug: 'balance' },
  { name: 'Scorpion', slug: 'scorpion' },
  { name: 'Sagittaire', slug: 'sagittaire' },
  { name: 'Capricorne', slug: 'capricorne' },
  { name: 'Verseau', slug: 'verseau' },
  { name: 'Poissons', slug: 'poissons' },
];

const QUICK_LINKS = [
  { label: 'Horoscope du jour', to: '/horoscope' },
  { label: 'Signes du zodiaque', to: '/signes-du-zodiaque' },
  { label: 'Tarot', to: '/tarot' },
  { label: 'Lune & Phases', to: '/lune' },
  { label: 'Compatibilité', to: '/compatibilite' },
  { label: 'Articles', to: '/articles' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-cosmic-950/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <Star className="w-7 h-7 text-gold-400" fill="currentColor" />
              <span className="font-display text-xl font-bold gold-text">AstroFrance</span>
            </Link>
            <p className="text-stardust-400 text-sm leading-relaxed mb-5">
              Votre guide astrologique de référence. Horoscopes, thèmes natals, tarot et compatibilité — tout pour explorer les étoiles.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Twitter, href: '#', label: 'Twitter' },
                { Icon: Mail, href: '#', label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-stardust-400 hover:text-gold-400 hover:border-gold-500/40 hover:bg-gold-500/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-sm font-semibold text-stardust-100 uppercase tracking-widest mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-stardust-400 hover:text-gold-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zodiac Signs */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold text-stardust-100 uppercase tracking-widest mb-4">
              Signes du zodiaque
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
              {ZODIAC_SIGNS.map((sign) => (
                <li key={sign.slug}>
                  <Link
                    to={`/horoscope/${sign.slug}`}
                    className="text-stardust-400 hover:text-gold-400 text-sm transition-colors duration-200"
                  >
                    {sign.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-stardust-500 text-xs">
          <p>© {new Date().getFullYear()} AstroFrance. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <Link to="/confidentialite" className="hover:text-stardust-300 transition-colors">Confidentialité</Link>
            <Link to="/mentions-legales" className="hover:text-stardust-300 transition-colors">Mentions légales</Link>
            <Link to="/contact" className="hover:text-stardust-300 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
