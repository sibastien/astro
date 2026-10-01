/**
 * Articles Routes – /api/v1/articles
 */

const express = require('express');
const router = express.Router();
const articlesController = require('./articles.controller');
const { authenticate, authorize } = require('../../middleware/authenticate');

// GET /api/v1/articles – paginated list of published articles
router.get('/', articlesController.getAll);

// GET /api/v1/articles/:slug – single article by slug
router.get('/:slug', articlesController.getBySlug);

// POST /api/v1/articles – create (editor/admin)
router.post('/', authenticate, authorize('ADMIN', 'EDITOR'), articlesController.create);

// PUT /api/v1/articles/:id – update (editor/admin)
router.put('/:id', authenticate, authorize('ADMIN', 'EDITOR'), articlesController.update);

// DELETE /api/v1/articles/:id – delete (admin only)
router.delete('/:id', authenticate, authorize('ADMIN'), articlesController.remove);

module.exports = router;
