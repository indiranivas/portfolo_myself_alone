import { motion } from 'framer-motion'
import { TechLogoCard } from './TechLogoCard'
import { getTechLogo } from '../../data/techLogos'

interface TechFlowCardProps {
  name: string
  index: number
}

export function TechFlowCard({ name, index }: TechFlowCardProps) {
  const config = getTechLogo(name)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -8, scale: 1.04 }}
      className="group relative flex flex-col items-center gap-3 p-4 rounded-2xl glass-card glow-border overflow-hidden"
    >
      {/* Flow border animation */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${config.color}40, transparent, ${config.emissive}30, transparent)`,
          animation: 'spin-slow 3s linear infinite',
        }}
      />
      <div className="absolute inset-[1px] rounded-2xl bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-xl z-0" />

      {/* Flow particles */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ background: config.color, boxShadow: `0 0 6px ${config.color}` }}
            animate={{
              x: ['-10%', '110%'],
              y: [`${20 + i * 25}%`, `${30 + i * 20}%`],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.5 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.7,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-20 h-20">
        <TechLogoCard name={name} />
      </div>

      <span
        className="relative z-10 text-xs font-semibold tracking-wide text-center"
        style={{ color: config.color }}
      >
        {name}
      </span>
    </motion.div>
  )
}
