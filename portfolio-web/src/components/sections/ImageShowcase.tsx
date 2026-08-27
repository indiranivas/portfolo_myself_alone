import { ImageMarquee } from '../ui/ImageMarquee'
import { galleryImages } from '../../data/images'
import { motion } from 'framer-motion'

export function ImageShowcase() {
  return (
    <section className="py-16 border-y border-white/10 overflow-hidden bg-black/50">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-white/30 text-xs tracking-[0.4em] uppercase mb-8"
      >
        Visual Journey
      </motion.p>
      <ImageMarquee images={galleryImages} speed={35} />
      <ImageMarquee images={[...galleryImages].reverse()} speed={45} reverse />
    </section>
  )
}
