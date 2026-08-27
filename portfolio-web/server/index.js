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
const PORT = process.env.PORT || 3001
const app = express()

initDb()

app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: '2mb' }))

app.use('/api/auth', authRoutes)
app.use('/api/portfolio', portfolioRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/cms', cmsRoutes)

const distPath = path.join(__dirname, '../dist')
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Not found' })
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
