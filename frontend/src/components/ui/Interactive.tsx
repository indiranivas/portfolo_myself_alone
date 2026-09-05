import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TiltCardProps {
  children: ReactNode
  className?: string
}

export function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

  const handleMove = (e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`perspective-1000 ${className}`}
      data-cursor="pointer"
    >
      {children}
    </motion.div>
  )
}

interface ParallaxProps {
  children: ReactNode
  offset?: number
  className?: string
}

export function Parallax({ children, offset = 50, className = '' }: ParallaxProps) {
  return (
    <motion.div
      initial={{ y: offset }}
      whileInView={{ y: -offset }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-accent/15 blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, 80, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-lime/10 blur-[90px]"
      />
    </div>
  )
}

export function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9990] opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  )
}
