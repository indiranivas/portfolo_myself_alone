import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'

interface HeroProps {
  ready?: boolean
}

export function Hero({ ready = true }: HeroProps) {
  const { data } = usePortfolio()
  const first = data.name.split(' ')[0]
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const stampY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70])
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, reduce ? 1 : 0])
  const show = ready || !!reduce

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[100svh] flex flex-col justify-between pt-28 pb-12 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(45,212,191,0.18), transparent 55%), radial-gradient(ellipse 60% 40% at 90% 80%, rgba(244,63,94,0.12), transparent 50%)',
        }}
      />

      <motion.div style={{ opacity: fade }} className="section-pad relative z-10">
        <div className="flex items-end justify-between gap-3 max-w-6xl mx-auto">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="font-script text-5xl md:text-7xl text-paper leading-none"
          >
            just
          </motion.p>
          <motion.div
            initial={reduce ? false : { scaleX: 0, opacity: 0 }}
            animate={show ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 mx-3 md:mx-8 relative top-[-6px] origin-center"
          >
            <div className="h-px bg-paper/35 w-full" />
            <span className="absolute -left-0.5 -top-3 font-mono text-[10px] text-mute">100</span>
            <span className="absolute -right-0.5 -top-3 font-mono text-[10px] text-mute">100</span>
          </motion.div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="font-script text-5xl md:text-7xl text-hot leading-none"
          >
            {first.toLowerCase()}
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        style={{ y: stampY, opacity: fade }}
        className="relative z-10 flex-1 flex items-center justify-center px-6 my-10"
      >
        <motion.p
          initial={reduce ? false : { opacity: 0, rotate: -10 }}
          animate={show ? { opacity: 1, rotate: -6 } : { opacity: 0, rotate: -10 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="absolute left-[10%] top-[16%] font-script text-3xl md:text-5xl text-paper/90 z-10"
        >
          portfolio
        </motion.p>
        <motion.div
          initial={reduce ? false : { scale: 0.88, opacity: 0, y: 30 }}
          animate={show ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.88, opacity: 0, y: 30 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-[190px] md:w-[230px] aspect-[3/4] bg-accent text-ink flex flex-col items-center justify-center px-5 text-center shadow-[0_30px_80px_rgba(45,212,191,0.25)]"
          style={{
            clipPath:
              'polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))',
          }}
        >
          <p className="font-display text-4xl md:text-5xl leading-none tracking-wide">AGENTS</p>
          <p className="mt-4 text-[11px] leading-relaxed text-ink/75 font-medium">
            ship smarter than your hardest workflow
          </p>
        </motion.div>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="absolute right-[12%] bottom-[20%] font-serif italic text-hot text-3xl md:text-5xl z-10"
        >
          2026
        </motion.p>
      </motion.div>

      <div className="section-pad relative z-10">
        <div className="flex items-end justify-between gap-3">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[15vw] md:text-[9vw] leading-[0.82] text-paper"
          >
            BEYOND
          </motion.h1>
          <div className="flex flex-col items-center pb-2 shrink-0">
            {!reduce && show && (
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="text-mute text-lg"
                aria-hidden
              >
                ︾
              </motion.span>
            )}
            <div className="w-10 h-px bg-paper/20 mt-2" />
          </div>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[15vw] md:text-[9vw] leading-[0.82] text-paper text-right"
          >
            AGENTS
          </motion.h1>
        </div>
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={show ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-3 text-center font-mono text-[11px] md:text-xs tracking-[0.22em] uppercase text-mute"
        >
          {data.name} · Software Engineer Trainee / FDE · LevelShift
        </motion.p>
      </div>
    </section>
  )
}
