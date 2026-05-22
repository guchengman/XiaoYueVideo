import { existsSync, unlinkSync } from 'node:fs'
import { resolve } from 'node:path'

const COOKIE_DIR = resolve(process.cwd(), 'cookies')

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const platform = query.platform as string
  if (!platform) throw createError({ statusCode: 400, message: '缺少平台参数' })

  const fp = resolve(COOKIE_DIR, `${platform}_cookies.txt`)
  if (existsSync(fp)) unlinkSync(fp)

  return { code: 200, message: 'Cookie 已清除' }
})
