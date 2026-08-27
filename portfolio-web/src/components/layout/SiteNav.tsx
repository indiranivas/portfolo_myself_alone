import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { usePortfolio } from '../../context/PortfolioContext'

const links = [
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'experience' },
  { id: 'work', label: 'work' },
  { id: 'skills', label: 'skills' },
  { id: 'contact', label: 'contact' },
]

export function SiteNav() {
  const { data } = usePortfolio()
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-ink/80 backdrop-blur-md border-b border-paper/10' : 'bg-transparent'
      }`}
    >
      <nav className="section-pad flex items-center justify-between py-4 md:py-5">
        <button
          onClick={() => go('home')}
          className="text-sm lowercase tracking-wide text-paper/90 hover:text-accent transition"
        >
          {data.name.toLowerCase()}
        </button>

        <button
          onClick={() => go('home')}
          aria-label="Home"
          className="hidden sm:grid place-items-center w-9 h-9 rounded-full border border-paper/40 text-[10px] font-mono text-paper/80 hover:border-accent hover:text-accent transition"
        >
          {data.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)}
        </button>

        <div className="hidden md:flex items-center gap-6 text-sm lowercase tracking-wide text-paper/70">
          {links.map((l) => (
            <button key={l.id} onClick={() => go(l.id)} className="hover:text-accent transition">
              {l.label}
            </button>
          ))}
          <a href="/resume.pdf" download className="text-accent hover:opacity-80 transition">
            resume
          </a>
        </div>

        <a href="/resume.pdf" download className="md:hidden text-sm text-accent lowercase">
          resume
        </a>
      </nav>
    </header>
  )
}

export function MobileDock() {
  const { data } = usePortfolio()
  const reduce = useReducedMotion()
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })

  return (
    <div className="md:hidden fixed bottom-4 inset-x-4 z-50">
      <div className="rounded-full bg-paper text-ink px-2 py-2 flex justify-between items-center shadow-lg shadow-black/40">
        {['about', 'work', 'contact'].map((id) => (
          <button
            key={id}
            onClick={() => go(id)}
            className="min-h-11 min-w-11 px-3 text-xs lowercase font-medium"
          >
            {id}
          </button>
        ))}
        <a href={`mailto:${data.email}`} className="min-h-11 px-3 grid place-items-center text-xs lowercase font-semibold bg-ink text-paper rounded-full">
          mail
        </a>
      </div>
    </div>
  )
}
