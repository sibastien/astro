/**
 * Global Error Handler Middleware
 */

const { NODE_ENV } = require('../config/env');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Erreur interne du serveur';

  // Prisma known errors
  if (err.code === 'P2002') {
    statusCode = 409;
    message = 'Cette ressource existe déjà.';
  }
  if (err.code === 'P2025') {
    statusCode = 404;
    message = 'Ressource introuvable.';
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token invalide.';
  }
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expiré.';
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    statusCode = 422;
  }

  const response = {
    success: false,
    message,
    ...(NODE_ENV === 'development' && {
      stack: err.stack,
      details: err.details,
    }),
  };

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
