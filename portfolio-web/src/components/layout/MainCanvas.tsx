import { createContext, useContext, useEffect, useRef, type ReactNode, type RefObject } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const ScrollContainerContext = createContext<RefObject<HTMLElement | null> | null>(null)

export function useScrollContainer() {
  return useContext(ScrollContainerContext)
}

export function MainCanvas({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ container: ref })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = 0
  }, [children])

  return (
    <ScrollContainerContext.Provider value={ref}>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 lg:left-[280px] xl:left-[300px] h-[2px] bg-accent origin-left z-50 pointer-events-none"
      />
      <main
        ref={ref}
        className="flex-1 lg:ml-[280px] xl:ml-[300px] bg-[#0a0a0a] min-h-screen max-h-screen overflow-y-auto overflow-x-hidden pb-20 lg:pb-0"
      >
        {children}
      </main>
    </ScrollContainerContext.Provider>
  )
}
