import { motion } from 'framer-motion'
import { getTechLogo } from '../../data/techLogos'

interface TechLogoCardProps {
  name: string
}

export function TechLogoCard({ name }: TechLogoCardProps) {
  const config = getTechLogo(name)

  return (
    <div className="w-20 h-20" style={{ perspective: 900 }}>
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateY: [0, 10, 0, -10, 0],
          rotateX: [0, -6, 0, 6, 0],
          y: [0, -5, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.08, rotateY: 18, rotateX: -12, z: 30 }}
      >
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-2xl blur-lg opacity-50"
          style={{ background: config.color, transform: 'translateZ(-16px)' }}
        />

        {/* 3D back slab */}
        <div
          className="absolute inset-1 rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${config.color}, ${config.emissive})`,
            transform: 'translateZ(-10px)',
            boxShadow: `0 12px 28px ${config.color}55`,
          }}
        />

        {/* Side depth edge */}
        <div
          className="absolute inset-1 rounded-xl opacity-60"
          style={{
            background: config.emissive,
            transform: 'translateZ(-5px) scale(0.97)',
          }}
        />

        {/* White logo plate */}
        <div
          className="absolute inset-2 rounded-lg bg-white flex items-center justify-center shadow-md"
          style={{ transform: 'translateZ(6px)' }}
        >
          <img
            src={config.logo}
            alt={name}
            className="w-11 h-11 object-contain"
            loading="lazy"
            draggable={false}
          />
        </div>
      </motion.div>
    </div>
  )
}
