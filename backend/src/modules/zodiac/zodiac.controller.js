/**
 * Zodiac Controller
 */

const prisma = require('../../config/prisma');

const getAll = async (req, res, next) => {
  try {
    const signs = await prisma.zodiacSign.findMany({
      orderBy: { order: 'asc' },
      select: {
        id: true, name: true, slug: true, nameEn: true,
        symbol: true, emoji: true, element: true, modality: true,
        rulingPlanet: true, color: true, shortDesc: true, order: true,
        startMonth: true, startDay: true, endMonth: true, endDay: true,
      },
    });
    res.json({ success: true, data: { signs } });
  } catch (err) {
    next(err);
  }
};

const getBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const sign = await prisma.zodiacSign.findUnique({
      where: { slug },
      include: {
        horoscopes: {
          where: {
            date: { equals: new Date(new Date().toISOString().split('T')[0]) },
            isPublished: true,
            category: 'GENERAL',
          },
          take: 1,
        },
      },
    });

    if (!sign) {
      return res.status(404).json({ success: false, message: 'Signe du zodiaque introuvable.' });
    }

    res.json({ success: true, data: { sign } });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getBySlug };
