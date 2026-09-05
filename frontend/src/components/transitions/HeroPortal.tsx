import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface HeroPortalProps {
  children: ReactNode
}

export function HeroPortal({ children }: HeroPortalProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })

  const scale = useTransform(smooth, [0, 0.6, 1], [1, 0.85, 0.7])
  const opacity = useTransform(smooth, [0, 0.7, 1], [1, 0.8, 0])
  const clipPath = useTransform(smooth, [0.4, 0.9], [
    'inset(0% 0% 0% 0%)',
    'inset(45% 45% 45% 45% round 32px)',
  ])
  const z = useTransform(smooth, [0, 1], [0, -400])
  const rotateX = useTransform(smooth, [0, 1], [0, 12])

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity,
        clipPath,
        z,
        rotateX,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className="relative origin-center"
    >
      {children}
    </motion.div>
  )
}
