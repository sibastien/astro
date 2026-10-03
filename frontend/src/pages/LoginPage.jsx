import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Orbit, ArrowRight } from 'lucide-react';
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
      toast.success('Connected successfully.');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOMeta title="Connexion — ASTRA" description="Sign in to your ASTRA personal account." canonical="/connexion" noIndex />

      <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-cosmic-ambient relative">
        <div className="relative z-10 w-full max-w-md">
          
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-accent-400">
                <Orbit className="w-4 h-4 stroke-[1.75]" />
              </div>
              <span className="editorial-title text-xl font-bold text-white">ASTRA</span>
            </Link>
            <h1 className="editorial-title text-2xl font-bold text-white mb-1">Account Access</h1>
            <p className="text-xs font-mono text-slate-400">Authenticate your astrological profile session</p>
          </div>

          {/* Form Card */}
          <div className="glass-surface p-8 card-premium border border-white/[0.08]">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              
              <div>
                <label htmlFor="email" className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/[0.1] text-slate-100 placeholder-slate-600 focus:outline-none focus:border-accent-500 text-sm transition-all"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                  Password
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
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/[0.1] text-slate-100 placeholder-slate-600 focus:outline-none focus:border-accent-500 text-sm transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="login-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>

            <div className="mt-6 pt-6 border-t border-white/[0.06] text-center text-xs font-mono text-slate-400">
              New to ASTRA?{' '}
              <Link to="/inscription" className="text-accent-400 hover:text-accent-300 font-semibold ml-1">
                Create profile
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
