/**
 * Compatibility Routes – /api/v1/compatibility
 */

const express = require('express');
const router = express.Router();
const prisma = require('../../config/prisma');

// GET /api/v1/compatibility/:slugA/:slugB
router.get('/:slugA/:slugB', async (req, res, next) => {
  try {
    const { slugA, slugB } = req.params;

    const [signA, signB] = await Promise.all([
      prisma.zodiacSign.findUnique({ where: { slug: slugA } }),
      prisma.zodiacSign.findUnique({ where: { slug: slugB } }),
    ]);

    if (!signA || !signB) {
      return res.status(404).json({ success: false, message: 'Signe(s) introuvable(s).' });
    }

    // Try both orderings (A-B or B-A stored)
    const compatibility = await prisma.compatibility.findFirst({
      where: {
        OR: [
          { signAId: signA.id, signBId: signB.id },
          { signAId: signB.id, signBId: signA.id },
        ],
      },
      include: {
        signA: { select: { name: true, slug: true, symbol: true, element: true } },
        signB: { select: { name: true, slug: true, symbol: true, element: true } },
      },
    });

    res.json({ success: true, data: { compatibility, signA, signB } });
  } catch (err) { next(err); }
});

// GET /api/v1/compatibility/:slug/all – all compatibilities for one sign
router.get('/:slug/all', async (req, res, next) => {
  try {
    const sign = await prisma.zodiacSign.findUnique({ where: { slug: req.params.slug } });
    if (!sign) return res.status(404).json({ success: false, message: 'Signe introuvable.' });

    const compatibilities = await prisma.compatibility.findMany({
      where: { OR: [{ signAId: sign.id }, { signBId: sign.id }] },
      include: {
        signA: { select: { name: true, slug: true, symbol: true } },
        signB: { select: { name: true, slug: true, symbol: true } },
      },
      orderBy: { scoreGlobal: 'desc' },
    });

    res.json({ success: true, data: { compatibilities } });
  } catch (err) { next(err); }
});

module.exports = router;
