import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { readPortfolio, writePortfolio } from './portfolio.js'
import { getAllMessages, getMessageById, markMessageReplied } from '../db.js'
import { sendMail, replyHtml } from '../mail.js'

const router = Router()
router.use(authMiddleware)

router.put('/personal', (req, res) => {
  const data = readPortfolio()
  const { name, tagline, email, location, linkedin, github, phone } = req.body
  Object.assign(data, { name, tagline, email, location, phone, linkedin, github })
  writePortfolio(data)
  res.json({ success: true, data })
})

router.put('/skills/:category', (req, res) => {
  const data = readPortfolio()
  const { category } = req.params
  const { tech } = req.body
  if (!data.skills[category]) return res.status(400).json({ error: 'Invalid category' })
  data.skills[category].tech = tech
  writePortfolio(data)
  res.json({ success: true })
})

router.post('/experience', (req, res) => {
  const data = readPortfolio()
  data.experience.unshift(req.body)
  writePortfolio(data)
  res.json({ success: true, data })
})

router.put('/experience/:index', (req, res) => {
  const data = readPortfolio()
  const i = Number(req.params.index)
  if (i < 0 || i >= data.experience.length) return res.status(400).json({ error: 'Invalid index' })
  data.experience[i] = req.body
  writePortfolio(data)
  res.json({ success: true })
})

router.delete('/experience/:index', (req, res) => {
  const data = readPortfolio()
  data.experience.splice(Number(req.params.index), 1)
  writePortfolio(data)
  res.json({ success: true })
})

router.post('/projects', (req, res) => {
  const data = readPortfolio()
  data.projects.unshift(req.body)
  writePortfolio(data)
  res.json({ success: true })
})

router.put('/projects/:index', (req, res) => {
  const data = readPortfolio()
  const i = Number(req.params.index)
  data.projects[i] = req.body
  writePortfolio(data)
  res.json({ success: true })
})

router.delete('/projects/:index', (req, res) => {
  const data = readPortfolio()
  data.projects.splice(Number(req.params.index), 1)
  writePortfolio(data)
  res.json({ success: true })
})

router.post('/education', (req, res) => {
  const data = readPortfolio()
  data.education.unshift(req.body)
  writePortfolio(data)
  res.json({ success: true })
})

router.put('/education/:index', (req, res) => {
  const data = readPortfolio()
  data.education[Number(req.params.index)] = req.body
  writePortfolio(data)
  res.json({ success: true })
})

router.delete('/education/:index', (req, res) => {
  const data = readPortfolio()
  data.education.splice(Number(req.params.index), 1)
  writePortfolio(data)
  res.json({ success: true })
})

router.post('/awards', (req, res) => {
  const data = readPortfolio()
  data.awards.unshift({ ...req.body, tags: req.body.tags || [] })
  writePortfolio(data)
  res.json({ success: true })
})

router.put('/awards/:index', (req, res) => {
  const data = readPortfolio()
  data.awards[Number(req.params.index)] = { ...req.body, tags: req.body.tags || [] }
  writePortfolio(data)
  res.json({ success: true })
})

router.delete('/awards/:index', (req, res) => {
  const data = readPortfolio()
  data.awards.splice(Number(req.params.index), 1)
  writePortfolio(data)
  res.json({ success: true })
})

router.get('/messages', (_req, res) => {
  res.json(getAllMessages())
})

router.post('/messages/:id/reply', async (req, res) => {
  const { replySubject, replyBody } = req.body
  const msg = getMessageById(req.params.id)
  if (!msg) return res.status(404).json({ error: 'Message not found' })

  try {
    await sendMail({
      to: msg.email,
      subject: replySubject,
      html: replyHtml(msg.name, replyBody, { date: msg.timestamp, message: msg.message }),
    })
    markMessageReplied(msg.id, replyBody)
    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router
