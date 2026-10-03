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
| GET  | /api/v1/horoscopes/today | Today's horoscopes (all signs, auto-generated if missing) |
| GET  | /api/v1/horoscopes/:slug | Today's horoscopes for one sign |
| POST | /api/v1/horoscopes/sync-today | Trigger generation of today's horoscopes |
| GET  | /api/v1/tarot | All Tarot cards (auto-seeded if empty) |
| GET  | /api/v1/tarot/draw/daily | Interactive draw (?count=1 or ?count=3) |
| GET  | /api/v1/tarot/:slug | Single tarot card details |
| GET  | /api/v1/admin/stats | Platform metrics (Admin only) |
| GET  | /api/v1/admin/users | User management & roles (Admin only) |
| PATCH | /api/v1/admin/users/:id/role | Change user role (Admin only) |
| POST | /api/v1/admin/sync-horoscopes | Trigger daily horoscope generation (Admin only) |
| POST | /api/v1/admin/seed-tarot | Seed/refresh Tarot database (Admin only) |
| GET  | /api/v1/articles | Paginated published articles |
| GET  | /api/v1/articles/:slug | Single article |
| GET  | /api/v1/compatibility/:slugA/:slugB | Compatibility between two signs |
| GET  | /api/v1/moon/today | Today's moon phase |

## Frontend Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | HomePage | Personalized daily reading dashboard |
| `/horoscope` | HoroscopePage | Daily transit intelligence (all 12 signs) |
| `/horoscope/:slug` | HoroscopeSignPage | Individual sign horoscope |
| `/tarot` | TarotPage | Interactive 1-Card & 3-Card spread + 22 Arcana encyclopedia |
| `/admin` | AdminDashboardPage | Protected admin dashboard (metrics, users, sync triggers) |
| `/signes-du-zodiaque` | ZodiacPage | All Zodiac Signs |
| `/articles` | ArticlesPage | Articles List |
| `/articles/:slug` | ArticlePage | Article Detail |
| `/lune` | LunePage | Moon Phases |
| `/compatibilite` | CompatibilitePage | Sign Compatibility |
| `/connexion` | LoginPage | User login |
| `/inscription` | RegisterPage | User registration |

## Admin Access & CLI

1. **Promote any user to ADMIN:**
```bash
cd backend
npm run make:admin <email>
```

2. **Access Admin Web Dashboard:**
Log in with your admin account and visit `/admin` (a shortcut badge will appear in the navigation bar).

3. **Prisma Studio (Visual Database GUI):**
```bash
cd backend
npm run db:studio
# Opens visual GUI at http://localhost:5555
```

## Deployment (VPS)

```bash
# Backend – PM2
cd backend
npm install
npm run db:generate
pm2 start npm --name "astro-backend" -- start

# Frontend – Build
cd ../frontend
npm install
npm run build
# Serve dist/ via Nginx
# Nginx proxy /api → :5000
```
