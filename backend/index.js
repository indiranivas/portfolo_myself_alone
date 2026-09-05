import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import portfolioRoutes from './routes/portfolio.js'
import contactRoutes from './routes/contact.js'
import cmsRoutes from './routes/cms.js'
import { initDb } from './db.js'

const PORT = Number(process.env.PORT) || 3001

function createCorsMiddleware() {
  const defaultOrigins = 'http://localhost:5173,http://127.0.0.1:5173'
  const origins = (process.env.CORS_ORIGIN || defaultOrigins)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  return cors({
    origin(origin, callback) {
      if (!origin || origins.includes('*') || origins.includes(origin)) {
        callback(null, true)
        return
      }
      callback(null, false)
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
}

const app = express()
initDb()

app.use(createCorsMiddleware())
app.use(express.json({ limit: '2mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'portfolio-api' })
})

app.use('/api/auth', authRoutes)
app.use('/api/portfolio', portfolioRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/cms', cmsRoutes)

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
