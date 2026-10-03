import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const ZODIAC_DEFINITIONS = [
  {
    slug: 'capricorne',
    name: 'Capricorne',
    nameEn: 'Capricorn',
    symbol: '♑',
    element: 'Terre',
    modality: 'Cardinal',
    rulingPlanet: 'Saturne',
    archetype: "L'Architecte Stratège",
    color: '#818cf8',
    startMonth: 12, startDay: 22, endMonth: 1, endDay: 19,
    keywords: ['Discipline', 'Vision', 'Pragmatisme', 'Endurance'],
  },
  {
    slug: 'verseau',
    name: 'Verseau',
    nameEn: 'Aquarius',
    symbol: '♒',
    element: 'Air',
    modality: 'Fixe',
    rulingPlanet: 'Uranus',
    archetype: 'Le Visionnaire Innovateur',
    color: '#38bdf8',
    startMonth: 1, startDay: 20, endMonth: 2, endDay: 18,
    keywords: ['Innovation', 'Indépendance', 'Intuition', 'Altruisme'],
  },
  {
    slug: 'poissons',
    name: 'Poissons',
    nameEn: 'Pisces',
    symbol: '♓',
    element: 'Eau',
    modality: 'Mutable',
    rulingPlanet: 'Neptune',
    archetype: "Le Mystique Récepteur",
    color: '#a78bfa',
    startMonth: 2, startDay: 19, endMonth: 3, endDay: 20,
    keywords: ['Clairvoyance', 'Empathie', 'Sensibilité', 'Créativité'],
  },
  {
    slug: 'belier',
    name: 'Bélier',
    nameEn: 'Aries',
    symbol: '♈',
    element: 'Feu',
    modality: 'Cardinal',
    rulingPlanet: 'Mars',
    archetype: 'Le Pionnier Déterminé',
    color: '#f87171',
    startMonth: 3, startDay: 21, endMonth: 4, endDay: 19,
    keywords: ['Courage', 'Initiative', 'Franchise', 'Énergie vitale'],
  },
  {
    slug: 'taureau',
    name: 'Taureau',
    nameEn: 'Taurus',
    symbol: '♉',
    element: 'Terre',
    modality: 'Fixe',
    rulingPlanet: 'Vénus',
    archetype: 'Le Bâtisseur Ancré',
    color: '#4ade80',
    startMonth: 4, startDay: 20, endMonth: 5, endDay: 20,
    keywords: ['Stabilité', 'Lucidité', 'Sensualité', 'Persévérance'],
  },
  {
    slug: 'gemeaux',
    name: 'Gémeaux',
    nameEn: 'Gemini',
    symbol: '♊',
    element: 'Air',
    modality: 'Mutable',
    rulingPlanet: 'Mercure',
    archetype: "L'Analyste Polyvalent",
    color: '#fbbf24',
    startMonth: 5, startDay: 21, endMonth: 6, endDay: 20,
    keywords: ['Agilité intellectuelle', 'Connexion', 'Adaptabilité', 'Curiosité'],
  },
  {
    slug: 'cancer',
    name: 'Cancer',
    nameEn: 'Cancer',
    symbol: '♋',
    element: 'Eau',
    modality: 'Cardinal',
    rulingPlanet: 'Lune',
    archetype: 'Le Protecteur Intuitif',
    color: '#94a3b8',
    startMonth: 6, startDay: 21, endMonth: 7, endDay: 22,
    keywords: ['Intuition', 'Profondeur affective', 'Mémoire', 'Protection'],
  },
  {
    slug: 'lion',
    name: 'Lion',
    nameEn: 'Leo',
    symbol: '♌',
    element: 'Feu',
    modality: 'Fixe',
    rulingPlanet: 'Soleil',
    archetype: 'Le Souverain Créatif',
    color: '#f59e0b',
    startMonth: 7, startDay: 23, endMonth: 8, endDay: 22,
    keywords: ['Magnétisme', 'Générosité', 'Clarté', 'Autorité naturelle'],
  },
  {
    slug: 'vierge',
    name: 'Vierge',
    nameEn: 'Virgo',
    symbol: '♍',
    element: 'Terre',
    modality: 'Mutable',
    rulingPlanet: 'Mercure',
    archetype: 'L’Alchimiste Précis',
    color: '#34d399',
    startMonth: 8, startDay: 23, endMonth: 9, endDay: 22,
    keywords: ['Discernement', 'Excellence', 'Analyse', 'Intégrité'],
  },
  {
    slug: 'balance',
    name: 'Balance',
    nameEn: 'Libra',
    symbol: '♎',
    element: 'Air',
    modality: 'Cardinal',
    rulingPlanet: 'Vénus',
    archetype: 'Le Diplomate Harmonique',
    color: '#e879f9',
    startMonth: 9, startDay: 23, endMonth: 10, endDay: 22,
    keywords: ['Équilibre', 'Justice', 'Esthétique', 'Résonance'],
  },
  {
    slug: 'scorpion',
    name: 'Scorpion',
    nameEn: 'Scorpio',
    symbol: '♏',
    element: 'Eau',
    modality: 'Fixe',
    rulingPlanet: 'Pluton',
    archetype: 'Le Phénix Métamorphique',
    color: '#c084fc',
    startMonth: 10, startDay: 23, endMonth: 11, endDay: 21,
    keywords: ['Intensité', 'Pénétration psychique', 'Régénération', 'Pouvoir'],
  },
  {
    slug: 'sagittaire',
    name: 'Sagittaire',
    nameEn: 'Sagittarius',
    symbol: '♐',
    element: 'Feu',
    modality: 'Mutable',
    rulingPlanet: 'Jupiter',
    archetype: 'Le Chercheur de Vérité',
    color: '#818cf8',
    startMonth: 11, startDay: 22, endMonth: 12, endDay: 21,
    keywords: ['Expansion', 'Philosophie', 'Optimisme', 'Aspiration'],
  },
];

/**
 * Accurately calculate zodiac sign from date
 */
export function calculateSunSign(dateString) {
  if (!dateString) return ZODIAC_DEFINITIONS[3]; // default Aries
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ZODIAC_DEFINITIONS[3];

  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  for (const sign of ZODIAC_DEFINITIONS) {
    if (sign.startMonth === sign.endMonth) {
      if (month === sign.startMonth && day >= sign.startDay && day <= sign.endDay) return sign;
    } else if (sign.startMonth > sign.endMonth) {
      // Wraps year (Capricorn)
      if ((month === sign.startMonth && day >= sign.startDay) || (month === sign.endMonth && day <= sign.endDay)) {
        return sign;
      }
    } else {
      if (
        (month === sign.startMonth && day >= sign.startDay) ||
        (month === sign.endMonth && day <= sign.endDay)
      ) {
        return sign;
      }
    }
  }

  return ZODIAC_DEFINITIONS[0];
}

/**
 * Estimate Moon sign & Ascendant based on birth details
 */
export function calculatePlanetaryPlacements(birthDate, birthTime) {
  const sunSign = calculateSunSign(birthDate);
  const sunIndex = ZODIAC_DEFINITIONS.findIndex(s => s.slug === sunSign.slug);

  // Approximate moon sign shifting roughly every 2.5 days
  let moonOffset = 4;
  if (birthDate) {
    const d = new Date(birthDate);
    moonOffset = (d.getDate() * 2 + d.getMonth()) % 12;
  }
  const moonSign = ZODIAC_DEFINITIONS[(sunIndex + moonOffset) % 12];

  // Approximate Ascendant: advances ~1 sign every 2 hours after sunrise (approx 06:00)
  let ascOffset = 0;
  if (birthTime) {
    const [hours] = birthTime.split(':').map(Number);
    if (!isNaN(hours)) {
      ascOffset = Math.floor(((hours - 6 + 24) % 24) / 2);
    }
  } else {
    ascOffset = 2; // balanced default
  }
  const risingSign = ZODIAC_DEFINITIONS[(sunIndex + ascOffset) % 12];

  return {
    sunSign,
    moonSign,
    risingSign,
    dominantElement: sunSign.element,
  };
}

const STORAGE_KEY = 'astra_ai_user_profile';

const UserProfileContext = createContext(null);

export function UserProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.name && parsed?.birthDate) {
          const placements = calculatePlanetaryPlacements(parsed.birthDate, parsed.birthTime);
          return {
            ...parsed,
            ...placements,
            hasCompletedOnboarding: true,
          };
        }
      }
    } catch {
      // ignore
    }
    return null;
  });

  // Track onboarding progression: 1 = Welcome, 2 = Info (Name, Date, Time, Place), 3 = Choose Experience
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [isOnboardingActive, setIsOnboardingActive] = useState(!profile?.hasCompletedOnboarding);

  useEffect(() => {
    if (profile?.hasCompletedOnboarding) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      } catch {
        // ignore
      }
      setIsOnboardingActive(false);
    } else {
      setIsOnboardingActive(true);
    }
  }, [profile]);

  const savePersonalInfo = ({ name, birthDate, birthTime = '', birthPlace = '' }) => {
    const placements = calculatePlanetaryPlacements(birthDate, birthTime);
    const updated = {
      name: name.trim(),
      birthDate,
      birthTime,
      birthPlace: birthPlace.trim(),
      ...placements,
      selectedFocus: 'today',
      hasCompletedOnboarding: false, // will complete on Step 3 selection
      createdAt: new Date().toISOString(),
    };
    setProfile(updated);
    setOnboardingStep(3); // advance to experience selection
  };

  const selectFirstExperience = (focusKey) => {
    if (!profile) return;
    const finalProfile = {
      ...profile,
      selectedFocus: focusKey || 'today',
      hasCompletedOnboarding: true,
    };
    setProfile(finalProfile);
    setIsOnboardingActive(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalProfile));
    } catch {
      // ignore
    }
  };

  const updateFocus = (focusKey) => {
    if (!profile) return;
    const updated = { ...profile, selectedFocus: focusKey };
    setProfile(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const resetProfile = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setProfile(null);
    setOnboardingStep(1);
    setIsOnboardingActive(true);
  };

  const updateProfile = (updates) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      if (updates.birthDate || updates.birthTime) {
        const placements = calculatePlanetaryPlacements(next.birthDate, next.birthTime);
        Object.assign(next, placements);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const value = useMemo(() => ({
    profile,
    isOnboardingActive,
    onboardingStep,
    setOnboardingStep,
    setIsOnboardingActive,
    savePersonalInfo,
    selectFirstExperience,
    updateFocus,
    updateProfile,
    resetProfile,
    zodiacCatalog: ZODIAC_DEFINITIONS,
  }), [profile, isOnboardingActive, onboardingStep]);

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const ctx = useContext(UserProfileContext);
  if (!ctx) throw new Error('useUserProfile must be used within UserProfileProvider');
  return ctx;
}
