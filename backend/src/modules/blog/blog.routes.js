/**
 * Blog Routes – /api/v1/blog
 * WordPress-like blog endpoints with public + admin sections
 */

const express = require('express');
const router = express.Router();
const blogController = require('./blog.controller');
const { authenticate, authorize } = require('../../middleware/authenticate');

// ═══════════════════════════════════════════════════════════════
// PUBLIC ROUTES
// ═══════════════════════════════════════════════════════════════

// GET /blog – paginated blog posts (supports ?category, ?tag, ?search, ?featured)
router.get('/', blogController.getPosts);

// GET /blog/featured – featured/highlighted posts
router.get('/featured', blogController.getFeatured);

// GET /blog/recent – latest posts
router.get('/recent', blogController.getRecent);

// GET /blog/search?q=... – full-text search
router.get('/search', blogController.searchPosts);

// GET /blog/archive – posts grouped by month/year
router.get('/archive', blogController.getArchive);

// GET /blog/categories – all categories with post count
router.get('/categories', blogController.getCategories);

// GET /blog/tags – all tags with post count
router.get('/tags', blogController.getTags);

// GET /blog/:slug – single post by slug
router.get('/:slug', blogController.getPost);

// GET /blog/:slug/related – related posts
router.get('/:slug/related', blogController.getRelated);

// ═══════════════════════════════════════════════════════════════
// ADMIN ROUTES (EDITOR/ADMIN only)
// ═══════════════════════════════════════════════════════════════

// Posts CRUD
router.get('/admin/posts', authenticate, authorize('ADMIN', 'EDITOR'), blogController.adminGetPosts);
router.post('/admin/posts', authenticate, authorize('ADMIN', 'EDITOR'), blogController.adminCreatePost);
router.put('/admin/posts/:id', authenticate, authorize('ADMIN', 'EDITOR'), blogController.adminUpdatePost);
router.delete('/admin/posts/:id', authenticate, authorize('ADMIN'), blogController.adminDeletePost);

// Category CRUD
router.post('/admin/categories', authenticate, authorize('ADMIN'), blogController.adminCreateCategory);
router.put('/admin/categories/:id', authenticate, authorize('ADMIN'), blogController.adminUpdateCategory);
router.delete('/admin/categories/:id', authenticate, authorize('ADMIN'), blogController.adminDeleteCategory);

// Tag CRUD
router.post('/admin/tags', authenticate, authorize('ADMIN', 'EDITOR'), blogController.adminCreateTag);
router.delete('/admin/tags/:id', authenticate, authorize('ADMIN'), blogController.adminDeleteTag);

module.exports = router;
