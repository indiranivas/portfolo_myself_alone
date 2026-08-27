import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface AuthContextValue {
  token: string | null
  username: string | null
  login: (token: string, username: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('cms_token'))
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem('cms_username'))

  useEffect(() => {
    if (token) localStorage.setItem('cms_token', token)
    else localStorage.removeItem('cms_token')
    if (username) localStorage.setItem('cms_username', username)
    else localStorage.removeItem('cms_username')
  }, [token, username])

  const login = (t: string, u: string) => {
    setToken(t)
    setUsername(u)
  }

  const logout = () => {
    setToken(null)
    setUsername(null)
  }

  return (
    <AuthContext.Provider value={{ token, username, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
