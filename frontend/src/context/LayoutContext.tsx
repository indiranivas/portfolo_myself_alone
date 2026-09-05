import { createContext, useContext, useState, type ReactNode } from 'react'

export type Tab = 'profile' | 'portfolio'

interface LayoutContextValue {
  tab: Tab
  setTab: (tab: Tab) => void
  openContact: () => void
}

const LayoutContext = createContext<LayoutContextValue | null>(null)

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<Tab>('profile')

  const openContact = () => {
    setTab('profile')
    setTimeout(() => {
      const el = document.getElementById('contact')
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }

  return (
    <LayoutContext.Provider value={{ tab, setTab, openContact }}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  const ctx = useContext(LayoutContext)
  if (!ctx) throw new Error('useLayout must be used within LayoutProvider')
  return ctx
}
