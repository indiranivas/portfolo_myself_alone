import { motion, useReducedMotion } from 'framer-motion'
import { usePortfolio } from '../../context/PortfolioContext'

export function Projects() {
  const { data } = usePortfolio()
  const reduce = useReducedMotion()

  return (
    <section id="work" className="section-pad py-24 border-t rule">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <p className="font-mono text-xs tracking-[0.28em] uppercase text-mute mb-4">Featured work</p>
          <h2 className="font-display text-[13vw] md:text-[7vw] leading-[0.85] text-paper">
            SELECTED
            <br />
            WORK
          </h2>
        </div>
        <p className="text-mute max-w-sm text-sm md:text-base">
          AI systems & product thinking — with experiments across healthcare, IoT, and automation.
        </p>
      </div>

      <div>
        {data.projects.map((project, i) => (
          <motion.a
            key={project.name}
            href={project.link || '#contact'}
            target={project.link ? '_blank' : undefined}
            rel={project.link ? 'noopener noreferrer' : undefined}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="block border-t border-paper/12 py-8 md:py-10 group focus-visible:bg-surface/40"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
              <div className="max-w-2xl">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-mono text-mute text-sm">0{i + 1}</span>
                  <h3 className="font-display text-3xl md:text-5xl leading-none text-paper group-hover:text-accent transition-colors">
                    {project.name.toUpperCase()}
                  </h3>
                </div>
                <p className="text-paper/55 text-sm md:text-base leading-relaxed md:pl-10">
                  {project.description}
                </p>
              </div>
              <div className="lg:text-right shrink-0 space-y-2">
                <p className="font-mono text-[11px] uppercase tracking-widest text-mute">project</p>
                <p className="text-paper/65 text-sm">{project.tech.slice(0, 2).join(' · ')}</p>
                <p className="text-accent text-sm mt-4 opacity-70 group-hover:opacity-100 transition">
                  {project.link ? 'view →' : 'ask me →'}
                </p>
              </div>
            </div>
            <p className="mt-5 text-mute text-sm md:pl-10">
              <span className="text-accent font-mono text-[11px] uppercase tracking-wider mr-2">Impact</span>
              {project.impact}
            </p>
          </motion.a>
        ))}
        <div className="border-t border-paper/12" />
      </div>
    </section>
  )
}
