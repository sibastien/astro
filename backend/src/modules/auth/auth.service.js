/**
 * Auth Service – business logic for authentication
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../../config/prisma');
const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN,
} = require('../../config/env');

const SALT_ROUNDS = 12;

// ── Token Helpers ────────────────────────────────────────────

const generateAccessToken = (userId) =>
  jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

const generateRefreshToken = (userId) =>
  jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });

// ── Register ─────────────────────────────────────────────────

const register = async ({ email, password, firstName, lastName }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    const err = new Error('Un compte avec cet email existe déjà.');
    err.statusCode = 409;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword, firstName, lastName },
    select: { id: true, email: true, firstName: true, lastName: true, role: true, createdAt: true },
  });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return { user, accessToken, refreshToken };
};

// ── Login ────────────────────────────────────────────────────

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    const err = new Error('Email ou mot de passe incorrect.');
    err.statusCode = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error('Email ou mot de passe incorrect.');
    err.statusCode = 401;
    throw err;
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  const { password: _pw, refreshToken: _rt, ...safeUser } = user;
  return { user: safeUser, accessToken, refreshToken };
};

// ── Refresh Token ────────────────────────────────────────────

const refreshToken = async (token) => {
  if (!token) {
    const err = new Error('Refresh token manquant.');
    err.statusCode = 401;
    throw err;
  }

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_REFRESH_SECRET);
  } catch {
    const err = new Error('Refresh token invalide ou expiré.');
    err.statusCode = 401;
    throw err;
  }

  const user = await prisma.user.findFirst({
    where: { id: decoded.userId, refreshToken: token },
  });

  if (!user) {
    const err = new Error('Refresh token révoqué.');
    err.statusCode = 401;
    throw err;
  }

  const newAccessToken = generateAccessToken(user.id);
  const newRefreshToken = generateRefreshToken(user.id);

  await prisma.user.update({ where: { id: user.id }, data: { refreshToken: newRefreshToken } });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

// ── Logout ───────────────────────────────────────────────────

const logout = async (userId) => {
  await prisma.user.update({ where: { id: userId }, data: { refreshToken: null } });
};

module.exports = { register, login, refreshToken, logout };
