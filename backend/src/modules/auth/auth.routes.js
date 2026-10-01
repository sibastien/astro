/**
 * Auth Routes – /api/v1/auth
 */

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('./auth.controller');
const { authenticate } = require('../../middleware/authenticate');
const validate = require('../../middleware/validate');

// POST /api/v1/auth/register
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 8 }).withMessage('Le mot de passe doit comporter au moins 8 caractères'),
    body('firstName').optional().trim().isLength({ max: 50 }),
    body('lastName').optional().trim().isLength({ max: 50 }),
  ],
  validate,
  authController.register
);

// POST /api/v1/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
    body('password').notEmpty().withMessage('Mot de passe requis'),
  ],
  validate,
  authController.login
);

// POST /api/v1/auth/refresh
router.post('/refresh', authController.refreshToken);

// POST /api/v1/auth/logout
router.post('/logout', authenticate, authController.logout);

// GET /api/v1/auth/me
router.get('/me', authenticate, authController.getMe);

module.exports = router;
