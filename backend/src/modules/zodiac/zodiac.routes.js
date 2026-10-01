/**
 * Zodiac Routes – /api/v1/zodiac
 */

const express = require('express');
const router = express.Router();
const zodiacController = require('./zodiac.controller');

// GET /api/v1/zodiac – list all 12 signs
router.get('/', zodiacController.getAll);

// GET /api/v1/zodiac/:slug – single sign by slug (e.g. "belier")
router.get('/:slug', zodiacController.getBySlug);

module.exports = router;
