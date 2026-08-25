# Architecture Overview

Project: `hello-word-19`

## Scope and shape

Fullstack proof app: PostgreSQL stores one greeting row, Go backend reads it through API, Next.js frontend renders it centered. No auth, edit flow, navigation, animation, palette, or extra content.

## Stack

| Layer | Choice | Reason | Rejected alternative |
|---|---|---|---|
| Frontend | Next.js 15 App Router, TypeScript, Tailwind v3 | Matches project default and container contract | Static HTML rejected because page must call API |
| Backend | Go 1.22 HTTP server | Small binary, standard runtime, matches CI | Node backend rejected to avoid second server stack |
| Database | PostgreSQL 16 | Required by SRS for stored greeting | In-memory/mock data rejected because AC-2 requires DB row |
| CI | Existing `.github/workflows/ci.yml` | Enforces build, vet, lint, tests, token checks | Custom workflow rejected; `.github/` is read-only |

## Repository layout

```text
code/backend/
  cmd/api/main.go
  internal/migrations/migrations.go
  internal/migrations/sql/*.sql
  .env.example
  Dockerfile
code/frontend/
  app/layout.tsx
  app/page.tsx
  app/globals.css
  components/           # story-owned components later
  lib/mock/             # story-owned mocks, deleted when API lands
  .env.example
  Dockerfile
docs/architecture/
  overview.md
  erd.md
  services.md
```

## Data flow

1. Frontend story component calls backend endpoint from `NEXT_PUBLIC_API_URL`.
2. Backend reads `DATABASE_URL`, applies embedded migrations on boot, then starts HTTP server.
3. `/healthz` returns 200 only after migrations succeeded and `SELECT 1` works.
4. Greeting endpoint returns stored row; frontend renders it verbatim.

## Backend conventions

- One Go main package only: `cmd/api`.
- Environment: `DATABASE_URL` required, `PORT` preferred, `APP_PORT` fallback, `8080` final fallback.
- Migrations live under `internal/migrations/sql`, embedded beside migration runner, applied in filename order.
- `schema_migrations(filename text primary key, applied_at timestamptz)` tracks applied files.
- Use parameterized queries for all DB access.
- Return JSON error envelope from `services.md` for API errors.

## Frontend conventions

- `app/page.tsx` is composition root only; stories add one import and one element.
- Server Components by default. Add literal first line `"use client"` only when component uses browser APIs or event handlers.
- Component files use `export default function ComponentName()`.
- Visual values use tokens from `app/globals.css`; no token fallbacks.
- `globals.css` owns shared color, spacing, typography, radius, shadow, and motion tokens from design system.

## Environment variables

| Service | Key | Required | Notes |
|---|---|---|---|
| backend | `DATABASE_URL` | yes | Injected by runtime/compose; full PostgreSQL URL |
| backend | `PORT` | no | Listen port; default `8080` |
| backend | `APP_PORT` | no | Secondary port fallback |
| frontend | `NEXT_PUBLIC_API_URL` | yes | Browser-facing backend base URL |
| compose | `POSTGRES_USER` | yes | Local DB user |
| compose | `POSTGRES_PASSWORD` | yes | Local DB password |
| compose | `POSTGRES_DB` | yes | Local DB name |

## Run and verify

```bash
cp .env.example .env
docker compose --profile local up --build
```

Expected local URLs: frontend `http://localhost:3000`, backend health `http://localhost:8080/healthz`.

CI gate runs:

```bash
cd code/backend && go build ./... && go vet ./... && go test ./...
cd code/frontend && npm ci && npm run lint && npm run build && npm test --if-present
```

## Risks and rollout

- Empty deployed DB is expected; backend self-migrates on boot.
- Greeting seed belongs in first migration so first request has data.
- `NEXT_PUBLIC_API_URL` is build-time for Next.js; deployment must set browser-reachable value before frontend build.
- No auth or rate limiting because endpoint is public read-only and stores no user data.
