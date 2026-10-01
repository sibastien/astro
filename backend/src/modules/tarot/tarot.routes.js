/**
 * Tarot Routes – /api/v1/tarot
 * Stub – full implementation in Phase 2
 */

const express = require('express');
const router = express.Router();
const prisma = require('../../config/prisma');

// GET /api/v1/tarot – list all tarot cards
router.get('/', async (req, res, next) => {
  try {
    const cards = await prisma.tarotCard.findMany({
      where: { isActive: true },
      orderBy: [{ arcana: 'asc' }, { number: 'asc' }],
    });
    res.json({ success: true, data: { cards } });
  } catch (err) { next(err); }
});

// GET /api/v1/tarot/:slug
router.get('/:slug', async (req, res, next) => {
  try {
    const card = await prisma.tarotCard.findUnique({ where: { slug: req.params.slug } });
    if (!card) return res.status(404).json({ success: false, message: 'Carte introuvable.' });
    res.json({ success: true, data: { card } });
  } catch (err) { next(err); }
});

// GET /api/v1/tarot/draw/daily – draw 3 random cards
router.get('/draw/daily', async (req, res, next) => {
  try {
    const count = await prisma.tarotCard.count({ where: { isActive: true } });
    const skip = Math.floor(Math.random() * Math.max(count - 3, 0));
    const cards = await prisma.tarotCard.findMany({ where: { isActive: true }, skip, take: 3 });
    res.json({ success: true, data: { cards } });
  } catch (err) { next(err); }
});

module.exports = router;
