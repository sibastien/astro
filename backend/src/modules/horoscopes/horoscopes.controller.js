/**
 * Horoscopes Controller
 */

const prisma = require('../../config/prisma');

const todayDate = () => new Date(new Date().toISOString().split('T')[0]);

// GET /horoscopes/today – all 12 signs general horoscope
const getToday = async (req, res, next) => {
  try {
    const horoscopes = await prisma.dailyHoroscope.findMany({
      where: { date: todayDate(), category: 'GENERAL', isPublished: true },
      include: {
        zodiacSign: {
          select: { name: true, slug: true, symbol: true, emoji: true, color: true },
        },
      },
      orderBy: { zodiacSign: { order: 'asc' } },
    });
    res.json({ success: true, data: { horoscopes, date: todayDate() } });
  } catch (err) {
    next(err);
  }
};

// GET /horoscopes/:slug – today for one sign, all categories
const getBySign = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const dateParam = req.query.date ? new Date(req.query.date) : todayDate();

    const sign = await prisma.zodiacSign.findUnique({ where: { slug } });
    if (!sign) return res.status(404).json({ success: false, message: 'Signe introuvable.' });

    const horoscopes = await prisma.dailyHoroscope.findMany({
      where: { zodiacSignId: sign.id, date: dateParam, isPublished: true },
      orderBy: { category: 'asc' },
    });

    res.json({ success: true, data: { sign, horoscopes, date: dateParam } });
  } catch (err) {
    next(err);
  }
};

// GET /horoscopes/:slug/:category
const getBySignAndCategory = async (req, res, next) => {
  try {
    const { slug, category } = req.params;
    const catUpper = category.toUpperCase();

    const sign = await prisma.zodiacSign.findUnique({ where: { slug } });
    if (!sign) return res.status(404).json({ success: false, message: 'Signe introuvable.' });

    const horoscope = await prisma.dailyHoroscope.findFirst({
      where: {
        zodiacSignId: sign.id,
        date: todayDate(),
        category: catUpper,
        isPublished: true,
      },
    });

    res.json({ success: true, data: { horoscope, sign } });
  } catch (err) {
    next(err);
  }
};

// POST /horoscopes – create
const create = async (req, res, next) => {
  try {
    const { zodiacSlug, date, category, content, luckyNumber, luckyColor, rating, keywords, planetaryInfo } = req.body;

    const sign = await prisma.zodiacSign.findUnique({ where: { slug: zodiacSlug } });
    if (!sign) return res.status(404).json({ success: false, message: 'Signe introuvable.' });

    const horoscope = await prisma.dailyHoroscope.create({
      data: {
        zodiacSignId: sign.id,
        date: new Date(date),
        category: category || 'GENERAL',
        content,
        luckyNumber,
        luckyColor,
        rating,
        keywords: keywords || [],
        planetaryInfo,
        isPublished: true,
        authorId: req.user.id,
      },
    });

    res.status(201).json({ success: true, data: { horoscope } });
  } catch (err) {
    next(err);
  }
};

// PUT /horoscopes/:id – update
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const horoscope = await prisma.dailyHoroscope.update({
      where: { id },
      data: req.body,
    });
    res.json({ success: true, data: { horoscope } });
  } catch (err) {
    next(err);
  }
};

module.exports = { getToday, getBySign, getBySignAndCategory, create, update };
