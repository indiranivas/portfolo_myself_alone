# Indira Nivas Portfolio

Monorepo with separate **frontend** (React + Vite) and **backend** (Express API).

```
├── frontend/     React UI → deploy to Netlify
├── backend/      Express API → deploy to Render
├── netlify.toml  Netlify build config (base: frontend)
└── render.yaml   Render blueprint (rootDir: backend)
```

## Quick start

```bash
npm run install:all
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:3001

See **[DEPLOY.md](./DEPLOY.md)** for Netlify + Render production setup.

## Folders

| Folder | Purpose |
|--------|---------|
| `frontend/` | React app, Tailwind, Framer Motion, Three.js |
| `backend/` | Portfolio API, CMS, contact form (Gmail SMTP) |
