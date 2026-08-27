import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { getUserByUsername, updateUser } from '../db.js'
import { signToken } from '../middleware/auth.js'
import { sendMail } from '../mail.js'

const router = Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' })

  const user = getUserByUsername(username)
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = signToken({ id: user.id, username: user.username })
  res.json({ token, username: user.username })
})

router.post('/otp/request', async (req, res) => {
  const { username } = req.body
  const user = getUserByUsername(username)
  if (!user) return res.status(404).json({ error: 'User not found' })

  const otp = String(Math.floor(100000 + Math.random() * 900000))
  const expiry = new Date(Date.now() + 10 * 60 * 1000).toISOString()

  updateUser(user.id, { otp_secret: otp, otp_expiry: expiry })

  try {
    await sendMail({
      to: process.env.MAIL_USER,
      subject: 'Your CMS Login OTP',
      text: `Your OTP is: ${otp}\nExpires in 10 minutes.`,
    })
    res.json({ success: true, message: 'OTP sent to admin email' })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post('/otp/verify', (req, res) => {
  const { username, otp } = req.body
  const user = getUserByUsername(username)
  if (!user || user.otp_secret !== otp) return res.status(401).json({ error: 'Invalid OTP' })
  if (new Date(user.otp_expiry) < new Date()) return res.status(401).json({ error: 'OTP expired' })

  updateUser(user.id, { otp_secret: null, otp_expiry: null })
  const token = signToken({ id: user.id, username: user.username })
  res.json({ token, username: user.username })
})

export default router
