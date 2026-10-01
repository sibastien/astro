/**
 * Auth Controller
 */

const authService = require('./auth.service');
const prisma = require('../../config/prisma');

const register = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await authService.register(req.body);
    res.status(201).json({
      success: true,
      message: 'Compte créé avec succès.',
      data: { user, accessToken, refreshToken },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await authService.login(req.body);
    res.json({
      success: true,
      message: 'Connexion réussie.',
      data: { user, accessToken, refreshToken },
    });
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const token = req.body.refreshToken;
    const tokens = await authService.refreshToken(token);
    res.json({ success: true, data: tokens });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logout(req.user.id);
    res.json({ success: true, message: 'Déconnexion réussie.' });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true, email: true, firstName: true, lastName: true,
        role: true, isVerified: true, birthDate: true,
        birthPlace: true, zodiacSign: { select: { name: true, slug: true, symbol: true } },
        createdAt: true,
      },
    });
    res.json({ success: true, data: { user } });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, refreshToken, logout, getMe };
