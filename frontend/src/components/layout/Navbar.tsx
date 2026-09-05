import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { navLinks } from '../../data/portfolio'
import { usePortfolio } from '../../context/PortfolioContext'
import { useTheme } from '../../hooks/useTheme'

export function Navbar() {
  const { data: portfolioData } = usePortfolio()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { toggle } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      for (const id of [...navLinks.map((l) => l.id)].reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all ${scrolled ? 'glass py-3 shadow-lg' : 'py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button onClick={() => scrollTo('home')} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
            IN
          </div>
          <span className="font-display font-bold text-lg text-slate-900 dark:text-white hidden sm:block">
            {portfolioData.name}
          </span>
        </button>
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeSection === link.id
                  ? 'text-primary bg-primary/10'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={toggle} className="md:hidden p-2 rounded-full glass" aria-label="Toggle theme">
            🌙
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollTo('contact')}
            className="hidden md:block px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm"
          >
            Contact Me
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
