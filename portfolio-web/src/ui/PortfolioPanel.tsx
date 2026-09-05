import { motion, AnimatePresence } from 'framer-motion'
import { fallbackPortfolioData as portfolioData } from '../data/portfolio'
import { externalUrl } from '../utils/urls'
import { useHouse } from '../house/HouseContext'
import type { PanelId } from '../house/types'

const TITLES: Record<NonNullable<PanelId>, string> = {
  about: 'About Me',
  projects: 'Featured Projects',
  project: 'Project Details',
  skills: 'Skills & Technologies',
  education: 'Education',
  experience: 'Experience',
  awards: 'Awards',
  contact: 'Contact',
  interests: 'Personal Interests',
  architecture: 'AI & Engineering',
}

export function PortfolioPanel() {
  const { panel, closePanel, selectedProject } = useHouse()

  return (
    <AnimatePresence>
      {panel && (
        <motion.aside
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="portfolio-panel"
        >
          <div className="portfolio-panel-header">
            <div>
              <p className="panel-eyebrow">Smart Home Interface</p>
              <h2>{TITLES[panel]}</h2>
            </div>
            <button onClick={closePanel} className="panel-close" aria-label="Close">
              ✕
            </button>
          </div>
          <div className="portfolio-panel-body">{renderPanel(panel, selectedProject)}</div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

function renderPanel(panel: NonNullable<PanelId>, projectIndex: number) {
  switch (panel) {
    case 'about':
      return (
        <div className="panel-content">
          <h3>{portfolioData.name}</h3>
          <p className="panel-tagline">{portfolioData.tagline}</p>
          <p className="panel-text">
            Passionate about building intelligent systems at the intersection of machine learning,
            natural language processing, and data architectures. I transform complex data into
            actionable insights and deploy AI solutions that make a real impact.
          </p>
          <div className="panel-meta">
            <span>📍 {portfolioData.location}</span>
            <span>✉️ {portfolioData.email}</span>
          </div>
          <a href="/resume.pdf" download className="panel-btn">
            Download Resume
          </a>
        </div>
      )

    case 'projects':
      return (
        <div className="panel-content">
          {portfolioData.projects.map((p, i) => (
            <article key={p.name} className="panel-card">
              <span className="panel-num">0{i + 1}</span>
              <h4>{p.name}</h4>
              <p>{p.description}</p>
              <p className="panel-impact">{p.impact}</p>
              <div className="panel-tags">
                {p.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="panel-link">
                  View on GitHub →
                </a>
              )}
            </article>
          ))}
        </div>
      )

    case 'project': {
      const p = portfolioData.projects[projectIndex]
      if (!p) return null
      return (
        <div className="panel-content">
          <article className="panel-card featured">
            <h4>{p.name}</h4>
            <p>{p.description}</p>
            <p className="panel-impact">{p.impact}</p>
            <div className="panel-tags">
              {p.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            {p.link && (
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="panel-btn">
                Open Project
              </a>
            )}
          </article>
        </div>
      )
    }

    case 'skills':
      return (
        <div className="panel-content">
          {Object.values(portfolioData.skills).map((cat) => (
            <article key={cat.title} className="panel-card">
              <h4>{cat.title}</h4>
              <p className="panel-text-sm">{cat.description}</p>
              <div className="panel-tags">
                {cat.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </article>
          ))}
          <pre className="code-block">{`// Nivas.dev
const engineer = {
  role: "AI & Data Science",
  stack: ["Python", "TensorFlow", "Neo4j"],
  passion: "Building intelligent systems"
}`}</pre>
        </div>
      )

    case 'education':
      return (
        <div className="panel-content">
          {portfolioData.education.map((edu) => (
            <article key={edu.institution} className="panel-card">
              <h4>{edu.degree}</h4>
              <p className="panel-sub">{edu.institution}</p>
              <p className="panel-text-sm">{edu.location} · {edu.period}</p>
              <span className="panel-badge">CGPA {edu.cgpa}</span>
            </article>
          ))}
        </div>
      )

    case 'experience':
      return (
        <div className="panel-content">
          {portfolioData.experience.map((exp) => (
            <article key={exp.company + exp.role} className="panel-card">
              <h4>{exp.role}</h4>
              <p className="panel-sub">{exp.company} · {exp.period}</p>
              <ul>
                {exp.description.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <div className="panel-tags">
                {exp.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )

    case 'awards':
      return (
        <div className="panel-content">
          {portfolioData.awards.map((a) => (
            <article key={a.title} className="panel-card">
              <h4>🏆 {a.title}</h4>
              <p className="panel-sub">{a.organization} · {a.date}</p>
              <p>{a.description}</p>
              {a.score && <span className="panel-badge">{a.score}</span>}
            </article>
          ))}
        </div>
      )

    case 'contact':
      return (
        <div className="panel-content">
          <p className="panel-text">Let's build something intelligent together.</p>
          <a href={`mailto:${portfolioData.email}`} className="panel-btn">
            {portfolioData.email}
          </a>
          <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className="panel-link">
            LinkedIn →
          </a>
          <a
            href={externalUrl(portfolioData.github)}
            target="_blank"
            rel="noopener noreferrer"
            className="panel-link"
          >
            GitHub →
          </a>
          <p className="panel-text-sm">📞 {portfolioData.phone}</p>
        </div>
      )

    case 'interests':
      return (
        <div className="panel-content">
          <p className="panel-text">When I'm not coding, I explore:</p>
          <div className="panel-tags">
            {portfolioData.interests.map((i) => (
              <span key={i}>{i}</span>
            ))}
          </div>
        </div>
      )

    case 'architecture':
      return (
        <div className="panel-content">
          <article className="panel-card">
            <h4>AI & Cloud Architecture</h4>
            <p>
              Experience designing medical AI pipelines with BioBERT, Neo4j knowledge graphs,
              OCR systems, and IoT emergency networks.
            </p>
          </article>
          <pre className="code-block">{`┌─────────────┐     ┌──────────┐
│  BioBERT    │────▶│  Neo4j   │
│  NLP Layer  │     │  Graph   │
└─────────────┘     └──────────┘
       │                  │
       ▼                  ▼
┌─────────────────────────────┐
│   Recommendation API        │
└─────────────────────────────┘`}</pre>
          <div className="panel-tags">
            {['BioBERT', 'Neo4j', 'IoT', 'OCR', 'MySQL', 'Python'].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      )

    default:
      return null
  }
}
