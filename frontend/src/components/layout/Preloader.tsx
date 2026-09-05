import { useEffect, useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'

type Phase = 'show' | 'exit' | 'done'

interface PreloaderProps {
  onComplete?: () => void
}

/** First-load: just — 100 ——— 100 — name. CSS-only so production never sticks invisible. */
export function Preloader({ onComplete }: PreloaderProps) {
  const { data } = usePortfolio()
  const first = data.name.split(' ')[0].toLowerCase()
  const [phase, setPhase] = useState<Phase>('show')

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'

    const exitAt = window.setTimeout(() => setPhase('exit'), 2000)
    const doneAt = window.setTimeout(() => {
      setPhase('done')
      document.documentElement.style.overflow = ''
      onComplete?.()
    }, 2800)
    const failsafe = window.setTimeout(() => {
      document.documentElement.style.overflow = ''
      onComplete?.()
    }, 4500)

    return () => {
      window.clearTimeout(exitAt)
      window.clearTimeout(doneAt)
      window.clearTimeout(failsafe)
      document.documentElement.style.overflow = ''
    }
  }, [onComplete])

  if (phase === 'done') return null

  return (
    <div
      className={`fixed inset-0 z-[200] bg-ink flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === 'exit' ? '-translate-y-full' : 'translate-y-0'
      }`}
      aria-hidden
    >
      <div className="w-full section-pad animate-[fadeIn_0.6s_ease-out_both]">
        <div className="flex items-end justify-between gap-3 max-w-6xl mx-auto">
          <p className="font-script text-5xl md:text-7xl lg:text-8xl text-paper leading-none">just</p>

          <div className="flex-1 mx-3 md:mx-8 relative top-[-8px]">
            <div className="h-px bg-paper/40 w-full origin-center animate-[growX_0.8s_ease-out_0.1s_both]" />
            <span className="absolute -left-0.5 -top-3 font-mono text-[10px] md:text-[11px] text-mute">100</span>
            <span className="absolute -right-0.5 -top-3 font-mono text-[10px] md:text-[11px] text-mute">100</span>
          </div>

          <p className="font-script text-5xl md:text-7xl lg:text-8xl text-hot leading-none">{first}</p>
        </div>
      </div>
    </div>
  )
}
