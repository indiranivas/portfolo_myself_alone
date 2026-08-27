import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { usePortfolio } from '../../context/PortfolioContext'

type Phase = 'enter' | 'hold' | 'exit' | 'done'

interface PreloaderProps {
  onComplete?: () => void
}

/** First-load screen: just — 100 ——— 100 — name (matches hero top row). */
export function Preloader({ onComplete }: PreloaderProps) {
  const { data } = usePortfolio()
  const first = data.name.split(' ')[0].toLowerCase()
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('enter')

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'

    if (reduce) {
      const t = window.setTimeout(() => {
        setPhase('done')
        document.documentElement.style.overflow = ''
        onComplete?.()
      }, 150)
      return () => {
        window.clearTimeout(t)
        document.documentElement.style.overflow = ''
      }
    }

    const hold = window.setTimeout(() => setPhase('hold'), 900)
    const exit = window.setTimeout(() => setPhase('exit'), 1800)
    const done = window.setTimeout(() => {
      setPhase('done')
      document.documentElement.style.overflow = ''
      onComplete?.()
    }, 2650)

    return () => {
      window.clearTimeout(hold)
      window.clearTimeout(exit)
      window.clearTimeout(done)
      document.documentElement.style.overflow = ''
    }
  }, [reduce, onComplete])

  if (phase === 'done') return null

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-ink flex items-center justify-center"
      initial={false}
      animate={phase === 'exit' ? { y: '-105%' } : { y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden
    >
      <div className="w-full section-pad">
        <div className="flex items-end justify-between gap-3 max-w-6xl mx-auto">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-script text-5xl md:text-7xl lg:text-8xl text-paper leading-none"
          >
            just
          </motion.p>

          <motion.div
            initial={reduce ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 mx-3 md:mx-8 relative top-[-8px] origin-center"
          >
            <div className="h-px bg-paper/40 w-full" />
            <motion.span
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.35 }}
              className="absolute -left-0.5 -top-3 font-mono text-[10px] md:text-[11px] text-mute"
            >
              100
            </motion.span>
            <motion.span
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.35 }}
              className="absolute -right-0.5 -top-3 font-mono text-[10px] md:text-[11px] text-mute"
            >
              100
            </motion.span>
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="font-script text-5xl md:text-7xl lg:text-8xl text-hot leading-none"
          >
            {first}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
