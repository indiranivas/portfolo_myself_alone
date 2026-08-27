import { motion } from 'framer-motion'
import { usePortfolio } from '../../context/PortfolioContext'
import { useLayout } from '../../context/LayoutContext'

export function Sidebar() {
  const { data } = usePortfolio()
  const { tab, setTab, openContact } = useLayout()
  const initials = data.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
  const companies = [...new Set(data.experience.map((e) => e.company))]
  const role = data.tagline.split('|')[0].trim()

  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[280px] xl:w-[300px] bg-white border-r border-neutral-200 flex-col z-40">
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-5">
            <div className="w-[104px] h-[104px] rounded-full bg-neutral-900 text-white flex items-center justify-center text-3xl font-serif tracking-tight">
              {initials}
            </div>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold whitespace-nowrap">
              Open to Work
            </span>
          </div>

          <h1 className="text-[20px] font-semibold text-neutral-900 leading-tight mt-3">{data.name}</h1>
          <p className="text-[13px] text-neutral-500 mt-1.5">{data.location.split(',')[0]}, India</p>
          <p className="text-[13px] font-medium text-neutral-800 mt-3 leading-snug px-2">{role}</p>
        </div>

        <div className="mt-8 text-left">
          <p className="text-[13px] font-semibold text-neutral-900">
            {data.experience.length}+ Years Experience Includes:
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {companies.map((c) => (
              <span
                key={c}
                className="inline-flex items-center px-2.5 py-1.5 rounded-lg bg-neutral-100 border border-neutral-200 text-[11px] font-medium text-neutral-700"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={openContact}
            className="flex-1 h-11 rounded-full bg-neutral-900 text-white text-sm font-medium inline-flex items-center justify-center gap-2"
          >
            <span aria-hidden>✉</span> Message
          </motion.button>
          <a
            href={data.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 w-11 rounded-full border border-neutral-300 inline-flex items-center justify-center text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
            aria-label="LinkedIn"
          >
            in
          </a>
        </div>

        <a
          href="/resume.pdf"
          download
          className="mt-3 block h-10 rounded-full border border-neutral-300 text-center leading-10 text-[13px] font-medium text-neutral-700 hover:bg-neutral-50"
        >
          Download Resume
        </a>

        <nav className="mt-8 pt-6 border-t border-neutral-100 space-y-1">
          {(
            [
              { id: 'profile' as const, label: 'Profile', icon: '◎' },
              { id: 'portfolio' as const, label: 'Portfolio', icon: '◫' },
            ]
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-[13px] font-medium transition ${
                tab === item.id
                  ? 'bg-neutral-100 text-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <span className="opacity-50">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="px-6 py-4 border-t border-neutral-100 text-[11px] text-neutral-400">
        © {new Date().getFullYear()} {data.name}
      </div>
    </aside>
  )
}
