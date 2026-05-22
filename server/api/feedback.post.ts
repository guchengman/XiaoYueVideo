import { appendFileSync } from 'node:fs'
import { resolve } from 'node:path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, content } = body || {}

  if (!content?.trim()) {
    throw createError({ statusCode: 400, statusMessage: '请填写反馈内容' })
  }

  const logDir = resolve(process.cwd(), '..', 'logs')
  ensureDir(logDir)

  const logFile = resolve(logDir, `feedback_${formatDate()}.csv`)
  const line = [
    new Date().toISOString(),
    (email || '').replace(/[|,]/g, ' '),
    content.replace(/[|,]/g, ' '),
  ].join('|')

  appendFileSync(logFile, line + '\n', 'utf-8')

  return { code: 200, message: '感谢您的反馈！' }
})

function formatDate() {
  const d = new Date()
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}`
}

function ensureDir(dir: string) {
  try {
    const { existsSync } = require('node:fs')
    const { mkdirSync } = require('node:fs')
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  } catch { /* ignore */ }
}
