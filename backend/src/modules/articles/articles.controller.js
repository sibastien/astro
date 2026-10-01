/**
 * Articles Controller
 */

const prisma = require('../../config/prisma');

// GET /articles – paginated, published only
const getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const category = req.query.category;
    const tag = req.query.tag;

    const where = { status: 'PUBLISHED' };
    if (category) where.category = category;
    if (tag) where.tags = { has: tag };

    const [articles, total] = await prisma.$transaction([
      prisma.article.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
        select: {
          id: true, title: true, slug: true, excerpt: true,
          coverImage: true, category: true, tags: true,
          readingTimeMin: true, viewCount: true, publishedAt: true,
        },
      }),
      prisma.article.count({ where }),
    ]);

    res.json({
      success: true,
      data: { articles, pagination: { total, page, limit, pages: Math.ceil(total / limit) } },
    });
  } catch (err) {
    next(err);
  }
};

// GET /articles/:slug
const getBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const article = await prisma.article.findUnique({ where: { slug } });

    if (!article || article.status !== 'PUBLISHED') {
      return res.status(404).json({ success: false, message: 'Article introuvable.' });
    }

    // Increment view count asynchronously
    prisma.article.update({ where: { slug }, data: { viewCount: { increment: 1 } } }).catch(() => {});

    res.json({ success: true, data: { article } });
  } catch (err) {
    next(err);
  }
};

// POST /articles
const create = async (req, res, next) => {
  try {
    const { title, slug, excerpt, content, coverImage, tags, category, metaTitle, metaDescription, readingTimeMin } = req.body;

    const article = await prisma.article.create({
      data: {
        title, slug, excerpt, content, coverImage,
        tags: tags || [],
        category: category || 'Astrologie',
        metaTitle, metaDescription,
        readingTimeMin,
        authorId: req.user.id,
        status: 'DRAFT',
      },
    });

    res.status(201).json({ success: true, data: { article } });
  } catch (err) {
    next(err);
  }
};

// PUT /articles/:id
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    // Auto-set publishedAt when publishing
    if (data.status === 'PUBLISHED' && !data.publishedAt) {
      data.publishedAt = new Date();
    }

    const article = await prisma.article.update({ where: { id }, data });
    res.json({ success: true, data: { article } });
  } catch (err) {
    next(err);
  }
};

// DELETE /articles/:id
const remove = async (req, res, next) => {
  try {
    await prisma.article.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Article supprimé.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getBySlug, create, update, remove };
