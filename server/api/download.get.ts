import { createReadStream, existsSync, unlinkSync } from 'node:fs'
import { getFetchOpts } from '../downloaders/_shared'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const jobId = query.jobId as string | undefined

  // Job-based: stream the prepared merged/extracted file
  if (jobId) {
    const job = getJob(jobId)
    if (!job || job.phase !== 'done' || job.error) {
      throw createError({ statusCode: 404, message: job?.error || '下载任务不存在或尚未完成' })
    }
    if (!existsSync(job.filePath)) {
      throw createError({ statusCode: 404, message: '文件已过期或不存在' })
    }

    const { stat } = await import('node:fs/promises')
    const st = await stat(job.filePath)
    const mime = job.ext === 'm4a' ? 'audio/mp4' : 'video/mp4'
    setHeader(event, 'Content-Type', mime)
    const safeName = job.filename || `video.${job.ext}`
    const encoded = encodeURIComponent(safeName)
    setHeader(event, 'Content-Disposition', `attachment; filename="${encoded}"; filename*=UTF-8''${encoded}`)
    setHeader(event, 'Content-Length', st.size)
    setHeader(event, 'Access-Control-Allow-Origin', '*')

    event.node.res.on('close', () => {
      try { unlinkSync(job.filePath) } catch { /* ignore */ }
      removeJob(jobId)
    })

    return sendStream(event, createReadStream(job.filePath))
  }

  // Direct URL proxy: fetch from CDN and stream to client with Content-Disposition
  const cdnUrl = query.url as string | undefined
  if (!cdnUrl) {
    throw createError({ statusCode: 400, message: '请提供下载地址' })
  }

  const host = query.host as string || 'default'

  // TikTok CDN returns 403 for direct fetch — dispatch to yt-dlp downloader
  // yt-dlp needs the original page URL, not the CDN URL
  if (host === 'tiktok') {
    const { getHandler } = await import('../downloaders/index')
    const pageUrl = query.pageUrl as string || cdnUrl
    const inFilename = query.filename as string || 'video.mp4'
    const ext = inFilename.split('.').pop() || 'mp4'
    const formatId = query.formatId as string | undefined
    const jobId = createJob(ext, inFilename)
    const { handleDownload } = await getHandler(host)
    handleDownload({ jobId, url: pageUrl, ext, formatId }).catch((err) => {
      markError(jobId, err.message || '下载失败')
    })
    return { code: 200, data: { jobId } }
  }

  const filename = query.filename as string || 'video.mp4'

  const opts = getFetchOpts(host)
  const resp = await fetch(cdnUrl, opts)
  if (!resp.ok) {
    throw createError({ statusCode: 502, message: `CDN 请求失败: ${resp.status}` })
  }

  const mime = resp.headers.get('content-type') || 'video/mp4'
  setHeader(event, 'Content-Type', mime)
  const encoded = encodeURIComponent(filename)
  setHeader(event, 'Content-Disposition', `attachment; filename="${encoded}"; filename*=UTF-8''${encoded}`)
  setHeader(event, 'Access-Control-Allow-Origin', '*')
  const cl = resp.headers.get('content-length')
  if (cl) setHeader(event, 'Content-Length', cl)

  return sendStream(event, resp.body!)
})
