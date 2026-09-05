import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  subtitle?: string
}

export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="mb-16 text-center"
    >
      <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full glass text-primary">
        {eyebrow}
      </span>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

interface GlassCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function GlassCard({ children, className = '', delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`glass-card glow-border p-6 md:p-8 ${className}`}
    >
      {children}
    </motion.div>
  )
}

interface TechBadgeProps {
  label: string
}

export function TechBadge({ label }: TechBadgeProps) {
  return (
    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
      {label}
    </span>
  )
}
