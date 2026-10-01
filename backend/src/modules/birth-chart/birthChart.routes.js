/**
 * Birth Chart Routes – /api/v1/birth-chart
 * Stub – ephemeris calculation engine to be integrated in Phase 3
 * Architecture is ready to plug in Swiss Ephemeris or Astro.js
 */

const express = require('express');
const router = express.Router();
const { authenticate } = require('../../middleware/authenticate');

// POST /api/v1/birth-chart/calculate
router.post('/calculate', async (req, res) => {
  // TODO Phase 3: Integrate Swiss Ephemeris / astronomia library
  const { birthDate, birthTime, birthPlace, latitude, longitude } = req.body;

  res.json({
    success: true,
    message: 'Calcul de thème natal – disponible en Phase 3.',
    data: {
      input: { birthDate, birthTime, birthPlace, latitude, longitude },
      planets: [], // Will contain Sun, Moon, Mercury, Venus, Mars, etc.
      houses: [],  // Placidus house system
      aspects: [], // Major aspects
    },
  });
});

// GET /api/v1/birth-chart/my-chart (authenticated)
router.get('/my-chart', authenticate, async (req, res) => {
  res.json({
    success: true,
    message: 'Thème natal personnel – disponible en Phase 3.',
    data: null,
  });
});

module.exports = router;
