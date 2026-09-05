import { motion } from 'framer-motion'
import { usePortfolio } from '../../context/PortfolioContext'
import { externalUrl } from '../../utils/urls'

export function SiteFooter() {
  const { data } = usePortfolio()
  const year = new Date().getFullYear()
  const github = externalUrl(data.github)

  return (
    <footer className="mt-8 bg-hot text-ink">
      <div className="section-pad pt-16 pb-8">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase opacity-70 mb-6">
          Available for conversations
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-[16vw] md:text-[11vw] leading-[0.8] tracking-tight"
        >
          {data.name.toUpperCase()}
        </motion.h2>
        <div className="mt-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-t border-ink/20 pt-6">
          <p className="text-sm opacity-80">
            © {year} {data.name}
          </p>
          <div className="flex gap-5 text-sm">
            <a href={`mailto:${data.email}`} className="hover:opacity-70 transition">
              Email
            </a>
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
              LinkedIn
            </a>
            <a href={github} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
