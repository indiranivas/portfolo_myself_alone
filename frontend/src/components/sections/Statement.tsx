import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

export function Statement() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 36, reduce ? 0 : -36])
  const x2 = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -28, reduce ? 0 : 28])

  return (
    <section ref={ref} className="section-pad py-28 md:py-40 overflow-hidden">
      <div className="flex items-center gap-3 mb-8">
        <span className="w-2 h-2 rounded-full bg-hot" aria-hidden />
        <motion.h2 style={{ x: x1 }} className="font-display text-[10vw] md:text-[6.5vw] leading-[0.85] text-paper">
          SOMETHING DIFFERENT
        </motion.h2>
        <span className="w-2 h-2 rounded-full bg-hot" aria-hidden />
      </div>

      <motion.div style={{ x: x2 }} className="max-w-5xl">
        <p className="font-display text-[9vw] md:text-[5.5vw] leading-[0.9] text-paper/85">
          FROM
          <br />
          SMALL
          <br />
          EXPERIMENTS
        </p>
        <p className="font-display text-[9vw] md:text-[5.5vw] leading-[0.9] text-paper mt-6">
          TO
          <br />
          ENTERPRISE
          <br />
          <span className="text-accent">AI AGENTS</span>
        </p>
      </motion.div>

      <p className="mt-12 text-mute max-w-md text-sm md:text-base leading-relaxed">
        from AI internships to Forward Deployed Engineering at LevelShift — building agents that
        operate in real business workflows
      </p>
    </section>
  )
}
