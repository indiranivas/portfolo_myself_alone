/** Remote Render API origin, without trailing slash (set in Netlify build env). */
export function getRemoteApiOrigin(): string | null {
  const value = import.meta.env.VITE_API_URL?.trim()
  if (!value) return null
  return value.replace(/\/$/, '')
}

/** Base path for API calls (`/api` locally, or `https://api.onrender.com/api`). */
export function getApiBase(): string {
  const remote = getRemoteApiOrigin()
  if (remote) return `${remote}/api`
  return '/api'
}

export function hasRemoteApi(): boolean {
  return getRemoteApiOrigin() !== null
}
