/**
 * Prisma Seed – AstroFrance
 * Populates the database with the 12 zodiac signs in French
 * Run: npm run db:seed
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ZODIAC_SIGNS = [
  {
    name: 'Bélier',
    slug: 'belier',
    nameEn: 'Aries',
    symbol: '♈',
    emoji: '🐏',
    element: 'Feu',
    modality: 'Cardinal',
    rulingPlanet: 'Mars',
    startMonth: 3,
    startDay: 21,
    endMonth: 4,
    endDay: 19,
    color: '#E25822',
    gemstone: 'Diamant',
    order: 1,
    shortDesc: 'Courageux, énergique et pionnier, le Bélier fonce tête baissée vers ses objectifs.',
    description:
      'Le Bélier est le premier signe du zodiaque, symbolisant le début d\'un nouveau cycle. Gouverné par Mars, planète de l\'action et de l\'énergie, le Bélier est né pour mener, innover et conquérir. Sa nature cardinale de feu le rend dynamique, passionné et parfois impulsif. Les natifs du Bélier ont une énergie débordante et un courage naturel qui les pousse à relever tous les défis.',
    strengths: ['Courageux', 'Déterminé', 'Confiant', 'Enthousiaste', 'Optimiste', 'Honnête'],
    weaknesses: ['Impulsif', 'Impatient', 'Colérique', 'Agressif', 'Égoïste'],
    compatibleWith: ['lion', 'sagittaire', 'gemeaux', 'verseau'],
  },
  {
    name: 'Taureau',
    slug: 'taureau',
    nameEn: 'Taurus',
    symbol: '♉',
    emoji: '🐂',
    element: 'Terre',
    modality: 'Fixe',
    rulingPlanet: 'Vénus',
    startMonth: 4,
    startDay: 20,
    endMonth: 5,
    endDay: 20,
    color: '#6B8E23',
    gemstone: 'Émeraude',
    order: 2,
    shortDesc: 'Patient, fiable et sensuel, le Taureau apprécie les plaisirs de la vie et la stabilité.',
    description:
      'Le Taureau, signe de terre fixe régi par Vénus, est l\'incarnation de la stabilité, de la sensualité et de la persévérance. Les natifs du Taureau apprécient les beautés du monde matériel — la bonne nourriture, l\'art, la musique et le confort. Ils sont extrêmement fiables et loyaux, mais peuvent parfois paraître têtus ou matérialistes.',
    strengths: ['Fiable', 'Patient', 'Pratique', 'Dévoué', 'Responsable', 'Stable'],
    weaknesses: ['Têtu', 'Possessif', 'Inflexible', 'Matérialiste', 'Résistant au changement'],
    compatibleWith: ['vierge', 'capricorne', 'cancer', 'poissons'],
  },
  {
    name: 'Gémeaux',
    slug: 'gemeaux',
    nameEn: 'Gemini',
    symbol: '♊',
    emoji: '👯',
    element: 'Air',
    modality: 'Mutable',
    rulingPlanet: 'Mercure',
    startMonth: 5,
    startDay: 21,
    endMonth: 6,
    endDay: 20,
    color: '#FFD700',
    gemstone: 'Agate',
    order: 3,
    shortDesc: 'Curieux, adaptable et sociable, les Gémeaux jonglent avec les idées et les conversations.',
    description:
      'Les Gémeaux, signe d\'air mutable gouverné par Mercure, incarnent la dualité, la communication et l\'intellect. Toujours curieux et en quête de nouvelles expériences, les Gémeaux s\'adaptent facilement à toutes les situations. Leur esprit vif et leur sociabilité naturelle en font d\'excellents communicants, mais leur tendance à la dispersion peut parfois les empêcher d\'aller au bout de leurs projets.',
    strengths: ['Adaptable', 'Curieux', 'Communicant', 'Intelligent', 'Sociable', 'Expressif'],
    weaknesses: ['Nerveux', 'Superficiel', 'Inconstant', 'Indécis', 'Manipulateur'],
    compatibleWith: ['balance', 'verseau', 'belier', 'lion'],
  },
  {
    name: 'Cancer',
    slug: 'cancer',
    nameEn: 'Cancer',
    symbol: '♋',
    emoji: '🦀',
    element: 'Eau',
    modality: 'Cardinal',
    rulingPlanet: 'Lune',
    startMonth: 6,
    startDay: 21,
    endMonth: 7,
    endDay: 22,
    color: '#C0C0C0',
    gemstone: 'Perle',
    order: 4,
    shortDesc: 'Intuitif, sensible et protecteur, le Cancer chérit sa famille et son foyer.',
    description:
      'Le Cancer, signe d\'eau cardinal gouverné par la Lune, est le signe du foyer, de la famille et des émotions profondes. Les natifs du Cancer sont extraordinairement intuitifs et empathiques. Ils ont un besoin profond de sécurité émotionnelle et feront tout pour protéger ceux qu\'ils aiment. Leur nature lunaire les rend parfois imprévisibles, mais toujours profondément sincères.',
    strengths: ['Intuitif', 'Sensible', 'Loyal', 'Imaginatif', 'Persévérant', 'Protecteur'],
    weaknesses: ['Rancunier', 'Lunatique', 'Manipulateur', 'Insécure', 'Pessimiste'],
    compatibleWith: ['scorpion', 'poissons', 'taureau', 'vierge'],
  },
  {
    name: 'Lion',
    slug: 'lion',
    nameEn: 'Leo',
    symbol: '♌',
    emoji: '🦁',
    element: 'Feu',
    modality: 'Fixe',
    rulingPlanet: 'Soleil',
    startMonth: 7,
    startDay: 23,
    endMonth: 8,
    endDay: 22,
    color: '#FF8C00',
    gemstone: 'Rubis',
    order: 5,
    shortDesc: 'Charismatique, généreux et théâtral, le Lion rayonne naturellement et inspire les autres.',
    description:
      'Le Lion, signe de feu fixe gouverné par le Soleil, est le roi du zodiaque. Les natifs du Lion ont une présence magnétique qui attire naturellement l\'attention. Généreux, chaleureux et passionnés, ils sont nés pour briller et inspirer. Leur orgueil naturel peut parfois être leur talon d\'Achille, mais leur cœur d\'or rachète tous leurs excès.',
    strengths: ['Créatif', 'Passionné', 'Généreux', 'Chaleureux', 'Joyeux', 'Humouristique'],
    weaknesses: ['Arrogant', 'Têtu', 'Paresseux', 'Inflexible', 'Vaniteux'],
    compatibleWith: ['belier', 'sagittaire', 'gemeaux', 'balance'],
  },
  {
    name: 'Vierge',
    slug: 'vierge',
    nameEn: 'Virgo',
    symbol: '♍',
    emoji: '👼',
    element: 'Terre',
    modality: 'Mutable',
    rulingPlanet: 'Mercure',
    startMonth: 8,
    startDay: 23,
    endMonth: 9,
    endDay: 22,
    color: '#8B7355',
    gemstone: 'Sardoine',
    order: 6,
    shortDesc: 'Analytique, méticuleux et serviable, la Vierge est perfectionniste dans tout ce qu\'elle entreprend.',
    description:
      'La Vierge, signe de terre mutable gouverné par Mercure, est le signe de l\'analyse, du service et du perfectionnisme. Les natifs de la Vierge possèdent un sens aigu du détail et une intelligence pratique remarquable. Travailleurs et dévoués, ils donnent le meilleur d\'eux-mêmes dans tout ce qu\'ils entreprennent, mais leur quête de perfection peut parfois les paralyser.',
    strengths: ['Loyal', 'Analytique', 'Gentil', 'Travailleur', 'Pratique', 'Serviable'],
    weaknesses: ['Timide', 'Anxieux', 'Critique', 'Perfectionniste', 'Inquiet'],
    compatibleWith: ['taureau', 'capricorne', 'cancer', 'scorpion'],
  },
  {
    name: 'Balance',
    slug: 'balance',
    nameEn: 'Libra',
    symbol: '♎',
    emoji: '⚖️',
    element: 'Air',
    modality: 'Cardinal',
    rulingPlanet: 'Vénus',
    startMonth: 9,
    startDay: 23,
    endMonth: 10,
    endDay: 22,
    color: '#FFB6C1',
    gemstone: 'Saphir',
    order: 7,
    shortDesc: 'Diplomate, charmant et équilibré, la Balance recherche l\'harmonie dans toutes ses relations.',
    description:
      'La Balance, signe d\'air cardinal gouverné par Vénus, est le signe de l\'harmonie, de la justice et de l\'esthétique. Les natifs de la Balance ont un talent naturel pour la diplomatie et la médiation. Épris de beauté et d\'équilibre, ils excellent dans les arts et les relations humaines. Leur difficulté à prendre des décisions est compensée par leur sens inné de la justice.',
    strengths: ['Coopératif', 'Diplomatique', 'Gracieux', 'Juste', 'Social', 'Équitable'],
    weaknesses: ['Indécis', 'Non-confrontationnel', 'Rancunier', 'Superficiel', 'Dépendant'],
    compatibleWith: ['gemeaux', 'verseau', 'lion', 'sagittaire'],
  },
  {
    name: 'Scorpion',
    slug: 'scorpion',
    nameEn: 'Scorpio',
    symbol: '♏',
    emoji: '🦂',
    element: 'Eau',
    modality: 'Fixe',
    rulingPlanet: 'Pluton',
    startMonth: 10,
    startDay: 23,
    endMonth: 11,
    endDay: 21,
    color: '#8B0000',
    gemstone: 'Topaze',
    order: 8,
    shortDesc: 'Intensif, passionné et mystérieux, le Scorpion plonge dans les profondeurs de l\'existence.',
    description:
      'Le Scorpion, signe d\'eau fixe gouverné par Pluton et Mars, est le signe de la transformation, du mystère et de l\'intensité. Les natifs du Scorpion possèdent une profondeur émotionnelle incomparable et une volonté de fer. Ils sont passionnés dans tout ce qu\'ils font et ont une capacité innée à percevoir les vérités cachées. Leur loyauté est absolue, mais leur vengeance peut être redoutable.',
    strengths: ['Courageux', 'Loyal', 'Ambitieux', 'Intuitif', 'Passionné', 'Persévérant'],
    weaknesses: ['Jaloux', 'Obsessionnel', 'Manipulateur', 'Méfiant', 'Violent'],
    compatibleWith: ['cancer', 'poissons', 'vierge', 'capricorne'],
  },
  {
    name: 'Sagittaire',
    slug: 'sagittaire',
    nameEn: 'Sagittarius',
    symbol: '♐',
    emoji: '🏹',
    element: 'Feu',
    modality: 'Mutable',
    rulingPlanet: 'Jupiter',
    startMonth: 11,
    startDay: 22,
    endMonth: 12,
    endDay: 21,
    color: '#9932CC',
    gemstone: 'Turquoise',
    order: 9,
    shortDesc: 'Aventurier, philosophe et optimiste, le Sagittaire est en quête perpétuelle de sens et de liberté.',
    description:
      'Le Sagittaire, signe de feu mutable gouverné par Jupiter, est le grand voyageur et philosophe du zodiaque. Toujours optimiste et assoiffé d\'aventures, les natifs du Sagittaire ont une soif inextinguible de connaissance et de liberté. Leur nature expansive et joviale en fait d\'excellents enseignants et inspirateurs, mais leur besoin de liberté peut parfois les rendre peu fiables.',
    strengths: ['Généreux', 'Idéaliste', 'Joyeux', 'Humouristique', 'Libre-penseur', 'Aventurier'],
    weaknesses: ['Impulsif', 'Impatient', 'Maladroit', 'Irresponsable', 'Indiscret'],
    compatibleWith: ['belier', 'lion', 'balance', 'verseau'],
  },
  {
    name: 'Capricorne',
    slug: 'capricorne',
    nameEn: 'Capricorn',
    symbol: '♑',
    emoji: '🐐',
    element: 'Terre',
    modality: 'Cardinal',
    rulingPlanet: 'Saturne',
    startMonth: 12,
    startDay: 22,
    endMonth: 1,
    endDay: 19,
    color: '#2F4F4F',
    gemstone: 'Onyx',
    order: 10,
    shortDesc: 'Discipliné, ambitieux et responsable, le Capricorne gravit patiemment les sommets de ses ambitions.',
    description:
      'Le Capricorne, signe de terre cardinal gouverné par Saturne, est le signe de la discipline, de l\'ambition et de la responsabilité. Les natifs du Capricorne sont des bâtisseurs nés, dotés d\'une détermination à toute épreuve. Leur sens des responsabilités et leur capacité de travail leur permettent d\'atteindre les sommets, mais ils doivent veiller à ne pas sacrifier leur vie personnelle sur l\'autel de la réussite.',
    strengths: ['Responsable', 'Discipliné', 'Maîtrise de soi', 'Bon gestionnaire', 'Ambitieux', 'Prudent'],
    weaknesses: ['Pessimiste', 'Snob', 'Compulsif', 'Renfermé', 'Condescendant'],
    compatibleWith: ['taureau', 'vierge', 'scorpion', 'poissons'],
  },
  {
    name: 'Verseau',
    slug: 'verseau',
    nameEn: 'Aquarius',
    symbol: '♒',
    emoji: '🏺',
    element: 'Air',
    modality: 'Fixe',
    rulingPlanet: 'Uranus',
    startMonth: 1,
    startDay: 20,
    endMonth: 2,
    endDay: 18,
    color: '#00CED1',
    gemstone: 'Améthyste',
    order: 11,
    shortDesc: 'Progressiste, original et humaniste, le Verseau est visionnaire et toujours en avance sur son temps.',
    description:
      'Le Verseau, signe d\'air fixe gouverné par Uranus, est le grand rebelle et visionnaire du zodiaque. Profondément humanistes, les natifs du Verseau se soucient du bien commun et rêvent d\'un monde meilleur. Originaux et indépendants, ils refusent les conventions et tracent leur propre chemin. Leur détachement émotionnel peut parfois les rendre distants, mais leur idéalisme est sincère.',
    strengths: ['Progressiste', 'Original', 'Humaniste', 'Indépendant', 'Intelligent', 'Innovant'],
    weaknesses: ['Distant', 'Imprévisible', 'Têtu', 'Non-compromis', 'Froid'],
    compatibleWith: ['gemeaux', 'balance', 'belier', 'sagittaire'],
  },
  {
    name: 'Poissons',
    slug: 'poissons',
    nameEn: 'Pisces',
    symbol: '♓',
    emoji: '🐟',
    element: 'Eau',
    modality: 'Mutable',
    rulingPlanet: 'Neptune',
    startMonth: 2,
    startDay: 19,
    endMonth: 3,
    endDay: 20,
    color: '#6495ED',
    gemstone: 'Aigue-marine',
    order: 12,
    shortDesc: 'Empathique, artistique et intuitif, les Poissons naviguent entre rêve et réalité avec grâce.',
    description:
      'Les Poissons, signe d\'eau mutable gouverné par Neptune, est le dernier signe du zodiaque, synthèse de tous les autres. Les natifs des Poissons sont extraordinairement empathiques, créatifs et spirituels. Ils vivent souvent dans un monde à mi-chemin entre rêve et réalité, ce qui leur confère une sensibilité artistique incomparable. Ils doivent cependant veiller à ne pas se laisser submerger par les émotions des autres.',
    strengths: ['Compatissant', 'Artistique', 'Intuitif', 'Doux', 'Sage', 'Musical'],
    weaknesses: ['Crédule', 'Trop émotif', 'Rêveur', 'Fuyant', 'Victime'],
    compatibleWith: ['cancer', 'scorpion', 'taureau', 'capricorne'],
  },
];

async function main() {
  console.log('🌟 Démarrage du seed AstroFrance...\n');

  // Upsert all 12 zodiac signs
  for (const sign of ZODIAC_SIGNS) {
    const result = await prisma.zodiacSign.upsert({
      where: { slug: sign.slug },
      update: sign,
      create: sign,
    });
    console.log(`✅ ${result.symbol} ${result.name} (${result.nameEn}) — créé/mis à jour`);
  }

  // Seed Tarot Major Arcana
  const { MAJOR_ARCANA } = require('../src/modules/tarot/tarot.data');
  console.log('\n🃏 Ingestion des 22 Arcanes Majeurs du Tarot...');
  for (const card of MAJOR_ARCANA) {
    await prisma.tarotCard.upsert({
      where: { slug: card.slug },
      update: card,
      create: card,
    });
  }
  console.log(`✅ ${MAJOR_ARCANA.length} cartes de Tarot insérées.`);

  console.log('\n🎉 Seed terminé ! Les 12 signes et les cartes de Tarot sont prêts.');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
