# AstroFrance – Monorepo

## Structure

```
/
├── frontend/          # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/    # Navbar, Footer, Layout
│   │   │   ├── ui/        # ZodiacCard, HoroscopeCard, ArticleCard, CTASection
│   │   │   └── seo/       # SEOMeta
│   │   ├── context/       # AuthContext
│   │   ├── lib/           # api.js (Axios)
│   │   └── pages/         # All route pages
│   └── ...
│
└── backend/           # Node.js + Express + Prisma + PostgreSQL
    ├── src/
    │   ├── app.js
    │   ├── server.js
    │   ├── config/        # env.js, prisma.js
    │   ├── middleware/     # authenticate, errorHandler, notFound, validate
    │   └── modules/
    │       ├── auth/
    │       ├── users/
    │       ├── zodiac/
    │       ├── horoscopes/
    │       ├── tarot/
    │       ├── moon/
    │       ├── compatibility/
    │       ├── articles/
    │       ├── birth-chart/
    │       └── admin/
    └── prisma/
        ├── schema.prisma  # Full DB schema
        └── seed.js        # 12 zodiac signs in French
```

## Quick Start

### Prerequisites
- Node.js ≥ 18
- PostgreSQL running locally
- npm ≥ 9

---

### Backend

```bash
cd backend

# Copy and configure environment
cp .env.example .env
# Edit .env: set DATABASE_URL, JWT_SECRET, etc.

# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push schema to database (dev) or run migrations
npm run db:push

# Seed the 12 zodiac signs
npm run db:seed

# Start dev server
npm run dev
# API running at http://localhost:5000
```

### Frontend

```bash
cd frontend

# Install dependencies (already done if freshly cloned)
npm install

# Start dev server
npm run dev
# App running at http://localhost:5173
```

---

## API Routes (v1)

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/v1/auth/register | Register new user |
| POST | /api/v1/auth/login | Login |
| POST | /api/v1/auth/refresh | Refresh JWT token |
| POST | /api/v1/auth/logout | Logout |
| GET  | /api/v1/auth/me | Current user |
| GET  | /api/v1/zodiac | All 12 zodiac signs |
| GET  | /api/v1/zodiac/:slug | Single sign (e.g. `belier`) |
| GET  | /api/v1/horoscopes/today | Today's horoscopes (all signs) |
| GET  | /api/v1/horoscopes/:slug | Today's horoscopes for one sign |
| GET  | /api/v1/articles | Paginated published articles |
| GET  | /api/v1/articles/:slug | Single article |
| GET  | /api/v1/compatibility/:slugA/:slugB | Compatibility between two signs |
| GET  | /api/v1/moon/today | Today's moon phase |

## Frontend Routes

| Path | Page |
|------|------|
| `/` | HomePage |
| `/horoscope` | Horoscope du Jour |
| `/horoscope/:slug` | Individual Sign Horoscope |
| `/signes-du-zodiaque` | All Zodiac Signs |
| `/articles` | Articles List |
| `/articles/:slug` | Article Detail |
| `/tarot` | Tarot (Phase 2) |
| `/lune` | Moon Phases (Phase 2) |
| `/compatibilite` | Compatibility (Phase 2) |
| `/connexion` | Login |
| `/inscription` | Register |

## Roadmap

- **Phase 1** ✅ Architecture, DB, Auth, Zodiac, Horoscopes, Articles, UI
- **Phase 2** – Tarot cards, Moon calendar, Compatibility engine
- **Phase 3** – Birth chart calculation (Swiss Ephemeris integration), Personalized horoscopes
- **Phase 4** – Admin dashboard, Newsletter, Premium features

## Deployment (VPS)

```bash
# Backend – PM2
pm2 start npm --name "astro-backend" -- start

# Frontend – Build
npm run build
# Serve dist/ via Nginx

# Nginx proxy /api → :5000
```
