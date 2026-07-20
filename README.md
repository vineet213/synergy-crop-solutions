# Agri Platform — Synergy Crop Solutions

Full-stack MERN application for an agricultural product company. Provides a public-facing product catalogue, crop and disease discovery tools, distributor locator, testimonials, blog, certifications, and a complete admin dashboard for content management.

## Features

**Public**
- Product catalogue with filtering, search, and detailed product pages
- Crop discovery and disease discovery with recommendations
- Distributor locator by state/region
- Testimonials and video stories
- Blog and certifications
- Contact and lead capture forms
- Internationalization (English, Hindi, Kannada, Marathi)

**Admin**
- Dashboard with statistics
- CRUD management for products, crops, diseases, distributors, testimonials, certifications, blog, categories, leads, and admins
- Role-based access control (superadmin / admin)
- Excel export for leads
- Image and file uploads

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5, Tailwind CSS 3, React Router 6, i18next |
| Backend | Node.js >=18, Express 4, Mongoose 8 |
| Database | MongoDB Atlas |
| Auth | JWT (jsonwebtoken + bcryptjs) |
| Other | Helmet, Compression, Rate Limiting, Winston logging, Multer, ExcelJS |

## Folder Structure

```
agri-platform/
├── backend/
│   └── src/
│       ├── auth/            # JWT helpers, permissions, roles
│       ├── config/          # CORS, DB, env, i18n, multer
│       ├── controllers/     # Route handlers
│       ├── database/        # Seeders
│       ├── middleware/       # Auth, error handling, validation
│       ├── models/          # Mongoose schemas
│       ├── routes/          # Express route definitions
│       ├── seeders/         # Additional seed scripts
│       ├── services/        # Business logic
│       ├── uploads/         # User-uploaded files
│       ├── utils/           # Logger, helpers
│       └── validators/      # Request validation
├── frontend/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── context/         # React context providers
│       ├── data/            # Static enrichment data
│       ├── hooks/           # Custom React hooks
│       ├── i18n/            # Localization config and locale files
│       ├── layouts/         # Page layouts
│       ├── pages/           # Route-level page components
│       ├── routes/          # Route definitions
│       ├── services/        # API client modules
│       └── utils/           # Formatters, validators, constants
├── client-assets/           # Logos, product docs, audit reports
└── products-seed.json       # Product seed data
```

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd agri-platform

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Environment Variables

### Backend

Copy `backend/.env.example` to `backend/.env` and fill in:

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB Atlas connection string |
| `JWT_SECRET` | Yes | JWT signing secret (min 32 characters) |
| `CORS_ORIGINS` | Yes (prod) | Comma-separated allowed origins |
| `PORT` | No | Server port (default: 5000) |
| `NODE_ENV` | No | `development` or `production` |
| `ADMIN_NAME` | No | Default admin name for seeding |
| `ADMIN_EMAIL` | No | Default admin email for seeding |
| `ADMIN_PASSWORD` | No | Default admin password for seeding |
| `JWT_EXPIRES_IN` | No | Token expiry (default: 7d) |
| `LOG_LEVEL` | No | Winston log level (default: debug) |
| `RATE_LIMIT_WINDOW_MS` | No | Rate limit window in ms (default: 900000) |
| `RATE_LIMIT_MAX` | No | Max requests per window (default: 100) |

### Frontend

Copy `frontend/.env.example` to `frontend/.env`:

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes | Backend API base URL (e.g. `http://localhost:5000/api`) |

## Running Locally

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies API requests to `http://localhost:5000`.

### Seeding the Database

```bash
cd backend

# Create admin user
npm run seed:admin

# Seed products from products-seed.json
npm run seed:products

# Seed sample testimonials
npm run seed:testimonials
```

## Build

```bash
# Frontend production build
cd frontend
npm run build

# Output is in frontend/dist/
```

## Deployment

The backend is an Express API server. The frontend is a static Vite build.

**Backend** — Deploy to any Node.js hosting (Render, Railway, Fly.io, etc.):
```bash
cd backend
npm install --production
npm start
```

**Frontend** — Deploy `frontend/dist/` to a static host (Netlify, Vercel, Cloudflare Pages, etc.):
- Set `VITE_API_URL` to your production API URL at build time
- Configure SPA fallback (rewrite all routes to `index.html`)

Set the following in production:
- `CORS_ORIGINS` on the backend to your frontend domain
- `VITE_API_URL` on the frontend to your backend API domain
- Rotate `JWT_SECRET` and `ADMIN_PASSWORD` from any defaults
