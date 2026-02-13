# Architecture

## 1. Overview

`renteacliniclique` is a Vite + React + TypeScript single-page application (SPA) for a breast augmentation clinic website.

Current scope:

- Marketing website pages (home, procedures, blog, legal pages, pricing, etc.).
- Contact page with **Netlify Forms** submission.
- AI simulator page (`/simulator-3d`) that uploads/crops a photo and requests image generation from Gemini Nano Banana (Gemini 3 Pro Image Preview).

## 2. Tech Stack

- Frontend:
  - React 18
  - React Router (`BrowserRouter`)
  - TypeScript
  - Tailwind CSS + shadcn/ui components
  - `sonner` toast notifications
  - `react-hook-form` + `zod` (contact form validation)
- Build/dev:
  - Vite 5
  - `@vitejs/plugin-react-swc`
- Runtime API:
  - Standalone TypeScript package in `server/` (deployable via Docker)

## 3. Frontend Architecture

### 3.1 App shell and routing

Entry:

- `src/main.tsx` mounts `App`.
- `src/App.tsx` defines all routes and wraps the app in:
  - `HelmetProvider`
  - `QueryClientProvider`
  - `TooltipProvider`
  - global toasters, cookie consent, accessibility widget.

Routing style:

- SPA routing with many lazy-loaded route components.
- Route fallback: `*` -> `NotFound`.

Important routes:

- `/contact` -> `src/pages/ContactPage.tsx`
- `/simulator-3d` -> `src/pages/Simulator3DPage.tsx`
- legal routes:
  - `/cookies`
  - `/gdpr`
  - `/termeni-si-conditii`

### 3.2 UI composition

- Page layout is largely compositional (`PageLayout`, `Header`, `Footer`, shared UI components).
- Static assets are bundled from `src/assets/*`.

## 4. Simulator Subsystem

### 4.1 Client-side simulator page

Main file: `src/pages/Simulator3DPage.tsx`

Client responsibilities:

- Image intake:
  - file upload from browser
  - optional in-browser crop tool (canvas-based crop export to base64 PNG)
  - full-frame crop selection preserves original image (no recrop rewrite)
- User controls:
  - implant type (`rotund`, `anatomic`, `ergonomic`)
  - implant size (`200`, `275`, `350`, `425`, `500` cc)
  - optional custom clinical prompt
- Request/response:
  - `GET /api/check-rate-limits`
  - `POST /api/generate-implant-visualization`
- UX:
  - comparison slider (before/after)
  - image preview uses `object-contain` to avoid implicit viewport recropping
  - download generated image
  - lock overlay when client-side/server-side limits are exceeded
  - detailed console logging for debugging.

Client-only rate limiting:

- LocalStorage key: `simulator-client-generations-v1`
- Limit: **3 generations/hour/device/browser**

### 4.2 API service

Main source entry: `server/src/index.ts`

The server exposes HTTP endpoints:

- `GET /api/check-rate-limits`
- `POST /api/generate-implant-visualization`

Server-side behavior:

- Validates payload and image mime types.
- Sanitizes custom prompt and blocks explicit/sexualized/minor-related terms.
- Enforces in-memory per-IP limits:
  - 3/minute
  - 10/hour
  - 20/day
- Builds a structured clinical prompt with:
  - user config
  - implant size/shape plans
  - strong preservation constraints (edit breast ROI only)
  - safety and negative prompts.
- Calls Gemini API:
  - endpoint: `v1beta/models/{model}:generateContent`
  - default model: `gemini-3-pro-image-preview`
  - generation config: `responseModalities=["TEXT","IMAGE"]` + `imageConfig.imageSize`
  - returns one selected image part to client.
  - structured request logging uses deep object inspection (no `[Object]` truncation).

Environment variables used:

- `NANO_BANANA_API_KEY` (preferred)
- `NANO_BANANA_MODEL` (optional override)
- `NANO_BANANA_IMAGE_SIZE` (`1K|2K|4K`, applied to `generationConfig.imageConfig.imageSize`)
- `CORS_ORIGIN` (optional, defaults to `*`)
- `COUNTRY_ALLOWLIST` (optional, ISO code list, e.g. `RO`)
- `COUNTRY_HEADER_NAMES` (optional geo-header priority, defaults include `cf-ipcountry`)
- `ALLOW_UNKNOWN_COUNTRY` (optional, defaults to `false`)

## 5. Contact Form Architecture

Files:

- `src/pages/ContactPage.tsx`
- static Netlify detection form in `index.html`

Flow:

1. User fills React form (validated by zod).
2. Submit handler encodes fields as `application/x-www-form-urlencoded`.
3. Client posts to `/` with `form-name=contact`.
4. Netlify Forms backend ingests submission (after deployment on Netlify with form detection enabled).

## 6. Configuration and Build

### 6.1 Vite config

File: `vite.config.ts`

- Registers frontend plugins:
  - React SWC plugin
  - optional development component tagger.
- No API proxy is configured in Vite.

### 6.2 API URL resolution (frontend)

File: `src/lib/api.ts`

- If `VITE_API_BASE_URL` is set, it is used as API base.
- If empty and app runs in dev mode, API base defaults to `http://127.0.0.1:8787`.
- If empty and app runs in production build, API calls remain same-origin (relative path).

### 6.3 Runtime modes

- `npm run dev`:
  - starts Vite frontend dev server.
  - frontend API calls default to `http://127.0.0.1:8787` directly when `VITE_API_BASE_URL` is not set.
- `npm run api:setup`:
  - installs dependencies for `server/` package.
- `npm run api:dev`:
  - starts standalone API server on `PORT` (default `8787`).
- `npm run preview`:
  - previews static build output.
- `npm run build`:
  - outputs static `dist` frontend assets.

## 7. Security and Privacy Model

Implemented:

- Prompt sanitization and disallowed prompt term filters.
- MIME/type and payload guards.
- Dual-layer throttling (server + client).
- UI communication that images are not stored.
- Optional country allowlist gate (server-side) for `/api/*` endpoints.

Operational caveat:

- API key must never be exposed in browser client code.
- Secure Gemini requests require a trusted server runtime (or serverless function) in production.
- Country allowlist depends on trusted reverse-proxy geo headers; by itself it does not replace authentication.

## 8. Deployment Architecture (Current)

Target platform: Netlify static publish (`dist`) + external Docker API service.

What works in static deployment:

- SPA UI pages
- Netlify contact form handling
- SPA route fallback via `public/_redirects`

API dependency:

- Frontend simulator requires reachable backend endpoints:
  - `/api/check-rate-limits`
  - `/api/generate-implant-visualization`
- In split-origin deployment (Netlify frontend + external API), `VITE_API_BASE_URL` must point to that backend in frontend build environment.

## 9. Recommended Production Topology

Current production topology:

- Frontend: static SPA on Netlify.
- Contact form: Netlify Forms.
- Simulator backend: standalone Dockerized Node service (`server/`), consumed via `VITE_API_BASE_URL`.
- Build/deploy settings are codified in `netlify.toml`.
- API container base image: Node `24-alpine` (multi-stage Docker build).

Further hardening recommended:

- Persist rate-limit counters in durable storage if strict limits are required across restarts/instances.
- Restrict CORS to exact frontend origins in production.
- Add bot mitigation (Cloudflare Turnstile / WAF rate rules) to reduce direct scripted API abuse.

## 10. Production Readiness Assessment (2026-02-13)

Validation performed:

- Frontend build: `npm run build` ✅
- Frontend type-check: `npx tsc --noEmit` ✅
- Server package type-check: `npx tsc -p server/tsconfig.json --noEmit` ✅
- Frontend lint: `npm run lint` ✅ (warnings only, no errors)

Status by capability:

- Static frontend deploy on Netlify: ✅ Ready
- Netlify contact form flow: ✅ Ready
- External simulator API architecture: ✅ Ready
- Simulator backend operational hardening: ⚠️ Partially ready
- CI/lint gate cleanliness: ✅ Ready (warnings remain)

Current production blockers / caveats:

- In-memory server-side rate limiting is not durable across restarts/replicas.
- CORS defaults to `*` unless explicitly configured.
- Simulator availability depends on valid Gemini billing/quota for the API key.
- Country allowlist relies on trusted proxy geo headers (recommended behind CDN/WAF).

Go-live checklist:

- Set Netlify env var `VITE_API_BASE_URL` to the deployed API URL.
- Deploy `server/` Docker image with:
  - `NANO_BANANA_API_KEY`
  - `CORS_ORIGIN` (exact frontend origin(s), not `*`)
  - `COUNTRY_ALLOWLIST=RO` (optional Romania-only access policy)
  - `COUNTRY_HEADER_NAMES`/`ALLOW_UNKNOWN_COUNTRY` as needed for your edge provider
  - `HOST=0.0.0.0`
  - `PORT` as required by host platform
- Verify `/health`, `/api/check-rate-limits`, `/api/generate-implant-visualization` in deployed environment.
- Decide whether rate limits must survive restarts; if yes, move counters to shared storage (Redis/DB).
- Add edge bot controls (WAF/Turnstile) if abuse pressure increases.
