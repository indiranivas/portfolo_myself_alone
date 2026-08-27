import { motion } from 'framer-motion'
import { useHouse } from '../house/HouseContext'
import { ROOMS } from '../house/types'

export function IntroOverlay() {
  const { inside, enterHouse } = useHouse()

  if (inside) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="intro-overlay"
    >
      <div className="intro-content">
        <p className="intro-eyebrow">Smart Home Portfolio · 2026</p>
        <h1>
          Hi, I'm <span>Nivas</span>.
        </h1>
        <p className="intro-sub">Software Engineer & AI Developer</p>
        <p className="intro-hint">Explore my work by entering the house</p>
        <button className="intro-cta" onClick={enterHouse}>
          Open Front Door →
        </button>
        <p className="intro-tip">Or click the front door in the 3D scene</p>
      </div>
    </motion.div>
  )
}

export function MiniNav() {
  const { room, goToRoom, closePanel } = useHouse()

  return (
    <nav className="mini-nav">
      {ROOMS.map((r) => (
        <button
          key={r.id}
          className={room === r.id ? 'active' : ''}
          onClick={() => {
            closePanel()
            goToRoom(r.id)
          }}
          title={r.description}
        >
          {r.label}
        </button>
      ))}
    </nav>
  )
}

export function RoomHint() {
  const { room, inside, panel } = useHouse()
  if (!inside || panel) return null

  const current = ROOMS.find((r) => r.id === room)
  if (!current) return null

  return (
    <div className="room-hint">
      <span>{current.label}</span>
      <small>Click objects to interact · Use nav to jump rooms</small>
    </div>
  )
}

export function LoadingScreen({ ready }: { ready: boolean }) {
  if (ready) return null
  return (
    <div className="loading-screen">
      <div className="loading-house">🏠</div>
      <p>Building your smart home...</p>
    </div>
  )
}
