import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { getHandler } from '../downloaders/index'
import { TEMP_DIR, downloadWithProgress, getFetchOpts } from '../downloaders/_shared'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const cdnUrl = body?.url as string | undefined
  const audioUrl = body?.audioUrl as string | undefined
  const host = body?.host as string | undefined
  const ext = body?.ext as string | undefined

  if (!cdnUrl) {
    throw createError({ statusCode: 400, message: '请提供下载地址' })
  }

  // No audio — download single file server-side (CDN may require headers like Referer)
  if (!audioUrl) {
    const jobId = createJob(ext || 'mp4')
    mkdirSync(TEMP_DIR, { recursive: true })

    const tag = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    const outPath = resolve(TEMP_DIR, `${tag}.${ext || 'mp4'}`)

    downloadWithProgress(cdnUrl, outPath, jobId, 'video', getFetchOpts(host || 'default'))
      .then(() => markDone(jobId, outPath))
      .catch((err) => markError(jobId, err.message || '下载失败'))

    return { code: 200, data: { jobId } }
  }

  const jobId = createJob(ext || 'mp4')
  mkdirSync(TEMP_DIR, { recursive: true })

  // Dispatch to platform-specific downloader
  const { handleDownload } = await getHandler(host || 'default')
  handleDownload({ jobId, url: cdnUrl, audioUrl }).catch((err) => {
    markError(jobId, err.message || '下载失败')
  })

  return { code: 200, data: { jobId } }
})
