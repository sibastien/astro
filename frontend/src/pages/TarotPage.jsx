import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SEOMeta from '@/components/seo/SEOMeta';
import api from '@/lib/api';
import { 
  Sparkles, 
  RotateCw, 
  Eye, 
  BookOpen, 
  Compass, 
  Layers, 
  ShieldCheck,
  ChevronRight,
  Flame,
  Droplets,
  Wind,
  Mountain
} from 'lucide-react';

const SPREAD_MODES = [
  { id: 'single', label: 'Tirage du Jour (1 Carte)', count: 1, desc: 'Conseil & vibration du moment' },
  { id: 'triple', label: 'Tirage Temporel (3 Cartes)', count: 3, desc: 'Passé, Présent, Futur' },
  { id: 'deck', label: 'Encyclopédie du Tarot', count: 0, desc: 'Explorer les 22 Arcanes Majeurs' },
];

export default function TarotPage() {
  const [activeMode, setActiveMode] = useState('single');
  const [drawnCards, setDrawnCards] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedDeckCard, setSelectedDeckCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all cards for the encyclopedia
  const { data: allCards = [] } = useQuery({
    queryKey: ['tarot', 'all'],
    queryFn: async () => {
      const res = await api.get('/tarot');
      return res.data?.data?.cards || [];
    },
    staleTime: 60 * 60 * 1000,
  });

  // Handle draw
  const handleDraw = async (count = 1) => {
    setIsDrawing(true);
    setFlippedCards({});
    try {
      const res = await api.get(`/tarot/draw/daily?count=${count}`);
      const cards = res.data?.data?.cards || [];
      setDrawnCards(cards);
      
      // Auto flip with staggered timing
      cards.forEach((_, idx) => {
        setTimeout(() => {
          setFlippedCards(prev => ({ ...prev, [idx]: true }));
        }, (idx + 1) * 450);
      });
    } catch (err) {
      console.error('Error drawing tarot cards', err);
    } finally {
      setIsDrawing(false);
    }
  };

  const filteredCards = allCards.filter(c => 
    c.nameFr?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.nameEn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.keywords?.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getElementIcon = (elem) => {
    switch (elem?.toLowerCase()) {
      case 'feu': return <Flame className="w-3.5 h-3.5 text-amber-400" />;
      case 'eau': return <Droplets className="w-3.5 h-3.5 text-blue-400" />;
      case 'air': return <Wind className="w-3.5 h-3.5 text-cyan-300" />;
      case 'terre': return <Mountain className="w-3.5 h-3.5 text-emerald-400" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-accent-300" />;
    }
  };

  return (
    <>
      <SEOMeta
        title="Tarot Divinatoire & Herméneutique — ASTRA"
        description="Tirage interactif de Tarot en ligne. Découvrez votre carte du jour, le tirage 3 cartes Passé Présent Futur et l'encyclopédie des 22 Arcanes Majeurs."
        canonical="/tarot"
      />

      <div className="min-h-screen bg-cosmic-ambient py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-300 text-xs font-mono uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Oracle Archétypal & Herméneutique</span>
            </div>
            <h1 className="editorial-title text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Tarot de Marseille & Rider-Waite
            </h1>
            <p className="editorial-sub text-slate-400 text-sm sm:text-base">
              Interrogez les 22 Arcanes Majeurs. Miroir symbolique de l'inconscient et boussole pour vos décisions présentes.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] gap-1 max-w-full overflow-x-auto">
              {SPREAD_MODES.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => {
                    setActiveMode(mode.id);
                    setDrawnCards(null);
                    setFlippedCards({});
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeMode === mode.id
                      ? 'bg-accent-500/20 border border-accent-500/40 text-accent-300 font-semibold shadow-subtle'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {mode.id === 'deck' ? <BookOpen className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
                  <span>{mode.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              VIEW 1 & 2: INTERACTIVE TAROT DRAW (1 OR 3 CARDS)
          ────────────────────────────────────────────────────────────── */}
          {activeMode !== 'deck' && (
            <div className="space-y-10">
              
              {/* Trigger Button */}
              <div className="text-center">
                {!drawnCards ? (
                  <div className="p-8 rounded-2xl glass-surface border border-white/[0.08] max-w-xl mx-auto space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.12] flex items-center justify-center text-accent-300 mx-auto animate-float">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        {activeMode === 'single' ? 'Tirez votre Carte du Jour' : 'Tirage Passé — Présent — Futur'}
                      </h3>
                      <p className="text-xs text-slate-400 max-w-md mx-auto">
                        Faites le vide en vous, respirez profondément et concentrez-vous sur votre question ou sur l'énergie du moment.
                      </p>
                    </div>

                    <button
                      onClick={() => handleDraw(activeMode === 'single' ? 1 : 3)}
                      disabled={isDrawing}
                      className="btn-primary text-sm px-8 py-3 uppercase tracking-wider font-mono inline-flex items-center gap-2 group"
                    >
                      <RotateCw className={`w-4 h-4 ${isDrawing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform'}`} />
                      <span>{isDrawing ? 'Mélange des arcanes...' : 'Mélanger & Tirer les Cartes'}</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleDraw(activeMode === 'single' ? 1 : 3)}
                    disabled={isDrawing}
                    className="btn-secondary text-xs px-4 py-2 uppercase tracking-wider font-mono inline-flex items-center gap-2"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Nouveau Tirage</span>
                  </button>
                )}
              </div>

              {/* Drawn Cards Display */}
              {drawnCards && (
                <div className={`grid gap-6 ${drawnCards.length === 1 ? 'max-w-md mx-auto' : 'grid-cols-1 md:grid-cols-3'}`}>
                  {drawnCards.map((card, idx) => {
                    const isFlipped = flippedCards[idx];
                    return (
                      <div
                        key={idx}
                        className="group relative flex flex-col rounded-2xl glass-surface border border-white/[0.08] overflow-hidden transition-all duration-300 hover:border-accent-500/30"
                      >
                        {/* Position Badge Header */}
                        <div className="p-3.5 bg-black/40 border-b border-white/[0.06] flex items-center justify-between text-xs font-mono">
                          <span className="text-accent-300 font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                            {card.position}
                          </span>
                          {card.isReversed ? (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300">
                              À l'envers (Renversée)
                            </span>
                          ) : (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                              À l'endroit (Directe)
                            </span>
                          )}
                        </div>

                        {/* Card Image Container with 3D Flip */}
                        <div className="p-5 flex flex-col items-center bg-black/20">
                          <div 
                            className={`w-44 h-72 rounded-xl border border-white/[0.12] overflow-hidden shadow-2xl relative transition-transform duration-700 cursor-pointer ${
                              card.isReversed ? 'rotate-180' : ''
                            } ${!isFlipped ? 'scale-95 opacity-60' : 'scale-100 opacity-100'}`}
                            onClick={() => setFlippedCards(p => ({ ...p, [idx]: !p[idx] }))}
                            title="Cliquez pour retourner"
                          >
                            <img
                              src={card.imageUrl}
                              alt={card.nameFr}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>

                          <span className="text-[10px] font-mono text-slate-500 mt-2">
                            Arcane #{card.number} — {card.nameEn}
                          </span>
                        </div>

                        {/* Card Details & Reading */}
                        <div className="p-5 space-y-4 flex-1 flex flex-col justify-between border-t border-white/[0.06]">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-bold text-white editorial-title">
                                {card.nameFr}
                              </h3>
                              <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
                                {getElementIcon(card.element)}
                                <span>{card.element || 'Éther'}</span>
                              </div>
                            </div>

                            {/* Keywords */}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {card.keywords?.map((kw, kIdx) => (
                                <span
                                  key={kIdx}
                                  className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300"
                                >
                                  {kw}
                                </span>
                              ))}
                            </div>

                            {/* Interpretation text */}
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans bg-white/[0.02] p-3 rounded-xl border border-white/[0.04]">
                              {card.interpretation || (card.isReversed ? card.meaningReversed : card.meaningUpright)}
                            </p>
                          </div>

                          {/* Astrological & planetary correspondences */}
                          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                            <span>Gouvernance : <strong className="text-slate-200">{card.planet || card.zodiacSign || 'Universel'}</strong></span>
                            {card.zodiacSign && <span>Signe : <strong className="text-accent-300">{card.zodiacSign}</strong></span>}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              VIEW 3: TAROT ENCYCLOPEDIA (ALL 22 MAJOR ARCANA)
          ────────────────────────────────────────────────────────────── */}
          {activeMode === 'deck' && (
            <div className="space-y-6">
              
              {/* Search Bar */}
              <div className="flex justify-between items-center flex-wrap gap-4 pb-4 border-b border-white/[0.08]">
                <div className="text-xs font-mono text-slate-400">
                  <span>Catalogue : <strong>{filteredCards.length}</strong> Arcanes Majeurs répertoriés</span>
                </div>
                <div className="w-full sm:w-72">
                  <input
                    type="text"
                    placeholder="Rechercher une carte, un mot-clé..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent-400/50 font-mono"
                  />
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredCards.map((card) => (
                  <div
                    key={card.slug}
                    onClick={() => setSelectedDeckCard(card)}
                    className="group cursor-pointer rounded-xl glass-surface border border-white/[0.08] hover:border-accent-500/40 p-3 flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="w-full aspect-[2/3] rounded-lg overflow-hidden border border-white/[0.1] mb-2.5 relative">
                      <img
                        src={card.imageUrl}
                        alt={card.nameFr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-[9px] font-mono text-accent-300 border border-white/[0.1]">
                        #{card.number}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white group-hover:text-accent-300 transition-colors line-clamp-1">
                      {card.nameFr}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500">
                      {card.element || card.planet || 'Arcane'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Card Detail Modal */}
              {selectedDeckCard && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
                  <div className="max-w-2xl w-full bg-[#0a0c12] border border-white/[0.12] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                    
                    {/* Left: Card visual */}
                    <div className="p-6 md:w-1/2 flex flex-col items-center justify-center bg-black/40 border-b md:border-b-0 md:border-r border-white/[0.08]">
                      <div className="w-48 h-80 rounded-xl overflow-hidden border border-white/[0.15] shadow-2xl mb-3">
                        <img
                          src={selectedDeckCard.imageUrl}
                          alt={selectedDeckCard.nameFr}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        Arcane #{selectedDeckCard.number} • {selectedDeckCard.nameEn}
                      </span>
                    </div>

                    {/* Right: Full details */}
                    <div className="p-6 md:w-1/2 flex flex-col justify-between space-y-4 overflow-y-auto max-h-[80vh]">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-400">
                            {selectedDeckCard.arcana} Arcana
                          </span>
                          <button
                            onClick={() => setSelectedDeckCard(null)}
                            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-white/[0.05]"
                          >
                            Fermer ✕
                          </button>
                        </div>

                        <h2 className="text-xl font-bold text-white editorial-title">
                          {selectedDeckCard.nameFr}
                        </h2>

                        <div className="flex flex-wrap gap-1.5">
                          {selectedDeckCard.keywords?.map((kw, i) => (
                            <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-300">
                              {kw}
                            </span>
                          ))}
                        </div>

                        <div className="space-y-2 text-xs">
                          <div>
                            <strong className="text-emerald-300 font-mono block mb-1">Sens à l'endroit :</strong>
                            <p className="text-slate-300 leading-relaxed bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
                              {selectedDeckCard.meaningUpright}
                            </p>
                          </div>
                          <div>
                            <strong className="text-rose-300 font-mono block mb-1">Sens à l'envers :</strong>
                            <p className="text-slate-400 leading-relaxed bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
                              {selectedDeckCard.meaningReversed}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/[0.08] text-[11px] font-mono text-slate-400 space-y-1">
                        <div>Élément : <span className="text-white">{selectedDeckCard.element || 'N/A'}</span></div>
                        <div>Planète / Signe : <span className="text-accent-300">{selectedDeckCard.planet || selectedDeckCard.zodiacSign || 'Cosmique'}</span></div>
                      </div>

                    </div>

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
