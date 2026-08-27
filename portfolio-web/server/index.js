import 'dotenv/config'
import express from 'express'
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
const PORT = Number(process.env.PORT) || (isProd ? 3000 : 5173)

async function createServer() {
  const app = express()
  initDb()

  app.use(express.json({ limit: '2mb' }))

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
    console.log(`App running on http://localhost:${PORT}`)
  })
}

createServer().catch((err) => {
  console.error(err)
  process.exit(1)
})
