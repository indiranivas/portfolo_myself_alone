import nodemailer from 'nodemailer'

export function getTransporter() {
  const user = process.env.MAIL_USER
  const pass = process.env.MAIL_PASS
  if (!user || !pass) return null

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.MAIL_PORT || 587),
    secure: false,
    auth: { user, pass },
  })
}

export async function sendMail({ to, subject, html, text }) {
  const transporter = getTransporter()
  if (!transporter) throw new Error('Email not configured. Set MAIL_USER and MAIL_PASS in .env')

  const from = process.env.MAIL_USER
  return transporter.sendMail({ from, to, subject, html, text })
}

export function thankYouHtml(name, subject) {
  return `
    <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;padding:32px">
      <h2 style="color:#6366f1">Thank you, ${name}!</h2>
      <p>I've received your message about <strong>${subject}</strong> and will get back to you soon.</p>
      <p style="color:#64748b;font-size:14px">— Indira Nivas</p>
    </div>`
}

export function replyHtml(name, replyBody, original) {
  return `
    <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;padding:32px">
      <p>Hi ${name},</p>
      <p>${replyBody.replace(/\n/g, '<br>')}</p>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0"/>
      <p style="color:#94a3b8;font-size:13px">Your original message (${original.date}):<br>${original.message}</p>
    </div>`
}
