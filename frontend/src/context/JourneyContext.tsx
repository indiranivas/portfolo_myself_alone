import { createContext, useContext, useState, type ReactNode } from 'react'

interface JourneyContextValue {
  activeZone: string
  setActiveZone: (zone: string) => void
}

const JourneyContext = createContext<JourneyContextValue>({
  activeZone: 'home',
  setActiveZone: () => {},
})

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [activeZone, setActiveZone] = useState('home')
  return (
    <JourneyContext.Provider value={{ activeZone, setActiveZone }}>
      {children}
    </JourneyContext.Provider>
  )
}

export function useJourney() {
  return useContext(JourneyContext)
}

export const zones = [
  { id: 'home', label: 'Lobby', icon: '◈' },
  { id: 'projects', label: 'Lab', icon: '⬡' },
  { id: 'experience', label: 'Archive', icon: '▣' },
  { id: 'skills', label: 'Core', icon: '◎' },
  { id: 'education', label: 'Academy', icon: '△' },
  { id: 'awards', label: 'Vault', icon: '★' },
  { id: 'contact', label: 'Portal', icon: '◉' },
]
