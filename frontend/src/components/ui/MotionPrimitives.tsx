import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'p' | 'span'
}

export function TextReveal({ children, className = '', delay = 0, as = 'span' }: TextRevealProps) {
  const words = children.split(' ')
  const Tag = as

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotateX: 40 }}
            whileInView={{ y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.06,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

interface SplitHeadingProps {
  line1: string
  line2: string
  className?: string
}

export function SplitHeading({ line1, line2, className = '' }: SplitHeadingProps) {
  return (
    <div className={className}>
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1], delay: 0.3 }}
          className="font-display text-[12vw] md:text-[8vw] font-bold leading-[0.9] tracking-tighter uppercase"
        >
          {line1}
        </motion.h1>
      </div>
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1], delay: 0.45 }}
          className="font-display text-[12vw] md:text-[8vw] font-bold leading-[0.9] tracking-tighter uppercase text-transparent stroke-text"
        >
          {line2}
        </motion.h1>
      </div>
    </div>
  )
}

interface MagneticButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  download?: boolean
  className?: string
  variant?: 'primary' | 'outline'
}

export function MagneticButton({
  children,
  onClick,
  href,
  download,
  className = '',
  variant = 'primary',
}: MagneticButtonProps) {
  const base =
    variant === 'primary'
      ? 'bg-lime text-black hover:bg-lime/90'
      : 'border border-white/30 text-white hover:border-lime hover:text-lime'

  const inner = (
    <motion.span
      data-cursor="pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-widest transition-colors ${base} ${className}`}
      onClick={onClick}
    >
      {children}
      <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
        →
      </motion.span>
    </motion.span>
  )

  if (href) {
    return (
      <a href={href} download={download} data-cursor="pointer">
        {inner}
      </a>
    )
  }

  return inner
}
