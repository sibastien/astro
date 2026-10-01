/**
 * Horoscopes Routes – /api/v1/horoscopes
 */

const express = require('express');
const router = express.Router();
const horoscopeController = require('./horoscopes.controller');
const { authenticate, authorize } = require('../../middleware/authenticate');

// GET /api/v1/horoscopes/today – all 12 signs, today's general horoscope
router.get('/today', horoscopeController.getToday);

// GET /api/v1/horoscopes/:slug – today's horoscope for one sign
router.get('/:slug', horoscopeController.getBySign);

// GET /api/v1/horoscopes/:slug/:category – specific category horoscope
router.get('/:slug/:category', horoscopeController.getBySignAndCategory);

// POST /api/v1/horoscopes – create (admin/editor only)
router.post('/', authenticate, authorize('ADMIN', 'EDITOR'), horoscopeController.create);

// PUT /api/v1/horoscopes/:id – update (admin/editor only)
router.put('/:id', authenticate, authorize('ADMIN', 'EDITOR'), horoscopeController.update);

module.exports = router;
