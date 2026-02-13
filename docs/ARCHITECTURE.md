# Architecture

## 1. System Overview

`renteacliniclique` is split into two deployable units:

- Frontend: static React SPA (Vite build output in `dist/`), deployed to Netlify.
- Backend: standalone Node.js TypeScript API in `server/`, deployed as Docker.

Current product scope:

- Marketing website pages.
- Contact page backed by Netlify Forms.
- AI simulator (`/simulator-3d`) for clinical breast implant visualization and optional short animation.

## 2. Frontend Architecture

### 2.1 Runtime and routing

- React 18 + TypeScript + React Router.
- App shell and route map are in `src/App.tsx`.
- Entry point is `src/main.tsx`.
- Shared layout/components under `src/components`.

### 2.2 Simulator page

Main file: `src/pages/Simulator3DPage.tsx`

Responsibilities:

- Upload source image.
- Optional in-browser crop before generation.
- Configure implant:
  - type: `rotund | anatomic | ergonomic`
  - size: `200..500` cc, step `50`
- Generate image via API.
- Compare multiple generations:
  - source options include Original and all generated versions
  - left/right comparison selectors + slider
- Animate selected result (right-side selection) via API.
- Download selected result (right-side selection).

### 2.3 Client-side safeguards and UX behavior

- Local generation throttle: `3` images/hour/device (localStorage).
- Local animation throttle: `1` animation/hour/device (localStorage).
- If locked, modal can be dismissed so users can still inspect existing outputs.
- Warning before page refresh if generated media exists.
- During generation, comparison slider movement is disabled.
- Generated image is normalized to source width/height for stable comparison geometry.

## 3. Backend Architecture (`server/`)

### 3.1 Runtime

- Node.js TypeScript package (`type: module`).
- Entry point: `server/src/index.ts`.
- Docker target: Node 24 Alpine.

### 3.2 HTTP endpoints

- `GET /health`
- `GET /api/check-rate-limits`
- `POST /api/generate-implant-visualization`
- `GET /api/check-animation-rate-limits`
- `POST /api/animate-implant-visualization`
- `GET /api/animation-jobs/:jobId`
- `GET /api/animation-jobs/:jobId/video`

### 3.3 Image generation flow

Core files:

- `server/src/index.ts`
- `server/src/prompt.ts`
- `server/src/profile-reference.ts`
- `server/src/request-helpers.ts`

Flow:

1. Validate request body, mime type, implant params, and prompt constraints.
2. Enforce per-IP rate limits.
3. Build strict clinical prompt text (`buildPromptText`).
4. Add source image as primary input and one implant profile crop as reference guidance.
5. Call Gemini (`gemini-3-pro-image-preview` by default) with `responseModalities=["IMAGE"]`.
6. Return selected image part to frontend.

Prompt strategy:

- Strict identity/framing lock instructions.
- Explicit rule that reference profile image is guidance-only, never rendered.
- Strong localized-edit constraint: only breast size/shape changes.

### 3.4 Animation flow

Core files:

- `server/src/index.ts`
- `server/src/animation-prompt.ts`

Flow:

1. Validate request and animation rate limits.
2. Start async Veo operation.
3. Poll operation status via `/api/animation-jobs/:jobId`.
4. Serve ready video via `/api/animation-jobs/:jobId/video`.

## 4. Rate Limiting Model

### 4.1 Image generation

- Client-side (device): `3/hour`.
- Server-side (per IP): `3/min`, `10/hour`, `20/day`.

### 4.2 Animation generation

- Client-side (device): `1/hour`.
- Server-side user/IP: `1/hour`.
- Server-side global app: `3/hour`, `10/day`.

Note: server rate limit storage is in-memory; counters reset on restart and are not shared across replicas.

## 5. Geo Access Policy

Core file: `server/src/geo.ts`

- Optional allowlist via `COUNTRY_ALLOWLIST`.
- Country resolution order:
  1. trusted headers (`COUNTRY_HEADER_NAMES`)
  2. GeoIP lookup (`geoip-lite`) fallback
- Loopback IPs bypass geo restriction for local development.

## 6. Configuration

### 6.1 Frontend

- `VITE_API_BASE_URL`:
  - if set: used as API origin.
  - if empty in dev: defaults to `http://127.0.0.1:8787`.
  - if empty in production build: uses same-origin relative `/api/*`.

### 6.2 Backend

Key env vars:

- `NANO_BANANA_API_KEY` (required)
- `NANO_BANANA_MODEL` (optional)
- `VEO_MODEL` (optional)
- `HOST`, `PORT`
- `CORS_ORIGIN`
- `COUNTRY_ALLOWLIST`
- `COUNTRY_HEADER_NAMES`
- `ALLOW_UNKNOWN_COUNTRY`

## 7. Deployment Topology

Current intended production layout:

- Netlify:
  - serves static SPA (`dist/`)
  - handles contact submissions via Netlify Forms
- External container platform / Kubernetes:
  - runs `server/` API
  - exposed as `api.implantmamarbucuresti.ro`
- Frontend calls backend using `VITE_API_BASE_URL`.

## 8. Operational Notes

- CORS should be set to explicit production origins.
- Apply edge/WAF bot controls in front of API.
- If strict distributed throttling is required, migrate rate limiting to shared storage (Redis/DB).
- Keep Gemini/Veo quota and billing monitored to avoid runtime failures.
