import { motion, useScroll, useTransform } from 'framer-motion'

export function ScrollCorridor() {
  const { scrollYProgress } = useScroll()

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-80%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '-120%'])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute -right-20 top-0 w-64 h-[200%] opacity-[0.03]">
        <div className="w-full h-full border-l border-r border-lime grid grid-rows-20">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="border-b border-lime/50" />
          ))}
        </div>
      </motion.div>

      <motion.div style={{ y: y2, rotate }} className="absolute -left-32 top-1/4 w-96 h-96 opacity-[0.04]">
        <div className="w-full h-full rounded-full border border-dashed border-primary" />
      </motion.div>

      <motion.div style={{ y: y3 }} className="absolute right-1/4 top-0 w-px h-[300%] bg-gradient-to-b from-transparent via-lime/20 to-transparent" />
    </div>
  )
}

export function TravelFlash() {
  const { scrollYProgress } = useScroll()
  const flash = useTransform(scrollYProgress, (v) => {
    const sections = 7
    const pos = v * sections
    const frac = pos - Math.floor(pos)
    return frac < 0.04 ? (0.04 - frac) / 0.04 : 0
  })

  return (
    <motion.div
      style={{ opacity: flash }}
      className="fixed inset-0 z-[100] pointer-events-none bg-lime/10 mix-blend-screen"
    />
  )
}
