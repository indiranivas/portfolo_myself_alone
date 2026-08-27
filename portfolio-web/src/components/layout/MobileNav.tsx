import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '../../data/portfolio'

export function MobileNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const moreLinks = navLinks.filter((l) => ['skills', 'education', 'awards'].includes(l.id))
  const mainLinks = [
    { id: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'experience', label: 'Exp', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 'projects', label: 'Work', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
    { id: 'contact', label: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ]

  return (
    <>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="md:hidden fixed bottom-24 left-4 right-4 z-40 glass-card p-6 grid grid-cols-3 gap-4"
          >
            {moreLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-primary/10 transition-colors"
              >
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {link.label}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 glass border-t border-white/10 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          {mainLinks.slice(0, 2).map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="flex flex-col items-center justify-center w-14 h-full text-slate-400 hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={link.icon} />
              </svg>
              <span className="text-[10px] mt-0.5 font-medium">{link.label}</span>
            </button>
          ))}

          <div className="relative -top-6">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/40 ring-4 ring-background-light dark:ring-background-dark"
            >
              <motion.svg
                animate={{ rotate: menuOpen ? 45 : 0 }}
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </motion.svg>
            </motion.button>
          </div>

          {mainLinks.slice(2).map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="flex flex-col items-center justify-center w-14 h-full text-slate-400 hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={link.icon} />
              </svg>
              <span className="text-[10px] mt-0.5 font-medium">{link.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
