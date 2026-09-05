# Indira Nivas — React 3D Portfolio

A stunning, animated portfolio built with **React**, **Three.js**, and **Framer Motion**.

## Features

- **Real 3D Hero Scene** — Interactive particle field, neural network visualization, floating distorted orb, and starfield (React Three Fiber)
- **Smooth Animations** — Scroll-triggered reveals, hover effects, and page transitions (Framer Motion)
- **Glassmorphism UI** — Modern frosted-glass cards with gradient accents
- **Dark/Light Mode** — Persistent theme toggle
- **Fully Responsive** — Desktop nav + mobile bottom navigation
- **Single Page** — Smooth scroll between all sections

## Sections

| Section | Content |
|---------|---------|
| Hero | 3D scene, intro, stats, CTA buttons |
| Projects | 3 featured projects with tech badges |
| Experience | Timeline of internships |
| Skills | 4 skill categories + interests |
| Education | Degree & CGPA |
| Awards | Hackathon win + NPTEL certification |
| Contact | Form + social links |

## Prerequisites

Install [Node.js](https://nodejs.org/) (v18 or later).

## Getting Started

From the **repo root**:

```bash
npm run install:all
npm run dev
```

- UI: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:3001](http://localhost:3001) (proxied as `/api` in dev)

Or run each folder separately — see [DEPLOY.md](../DEPLOY.md).

## Deploy: Netlify (frontend) + Render (backend)

See **[DEPLOY.md](../DEPLOY.md)** for the full guide.

**Quick summary:**

1. **Render** — deploy `backend/` (`render.yaml` at repo root)
2. **Netlify** — set `VITE_API_URL=https://your-api.onrender.com` in site env, redeploy
3. On Render, set `CORS_ORIGIN` to your Netlify URL and `MAIL_*` for contact email

## Deploy on Netlify only (static fallback)

1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
2. Connect GitHub repo: `portfolo_myself_alone`
3. Netlify reads root `netlify.toml` automatically:
   - Base: `frontend`
   - Build: `npm run build`
   - Publish: `dist`
4. Click **Deploy site**

Without `VITE_API_URL`, the portfolio uses built-in fallback data and Netlify Forms for contact.

## Deploy on Vercel

1. Import the GitHub repo on [vercel.com](https://vercel.com)
2. **Root Directory:** set to `frontend` (required)
3. Framework should auto-detect **Vite**
4. Build command: `npm run build` · Output: `dist`
5. Deploy

Contact form and CMS need the backend on Render. Set `VITE_API_URL` to your Render API URL.

## Build for Production

```bash
cd frontend
npm run build
npm run preview
```

## Tech Stack

| Tool | Purpose |
|------|---------|
| Vite | Build tool |
| React 18 + TypeScript | UI framework |
| Tailwind CSS | Styling |
| @react-three/fiber + drei | 3D graphics |
| Framer Motion | Animations |
| Three.js | WebGL rendering |

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── data/portfolio.ts
│   └── ...
└── package.json

backend/
├── data/portfolio.json
├── routes/
└── package.json
```

## Customization

Portfolio content is managed via the CMS at `/login` or by editing `backend/data/portfolio.json`.
