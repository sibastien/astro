/**
 * Horoscope Generator & Sync Engine
 * Generates rich, authentic astrological forecasts for all 12 signs across all 4 categories:
 * GENERAL, AMOUR, TRAVAIL, SANTE
 * With planetary aspects, lucky numbers, colors, and ratings in French.
 */

const prisma = require('../../config/prisma');

const CATEGORIES = ['GENERAL', 'AMOUR', 'TRAVAIL', 'SANTE'];

const PLANETARY_ASPECTS = [
  'Trigone harmonieux entre Vénus et Jupiter',
  'Conjonction Soleil-Mercure stimulant la clarté mentale',
  'Sextile dynamique Mars-Pluton favorisant la transformation',
  'Lune en transit apportant une intuition aiguisée',
  'Alignement bienveillant Saturne-Uranus consolidant vos bases',
  'Mercure en maison solaire favorisant les communications fluides',
  'Vénus en aspect d’harmonie renforçant le magnétisme personnel',
  'Mars injectant une impulsion d’action et de courage',
];

const COLORS = [
  'Or Solaire', 'Bleu Nuit', 'Pourpre Mystique', 'Vert Émeraude',
  'Rubis Étoilé', 'Argent Lunaire', 'Ambre Chaleureux', 'Indigo Céleste',
  'Saphir Éthéré', 'Opale de Feu', 'Turquoise Cosmique', 'Bronze Antique'
];

const SIGN_ADVICE = {
  belier: {
    GENERAL: 'Votre vitalité martienne est en pleine expansion. C\'est le moment d\'initier ce qui vous tient à cœur sans hésiter.',
    AMOUR: 'Votre magnétisme spontané séduit. Osez exprimer vos désirs avec franchise mais sans brusquer votre partenaire.',
    TRAVAIL: 'Une opportunité audacieuse se profile. Prenez le leadership et défendez vos projets avec conviction.',
    SANTE: 'Évacuez le trop-plein d\'énergie par une activité sportive stimulante pour garder l\'esprit serein.',
    keywords: ['Élan', 'Leadership', 'Franchise', 'Initiative'],
  },
  taureau: {
    GENERAL: 'Une belle stabilité règne aujourd\'hui. Votre patience légendaire porte ses fruits dans vos affaires.',
    AMOUR: 'La tendresse et la sensualité sont à l\'honneur. Créez un cocon réconfortant pour vos proches.',
    TRAVAIL: 'Régularité et discernement vous permettent de consolider des acquis financiers importants.',
    SANTE: 'Prenez le temps de savourer un repas équilibré et de vous ressourcer au contact de la nature.',
    keywords: ['Stabilité', 'Sensualité', 'Persévérance', 'Confort'],
  },
  gemeaux: {
    GENERAL: 'Les échanges sont fluides et riches en découvertes. Votre curiosité naturelle vous ouvre des portes inattendues.',
    AMOUR: 'La complicité intellectuelle enflamme vos relations. Rires partagés et conversations profondes au programme.',
    TRAVAIL: 'Idéal pour le travail d\'équipe, la négociation et la signature de nouveaux partenariats.',
    SANTE: 'Ménagez votre système nerveux en limitant le multitâche excessif en fin de journée.',
    keywords: ['Communication', 'Éveil', 'Polyvalence', 'Connexion'],
  },
  cancer: {
    GENERAL: 'Vos ressentis sont particulièrement justes aujourd\'hui. Écoutez cette voix intérieure qui vous guide.',
    AMOUR: 'Profondeur émotionnelle et écoute bienveillante renforcent les liens les plus précieux de votre vie.',
    TRAVAIL: 'Fiez-vous à votre intuition pour déceler les intentions de vos interlocuteurs professionnels.',
    SANTE: 'Un bain relaxant ou des exercices de respiration apaiseront vos émotions en soirée.',
    keywords: ['Intuition', 'Douceur', 'Sensibilité', 'Protection'],
  },
  lion: {
    GENERAL: 'Votre rayonnement est irrésistible. Votre charisme attire naturellement l\'admiration et la confiance.',
    AMOUR: 'Romantisme flamboyant ! Sortez le grand jeu, vos gestes généreux toucheront droit au cœur.',
    TRAVAIL: 'Votre créativité est au zénith. Présentez vos idées novatrices avec l\'assurance qui vous caractérise.',
    SANTE: 'Énergie solaire débordante : canalisez cette fougue pour inspirer votre entourage.',
    keywords: ['Rayonnement', 'Créativité', 'Générosité', 'Audace'],
  },
  vierge: {
    GENERAL: 'Votre sens de l\'organisation et votre regard analytique vous permettent de dénouer une situation complexe.',
    AMOUR: 'Des attentions délicates et des preuves concrètes valent mille déclarations théâtrales.',
    TRAVAIL: 'Une efficacité remarquable pour finaliser les détails minutieux de vos dossiers en cours.',
    SANTE: 'Veillez à une bonne hydratation et accordez-vous des pauses pour relâcher la charge mentale.',
    keywords: ['Précision', 'Dévouement', 'Clarté', 'Harmonie'],
  },
  balance: {
    GENERAL: 'Recherche d\'équilibre et de justice. Vous excellez dans l\'art de pacifier les tensions environnantes.',
    AMOUR: 'Ambiance idyllique pour raviver la flamme ou faire une rencontre d\'une élégance rare.',
    TRAVAIL: 'La diplomatie est votre atout maître pour parvenir à un accord gagnant-gagnant.',
    SANTE: 'Retrouvez votre harmonie intérieure grâce à la musique, l\'art ou une promenade calme.',
    keywords: ['Équilibre', 'Charme', 'Diplomatie', 'Beauté'],
  },
  scorpion: {
    GENERAL: 'Une lucidité perçante traverse le voile des apparences. Rien ne vous échappe aujourd\'hui.',
    AMOUR: 'Intensité passionnelle et loyauté sans faille. La fusion des âmes atteint des sommets.',
    TRAVAIL: 'Capacité exceptionnelle de concentration pour mener à bien des investigations complexes.',
    SANTE: 'Régénération profonde en éliminant les tensions du passé. Laissez circuler l\'énergie vitale.',
    keywords: ['Intensité', 'Lucidité', 'Métamorphose', 'Pouvoir'],
  },
  sagittaire: {
    GENERAL: 'Un vent d\'optimisme gonfle vos voiles. Votre vision à long terme est particulièrement inspirée.',
    AMOUR: 'Envie d\'aventure et de complicité sans entrave. Partagez vos rêves avec enthousiasme.',
    TRAVAIL: 'Excellente configuration pour les projets internationaux, les formations et l\'expansion.',
    SANTE: 'Bougez, respirez le grand air et entretenez cette jovialité communicative qui fait votre force.',
    keywords: ['Optimisme', 'Aventure', 'Vision', 'Liberté'],
  },
  capricorne: {
    GENERAL: 'Persévérance et clarté d\'objectifs. Chaque pas posé est une pierre solide sur votre édifice.',
    AMOUR: 'La sincérité et la fidélité de vos sentiments créent un sentiment de sécurité inestimable.',
    TRAVAIL: 'Votre rigueur professionnelle force le respect. Vos supérieurs ou pairs reconnaissent votre valeur.',
    SANTE: 'Prenez soin de votre posture et de vos articulations par des étirements doux.',
    keywords: ['Rigueur', 'Constance', 'Ambition', 'Sagesse'],
  },
  verseau: {
    GENERAL: 'Les idées originales fusent. Votre esprit libre anticipe les tendances avant tout le monde.',
    AMOUR: 'Amitié amoureuse et respect mutuel de la liberté de chacun sont les clés de votre bonheur.',
    TRAVAIL: 'Innovez, proposez des solutions technologiques ou collaboratives hors des sentiers battus.',
    SANTE: 'Faites des pauses visuelles loin des écrans pour reposer votre esprit novateur.',
    keywords: ['Innovation', 'Indépendance', 'Fraternité', 'Originalité'],
  },
  poissons: {
    GENERAL: 'Une onde de douceur et d\'inspiration artistique vous enveloppe. Laissez parler votre sensibilité.',
    AMOUR: 'Romance mystique et télépathie émotionnelle. Votre cœur s\'ouvre avec une infinie compassion.',
    TRAVAIL: 'Vos fulgurances créatives et votre sens de l\'entraide créent une atmosphère harmonieuse.',
    SANTE: 'Privilégiez les activités aquatiques, la méditation ou le sommeil réparateur pour recharger vos énergies.',
    keywords: ['Compassion', 'Rêve', 'Inspiration', 'Spiritualité'],
  },
};

/**
 * Ensures today's horoscopes exist in the DB for all signs and all 4 categories.
 * If missing, generates and saves them.
 */
async function ensureTodayHoroscopes(targetDate = null) {
  const dateObj = targetDate ? new Date(targetDate) : new Date();
  const dateStr = dateObj.toISOString().split('T')[0];
  const dateOnly = new Date(dateStr);

  // Check how many horoscopes exist for this date
  const existingCount = await prisma.dailyHoroscope.count({
    where: { date: dateOnly },
  });

  // 12 signs * 4 categories = 48 entries. If already generated, return count
  if (existingCount >= 48) {
    return { count: existingCount, created: 0, date: dateStr };
  }

  // Fetch all zodiac signs
  let signs = await prisma.zodiacSign.findMany({ orderBy: { order: 'asc' } });
  if (!signs || signs.length === 0) {
    // If signs aren't seeded yet, seed them first
    const { ZODIAC_SIGNS } = require('../../prisma/seed');
    for (const sign of ZODIAC_SIGNS) {
      await prisma.zodiacSign.upsert({
        where: { slug: sign.slug },
        update: sign,
        create: sign,
      });
    }
    signs = await prisma.zodiacSign.findMany({ orderBy: { order: 'asc' } });
  }

  let createdCount = 0;

  for (const sign of signs) {
    const adviceObj = SIGN_ADVICE[sign.slug] || {
      GENERAL: 'Alignement céleste propice à la clarté et à l\'épanouissement personnel.',
      AMOUR: 'Harmonie et compréhension mutuelle au cœur de vos relations.',
      TRAVAIL: 'Détermination et efficacité vous ouvrent des horizons prometteurs.',
      SANTE: 'Équilibre et vitalité préservés grâce à une bonne écoute de soi.',
      keywords: ['Clarté', 'Harmonie', 'Vitalité'],
    };

    for (let cIdx = 0; cIdx < CATEGORIES.length; cIdx++) {
      const cat = CATEGORIES[cIdx];
      const aspect = PLANETARY_ASPECTS[(sign.order + cIdx + dateObj.getDate()) % PLANETARY_ASPECTS.length];
      const color = COLORS[(sign.order * 2 + cIdx) % COLORS.length];
      const luckyNum = ((sign.order * 7 + dateObj.getDate() * 3 + cIdx) % 89) + 7;
      const rating = 4 + ((sign.order + dateObj.getDate() + cIdx) % 2); // 4 or 5 stars

      const content = adviceObj[cat] || adviceObj.GENERAL;

      await prisma.dailyHoroscope.upsert({
        where: {
          zodiacSignId_date_category: {
            zodiacSignId: sign.id,
            date: dateOnly,
            category: cat,
          },
        },
        update: {
          content,
          luckyNumber: luckyNum,
          luckyColor: color,
          luckyDay: 'Aujourd\'hui',
          rating,
          keywords: adviceObj.keywords || ['Énergie', 'Harmonie'],
          planetaryInfo: aspect,
          isPublished: true,
        },
        create: {
          zodiacSignId: sign.id,
          date: dateOnly,
          category: cat,
          content,
          luckyNumber: luckyNum,
          luckyColor: color,
          luckyDay: 'Aujourd\'hui',
          rating,
          keywords: adviceObj.keywords || ['Énergie', 'Harmonie'],
          planetaryInfo: aspect,
          isPublished: true,
        },
      });

      createdCount++;
    }
  }

  return { count: 48, created: createdCount, date: dateStr };
}

module.exports = {
  ensureTodayHoroscopes,
  CATEGORIES,
};
