/**
 * Admin Routes – /api/v1/admin
 */

const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../../middleware/authenticate');
const prisma = require('../../config/prisma');
const { ensureTodayHoroscopes } = require('../horoscopes/horoscopeGenerator');
const { MAJOR_ARCANA } = require('../tarot/tarot.data');

// All admin routes require ADMIN role
router.use(authenticate, authorize('ADMIN'));

// GET /api/v1/admin/stats – dashboard stats
router.get('/stats', async (req, res, next) => {
  try {
    const today = new Date(new Date().toISOString().split('T')[0]);

    const [userCount, articleCount, horoscopeCount, zodiacCount, tarotCount, todayHoroscopesCount] = await prisma.$transaction([
      prisma.user.count(),
      prisma.article.count(),
      prisma.dailyHoroscope.count(),
      prisma.zodiacSign.count(),
      prisma.tarotCard.count(),
      prisma.dailyHoroscope.count({ where: { date: today } }),
    ]);

    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, email: true, firstName: true, lastName: true, role: true, createdAt: true },
    });

    res.json({
      success: true,
      data: {
        stats: {
          users: userCount,
          articles: articleCount,
          horoscopesTotal: horoscopeCount,
          todayHoroscopes: todayHoroscopesCount,
          zodiacSigns: zodiacCount,
          tarotCards: tarotCount,
        },
        recentUsers,
      },
    });
  } catch (err) { next(err); }
});

// GET /api/v1/admin/users – list users with search and pagination
router.get('/users', async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const skip = (page - 1) * limit;
    const search = req.query.search ? String(req.query.search).trim() : '';

    const where = search ? {
      OR: [
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
      ],
    } : {};

    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isVerified: true,
          birthDate: true,
          createdAt: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (err) { next(err); }
});

// PATCH /api/v1/admin/users/:id/role – update user role
router.patch('/users/:id/role', async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!['USER', 'EDITOR', 'ADMIN'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Rôle invalide.' });
    }
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { role },
      select: { id: true, email: true, firstName: true, lastName: true, role: true },
    });
    res.json({ success: true, data: { user } });
  } catch (err) { next(err); }
});

// POST /api/v1/admin/sync-horoscopes – trigger today's horoscope generation
router.post('/sync-horoscopes', async (req, res, next) => {
  try {
    const result = await ensureTodayHoroscopes();
    res.json({
      success: true,
      message: `Horoscopes générés avec succès (${result.created} créés).`,
      data: result,
    });
  } catch (err) { next(err); }
});

// POST /api/v1/admin/seed-tarot – seed or update Tarot cards
router.post('/seed-tarot', async (req, res, next) => {
  try {
    let count = 0;
    for (const card of MAJOR_ARCANA) {
      await prisma.tarotCard.upsert({
        where: { slug: card.slug },
        update: card,
        create: card,
      });
      count++;
    }
    res.json({
      success: true,
      message: `${count} Arcanes Majeurs du Tarot enregistrés avec succès.`,
    });
  } catch (err) { next(err); }
});

module.exports = router;

