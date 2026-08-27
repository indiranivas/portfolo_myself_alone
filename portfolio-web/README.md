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

```bash
cd portfolio-web
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — one process serves the React UI and `/api` together.

## Build for Production

```bash
npm run build
npm start
```

Serves the built site + API on [http://localhost:3000](http://localhost:3000).

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
portfolio-web/
├── public/resume.pdf
├── src/
│   ├── components/
│   │   ├── layout/      # Nav, Footer, Preloader, Theme
│   │   ├── sections/    # Hero, Projects, Experience, etc.
│   │   ├── three/       # 3D scene components
│   │   └── ui/          # Shared UI components
│   ├── data/portfolio.ts
│   ├── hooks/useTheme.ts
│   └── types/portfolio.ts
└── package.json
```

## Customization

Portfolio content is managed via the CMS at `/login` or by editing `server/data/portfolio.json` directly.
