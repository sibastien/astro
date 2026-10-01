import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Star, ArrowRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import SEOMeta from '@/components/seo/SEOMeta';
import { useAuth } from '@/context/AuthContext';

const PERKS = [
  'Horoscope personnalisé quotidien',
  'Thème natal complet (Phase 3)',
  'Compatibilité détaillée',
  'Notifications lunaires',
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 8) {
      toast.error('Le mot de passe doit comporter au moins 8 caractères.');
      return;
    }
    setLoading(true);
    try {
      await register(form);
      toast.success('Compte créé avec succès ! Bienvenue ✨');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de l\'inscription.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOMeta title="Inscription" description="Créez votre compte AstroFrance gratuitement." canonical="/inscription" noIndex />

      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-stars">
        <div className="absolute inset-0 bg-cosmic-gradient" />

        <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-8">
          {/* Left: Perks */}
          <div className="hidden md:flex flex-col justify-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-8">
              <Star className="w-8 h-8 text-gold-400" fill="currentColor" />
              <span className="font-display text-2xl font-bold gold-text">AstroFrance</span>
            </Link>
            <h1 className="font-display text-4xl font-bold text-stardust-100 mb-4 leading-tight">
              Commencez votre voyage astral
            </h1>
            <p className="text-stardust-400 mb-8 leading-relaxed">
              Rejoignez des milliers d'utilisateurs qui explorent les mystères du cosmos avec AstroFrance.
            </p>
            <ul className="space-y-3">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-stardust-300">
                  <span className="w-5 h-5 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-gold-400" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Form */}
          <div>
            <div className="text-center mb-6 md:hidden">
              <Link to="/" className="inline-flex items-center gap-2 mb-4">
                <Star className="w-8 h-8 text-gold-400" fill="currentColor" />
                <span className="font-display text-2xl font-bold gold-text">AstroFrance</span>
              </Link>
              <h1 className="font-display text-3xl font-bold text-stardust-100">Inscription</h1>
            </div>

            <div className="glass-card p-8">
              <h2 className="font-display text-2xl font-semibold text-stardust-100 mb-6 hidden md:block">Créer un compte</h2>
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-stardust-300 mb-2">Prénom</label>
                    <input id="firstName" name="firstName" type="text" autoComplete="given-name"
                      value={form.firstName} onChange={handleChange} placeholder="Prénom"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-stardust-100 placeholder-stardust-600 focus:outline-none focus:border-gold-500/60 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-stardust-300 mb-2">Nom</label>
                    <input id="lastName" name="lastName" type="text" autoComplete="family-name"
                      value={form.lastName} onChange={handleChange} placeholder="Nom"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-stardust-100 placeholder-stardust-600 focus:outline-none focus:border-gold-500/60 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reg-email" className="block text-sm font-medium text-stardust-300 mb-2">Email</label>
                  <input id="reg-email" name="email" type="email" autoComplete="email" required
                    value={form.email} onChange={handleChange} placeholder="votre@email.fr"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-stardust-100 placeholder-stardust-600 focus:outline-none focus:border-gold-500/60 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="reg-password" className="block text-sm font-medium text-stardust-300 mb-2">Mot de passe</label>
                  <div className="relative">
                    <input id="reg-password" name="password" type={showPwd ? 'text' : 'password'} autoComplete="new-password" required
                      value={form.password} onChange={handleChange} placeholder="8 caractères minimum"
                      className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-stardust-100 placeholder-stardust-600 focus:outline-none focus:border-gold-500/60 transition-all"
                    />
                    <button type="button" onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stardust-500 hover:text-gold-400 transition-colors"
                      aria-label={showPwd ? 'Masquer' : 'Afficher'}>
                      {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {form.password && (
                    <div className="mt-2 flex gap-1">
                      {[1,2,3,4].map((n) => (
                        <div key={n} className={`h-1 flex-1 rounded-full transition-all ${
                          form.password.length >= n * 2 ? 'bg-gold-400' : 'bg-white/10'
                        }`} />
                      ))}
                    </div>
                  )}
                </div>

                <button id="register-submit-btn" type="submit" disabled={loading}
                  className="btn-gold w-full py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed mt-2">
                  {loading ? 'Création du compte...' : 'Créer mon compte gratuitement'}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-stardust-400">
                Déjà un compte ?{' '}
                <Link to="/connexion" className="text-gold-400 hover:text-gold-300 transition-colors font-medium">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
