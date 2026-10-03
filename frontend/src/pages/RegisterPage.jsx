import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Orbit, ArrowRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import SEOMeta from '@/components/seo/SEOMeta';
import { useAuth } from '@/context/AuthContext';

const PERKS = [
  'Real-time transit intelligence stream',
  '360° Swiss Ephemeris Natal Chart',
  'Interpersonal synergy & resonance matrix',
  'Encrypted, private personal profile',
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
      toast.error('Password must contain at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      await register(form);
      toast.success('Profile created successfully.');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error creating account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOMeta title="Inscription — ASTRA" description="Create your ASTRA account." canonical="/inscription" noIndex />

      <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-cosmic-ambient relative">
        <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-10 items-center">
          
          {/* Left Column */}
          <div className="hidden md:block space-y-6">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-accent-400">
                <Orbit className="w-4 h-4 stroke-[1.75]" />
              </div>
              <span className="editorial-title text-xl font-bold text-white">ASTRA</span>
            </Link>

            <h1 className="editorial-title text-3xl sm:text-4xl font-bold text-white leading-tight">
              Calibrate your celestial trajectory.
            </h1>
            <p className="editorial-sub text-slate-400 text-sm leading-relaxed">
              Synthesize planetary ephemeris data with actionable personal insight. Fast, credible, and private.
            </p>

            <ul className="space-y-3 pt-2">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-xs font-mono text-slate-300">
                  <span className="w-4 h-4 rounded-full bg-accent-500/20 border border-accent-500/40 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-accent-300" />
                  </span>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Form */}
          <div className="glass-surface p-8 card-premium border border-white/[0.08]">
            <h2 className="editorial-title text-2xl font-bold text-white mb-2">Create Profile</h2>
            <p className="text-xs font-mono text-slate-400 mb-6">Initialize your personal intelligence account</p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-mono text-slate-300 uppercase mb-1">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-white text-sm focus:border-accent-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-mono text-slate-300 uppercase mb-1">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-white text-sm focus:border-accent-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono text-slate-300 uppercase mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-white text-sm focus:border-accent-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-mono text-slate-300 uppercase mb-1">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPwd ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.1] text-white text-sm focus:border-accent-500 focus:outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>{loading ? 'Creating...' : 'Initialize Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-white/[0.06] text-center text-xs font-mono text-slate-400">
              Already have an account?{' '}
              <Link to="/connexion" className="text-accent-400 hover:text-accent-300 font-semibold ml-1">
                Sign in
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
