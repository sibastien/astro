/**
 * SEO Routes – /api/v1/seo
 * Sitemap, RSS Feed, robots.txt
 */

const express = require('express');
const router = express.Router();
const seoController = require('./seo.controller');

// GET /seo/sitemap.xml – dynamic XML sitemap
router.get('/sitemap.xml', seoController.sitemap);

// GET /seo/rss.xml – RSS 2.0 feed
router.get('/rss.xml', seoController.rssFeed);

// GET /seo/robots.txt – robots.txt
router.get('/robots.txt', seoController.robotsTxt);

module.exports = router;
