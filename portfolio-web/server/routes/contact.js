import { Router } from 'express'
import { insertMessage } from '../db.js'
import { sendMail, thankYouHtml } from '../mail.js'

const router = Router()

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  const row = insertMessage({ name, email, subject, message })

  try {
    await sendMail({
      to: process.env.MAIL_USER,
      subject: `New Inquiry from ${name}: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })
    await sendMail({
      to: email,
      subject: 'Thank you for contacting me',
      html: thankYouHtml(name, subject),
    })
    res.json({ success: true, id: row.id })
  } catch (e) {
    res.status(500).json({
      error: e.message,
      saved: true,
      id: row.id,
      message: 'Message saved but email failed. Check MAIL settings in .env',
    })
  }
})

export default router
