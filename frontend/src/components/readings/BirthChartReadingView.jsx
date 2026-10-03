import { useState } from 'react';
import { Compass, CircleDot, Layers, Shield, ArrowRight, Sparkles } from 'lucide-react';

export default function BirthChartReadingView({ profile, onSwitchFocus }) {
  const sunSign = profile?.sunSign || { name: 'Scorpion', symbol: '♏', element: 'Eau', rulingPlanet: 'Pluton' };
  const moonSign = profile?.moonSign || { name: 'Poissons', symbol: '♓', element: 'Eau', rulingPlanet: 'Neptune' };
  const risingSign = profile?.risingSign || { name: 'Capricorne', symbol: '♑', element: 'Terre', rulingPlanet: 'Saturne' };

  const [activeTab, setActiveTab] = useState('PLANETS');

  const PLANETS = [
    { name: 'Sun (Soleil)', symbol: '☉', sign: sunSign.name, glyph: sunSign.symbol, degree: '24° 12’', house: '10th House', aspect: 'Core Identity & Life Force' },
    { name: 'Moon (Lune)', symbol: '☽', sign: moonSign.name, glyph: moonSign.symbol, degree: '08° 45’', house: '4th House', aspect: 'Instinctual Memory & Emotional Safety' },
    { name: 'Mercury (Mercure)', symbol: '☿', sign: sunSign.name, glyph: sunSign.symbol, degree: '19° 30’', house: '10th House', aspect: 'Neural Processing & Strategic Speech' },
    { name: 'Venus (Vénus)', symbol: '♀', sign: 'Balance', glyph: '♎', degree: '02° 18’', house: '9th House', aspect: 'Aesthetic Resonance & Value Exchange' },
    { name: 'Mars (Mars)', symbol: '♂', sign: 'Vierge', glyph: '♍', degree: '14° 50’', house: '8th House', aspect: 'Kinetic Drive & Sovereign Action' },
    { name: 'Jupiter (Jupiter)', symbol: '♃', sign: 'Taureau', glyph: '♉', degree: '11° 02’', house: '5th House', aspect: 'Expansion Horizon & Wealth Generation' },
    { name: 'Saturn (Saturne)', symbol: '♄', sign: 'Poissons', glyph: '♓', degree: '07° 22’', house: '2nd House', aspect: 'Karmic Boundary & Architectural Mastery' },
    { name: 'Ascendant (AC)', symbol: 'ASC', sign: risingSign.name, glyph: risingSign.symbol, degree: '18° 00’', house: '1st House', aspect: 'Interface Horizon & Physical Manifestation' },
  ];

  const HOUSES = [
    { num: 'I', title: 'Self & Origin', sign: risingSign.name, description: 'First impression, vitality, emergent intentionality' },
    { num: 'II', title: 'Value & Assets', sign: 'Verseau', description: 'Financial sovereignty, core principles, personal capital' },
    { num: 'III', title: 'Inquiry & Network', sign: 'Poissons', description: 'Immediate environment, mental synthesis, quick exchanges' },
    { num: 'IV', title: 'Roots & Sanctuary', sign: moonSign.name, description: 'Private foundation, familial lineage, emotional core' },
    { num: 'V', title: 'Creation & Radiance', sign: 'Taureau', description: 'Artistic output, speculative joy, expressive magnetism' },
    { num: 'VI', title: 'Rhythm & Craft', sign: 'Gémeaux', description: 'Daily discipline, somatic wellness, technical precision' },
    { num: 'VII', title: 'Partnership Horizon', sign: 'Cancer', description: 'Contractual alliances, mutual reflection, commitment' },
    { num: 'VIII', title: 'Alchemy & Depth', sign: 'Lion', description: 'Shared transformation, intimate power, inheritance' },
    { num: 'IX', title: 'Philosophy & Scope', sign: 'Vierge', description: 'Higher wisdom, long-distance vectors, worldview' },
    { num: 'X', title: 'Midheaven & Zenith', sign: sunSign.name, description: 'Public standing, executive legacy, societal purpose' },
    { num: 'XI', title: 'Collective Vision', sign: 'Scorpion', description: 'Future community, allied organizations, altruistic impact' },
    { num: 'XII', title: 'Subliminal Realm', sign: 'Sagittaire', description: 'Transcendental release, unconscious wisdom, renewal' },
  ];

  return (
    <div className="space-y-10 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="glass-surface p-6 sm:p-8 card-premium relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent-500/[0.04] blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3 mb-3">
          <span className="mono-badge-accent">
            NATAL EPHEMERIS
          </span>
          <span className="text-xs font-mono text-slate-500">·</span>
          <span className="text-xs font-mono text-slate-400">
            PLACIDUS HOUSE SYSTEM
          </span>
        </div>
        <p className="text-xs font-mono text-accent-400 uppercase tracking-widest mb-1">
          Complete Astrological Blueprint
        </p>
        <h1 className="editorial-title text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Natal Chart Calculation for {profile?.name || 'User'}
        </h1>
        <div className="mt-4 pt-4 border-t border-white/[0.06] flex flex-wrap gap-6 text-xs font-mono text-slate-400">
          <div>
            <span className="text-slate-500 block">DATE OF BIRTH</span>
            <span className="text-slate-200">{profile?.birthDate || 'Calibrated'}</span>
          </div>
          <div>
            <span className="text-slate-500 block">TIME OF BIRTH</span>
            <span className="text-slate-200">{profile?.birthTime || '12:00 (Standardized)'}</span>
          </div>
          <div>
            <span className="text-slate-500 block">PLACE OF BIRTH</span>
            <span className="text-slate-200">{profile?.birthPlace || 'Global Horizon'}</span>
          </div>
          <div>
            <span className="text-slate-500 block">COORDINATE MAPPING</span>
            <span className="text-accent-400">Swiss Ephemeris Standard</span>
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
        <button
          onClick={() => setActiveTab('PLANETS')}
          className={`px-4 py-2 rounded-md text-xs font-mono uppercase tracking-wider transition-all ${
            activeTab === 'PLANETS'
              ? 'bg-accent-500/20 text-accent-300 border border-accent-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Planetary Coordinates ({PLANETS.length})
        </button>
        <button
          onClick={() => setActiveTab('HOUSES')}
          className={`px-4 py-2 rounded-md text-xs font-mono uppercase tracking-wider transition-all ${
            activeTab === 'HOUSES'
              ? 'bg-accent-500/20 text-accent-300 border border-accent-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          12 Natal Houses
        </button>
      </div>

      {/* Content table */}
      {activeTab === 'PLANETS' && (
        <div className="glass-surface card-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-sans">
              <thead className="bg-black/50 border-b border-white/[0.08] text-slate-400 font-mono text-[11px] uppercase">
                <tr>
                  <th className="py-3 px-4">Celestial Body</th>
                  <th className="py-3 px-4">Sign</th>
                  <th className="py-3 px-4">Degree</th>
                  <th className="py-3 px-4">House</th>
                  <th className="py-3 px-4">Function</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-slate-300">
                {PLANETS.map((p, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-medium text-white flex items-center gap-2">
                      <span className="font-mono text-accent-300">{p.symbol}</span>
                      <span>{p.name}</span>
                    </td>
                    <td className="py-3 px-4 font-display">
                      <span className="text-slate-400 mr-1.5">{p.glyph}</span>
                      <span>{p.sign}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400">{p.degree}</td>
                    <td className="py-3 px-4 font-mono text-slate-300">{p.house}</td>
                    <td className="py-3 px-4 text-slate-400 text-xs">{p.aspect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'HOUSES' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HOUSES.map((h) => (
            <div key={h.num} className="glass-surface p-5 rounded-lg border border-white/[0.08] card-premium">
              <div className="flex items-center justify-between mb-2">
                <span className="mono-badge text-accent-400 font-bold">House {h.num}</span>
                <span className="text-xs font-mono text-slate-400">{h.sign}</span>
              </div>
              <h4 className="font-semibold text-white text-sm mb-1">{h.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{h.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Next step recommendation */}
      <div className="glass-surface p-6 card-premium flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-slate-400 uppercase">Projection Matrix</p>
          <p className="text-sm font-medium text-white">Review upcoming transit calendar and lunar ingress dates</p>
        </div>
        <button
          onClick={() => onSwitchFocus('forecast')}
          className="btn-primary text-sm px-4 py-2 shrink-0 flex items-center gap-2"
        >
          <span>View Forecast</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
