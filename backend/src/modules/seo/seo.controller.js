/**
 * SEO Controller – Sitemap, RSS Feed, and robots.txt
 * Dynamic XML sitemap generation for all public pages
 */

const prisma = require('../../config/prisma');

const SITE_URL = process.env.SITE_URL || 'https://astrofrance.fr';

// ── GET /sitemap.xml ─────────────────────────────────────────
const sitemap = async (req, res, next) => {
  try {
    // Fetch all published articles
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true, publishedAt: true },
      orderBy: { publishedAt: 'desc' },
    });

    // Fetch zodiac signs
    const signs = await prisma.zodiacSign.findMany({
      select: { slug: true, updatedAt: true },
    });

    // Fetch blog categories
    let categories = [];
    try {
      categories = await prisma.blogCategory.findMany({
        where: { isActive: true },
        select: { slug: true, updatedAt: true },
      });
    } catch (e) {
      // BlogCategory table may not exist yet
    }

    // Static pages
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/horoscope', priority: '0.9', changefreq: 'daily' },
      { url: '/signes-du-zodiaque', priority: '0.8', changefreq: 'monthly' },
      { url: '/tarot', priority: '0.8', changefreq: 'monthly' },
      { url: '/lune', priority: '0.7', changefreq: 'daily' },
      { url: '/compatibilite', priority: '0.7', changefreq: 'monthly' },
      { url: '/blog', priority: '0.8', changefreq: 'daily' },
      { url: '/articles', priority: '0.7', changefreq: 'daily' },
    ];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\n';
    xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

    // Static pages
    for (const p of staticPages) {
      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}${p.url}</loc>\n`;
      xml += `    <changefreq>${p.changefreq}</changefreq>\n`;
      xml += `    <priority>${p.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    // Zodiac sign pages
    for (const sign of signs) {
      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}/horoscope/${sign.slug}</loc>\n`;
      xml += `    <lastmod>${sign.updatedAt.toISOString()}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    }

    // Blog category pages
    for (const cat of categories) {
      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}/blog/categorie/${cat.slug}</loc>\n`;
      xml += `    <lastmod>${cat.updatedAt.toISOString()}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `  </url>\n`;
    }

    // Article/blog pages
    for (const article of articles) {
      const lastmod = (article.updatedAt || article.publishedAt).toISOString();
      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}/blog/${article.slug}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
      // Also add the /articles/ path for backward compat
      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}/articles/${article.slug}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `  </url>\n`;
    }

    xml += '</urlset>';

    res.set('Content-Type', 'application/xml');
    res.set('Cache-Control', 'public, max-age=3600');
    res.send(xml);
  } catch (err) {
    next(err);
  }
};

// ── GET /rss.xml – RSS 2.0 Feed ─────────────────────────────
const rssFeed = async (req, res, next) => {
  try {
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      take: 30,
      orderBy: { publishedAt: 'desc' },
      select: {
        title: true,
        slug: true,
        excerpt: true,
        category: true,
        publishedAt: true,
        coverImage: true,
      },
    });

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">\n';
    xml += '  <channel>\n';
    xml += '    <title>AstroFrance Blog – Astrologie, Horoscope &amp; Spiritualité</title>\n';
    xml += `    <link>${SITE_URL}/blog</link>\n`;
    xml += '    <description>Articles sur l\'astrologie, le tarot, les phases lunaires et la spiritualité. Découvrez votre horoscope et guides astrologiques.</description>\n';
    xml += '    <language>fr-FR</language>\n';
    xml += `    <atom:link href="${SITE_URL}/api/v1/seo/rss.xml" rel="self" type="application/rss+xml" />\n`;
    xml += `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`;
    xml += '    <copyright>© AstroFrance. Tous droits réservés.</copyright>\n';

    for (const a of articles) {
      xml += '    <item>\n';
      xml += `      <title><![CDATA[${a.title}]]></title>\n`;
      xml += `      <link>${SITE_URL}/blog/${a.slug}</link>\n`;
      xml += `      <guid isPermaLink="true">${SITE_URL}/blog/${a.slug}</guid>\n`;
      xml += `      <description><![CDATA[${a.excerpt}]]></description>\n`;
      xml += `      <category>${a.category}</category>\n`;
      if (a.publishedAt) {
        xml += `      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>\n`;
      }
      if (a.coverImage) {
        xml += `      <media:content url="${a.coverImage}" medium="image" />\n`;
      }
      xml += '    </item>\n';
    }

    xml += '  </channel>\n';
    xml += '</rss>';

    res.set('Content-Type', 'application/xml');
    res.set('Cache-Control', 'public, max-age=3600');
    res.send(xml);
  } catch (err) {
    next(err);
  }
};

// ── GET /robots.txt ──────────────────────────────────────────
const robotsTxt = (req, res) => {
  const robots = `# AstroFrance - Robots.txt
# https://astrofrance.fr

User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /connexion
Disallow: /inscription

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Google-specific
User-agent: Googlebot
Allow: /
Disallow: /admin
Disallow: /api/

# Bing-specific
User-agent: Bingbot
Allow: /
Disallow: /admin
Disallow: /api/
`;

  res.set('Content-Type', 'text/plain');
  res.set('Cache-Control', 'public, max-age=86400');
  res.send(robots);
};

module.exports = { sitemap, rssFeed, robotsTxt };
