import { motion, useReducedMotion } from 'framer-motion'
import { usePortfolio } from '../../context/PortfolioContext'

export function About() {
  const { data } = usePortfolio()
  const reduce = useReducedMotion()

  return (
    <section id="about" className="section-pad py-24 md:py-32 border-t rule">
      <motion.p
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-mono text-xs tracking-[0.28em] uppercase text-mute mb-8"
      >
        Positioning
      </motion.p>

      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-[11vw] md:text-[6.5vw] leading-[0.9] text-paper max-w-5xl"
      >
        NOT JUST WITH MODELS
        <br />
        BUT WITH <span className="text-accent">REAL WORKFLOWS</span>
      </motion.h2>

      <div className="mt-12 grid md:grid-cols-2 gap-10 max-w-5xl">
        <p className="text-paper/75 text-lg leading-relaxed">
          Early-career software engineer and Forward Deployed Engineer working at the intersection of{' '}
          <strong className="text-paper font-medium">AI</strong>,{' '}
          <strong className="text-paper font-medium">enterprise software</strong>,{' '}
          <strong className="text-paper font-medium">cloud</strong>, and{' '}
          <strong className="text-paper font-medium">business workflows</strong>.
        </p>
        <p className="text-mute leading-relaxed">
          Currently at LevelShift building enterprise AI agents, RAG systems, Azure integrations, and
          human-in-the-loop handoffs. Based in {data.location}.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-2">
        {data.interests.map((item) => (
          <span key={item} className="chip hover:border-accent hover:text-accent transition-colors">
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}
