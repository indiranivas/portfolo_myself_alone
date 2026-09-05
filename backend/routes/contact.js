import { Router } from 'express'
import { insertMessage } from '../db.js'
import { sendMail, thankYouHtml } from '../mail.js'

const router = Router()

router.post('/', async (req, res) => {
  const { name, email, message } = req.body
  const subject = (req.body.subject || 'Portfolio inquiry').trim()
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' })
  }

  const row = insertMessage({ name, email, subject, message })

  try {
    // Save succeeds even if SMTP isn't configured; only fail hard when mail throws
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
    res.json({ success: true, id: row.id, emailed: true })
  } catch (e) {
    // Message is already saved in CMS — treat as success so the form doesn't fail
    console.warn('Contact saved; email skipped:', e.message)
    res.json({
      success: true,
      id: row.id,
      emailed: false,
      warning: e.message,
    })
  }
})

export default router
