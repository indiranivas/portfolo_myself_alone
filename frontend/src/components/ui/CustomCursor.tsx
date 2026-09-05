import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  const cursorX = useSpring(0, { stiffness: 500, damping: 40 })
  const cursorY = useSpring(0, { stiffness: 500, damping: 40 })
  const ringX = useSpring(0, { stiffness: 150, damping: 20 })
  const ringY = useSpring(0, { stiffness: 150, damping: 20 })

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return
    setEnabled(true)

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      ringX.set(e.clientX)
      ringY.set(e.clientY)
      setVisible(true)
    }

    const down = () => setClicking(true)
    const up = () => setClicking(false)
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setHovering(!!target.closest('a, button, [data-cursor="pointer"]'))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousemove', handleHover)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.body.addEventListener('mouseleave', leave)
    document.body.addEventListener('mouseenter', enter)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousemove', handleHover)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.body.removeEventListener('mouseleave', leave)
      document.body.removeEventListener('mouseenter', enter)
    }
  }, [cursorX, cursorY, ringX, ringY])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference hidden md:block"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
      >
        <div
          className={`w-2 h-2 rounded-full bg-white transition-transform duration-200 ${
            clicking ? 'scale-75' : 'scale-100'
          }`}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none hidden md:block"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: clicking ? 0.8 : hovering ? 1.8 : 1,
          opacity: visible ? (hovering ? 0.9 : 0.5) : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ${
            hovering
              ? 'w-16 h-16 border-lime bg-lime/10'
              : 'w-10 h-10 border-white/40 bg-transparent'
          }`}
        />
      </motion.div>
    </>
  )
}
