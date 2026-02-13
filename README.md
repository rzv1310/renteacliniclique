# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

Simulator API (Nano Banana) runs as a standalone TypeScript package in `server/` (entry: `server/src/index.ts`).

```sh
# terminal 1 - frontend
npm run dev

# terminal 2 - API server
npm --prefix server install
npm run api:dev
```

The app calls:
- `/api/check-rate-limits`
- `/api/generate-implant-visualization`

Set these for local API testing:
- `NANO_BANANA_API_KEY` (required)
- `NANO_BANANA_MODEL` (default: `gemini-3-pro-image-preview`)
- `NANO_BANANA_IMAGE_SIZE` (`1K`, `2K`, or `4K`; default: `2K`)

Set frontend API base URL in `.env.local`:

```sh
VITE_API_BASE_URL=http://127.0.0.1:8787
```

If `VITE_API_BASE_URL` is empty during local development, frontend requests go directly to `http://127.0.0.1:8787`.
If `VITE_API_BASE_URL` is empty in production build, requests stay same-origin (relative path).

Docker API server:

```sh
docker build -t simulator-api ./server
docker run --rm -p 8787:8787 \
  -e NANO_BANANA_API_KEY=your_key \
  -e CORS_ORIGIN=https://your-frontend-domain.com \
  -e COUNTRY_ALLOWLIST=RO \
  simulator-api
```

Netlify deployment model:
- Frontend: static (`dist`) on Netlify.
- Contact form: Netlify Forms.
- Simulator API: deploy `server/` container separately and set `VITE_API_BASE_URL` in Netlify environment variables.
- Netlify config is codified in `netlify.toml`.

Current simulator behavior:
- Local per-device guard: max **3 generations/hour** (browser localStorage).
- Server per-IP limits: **3/minute, 10/hour, 20/day**.
- Crop editor starts with full-frame selection and preserves full image if no effective crop is applied.

Supabase runtime is no longer required.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
