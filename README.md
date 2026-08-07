# Fitamins Healthcare — MERN Turborepo

An animated marketing site for **Fitamins Healthcare Pvt. Ltd.**, rebuilt from the
reference design as a MERN monorepo powered by **Turborepo**, **React + Vite**,
**Framer Motion**, and an **Express + MongoDB** leads API.

## Stack

- **MongoDB** — stores consultation leads (Mongoose model).
- **Express** — REST API (`/api/leads`, `/api/deliverables`, `/api/health`).
- **React** (Vite) — the animated landing page.
- **Node** — runtime for the API and tooling.
- **Framer Motion** — scroll reveals, staggered sections, the animated headline,
  the count-up, the live-filtering manifest grid, the mobile drawer and the scroll
  progress bar.
- **Turborepo** — orchestrates the workspaces.

Fonts: **Space Grotesk** (display), **Inter** (body), **JetBrains Mono** (labels),
loaded from Google Fonts.

## Layout

```
fitamins/
├── apps/
│   ├── web/          React + Vite + Framer Motion frontend
│   └── api/          Express + Mongoose API
├── packages/
│   └── shared/       Deliverables data + lead validation (used by web AND api)
├── turbo.json
└── package.json      npm workspaces
```

## Getting started

```bash
# 1. Install everything (from the repo root)
npm install

# 2. (optional) configure the API
cp apps/api/.env.example apps/api/.env
# Leave MONGODB_URI empty to run without a database — leads are kept in memory.

# 3. Run web + api together
npm run dev
```

- Web: http://localhost:5173
- API: http://localhost:4000

The Vite dev server proxies `/api/*` to the Express server, so the contact form
posts to the real backend in development.

## Production build

```bash
npm run build          # builds the web app (Vite) via Turborepo
npm run start          # serves the built web app + runs the API
```

## API

| Method | Route                | Purpose                              |
| ------ | -------------------- | ------------------------------------ |
| GET    | `/api/health`        | Liveness check                       |
| GET    | `/api/deliverables`  | The 54 deliverables across 8 divisions |
| POST   | `/api/leads`         | Submit a consultation request        |
| GET    | `/api/leads`         | List recent leads (last 100)         |

Without a MongoDB connection the API automatically falls back to an in-memory
store so the demo runs with zero setup.
