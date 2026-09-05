/** Ensure external links work when portfolio fields are missing (e.g. static hosting). */
export function externalUrl(value: string | undefined | null, fallback = '#'): string {
  if (!value || typeof value !== 'string') return fallback
  const trimmed = value.trim()
  if (!trimmed) return fallback
  return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`
}
