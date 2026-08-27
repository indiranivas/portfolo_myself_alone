import { useRef, useEffect, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useJourney } from '../../context/JourneyContext'

interface GameSectionProps {
  id: string
  index: number
  title: string
  subtitle?: string
  children: ReactNode
  accent?: string
}

export function GameSection({
  id,
  index,
  title,
  subtitle,
  children,
  accent = '#c8ff00',
}: GameSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const { setActiveZone } = useJourney()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 })

  const portalClip = useTransform(smoothProgress, [0.12, 0.42], [
    'inset(45% 45% 45% 45% round 24px)',
    'inset(0% 0% 0% 0% round 0px)',
  ])

  const roomScale = useTransform(smoothProgress, [0, 0.2, 0.45, 0.85, 1], [0.75, 0.92, 1, 1, 0.88])
  const roomRotateX = useTransform(smoothProgress, [0, 0.25, 0.45], [18, 6, 0])
  const roomZ = useTransform(smoothProgress, [0, 0.35, 0.5], [-300, -80, 0])
  const roomOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0.3, 1, 1, 0.4])

  const doorLeft = useTransform(smoothProgress, [0.08, 0.38], ['0%', '-102%'])
  const doorRight = useTransform(smoothProgress, [0.08, 0.38], ['0%', '102%'])

  const indoorOpacity = useTransform(smoothProgress, [0.38, 0.58], [0, 1])
  const indoorY = useTransform(smoothProgress, [0.38, 0.58], [120, 0])
  const indoorScale = useTransform(smoothProgress, [0.38, 0.58], [0.85, 1])
  const indoorBlur = useTransform(smoothProgress, [0.38, 0.55], [8, 0])
  const indoorFilter = useTransform(indoorBlur, (b) => `blur(${b}px)`)

  const tunnelOpacity = useTransform(smoothProgress, [0, 0.18, 0.22], [1, 1, 0])
  const warpSpeed = useTransform(smoothProgress, [0, 0.2], [0, 1])

  const labelOpacity = useTransform(smoothProgress, [0.25, 0.4, 0.75, 0.9], [0, 1, 1, 0])
  const glowOpacity = useTransform(smoothProgress, [0.15, 0.35, 0.5], [0, 0.8, 0.2])
  const floorOpacity = useTransform(smoothProgress, [0.1, 0.3, 0.8, 1], [0, 0.4, 0.4, 0])

  useEffect(() => {
    const unsub = smoothProgress.on('change', (v) => {
      if (v > 0.25 && v < 0.85) setActiveZone(id)
    })
    return unsub
  }, [smoothProgress, id, setActiveZone])

  const zoneNumber = String(index).padStart(2, '0')

  return (
    <section
      ref={ref}
      id={id}
      className="relative min-h-[140vh] flex items-center justify-center py-20"
      style={{ perspective: '1200px' }}
    >
      {/* Warp tunnel — traveling between zones */}
      <motion.div
        style={{ opacity: tunnelOpacity }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <motion.div
          style={{ scaleY: warpSpeed }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-lime/5 to-transparent"
        />
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-lime/40 to-transparent animate-warp-line"
            style={{ top: `${8 + i * 7}%`, animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </motion.div>

      {/* Zone label — game HUD */}
      <motion.div
        style={{ opacity: labelOpacity }}
        className="absolute top-28 left-6 md:left-12 z-30 pointer-events-none"
      >
        <p className="text-[10px] uppercase tracking-[0.5em] text-slate-600 mb-1">
          Zone {zoneNumber}
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold uppercase" style={{ color: accent }}>
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">{subtitle}</p>
        )}
      </motion.div>

      {/* Portal glow */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[120px]"
          style={{ background: `${accent}15` }}
        />
      </motion.div>

      {/* The room — window opens as you scroll */}
      <motion.div
        style={{
          clipPath: portalClip,
          scale: roomScale,
          rotateX: roomRotateX,
          z: roomZ,
          opacity: roomOpacity,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-[1400px] mx-auto min-h-[80vh] z-10"
      >
        {/* Window frame border */}
        <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none z-20 shadow-[inset_0_0_60px_rgba(200,255,0,0.03)]" />

        {/* Door panels — split open */}
        <motion.div
          style={{ x: doorLeft }}
          className="absolute inset-y-0 left-0 w-1/2 z-30 bg-background-dark border-r border-lime/20 origin-left"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-lime/5 to-transparent" />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-16 rounded-full bg-lime/30" />
        </motion.div>
        <motion.div
          style={{ x: doorRight }}
          className="absolute inset-y-0 right-0 w-1/2 z-30 bg-background-dark border-l border-lime/20 origin-right"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-lime/5 to-transparent" />
          <div className="absolute left-6 top-1/2 -translate-y-1/2 w-2 h-16 rounded-full bg-lime/30" />
        </motion.div>

        {/* Indoor reveal — content appears after doors open */}
        <motion.div
          style={{
            opacity: indoorOpacity,
            y: indoorY,
            scale: indoorScale,
            filter: indoorFilter,
          }}
          className="relative z-10 px-6 md:px-12 py-16"
        >
          {/* Indoor ambient light sweep */}
          <motion.div
            initial={false}
            style={{ opacity: indoorOpacity }}
            className="absolute inset-0 bg-gradient-to-b from-lime/[0.03] via-transparent to-primary/[0.03] rounded-3xl pointer-events-none"
          />
          <div className="relative">{children}</div>
        </motion.div>
      </motion.div>

      {/* Floor grid — 3D game floor */}
      <motion.div
        style={{ opacity: floorOpacity }}
        className="absolute bottom-0 left-0 right-0 h-48 z-0 pointer-events-none overflow-hidden"
      >
        <div
          className="w-full h-full game-floor"
          style={{ transform: 'perspective(400px) rotateX(65deg)', transformOrigin: 'center bottom' }}
        />
      </motion.div>
    </section>
  )
}
