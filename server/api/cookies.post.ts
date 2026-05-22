import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const COOKIE_DIR = resolve(process.cwd(), '..', 'cookies')

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { platform, content } = body || {}
  if (!platform) throw createError({ statusCode: 400, message: '缺少平台参数' })
  if (!content) throw createError({ statusCode: 400, message: '缺少Cookie内容' })

  if (!existsSync(COOKIE_DIR)) mkdirSync(COOKIE_DIR, { recursive: true })

  const fp = resolve(COOKIE_DIR, `${platform}_cookies.txt`)
  writeFileSync(fp, content, 'utf-8')

  const lineCount = content.split('\n').filter(l => {
    const t = l.trim()
    if (!t) return false
    if (t.startsWith('#HttpOnly_')) return true  // valid Netscape cookie
    return !t.startsWith('#')
  }).length
  return { code: 200, message: `已保存 ${lineCount} 条 Cookie` }
})
