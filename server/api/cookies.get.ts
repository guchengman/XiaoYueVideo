import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const COOKIE_DIR = resolve(process.cwd(), '..', 'cookies')

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const platform = query.platform as string
  if (!platform) throw createError({ statusCode: 400, statusMessage: '缺少平台参数' })

  const fp = resolve(COOKIE_DIR, `${platform}_cookies.txt`)
  if (!existsSync(fp)) {
    return { code: 200, data: { exists: false, count: 0, preview: '' } }
  }

  const content = readFileSync(fp, 'utf-8')
  const validLines = content.split('\n').filter(l => {
    const t = l.trim()
    if (!t) return false
    if (t.startsWith('#HttpOnly_')) return true  // valid Netscape cookie
    return !t.startsWith('#')
  })
  return {
    code: 200,
    data: {
      exists: true,
      count: validLines.length,
      preview: content.slice(0, 300),
    }
  }
})
