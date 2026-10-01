import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Star, Moon, Sun } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Horoscope', to: '/horoscope' },
  { label: 'Signes', to: '/signes-du-zodiaque' },
  { label: 'Tarot', to: '/tarot' },
  { label: 'Lune', to: '/lune' },
  { label: 'Compatibilité', to: '/compatibilite' },
  { label: 'Articles', to: '/articles' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cosmic-950/95 backdrop-blur-md shadow-cosmic border-b border-gold-500/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="AstroFrance - Accueil">
            <div className="relative w-8 h-8">
              <Star className="w-8 h-8 text-gold-400 group-hover:animate-glow-pulse transition-all" fill="currentColor" />
              <div className="absolute inset-0 text-gold-400 opacity-30 scale-125 blur-sm">
                <Star className="w-8 h-8" fill="currentColor" />
              </div>
            </div>
            <span className="font-display text-xl font-bold gold-text tracking-wider">
              AstroFrance
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-gold-400 bg-gold-500/10'
                      : 'text-stardust-300 hover:text-gold-300 hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/connexion" className="btn-outline text-sm px-4 py-2">
              Connexion
            </Link>
            <Link to="/inscription" className="btn-gold text-sm px-4 py-2">
              S'inscrire
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-btn"
            className="md:hidden p-2 rounded-lg text-stardust-300 hover:text-gold-400 hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-1 border-t border-white/5">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'text-gold-400 bg-gold-500/10'
                      : 'text-stardust-300 hover:text-gold-300 hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-4 flex flex-col gap-2 px-1">
              <Link to="/connexion" className="btn-outline text-center w-full">Connexion</Link>
              <Link to="/inscription" className="btn-gold text-center w-full">S'inscrire</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
