import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import portfolioRoutes from './routes/portfolio.js'
import contactRoutes from './routes/contact.js'
import cmsRoutes from './routes/cms.js'
import { initDb } from './db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProd = process.env.NODE_ENV === 'production' || process.argv.includes('--prod')
const apiOnly = process.env.API_ONLY === 'true' || process.argv.includes('--api-only')
const PORT = Number(process.env.PORT) || (isProd ? 3000 : 5173)

function createCorsMiddleware() {
  const origins = (process.env.CORS_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  return cors({
    origin(origin, callback) {
      if (!origin || origins.length === 0 || origins.includes('*') || origins.includes(origin)) {
        callback(null, true)
        return
      }
      callback(null, false)
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
}

async function createServer() {
  const app = express()
  initDb()

  if (apiOnly) {
    app.use(createCorsMiddleware())
  }

  app.use(express.json({ limit: '2mb' }))

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'portfolio-api' })
  })

  app.use('/api/auth', authRoutes)
  app.use('/api/portfolio', portfolioRoutes)
  app.use('/api/contact', contactRoutes)
  app.use('/api/cms', cmsRoutes)

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite')
    const vite = await createViteServer({
      root: path.join(__dirname, '..'),
      server: { middlewareMode: true },
      appType: 'spa',
    })
    app.use(vite.middlewares)
  } else if (apiOnly) {
    app.use((_req, res) => {
      res.status(404).json({ error: 'Not found' })
    })
  } else {
    const distPath = path.join(__dirname, '../dist')
    if (!fs.existsSync(distPath)) {
      console.error('Missing dist/. Run npm run build first.')
      process.exit(1)
    }
    app.use(express.static(distPath))
    app.get('*', (req, res) => {
      if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Not found' })
      res.sendFile(path.join(distPath, 'index.html'))
    })
  }

  app.listen(PORT, () => {
    const mode = apiOnly ? 'API only' : isProd ? 'production' : 'development'
    console.log(`App running on http://localhost:${PORT} (${mode})`)
  })
}

createServer().catch((err) => {
  console.error(err)
  process.exit(1)
})
