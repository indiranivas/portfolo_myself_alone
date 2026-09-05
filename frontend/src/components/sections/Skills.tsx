import { motion, useReducedMotion } from 'framer-motion'
import { usePortfolio } from '../../context/PortfolioContext'

export function Skills() {
  const { data } = usePortfolio()
  const reduce = useReducedMotion()
  const groups = Object.values(data.skills)

  return (
    <section id="skills" className="section-pad py-24 border-t rule">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <p className="font-mono text-xs tracking-[0.28em] uppercase text-mute mb-4">Capabilities</p>
          <h2 className="font-display text-[12vw] md:text-[6vw] leading-[0.85] text-paper">
            STACK
          </h2>
        </div>
        <p className="text-mute max-w-sm text-sm md:text-base">
          Technology split by domain — AI agents, software, cloud, and enterprise FDE work.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
        {groups.map((group, i) => (
          <motion.div
            key={group.title}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="border border-paper/10 p-6 md:p-8 hover:border-accent/35 transition-colors"
          >
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent mb-3">
              0{i + 1} · {group.title}
            </p>
            {group.description && (
              <p className="text-paper/60 text-sm leading-relaxed mb-6">{group.description}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {group.tech.map((item) => (
                <span
                  key={item}
                  className="chip hover:border-accent hover:text-accent transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
