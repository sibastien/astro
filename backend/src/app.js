/**
 * Express App Configuration – AstroFrance
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const { FRONTEND_URL, NODE_ENV } = require('./config/env');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

// ── Routes ──────────────────────────────────────────────────
const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/users/users.routes');
const zodiacRoutes = require('./modules/zodiac/zodiac.routes');
const horoscopeRoutes = require('./modules/horoscopes/horoscopes.routes');
const tarotRoutes = require('./modules/tarot/tarot.routes');
const moonRoutes = require('./modules/moon/moon.routes');
const compatibilityRoutes = require('./modules/compatibility/compatibility.routes');
const articleRoutes = require('./modules/articles/articles.routes');
const birthChartRoutes = require('./modules/birth-chart/birthChart.routes');
const adminRoutes = require('./modules/admin/admin.routes');

const app = express();

// ── Security & Basics ────────────────────────────────────────
app.use(helmet());
app.use(compression());

// CORS
app.use(
  cors({
    origin: FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging (skip in test)
if (NODE_ENV !== 'test') {
  app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// Global rate limiter
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Trop de requêtes, veuillez réessayer plus tard.',
  },
});
app.use('/api/', limiter);

// ── Health Check ─────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'AstroFrance API',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
  });
});

// ── API Routes ───────────────────────────────────────────────
const API = '/api/v1';

app.use(`${API}/auth`, authRoutes);
app.use(`${API}/users`, userRoutes);
app.use(`${API}/zodiac`, zodiacRoutes);
app.use(`${API}/horoscopes`, horoscopeRoutes);
app.use(`${API}/tarot`, tarotRoutes);
app.use(`${API}/moon`, moonRoutes);
app.use(`${API}/compatibility`, compatibilityRoutes);
app.use(`${API}/articles`, articleRoutes);
app.use(`${API}/birth-chart`, birthChartRoutes);
app.use(`${API}/admin`, adminRoutes);

// ── 404 & Error Handling ─────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
