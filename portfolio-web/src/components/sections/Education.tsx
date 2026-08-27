import { motion, useReducedMotion } from 'framer-motion'
import { usePortfolio } from '../../context/PortfolioContext'

export function Education() {
  const { data } = usePortfolio()
  const reduce = useReducedMotion()

  return (
    <section id="education" className="section-pad py-24 border-t rule">
      <p className="font-mono text-xs tracking-[0.28em] uppercase text-mute mb-4">Background</p>
      <h2 className="font-display text-[11vw] md:text-[5.5vw] leading-[0.85] text-paper mb-12">
        EDUCATION
      </h2>

      <div className="space-y-8 max-w-4xl">
        {data.education.map((edu, i) => (
          <motion.div
            key={edu.institution + edu.degree}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="border-l-2 border-accent/50 pl-6"
          >
            <p className="font-mono text-[11px] text-mute mb-1">{edu.period}</p>
            <h3 className="font-display text-2xl md:text-4xl text-paper leading-none mb-2">
              {edu.institution.toUpperCase()}
            </h3>
            <p className="text-paper/70 text-sm md:text-base">{edu.degree}</p>
            <p className="text-mute text-sm mt-2">
              {edu.location}
              {edu.cgpa ? ` · CGPA ${edu.cgpa}` : ''}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
