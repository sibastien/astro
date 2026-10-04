/**
 * Blog Controller – WordPress-like blog management
 * Enhanced version of articles controller with categories, tags, search, related posts
 */

const prisma = require('../../config/prisma');

// ── Helper: slugify ──────────────────────────────────────────
function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// ── Helper: estimate reading time ────────────────────────────
function estimateReadingTime(content) {
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ── Public article select fields ─────────────────────────────
const publicSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  coverImage: true,
  category: true,
  tags: true,
  readingTimeMin: true,
  viewCount: true,
  isFeatured: true,
  publishedAt: true,
  blogCategory: { select: { id: true, name: true, slug: true, color: true, icon: true } },
  blogTags: { select: { id: true, name: true, slug: true } },
};

// ═══════════════════════════════════════════════════════════════
// PUBLIC ENDPOINTS
// ═══════════════════════════════════════════════════════════════

// GET /blog – paginated blog posts with filters
const getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const { category, tag, search, featured } = req.query;

    const where = { status: 'PUBLISHED' };

    // Filter by blog category slug
    if (category) {
      where.blogCategory = { slug: category };
    }

    // Filter by blog tag slug
    if (tag) {
      where.blogTags = { some: { slug: tag } };
    }

    // Search in title and excerpt
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Featured only
    if (featured === 'true') {
      where.isFeatured = true;
    }

    const [articles, total] = await prisma.$transaction([
      prisma.article.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ isFeatured: 'desc' }, { publishedAt: 'desc' }],
        select: publicSelect,
      }),
      prisma.article.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        articles,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /blog/featured – featured posts
const getFeatured = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED', isFeatured: true },
      take: limit,
      orderBy: { publishedAt: 'desc' },
      select: publicSelect,
    });

    res.json({ success: true, data: { articles } });
  } catch (err) {
    next(err);
  }
};

// GET /blog/recent – latest posts
const getRecent = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      take: limit,
      orderBy: { publishedAt: 'desc' },
      select: publicSelect,
    });

    res.json({ success: true, data: { articles } });
  } catch (err) {
    next(err);
  }
};

// GET /blog/:slug – single post by slug
const getPost = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        blogCategory: { select: { id: true, name: true, slug: true, color: true, icon: true } },
        blogTags: { select: { id: true, name: true, slug: true } },
      },
    });

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

// GET /blog/:slug/related – related posts (same category + overlapping tags)
const getRelated = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const limit = parseInt(req.query.limit) || 3;

    const current = await prisma.article.findUnique({
      where: { slug },
      select: { id: true, blogCategoryId: true, tags: true, blogTags: { select: { id: true } } },
    });

    if (!current) {
      return res.status(404).json({ success: false, message: 'Article introuvable.' });
    }

    const where = {
      status: 'PUBLISHED',
      id: { not: current.id },
      OR: [],
    };

    if (current.blogCategoryId) {
      where.OR.push({ blogCategoryId: current.blogCategoryId });
    }
    if (current.blogTags.length > 0) {
      where.OR.push({ blogTags: { some: { id: { in: current.blogTags.map(t => t.id) } } } });
    }
    if (current.tags.length > 0) {
      where.OR.push({ tags: { hasSome: current.tags } });
    }

    // If no OR conditions, just get latest
    if (where.OR.length === 0) delete where.OR;

    const articles = await prisma.article.findMany({
      where,
      take: limit,
      orderBy: { publishedAt: 'desc' },
      select: publicSelect,
    });

    res.json({ success: true, data: { articles } });
  } catch (err) {
    next(err);
  }
};

// GET /blog/search?q=... – full-text search
const searchPosts = async (req, res, next) => {
  try {
    const q = req.query.q || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    if (!q.trim()) {
      return res.json({ success: true, data: { articles: [], pagination: { total: 0, page, limit, pages: 0 } } });
    }

    const where = {
      status: 'PUBLISHED',
      OR: [
        { title: { contains: q, mode: 'insensitive' } },
        { excerpt: { contains: q, mode: 'insensitive' } },
        { content: { contains: q, mode: 'insensitive' } },
      ],
    };

    const [articles, total] = await prisma.$transaction([
      prisma.article.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
        select: publicSelect,
      }),
      prisma.article.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        articles,
        query: q,
        pagination: { total, page, limit, pages: Math.ceil(total / limit) },
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /blog/archive – posts grouped by month/year
const getArchive = async (req, res, next) => {
  try {
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      select: { publishedAt: true, title: true, slug: true },
    });

    // Group by year-month
    const archive = {};
    articles.forEach((a) => {
      if (!a.publishedAt) return;
      const d = new Date(a.publishedAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!archive[key]) archive[key] = { year: d.getFullYear(), month: d.getMonth() + 1, posts: [] };
      archive[key].posts.push({ title: a.title, slug: a.slug });
    });

    res.json({ success: true, data: { archive: Object.values(archive) } });
  } catch (err) {
    next(err);
  }
};

// ═══════════════════════════════════════════════════════════════
// CATEGORY & TAG PUBLIC ENDPOINTS
// ═══════════════════════════════════════════════════════════════

// GET /blog/categories – all active categories with post count
const getCategories = async (req, res, next) => {
  try {
    const categories = await prisma.blogCategory.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: { _count: { select: { articles: { where: { status: 'PUBLISHED' } } } } },
    });

    res.json({ success: true, data: { categories } });
  } catch (err) {
    next(err);
  }
};

// GET /blog/tags – all tags with post count
const getTags = async (req, res, next) => {
  try {
    const tags = await prisma.blogTag.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { articles: { where: { status: 'PUBLISHED' } } } } },
    });

    res.json({ success: true, data: { tags } });
  } catch (err) {
    next(err);
  }
};

// ═══════════════════════════════════════════════════════════════
// ADMIN ENDPOINTS (CRUD)
// ═══════════════════════════════════════════════════════════════

// GET /blog/admin/posts – all posts (including drafts) for admin
const adminGetPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const status = req.query.status;

    const where = {};
    if (status) where.status = status;

    const [articles, total] = await prisma.$transaction([
      prisma.article.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        select: {
          ...publicSelect,
          status: true,
          content: true,
          metaTitle: true,
          metaDescription: true,
          scheduledAt: true,
          createdAt: true,
          updatedAt: true,
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

// POST /blog/admin/posts – create new post
const adminCreatePost = async (req, res, next) => {
  try {
    const {
      title, content, excerpt, coverImage, category,
      blogCategoryId, tagIds, metaTitle, metaDescription,
      status, isFeatured, scheduledAt,
    } = req.body;

    const slug = slugify(title);
    const readingTimeMin = estimateReadingTime(content || '');

    const data = {
      title,
      slug,
      content: content || '',
      excerpt: excerpt || '',
      coverImage,
      category: category || 'Astrologie',
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || (excerpt || '').substring(0, 160),
      readingTimeMin,
      isFeatured: isFeatured || false,
      authorId: req.user.id,
      status: status || 'DRAFT',
    };

    if (blogCategoryId) data.blogCategoryId = blogCategoryId;
    if (tagIds && tagIds.length > 0) {
      data.blogTags = { connect: tagIds.map(id => ({ id })) };
    }
    if (scheduledAt) data.scheduledAt = new Date(scheduledAt);
    if (status === 'PUBLISHED') data.publishedAt = new Date();

    const article = await prisma.article.create({ data });
    res.status(201).json({ success: true, data: { article } });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ success: false, message: 'Un article avec ce titre existe déjà.' });
    }
    next(err);
  }
};

// PUT /blog/admin/posts/:id – update post
const adminUpdatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title, content, excerpt, coverImage, category,
      blogCategoryId, tagIds, metaTitle, metaDescription,
      status, isFeatured, scheduledAt,
    } = req.body;

    const data = {};
    if (title !== undefined) {
      data.title = title;
      data.slug = slugify(title);
    }
    if (content !== undefined) {
      data.content = content;
      data.readingTimeMin = estimateReadingTime(content);
    }
    if (excerpt !== undefined) data.excerpt = excerpt;
    if (coverImage !== undefined) data.coverImage = coverImage;
    if (category !== undefined) data.category = category;
    if (blogCategoryId !== undefined) data.blogCategoryId = blogCategoryId || null;
    if (metaTitle !== undefined) data.metaTitle = metaTitle;
    if (metaDescription !== undefined) data.metaDescription = metaDescription;
    if (isFeatured !== undefined) data.isFeatured = isFeatured;
    if (scheduledAt !== undefined) data.scheduledAt = scheduledAt ? new Date(scheduledAt) : null;

    // Handle tag updates
    if (tagIds !== undefined) {
      data.blogTags = {
        set: [], // disconnect all
        connect: tagIds.map(tid => ({ id: tid })),
      };
    }

    // Auto-set publishedAt when publishing
    if (status !== undefined) {
      data.status = status;
      if (status === 'PUBLISHED' && !data.publishedAt) {
        data.publishedAt = new Date();
      }
    }

    const article = await prisma.article.update({ where: { id }, data });
    res.json({ success: true, data: { article } });
  } catch (err) {
    next(err);
  }
};

// DELETE /blog/admin/posts/:id – delete post
const adminDeletePost = async (req, res, next) => {
  try {
    await prisma.article.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Article supprimé.' });
  } catch (err) {
    next(err);
  }
};

// ── Category CRUD ────────────────────────────────────────────
const adminCreateCategory = async (req, res, next) => {
  try {
    const { name, description, color, icon, order } = req.body;
    const cat = await prisma.blogCategory.create({
      data: { name, slug: slugify(name), description, color, icon, order: order || 0 },
    });
    res.status(201).json({ success: true, data: { category: cat } });
  } catch (err) {
    next(err);
  }
};

const adminUpdateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, color, icon, order, isActive } = req.body;
    const data = {};
    if (name !== undefined) { data.name = name; data.slug = slugify(name); }
    if (description !== undefined) data.description = description;
    if (color !== undefined) data.color = color;
    if (icon !== undefined) data.icon = icon;
    if (order !== undefined) data.order = order;
    if (isActive !== undefined) data.isActive = isActive;

    const cat = await prisma.blogCategory.update({ where: { id }, data });
    res.json({ success: true, data: { category: cat } });
  } catch (err) {
    next(err);
  }
};

const adminDeleteCategory = async (req, res, next) => {
  try {
    await prisma.blogCategory.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Catégorie supprimée.' });
  } catch (err) {
    next(err);
  }
};

// ── Tag CRUD ─────────────────────────────────────────────────
const adminCreateTag = async (req, res, next) => {
  try {
    const { name } = req.body;
    const tag = await prisma.blogTag.create({ data: { name, slug: slugify(name) } });
    res.status(201).json({ success: true, data: { tag } });
  } catch (err) {
    next(err);
  }
};

const adminDeleteTag = async (req, res, next) => {
  try {
    await prisma.blogTag.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Tag supprimé.' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  // Public
  getPosts,
  getPost,
  getFeatured,
  getRecent,
  getRelated,
  searchPosts,
  getArchive,
  getCategories,
  getTags,
  // Admin
  adminGetPosts,
  adminCreatePost,
  adminUpdatePost,
  adminDeletePost,
  adminCreateCategory,
  adminUpdateCategory,
  adminDeleteCategory,
  adminCreateTag,
  adminDeleteTag,
};
