/**
 * Tarot Routes – /api/v1/tarot
 * Full implementation with Major Arcana dataset & auto-seed fallback
 */

const express = require('express');
const router = express.Router();
const prisma = require('../../config/prisma');
const { MAJOR_ARCANA } = require('./tarot.data');

// Internal helper to ensure tarot cards are seeded
const ensureTarotSeeded = async () => {
  const count = await prisma.tarotCard.count();
  if (count === 0) {
    for (const card of MAJOR_ARCANA) {
      await prisma.tarotCard.upsert({
        where: { slug: card.slug },
        update: card,
        create: card,
      });
    }
  }
};

// GET /api/v1/tarot – list all tarot cards
router.get('/', async (req, res, next) => {
  try {
    await ensureTarotSeeded();
    const cards = await prisma.tarotCard.findMany({
      where: { isActive: true },
      orderBy: [{ arcana: 'asc' }, { number: 'asc' }],
    });
    res.json({ success: true, data: { cards } });
  } catch (err) {
    // If DB fails or not connected, fallback to in-memory dataset
    res.json({ success: true, data: { cards: MAJOR_ARCANA } });
  }
});

// GET /api/v1/tarot/draw/daily – draw 1 or 3 random cards with upright/reversed orientation
router.get('/draw/daily', async (req, res, next) => {
  try {
    await ensureTarotSeeded();
    const countParam = Math.min(Math.max(parseInt(req.query.count) || 3, 1), 5);
    
    // Fetch all active cards and shuffle
    let allCards = await prisma.tarotCard.findMany({ where: { isActive: true } });
    if (!allCards || allCards.length === 0) {
      allCards = [...MAJOR_ARCANA];
    }

    const shuffled = [...allCards].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, countParam);

    const positionLabels3 = ['Passé (Racines)', 'Présent (Énergie Actuelle)', 'Futur (Horizon & Conseil)'];
    const positionLabels1 = ['Guidance du Jour'];

    const cards = selected.map((card, idx) => {
      const isReversed = Math.random() > 0.6; // 40% reversed
      const position = countParam === 1 
        ? positionLabels1[0] 
        : (positionLabels3[idx] || `Position ${idx + 1}`);

      return {
        ...card,
        isReversed,
        position,
        interpretation: isReversed ? card.meaningReversed : card.meaningUpright,
      };
    });

    res.json({
      success: true,
      data: {
        type: countParam === 1 ? 'daily_card' : 'three_card_spread',
        cards,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err) {
    // Graceful fallback
    const countParam = Math.min(Math.max(parseInt(req.query.count) || 3, 1), 5);
    const shuffled = [...MAJOR_ARCANA].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, countParam);
    const cards = selected.map((card, idx) => ({
      ...card,
      isReversed: Math.random() > 0.6,
      position: countParam === 1 ? 'Guidance du Jour' : `Position ${idx + 1}`,
      interpretation: card.meaningUpright,
    }));
    res.json({
      success: true,
      data: {
        type: countParam === 1 ? 'daily_card' : 'three_card_spread',
        cards,
        timestamp: new Date().toISOString(),
      },
    });
  }
});

// GET /api/v1/tarot/:slug – single card
router.get('/:slug', async (req, res, next) => {
  try {
    await ensureTarotSeeded();
    let card = await prisma.tarotCard.findUnique({ where: { slug: req.params.slug } });
    if (!card) {
      card = MAJOR_ARCANA.find((c) => c.slug === req.params.slug);
    }
    if (!card) return res.status(404).json({ success: false, message: 'Carte introuvable.' });
    res.json({ success: true, data: { card } });
  } catch (err) {
    const card = MAJOR_ARCANA.find((c) => c.slug === req.params.slug);
    if (card) return res.json({ success: true, data: { card } });
    next(err);
  }
});

module.exports = router;

