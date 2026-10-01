/**
 * Moon Routes – /api/v1/moon
 * Stub – full ephemeris integration in Phase 3
 */

const express = require('express');
const router = express.Router();
const prisma = require('../../config/prisma');

// GET /api/v1/moon/today
router.get('/today', async (req, res, next) => {
  try {
    const today = new Date(new Date().toISOString().split('T')[0]);
    const phase = await prisma.moonPhase.findFirst({
      where: { date: today, isPublished: true },
      orderBy: { date: 'desc' },
    });
    res.json({ success: true, data: { phase } });
  } catch (err) { next(err); }
});

// GET /api/v1/moon/calendar?month=YYYY-MM
router.get('/calendar', async (req, res, next) => {
  try {
    const month = req.query.month || new Date().toISOString().slice(0, 7);
    const start = new Date(`${month}-01`);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);

    const phases = await prisma.moonPhase.findMany({
      where: { date: { gte: start, lte: end }, isPublished: true },
      orderBy: { date: 'asc' },
    });
    res.json({ success: true, data: { phases, month } });
  } catch (err) { next(err); }
});

module.exports = router;
