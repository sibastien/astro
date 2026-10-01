/**
 * Users Routes – /api/v1/users
 */

const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../../middleware/authenticate');
const prisma = require('../../config/prisma');

// GET /api/v1/users/profile
router.get('/profile', authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true, email: true, firstName: true, lastName: true,
        role: true, isVerified: true, birthDate: true, birthTime: true,
        birthPlace: true, zodiacSign: { select: { name: true, slug: true, symbol: true } },
        createdAt: true,
      },
    });
    res.json({ success: true, data: { user } });
  } catch (err) { next(err); }
});

// PATCH /api/v1/users/profile
router.patch('/profile', authenticate, async (req, res, next) => {
  try {
    const { firstName, lastName, birthDate, birthTime, birthPlace } = req.body;
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { firstName, lastName, birthDate: birthDate ? new Date(birthDate) : undefined, birthTime, birthPlace },
      select: { id: true, email: true, firstName: true, lastName: true, birthDate: true, birthPlace: true },
    });
    res.json({ success: true, data: { user } });
  } catch (err) { next(err); }
});

// GET /api/v1/users – admin: list all users
router.get('/', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, firstName: true, lastName: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: { users } });
  } catch (err) { next(err); }
});

module.exports = router;
