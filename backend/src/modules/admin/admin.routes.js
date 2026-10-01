/**
 * Admin Routes – /api/v1/admin
 */

const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../../middleware/authenticate');
const prisma = require('../../config/prisma');

// All admin routes require ADMIN role
router.use(authenticate, authorize('ADMIN'));

// GET /api/v1/admin/stats – dashboard stats
router.get('/stats', async (req, res, next) => {
  try {
    const [userCount, articleCount, horoscopeCount, zodiacCount] = await prisma.$transaction([
      prisma.user.count(),
      prisma.article.count(),
      prisma.dailyHoroscope.count(),
      prisma.zodiacSign.count(),
    ]);

    res.json({
      success: true,
      data: {
        stats: { users: userCount, articles: articleCount, horoscopes: horoscopeCount, zodiacSigns: zodiacCount },
      },
    });
  } catch (err) { next(err); }
});

// PATCH /api/v1/admin/users/:id/role
router.patch('/users/:id/role', async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!['USER', 'EDITOR', 'ADMIN'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Rôle invalide.' });
    }
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { role },
      select: { id: true, email: true, role: true },
    });
    res.json({ success: true, data: { user } });
  } catch (err) { next(err); }
});

module.exports = router;
