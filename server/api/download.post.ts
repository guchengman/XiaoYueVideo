import { mkdirSync } from 'node:fs'
import { TEMP_DIR } from '../downloaders/_shared'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const cdnUrl = body?.url as string | undefined
  const audioUrl = body?.audioUrl as string | undefined
  const host = body?.host as string | undefined

  if (!cdnUrl) {
    throw createError({ statusCode: 400, message: '请提供下载地址' })
  }

  // No audio — redirect directly to CDN
  if (!audioUrl) {
    return sendRedirect(event, cdnUrl)
  }

  const jobId = createJob()
  mkdirSync(TEMP_DIR, { recursive: true })

  // Dispatch to platform-specific downloader
  const { handleDownload } = await getHandler(host || 'default')
  handleDownload({ jobId, url: cdnUrl, audioUrl }).catch((err) => {
    markError(jobId, err.message || '下载失败')
  })

  return { code: 200, data: { jobId } }
})
