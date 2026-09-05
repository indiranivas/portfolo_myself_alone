import { Router } from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataPath = path.join(__dirname, '../data/portfolio.json')

const router = Router()

export function readPortfolio() {
  const raw = fs.readFileSync(dataPath, 'utf-8')
  return JSON.parse(raw)
}

export function writePortfolio(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8')
}

router.get('/', (_req, res) => {
  try {
    res.json(readPortfolio())
  } catch {
    res.status(500).json({ error: 'Failed to load portfolio data' })
  }
})

export default router
