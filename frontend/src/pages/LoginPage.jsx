import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Star, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import SEOMeta from '@/components/seo/SEOMeta';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form);
      toast.success('Bienvenue ! ✨');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Email ou mot de passe incorrect.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOMeta title="Connexion" description="Connectez-vous à votre compte AstroFrance." canonical="/connexion" noIndex />

      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-stars">
        <div className="absolute inset-0 bg-cosmic-gradient" />

        <div className="relative z-10 w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <Star className="w-8 h-8 text-gold-400" fill="currentColor" />
              <span className="font-display text-2xl font-bold gold-text">AstroFrance</span>
            </Link>
            <h1 className="font-display text-3xl font-bold text-stardust-100 mb-2">Connexion</h1>
            <p className="text-stardust-400">Accédez à votre espace astrologique</p>
          </div>

          {/* Form Card */}
          <div className="glass-card p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stardust-300 mb-2">
                  Adresse email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="votre@email.fr"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-stardust-100 placeholder-stardust-600 focus:outline-none focus:border-gold-500/60 focus:bg-white/8 transition-all duration-200"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-stardust-300 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPwd ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-stardust-100 placeholder-stardust-600 focus:outline-none focus:border-gold-500/60 focus:bg-white/8 transition-all duration-200 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stardust-500 hover:text-gold-400 transition-colors"
                    aria-label={showPwd ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                id="login-submit-btn"
                type="submit"
                disabled={loading}
                className="btn-gold w-full py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-stardust-400">
              Pas encore de compte ?{' '}
              <Link to="/inscription" className="text-gold-400 hover:text-gold-300 transition-colors font-medium">
                S'inscrire gratuitement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
