import { motion, useReducedMotion } from 'framer-motion'
import { usePortfolio } from '../../context/PortfolioContext'

export function Awards() {
  const { data } = usePortfolio()
  const reduce = useReducedMotion()
  if (!data.awards?.length) return null

  return (
    <section id="awards" className="section-pad py-24 border-t rule">
      <p className="font-mono text-xs tracking-[0.28em] uppercase text-mute mb-4">Recognition</p>
      <h2 className="font-display text-[11vw] md:text-[5.5vw] leading-[0.85] text-paper mb-12">
        AWARDS
      </h2>

      <ul className="max-w-4xl space-y-6">
        {data.awards.map((award, i) => (
          <motion.li
            key={award.title}
            initial={reduce ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex gap-4 items-start border-b border-paper/10 pb-5"
          >
            <span className="font-mono text-accent text-sm shrink-0">0{i + 1}</span>
            <div>
              <p className="text-paper text-lg md:text-xl leading-snug">{award.title}</p>
              <p className="text-mute text-sm mt-1">
                {[award.organization, award.date].filter(Boolean).join(' · ')}
              </p>
              {award.description && (
                <p className="text-paper/55 text-sm mt-2 leading-relaxed">{award.description}</p>
              )}
              {award.score && <p className="text-accent text-xs font-mono mt-2">{award.score}</p>}
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
