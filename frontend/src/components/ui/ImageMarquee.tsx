import { motion } from 'framer-motion'

interface ImageMarqueeProps {
  images: { src: string; alt: string }[]
  speed?: number
  reverse?: boolean
}

export function ImageMarquee({ images, speed = 40, reverse = false }: ImageMarqueeProps) {
  const doubled = [...images, ...images]

  return (
    <div className="overflow-hidden py-4">
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((img, i) => (
          <motion.div
            key={`${img.src}-${i}`}
            whileHover={{ scale: 1.05, y: -6 }}
            className="relative shrink-0 w-56 h-36 md:w-72 md:h-48 rounded-2xl overflow-hidden border border-white/10 group"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
