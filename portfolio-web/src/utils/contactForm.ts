import { getApiBase, hasRemoteApi } from './apiBase'

export interface ContactPayload {
  name: string
  email: string
  message: string
  subject?: string
}

async function submitViaApi(payload: ContactPayload): Promise<void> {
  const subject = payload.subject?.trim() || 'Portfolio inquiry'
  const res = await fetch(`${getApiBase()}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, subject }),
  })
  if (!res.ok) throw new Error('Request failed')
}

async function submitViaNetlifyForms(payload: ContactPayload): Promise<void> {
  const subject = payload.subject?.trim() || 'Portfolio inquiry'
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

/** Local dev and Render API use Express; Netlify without VITE_API_URL falls back to Netlify Forms. */
export async function submitContact(payload: ContactPayload): Promise<void> {
  if (import.meta.env.DEV || hasRemoteApi()) {
    await submitViaApi(payload)
    return
  }
  await submitViaNetlifyForms(payload)
}
