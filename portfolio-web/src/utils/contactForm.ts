export interface ContactPayload {
  name: string
  email: string
  message: string
  subject?: string
}

/** Dev uses Express API; production on Netlify uses Netlify Forms. */
export async function submitContact(payload: ContactPayload): Promise<void> {
  const subject = payload.subject?.trim() || 'Portfolio inquiry'

  if (import.meta.env.DEV) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, subject }),
    })
    if (!res.ok) throw new Error('Request failed')
    return
  }

  const body = new URLSearchParams({
    'form-name': 'contact',
    name: payload.name,
    email: payload.email,
    message: payload.message,
    subject,
  })

  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  if (!res.ok) throw new Error('Request failed')
}
