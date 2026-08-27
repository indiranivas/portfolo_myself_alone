# Indira Nivas Portfolio — Design System Master

> Generated with UI/UX Pro Max guidance (manual synthesis; Python CLI unavailable on this machine).

## Product
- **Type:** Personal portfolio (FDE / Software Engineer / AI Agents)
- **Audience:** Recruiters, engineering managers, enterprise stakeholders
- **Stack:** React 18 + Vite + Tailwind + Framer Motion

## Style Direction
- **Primary:** Dark Mode (OLED) + Bold Statement typography
- **Secondary cues:** Minimal Swiss spacing, editorial scroll storytelling
- **Avoid:** Purple gradients, cream+terracotta cliché, glassmorphism overload, stock photo clutter, Inter-only default stack

## Color Tokens
| Token | Value | Use |
|-------|-------|-----|
| `--ink` | `#050505` | Page background (OLED black) |
| `--surface` | `#111111` | Elevated panels |
| `--paper` | `#F2F0EA` | Primary text |
| `--mute` | `#8A8680` | Secondary text |
| `--line` | `rgba(242,240,234,0.12)` | Dividers |
| `--accent` | `#2DD4BF` | Teal accent (AI/enterprise — not purple) |
| `--accent-hot` | `#F43F5E` | Hot accent for emphasis/CTAs |

## Typography
| Role | Family | Notes |
|------|--------|-------|
| Display | **Bebas Neue** | Giant section titles, all-caps |
| Body | **DM Sans** | UI, paragraphs, nav |
| Accent script | **Caveat** | Hero “just / name” only |
| Mono | **JetBrains Mono** | Labels, tech chips, meta |

## Layout
1. Full-bleed dark canvas (no platform sidebar shell)
2. Fixed minimal top nav (mix-blend or solid blur)
3. Hero → About → Experience → Statement → Work → Skills → Education → Awards → Contact → Footer
4. Generous vertical rhythm (py-24 / py-32); mobile first

## Motion
- Scroll-triggered fade/slide (once, ~0.5–0.7s)
- Stagger children 40–80ms
- Sticky experience progress line
- Respect `prefers-reduced-motion`
- Exit animations faster than enter

## Interaction
- Experience rows: click-to-expand (press to preview)
- Project rows: hover shift + clear focus ring
- Touch targets ≥ 44px on mobile dock
- Visible focus: `outline: 2px solid accent`

## Anti-patterns
- No competing headers/footers
- No decorative stock image galleries
- No emoji as primary iconography in nav
- No purple-on-white SaaS look
