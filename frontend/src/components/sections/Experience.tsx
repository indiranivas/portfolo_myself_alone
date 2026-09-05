import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'

export function Experience() {
  const { data } = usePortfolio()
  const [active, setActive] = useState<number | null>(null)
  const reduce = useReducedMotion()

  const goSkills = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    document.getElementById('skills')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section id="experience" className="section-pad py-20 md:py-28 border-t rule">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
        <div>
          <p className="font-mono text-xs tracking-[0.28em] uppercase text-mute mb-2">#experience</p>
          <p className="text-mute text-sm max-w-md">
            Role highlights only — full technology map lives in{' '}
            <button type="button" onClick={goSkills} className="text-accent hover:underline">
              Skills
            </button>
            .
          </p>
        </div>
        <p className="font-mono text-[11px] text-mute/80">press to preview</p>
      </div>

      <div>
        {data.experience.map((exp, i) => {
          const open = active === i
          return (
            <motion.button
              key={exp.company + exp.role}
              type="button"
              aria-expanded={open}
              onClick={() => setActive(open ? null : i)}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="w-full text-left border-t border-paper/12 py-5 md:py-7 group"
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-8">
                <h3 className="font-display text-[9vw] md:text-[5vw] leading-[0.9] text-paper group-hover:text-accent transition-colors">
                  {exp.company.toUpperCase()}
                </h3>
                <p className="text-mute text-sm md:text-base shrink-0 max-w-md md:text-right">
                  {exp.role}
                </p>
              </div>

              <motion.div
                initial={false}
                animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : 0.28 }}
                className="overflow-hidden"
              >
                <div className="pt-5 pb-1 max-w-2xl">
                  <p className="font-mono text-xs text-accent mb-4">
                    {exp.period}
                    {exp.location ? ` · ${exp.location}` : ''}
                  </p>
                  <ul className="space-y-3">
                    {exp.description.map((line) => (
                      <li key={line} className="text-paper/65 text-sm md:text-base leading-relaxed flex gap-3">
                        <span className="text-accent shrink-0 mt-0.5">—</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                    <span
                      role="link"
                      tabIndex={0}
                      onClick={goSkills}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          goSkills(e)
                        }
                      }}
                      className="text-xs text-accent ml-1 hover:underline cursor-pointer"
                    >
                      full stack →
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.button>
          )
        })}
        <div className="border-t border-paper/12" />
      </div>
    </section>
  )
}
