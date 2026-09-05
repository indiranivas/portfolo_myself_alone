const API_BASE = '/api'

function getToken() {
  return localStorage.getItem('cms_token')
}

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  const contentType = res.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    throw new Error('Expected JSON response')
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error((data as { error?: string }).error || 'Request failed')
  return data as T
}

export const api = {
  getPortfolio: () => apiFetch('/portfolio'),
  login: (username: string, password: string) =>
    apiFetch<{ token: string; username: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  requestOtp: (username: string) =>
    apiFetch('/auth/otp/request', { method: 'POST', body: JSON.stringify({ username }) }),
  verifyOtp: (username: string, otp: string) =>
    apiFetch<{ token: string; username: string }>('/auth/otp/verify', {
      method: 'POST',
      body: JSON.stringify({ username, otp }),
    }),
  sendContact: (body: { name: string; email: string; subject: string; message: string }) =>
    apiFetch('/contact', { method: 'POST', body: JSON.stringify(body) }),
  updatePersonal: (body: Record<string, string>) =>
    apiFetch('/cms/personal', { method: 'PUT', body: JSON.stringify(body) }),
  updateSkills: (category: string, tech: string[]) =>
    apiFetch(`/cms/skills/${category}`, { method: 'PUT', body: JSON.stringify({ tech }) }),
  saveExperience: (index: number | null, body: unknown) =>
    index === null
      ? apiFetch('/cms/experience', { method: 'POST', body: JSON.stringify(body) })
      : apiFetch(`/cms/experience/${index}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteExperience: (index: number) =>
    apiFetch(`/cms/experience/${index}`, { method: 'DELETE' }),
  saveProject: (index: number | null, body: unknown) =>
    index === null
      ? apiFetch('/cms/projects', { method: 'POST', body: JSON.stringify(body) })
      : apiFetch(`/cms/projects/${index}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteProject: (index: number) =>
    apiFetch(`/cms/projects/${index}`, { method: 'DELETE' }),
  saveEducation: (index: number | null, body: unknown) =>
    index === null
      ? apiFetch('/cms/education', { method: 'POST', body: JSON.stringify(body) })
      : apiFetch(`/cms/education/${index}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteEducation: (index: number) =>
    apiFetch(`/cms/education/${index}`, { method: 'DELETE' }),
  saveAward: (index: number | null, body: unknown) =>
    index === null
      ? apiFetch('/cms/awards', { method: 'POST', body: JSON.stringify(body) })
      : apiFetch(`/cms/awards/${index}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteAward: (index: number) => apiFetch(`/cms/awards/${index}`, { method: 'DELETE' }),
  getMessages: () => apiFetch<ContactMessage[]>('/cms/messages'),
  replyMessage: (id: number, replySubject: string, replyBody: string) =>
    apiFetch(`/cms/messages/${id}/reply`, {
      method: 'POST',
      body: JSON.stringify({ replySubject, replyBody }),
    }),
}

export interface ContactMessage {
  id: number
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
  replied: number
  reply_content?: string
  reply_timestamp?: string
}
