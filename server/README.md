# Simulator API Package

Standalone TypeScript package for the AI simulator backend.

Runtime target:

- Node.js 24 (Docker image uses `node:24-alpine`)

## Endpoints

- `GET /health`
- `GET /api/check-rate-limits`
- `POST /api/generate-implant-visualization`
- `GET /api/check-animation-rate-limits`
- `POST /api/animate-implant-visualization`
- `GET /api/animation-jobs/:jobId`
- `GET /api/animation-jobs/:jobId/video`

## Environment variables

- `NANO_BANANA_API_KEY` (required)
- `NANO_BANANA_MODEL` (default: `gemini-3-pro-image-preview`)
- `VEO_MODEL` (default: `veo-3.1-generate-preview`)
- `CORS_ORIGIN` (comma-separated allowed origins, default: `*`)
- `PORT` (default: `8787`)
- `HOST` (default: `127.0.0.1`, use `0.0.0.0` in containers)
- `COUNTRY_ALLOWLIST` (optional ISO country list, e.g. `RO` or `RO,MD`)
- `COUNTRY_HEADER_NAMES` (optional geo header priority list)
- `ALLOW_UNKNOWN_COUNTRY` (`false` by default; if `true`, requests without country header pass)

If `COUNTRY_ALLOWLIST` is set, the server accepts simulator API calls only from allowed countries based on trusted proxy/CDN headers when present, with GeoIP IP lookup fallback. This is an access filter, not a full auth mechanism.
API logs are printed with deep object inspection for easier debugging (nested fields are not collapsed as `[Object]`).

## Animation limits

Animation requests are limited as follows:

- Per user/IP: `1` animation per hour
- Global (all users): `3` animations per hour
- Global (all users): `10` animations per day

These limits are server-side enforced.

## Scripts

Run inside `server/`:

```sh
npm run dev
npm run build
npm run start
```

Run from repo root:

```sh
npm run api:setup
npm run api:dev
npm run api:build
npm run api:start
```

## Docker

Build and run from repo root:

```sh
docker build -t simulator-api ./server
docker run --rm -p 8787:8787 \
  -e NANO_BANANA_API_KEY=your_key \
  -e CORS_ORIGIN=https://your-frontend-domain.com \
  -e COUNTRY_ALLOWLIST=RO \
  simulator-api
```
