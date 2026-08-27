import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, 'data')
const usersPath = path.join(dataDir, 'users.json')
const messagesPath = path.join(dataDir, 'messages.json')

function ensureDir() {
  fs.mkdirSync(dataDir, { recursive: true })
}

function readJson(file, fallback) {
  ensureDir()
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(fallback, null, 2))
    return fallback
  }
  return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

function writeJson(file, data) {
  ensureDir()
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

export function initDb() {
  ensureDir()
  const users = readJson(usersPath, { users: [], nextId: 1 })
  const adminUser = process.env.ADMIN_USER || 'indiranivas'
  const adminPass = process.env.ADMIN_PASS || 'Indiranivas1@'

  if (!users.users.find((u) => u.username === adminUser)) {
    users.users.push({
      id: users.nextId++,
      username: adminUser,
      password: bcrypt.hashSync(adminPass, 10),
      otp_secret: null,
      otp_expiry: null,
    })
    writeJson(usersPath, users)
    console.log(`Admin user created: ${adminUser}`)
  }

  readJson(messagesPath, { messages: [], nextId: 1 })
}

export function getUserByUsername(username) {
  const { users } = readJson(usersPath, { users: [], nextId: 1 })
  return users.find((u) => u.username === username) || null
}

export function updateUser(id, fields) {
  const data = readJson(usersPath, { users: [], nextId: 1 })
  const user = data.users.find((u) => u.id === id)
  if (!user) return null
  Object.assign(user, fields)
  writeJson(usersPath, data)
  return user
}

export function insertMessage({ name, email, subject, message }) {
  const data = readJson(messagesPath, { messages: [], nextId: 1 })
  const row = {
    id: data.nextId++,
    name,
    email,
    subject,
    message,
    timestamp: new Date().toISOString(),
    replied: 0,
    reply_content: null,
    reply_timestamp: null,
  }
  data.messages.unshift(row)
  writeJson(messagesPath, data)
  return row
}

export function getAllMessages() {
  const { messages } = readJson(messagesPath, { messages: [], nextId: 1 })
  return messages
}

export function getMessageById(id) {
  const { messages } = readJson(messagesPath, { messages: [], nextId: 1 })
  return messages.find((m) => m.id === Number(id)) || null
}

export function markMessageReplied(id, replyBody) {
  const data = readJson(messagesPath, { messages: [], nextId: 1 })
  const msg = data.messages.find((m) => m.id === Number(id))
  if (!msg) return null
  msg.replied = 1
  msg.reply_content = replyBody
  msg.reply_timestamp = new Date().toISOString()
  writeJson(messagesPath, data)
  return msg
}
