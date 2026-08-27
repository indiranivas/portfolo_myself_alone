import { motion } from 'framer-motion'
import { usePortfolio } from '../../context/PortfolioContext'

export function MarqueeStrip() {
  const { data } = usePortfolio()
  const items = [
    ...Object.values(data.skills).flatMap((s) => s.tech).slice(0, 10),
    'AI ENGINEER',
    'DATA SCIENCE',
    'NLP',
    'IoT',
  ]
  const text = items.join('   ✦   ') + '   ✦   '

  return (
    <div className="py-5 border-y border-white/10 overflow-hidden bg-black/40">
      <motion.div
        className="whitespace-nowrap text-white/10 font-serif italic text-4xl md:text-5xl"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        <span className="inline-block pr-8">{text}</span>
        <span className="inline-block pr-8" aria-hidden>{text}</span>
      </motion.div>
    </div>
  )
}
