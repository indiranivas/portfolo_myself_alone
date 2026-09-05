import { motion, useScroll, useTransform } from 'framer-motion'
import { zones, useJourney } from '../../context/JourneyContext'

export function WorldNavigator() {
  const { activeZone } = useJourney()
  const { scrollYProgress } = useScroll()
  const pathHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-1">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10">
        <motion.div
          style={{ height: pathHeight }}
          className="w-full bg-gradient-to-b from-lime via-primary to-accent origin-top"
        />
      </div>

      {zones.map((zone) => {
        const isActive = activeZone === zone.id
        return (
          <button
            key={zone.id}
            onClick={() => scrollTo(zone.id)}
            data-cursor="pointer"
            className="group flex items-center gap-3 relative pl-0"
            title={zone.label}
          >
            <motion.div
              animate={{
                scale: isActive ? 1.4 : 1,
                backgroundColor: isActive ? '#c8ff00' : 'rgba(255,255,255,0.15)',
              }}
              className="w-3.5 h-3.5 rounded-full border border-white/20 z-10 shrink-0 transition-colors"
            />
            <motion.span
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
              className="text-[10px] uppercase tracking-widest text-lime whitespace-nowrap pointer-events-none"
            >
              {zone.icon} {zone.label}
            </motion.span>
          </button>
        )
      })}
    </div>
  )
}
