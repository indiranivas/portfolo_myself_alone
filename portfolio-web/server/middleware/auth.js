import jwt from 'jsonwebtoken'

const SECRET = process.env.SESSION_SECRET || 'dev-secret-change-in-production'

export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '24h' })
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET)
}

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    req.user = verifyToken(header.slice(7))
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
