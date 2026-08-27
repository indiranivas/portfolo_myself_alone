import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { PortfolioProvider } from './context/PortfolioContext'
import { ProtectedRoute } from './components/cms/ProtectedRoute'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { CmsDashboard } from './pages/CmsDashboard'
import { CmsMessages } from './pages/CmsMessages'

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/cms"
              element={
                <ProtectedRoute>
                  <CmsDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cms/messages"
              element={
                <ProtectedRoute>
                  <CmsMessages />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </PortfolioProvider>
    </AuthProvider>
  )
}

export default App
