import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import SEOMeta from '@/components/seo/SEOMeta';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import AdminBlogManager from '@/components/admin/AdminBlogManager';
import {
  ShieldCheck,
  Users,
  Sparkles,
  BookOpen,
  Compass,
  RotateCw,
  Search,
  ExternalLink,
  Lock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  FileText,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [activeAdminTab, setActiveAdminTab] = useState('blog'); // 'blog' | 'engines' | 'users'
  const [searchUser, setSearchUser] = useState('');
  const [page, setPage] = useState(1);

  // 1. Fetch Admin Stats
  const { data: statsData, isLoading: isStatsLoading, refetch: refetchStats } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      const res = await api.get('/admin/stats');
      return res.data?.data;
    },
    enabled: isAuthenticated && user?.role === 'ADMIN',
  });

  // 2. Fetch Users
  const { data: usersData, isLoading: isUsersLoading, refetch: refetchUsers } = useQuery({
    queryKey: ['admin', 'users', page, searchUser],
    queryFn: async () => {
      const res = await api.get(`/admin/users?page=${page}&limit=10&search=${encodeURIComponent(searchUser)}`);
      return res.data?.data;
    },
    enabled: isAuthenticated && user?.role === 'ADMIN',
  });

  // 3. Mutation: Sync Horoscopes
  const syncHoroscopesMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post('/admin/sync-horoscopes');
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Horoscopes du jour générés avec succès !');
      refetchStats();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Erreur lors de la génération des horoscopes.');
    },
  });

  // 4. Mutation: Seed Tarot
  const seedTarotMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post('/admin/seed-tarot');
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Cartes de Tarot synchronisées !');
      refetchStats();
    },
    onError: (err) => {
      toast.error('Erreur lors de la synchronisation du Tarot.');
    },
  });

  // 5. Mutation: Change User Role
  const changeRoleMutation = useMutation({
    mutationFn: async ({ userId, newRole }) => {
      const res = await api.patch(`/admin/users/${userId}/role`, { role: newRole });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Rôle mis à jour avec succès !');
      queryClient.invalidateQueries(['admin', 'users']);
      refetchStats();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Impossible de modifier le rôle.');
    },
  });

  // Access Control Guard
  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-cosmic-ambient py-24 px-4 flex items-center justify-center">
        <div className="max-w-md w-full glass-surface border border-white/[0.08] p-8 rounded-2xl text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-2 editorial-title">
              Accès Administrateur Restreint
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ce panneau de contrôle est strictement réservé aux comptes avec le rôle <strong className="text-amber-300">ADMIN</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] text-left text-xs font-mono space-y-2">
            <span className="text-slate-400 block font-semibold">Comment activer votre compte Admin :</span>
            <code className="text-accent-300 block bg-black/60 p-2 rounded text-[11px] overflow-x-auto">
              node scripts/makeAdmin.js {user?.email || 'votre-email@domaine.com'}
            </code>
            <span className="text-[10px] text-slate-500 block">
              Exécutez cette commande dans le dossier backend de votre serveur ou terminal local.
            </span>
          </div>

          <div className="flex gap-3 justify-center">
            <Link to="/" className="btn-secondary text-xs px-4 py-2">
              Retour à l'accueil
            </Link>
            {!isAuthenticated && (
              <Link to="/connexion" className="btn-primary text-xs px-4 py-2">
                Se connecter
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  const stats = statsData?.stats;

  return (
    <>
      <SEOMeta
        title="Console Administrateur — ASTRA"
        description="Tableau de bord de gestion backend ASTRA."
        canonical="/admin"
      />

      <div className="min-h-screen bg-cosmic-ambient py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Top Bar Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white editorial-title">
                    Console d'Administration
                  </h1>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-mono uppercase tracking-wider font-semibold">
                    Admin Root
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Connecté en tant que {user?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => { refetchStats(); refetchUsers(); }}
                className="btn-secondary text-xs px-3.5 py-2 flex items-center gap-2"
                title="Actualiser les données"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Rafraîchir</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Metric 1: Users */}
            <div className="glass-surface p-5 rounded-2xl border border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Utilisateurs Inscrits
                </span>
                <span className="text-2xl font-bold text-white font-mono">
                  {isStatsLoading ? '...' : stats?.users ?? 0}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent-300">
                <Users className="w-5 h-5" />
              </div>
            </div>

            {/* Metric 2: Today's Horoscopes */}
            <div className="glass-surface p-5 rounded-2xl border border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Horoscopes du Jour
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white font-mono">
                    {isStatsLoading ? '...' : stats?.todayHoroscopes ?? 0}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">/ 48</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-amber-300">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            {/* Metric 3: Tarot Cards */}
            <div className="glass-surface p-5 rounded-2xl border border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Cartes de Tarot
                </span>
                <span className="text-2xl font-bold text-white font-mono">
                  {isStatsLoading ? '...' : stats?.tarotCards ?? 0}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-cyan-300">
                <Compass className="w-5 h-5" />
              </div>
            </div>

            {/* Metric 4: Articles */}
            <div className="glass-surface p-5 rounded-2xl border border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Articles Publiés
                </span>
                <span className="text-2xl font-bold text-white font-mono">
                  {isStatsLoading ? '...' : stats?.articles ?? 0}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-emerald-300">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>

          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex items-center gap-2 border-b border-white/[0.08] pb-1 overflow-x-auto">
            <button
              onClick={() => setActiveAdminTab('blog')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${
                activeAdminTab === 'blog'
                  ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40 font-bold shadow-sm'
                  : 'text-stardust-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <FileText className="w-4 h-4 text-gold-400" />
              <span>Blog & Articles (WordPress)</span>
              <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-gold-500/20 text-gold-300">
                {stats?.articles ?? 0}
              </span>
            </button>

            <button
              onClick={() => setActiveAdminTab('engines')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${
                activeAdminTab === 'engines'
                  ? 'bg-accent-500/20 text-accent-300 border border-accent-500/40 font-bold shadow-sm'
                  : 'text-stardust-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-accent-400" />
              <span>Moteurs & Sync</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('users')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${
                activeAdminTab === 'users'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold shadow-sm'
                  : 'text-stardust-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Users className="w-4 h-4 text-blue-400" />
              <span>Utilisateurs</span>
              <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-300">
                {stats?.users ?? 0}
              </span>
            </button>
          </div>

          {/* TAB 1: Blog & Articles Manager */}
          {activeAdminTab === 'blog' && (
            <div className="glass-surface p-6 rounded-2xl border border-white/[0.08]">
              <AdminBlogManager />
            </div>
          )}

          {/* TAB 2: Quick Engine Actions (Horoscope Generation & Tarot Sync) */}
          {activeAdminTab === 'engines' && (
            <div className="glass-surface p-6 rounded-2xl border border-white/[0.08] space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-400" />
                Moteurs Automatiques & Synchronisation
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Action 1: Sync Horoscopes */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Générateur d'Horoscopes</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Génère instantanément les 48 transits du jour (12 signes × 4 catégories) en français.
                    </p>
                  </div>
                  <button
                    onClick={() => syncHoroscopesMutation.mutate()}
                    disabled={syncHoroscopesMutation.isPending}
                    className="btn-primary text-xs py-2 px-3 flex items-center justify-center gap-2 uppercase tracking-wider font-mono"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${syncHoroscopesMutation.isPending ? 'animate-spin' : ''}`} />
                    <span>{syncHoroscopesMutation.isPending ? 'Génération en cours...' : 'Générer Horoscopes Aujourd\'hui'}</span>
                  </button>
                </div>

                {/* Action 2: Seed Tarot */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Base de Données Tarot</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Synchronise et injecte les 22 Arcanes Majeurs avec illustrations et interprétations.
                    </p>
                  </div>
                  <button
                    onClick={() => seedTarotMutation.mutate()}
                    disabled={seedTarotMutation.isPending}
                    className="btn-secondary text-xs py-2 px-3 flex items-center justify-center gap-2 uppercase tracking-wider font-mono"
                  >
                    <Compass className={`w-3.5 h-3.5 ${seedTarotMutation.isPending ? 'animate-spin' : ''}`} />
                    <span>{seedTarotMutation.isPending ? 'Synchronisation...' : 'Synchroniser Tarot'}</span>
                  </button>
                </div>

                {/* Action 3: Prisma Studio info */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Prisma Studio GUI</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Ouvrez le visualiseur direct PostgreSQL en exécutant dans le terminal :
                    </p>
                    <code className="text-accent-300 block bg-black/60 p-1.5 rounded text-[11px] font-mono mt-1">
                      npm run db:studio
                    </code>
                  </div>
                  <a
                    href="http://localhost:5555"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 justify-end"
                  >
                    <span>Ouvrir localhost:5555</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: User Management Section */}
          {activeAdminTab === 'users' && (
            <div className="glass-surface p-6 rounded-2xl border border-white/[0.08] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-base font-bold text-white editorial-title">
                  Gestion des Utilisateurs & Permissions
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Promouvoir les utilisateurs en ADMIN ou EDITOR
                </p>
              </div>

              {/* Search user */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filtrer par email ou nom..."
                  value={searchUser}
                  onChange={(e) => { setSearchUser(e.target.value); setPage(1); }}
                  className="w-full pl-9 pr-3.5 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-accent-400/50"
                />
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/[0.06] text-slate-500 font-mono uppercase tracking-wider text-[10px]">
                    <th className="pb-3 font-semibold">Utilisateur</th>
                    <th className="pb-3 font-semibold">Nom</th>
                    <th className="pb-3 font-semibold">Rôle Actuel</th>
                    <th className="pb-3 font-semibold">Date d'inscription</th>
                    <th className="pb-3 font-semibold text-right">Modifier Rôle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {isUsersLoading ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400 font-mono">
                        Chargement des utilisateurs...
                      </td>
                    </tr>
                  ) : usersData?.users?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500 font-mono">
                        Aucun utilisateur trouvé.
                      </td>
                    </tr>
                  ) : (
                    usersData?.users?.map((u) => (
                      <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 font-medium text-white font-mono">
                          {u.email}
                        </td>
                        <td className="py-3 text-slate-300">
                          {u.firstName || u.lastName ? `${u.firstName || ''} ${u.lastName || ''}` : '—'}
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold border ${
                            u.role === 'ADMIN'
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                              : u.role === 'EDITOR'
                              ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                              : 'bg-white/[0.04] border-white/[0.08] text-slate-400'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 text-slate-400 font-mono text-[11px]">
                          {new Date(u.createdAt).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="py-3 text-right">
                          <select
                            value={u.role}
                            onChange={(e) => changeRoleMutation.mutate({ userId: u.id, newRole: e.target.value })}
                            disabled={changeRoleMutation.isPending}
                            className="bg-black/60 border border-white/[0.12] rounded-lg text-xs text-slate-200 px-2.5 py-1 font-mono focus:outline-none focus:border-accent-400 cursor-pointer"
                          >
                            <option value="USER">USER</option>
                            <option value="EDITOR">EDITOR</option>
                            <option value="ADMIN">ADMIN</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {usersData?.pagination && usersData.pagination.totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-xs font-mono text-slate-400">
                <span>Page {usersData.pagination.page} sur {usersData.pagination.totalPages}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-3 py-1 rounded bg-white/[0.04] border border-white/[0.08] disabled:opacity-30"
                  >
                    Précédent
                  </button>
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={page >= usersData.pagination.totalPages}
                    className="px-3 py-1 rounded bg-white/[0.04] border border-white/[0.08] disabled:opacity-30"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  </>
);
}
