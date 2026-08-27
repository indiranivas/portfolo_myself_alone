import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { PortfolioData } from '../types/portfolio'
import { fallbackPortfolioData } from '../data/portfolio'
import { api } from '../api/client'

interface PortfolioContextValue {
  data: PortfolioData
  loading: boolean
  refresh: () => Promise<void>
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null)

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(fallbackPortfolioData)
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    try {
      const portfolio = (await api.getPortfolio()) as PortfolioData
      setData(portfolio)
    } catch {
      setData(fallbackPortfolioData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <PortfolioContext.Provider value={{ data, loading, refresh }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider')
  return ctx
}
