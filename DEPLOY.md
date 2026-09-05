# Netlify + Render deployment

Split hosting: **Netlify** serves the React frontend (`frontend/`); **Render** runs the Express API (`backend/`).

## 1. Deploy API on Render

1. Go to [render.com](https://render.com) → **New** → **Blueprint** (or **Web Service**)
2. Connect GitHub repo `portfolo_myself_alone`
3. Render reads `render.yaml` at the repo root (`rootDir: backend`)
4. Set these **environment variables** on the service:

| Variable | Example | Notes |
|----------|---------|-------|
| `CORS_ORIGIN` | `https://your-site.netlify.app` | Your Netlify URL (comma-separate for preview + prod) |
| `MAIL_USER` | `you@gmail.com` | Gmail address |
| `MAIL_PASS` | `xxxx xxxx xxxx xxxx` | Gmail [App Password](https://myaccount.google.com/apppasswords) |
| `ADMIN_USER` | `indiranivas` | CMS login username |
| `ADMIN_PASS` | `your-secure-password` | CMS login password |
| `SESSION_SECRET` | auto-generated | JWT signing secret |

5. Deploy and copy the service URL, e.g. `https://portfolio-api.onrender.com`
6. Verify: open `https://portfolio-api.onrender.com/api/health` → `{"ok":true}`

### Optional: persist CMS data on Render

By default, JSON files (`portfolio.json`, `messages.json`) reset on redeploy. For persistence:

1. Render dashboard → your service → **Disks** → Add disk (e.g. 1 GB)
2. Mount path: `/opt/render/project/src/backend/data`

## 2. Deploy frontend on Netlify

1. Netlify builds from `netlify.toml` at the repo root (`base = frontend`)
2. **Site settings → Environment variables** → add:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://portfolio-api.onrender.com` |

No trailing slash. **Redeploy** after adding — Vite bakes this in at build time.

3. Open your Netlify site — portfolio loads from Render API, contact form hits `/api/contact` on Render, CMS at `/login` works against Render.

## 3. Local development

```bash
# From repo root — runs API (port 3001) + Vite (port 5173)
npm run install:all
npm run dev
```

Or run separately:

```bash
cd backend && cp .env.example .env   # fill MAIL_* and ADMIN_*
cd backend && npm install && npm run dev

cd frontend && npm install && npm run dev
```

Frontend proxies `/api` to `http://localhost:3001` in dev.

To test against a remote API locally:

```bash
cd frontend
VITE_API_URL=https://portfolio-api.onrender.com npm run dev
```

## Architecture

```
Browser (Netlify)
    │
    ├─ static assets (HTML/JS/CSS)  →  Netlify CDN  (frontend/)
    │
    └─ fetch(VITE_API_URL/api/...)  →  Render Express  (backend/)
            ├─ /api/portfolio
            ├─ /api/contact  (+ Gmail SMTP)
            └─ /api/cms      (+ JWT auth)
```

## Fallback without VITE_API_URL

If `VITE_API_URL` is not set on Netlify, the site still works statically:

- Portfolio content uses built-in fallback data
- Contact form uses Netlify Forms (hidden form in `index.html`)
