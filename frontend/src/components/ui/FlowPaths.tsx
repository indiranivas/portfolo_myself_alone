import { motion } from 'framer-motion'

export function FlowPaths() {
  const paths = [
    'M0,120 C200,40 400,200 600,80 C800,-40 1000,160 1200,60',
    'M0,200 C300,280 500,100 800,180 C1000,240 1100,80 1200,140',
    'M0,60 C150,180 350,20 550,100 C750,180 950,40 1200,100',
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-25 z-0">
      <svg
        className="absolute w-[200%] h-full -left-1/4"
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        {paths.map((d, i) => (
          <g key={i}>
            <motion.path
              d={d}
              stroke="url(#flowGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: i * 0.3 }}
            />
            <motion.path
              d={d}
              stroke="#818cf8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="8 24"
              animate={{ strokeDashoffset: [0, -64] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: 'linear' }}
              opacity={0.5}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
