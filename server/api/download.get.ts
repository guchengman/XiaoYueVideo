import { createReadStream, existsSync, unlinkSync } from 'node:fs'
import { Readable } from 'node:stream'
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
    const mimeMap: Record<string, string> = { m4a: 'audio/mp4', mp3: 'audio/mpeg', aac: 'audio/aac', opus: 'audio/opus', ogg: 'audio/ogg', flac: 'audio/flac', wav: 'audio/wav', webm: 'audio/webm' }
    const mime = mimeMap[job.ext] || 'video/mp4'
    setHeader(event, 'Content-Type', mime)
    const safeName = job.filename || `video.${job.ext}`
    const encoded = encodeURIComponent(safeName)
    const asciiFallback = safeName.replace(/[^\x00-\x7F]/g, '_') || 'video'
    setHeader(event, 'Content-Disposition', `attachment; filename="${asciiFallback}"; filename*=UTF-8''${encoded}`)
    setHeader(event, 'Access-Control-Allow-Origin', '*')
    setHeader(event, 'Accept-Ranges', 'bytes')

    event.node.res.on('close', () => {
      try { unlinkSync(job.filePath) } catch { /* ignore */ }
      removeJob(jobId)
    })

    const range = getHeader(event, 'Range')
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-')
      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1], 10) : st.size - 1
      setResponseStatus(event, 206)
      setHeader(event, 'Content-Range', `bytes ${start}-${end}/${st.size}`)
      setHeader(event, 'Content-Length', (end - start) + 1)
      return sendStream(event, createReadStream(job.filePath, { start, end }))
    }

    setHeader(event, 'Content-Length', st.size)
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

  const inline = query.inline !== undefined
  const filename = query.filename as string || 'video.mp4'
  const encoded = encodeURIComponent(filename)
  const asciiName = filename.replace(/[^\x00-\x7F]/g, '_') || 'video'

  const opts = getFetchOpts(host)
  const resp = await fetch(cdnUrl, opts)
  if (!resp.ok) {
    throw createError({ statusCode: 502, message: `CDN 请求失败: ${resp.status}` })
  }

  // Inline mode: proxy m3u8 playlist as text for hls.js, or stream video for direct URLs
  if (inline) {
    try {
      const pathname = new URL(cdnUrl).pathname
      if (pathname.endsWith('.m3u8')) {
        const text = await resp.text()
        setHeader(event, 'Content-Type', 'application/vnd.apple.mpegurl')
        setHeader(event, 'Access-Control-Allow-Origin', '*')
        setHeader(event, 'Access-Control-Allow-Headers', '*')
        return text
      }
    } catch { /* cdnUrl might not be a valid URL for URL constructor */ }

    // Re-fetch with Range header so the browser can seek/scrub
    const reqRange = getHeader(event, 'Range')
    const streamResp = reqRange
      ? await fetch(cdnUrl, { ...opts, headers: { ...opts.headers, Range: reqRange } })
      : resp

    if (!streamResp.ok) {
      throw createError({ statusCode: 502, message: `CDN 返回 ${streamResp.status}` })
    }

    if (streamResp.status === 206) {
      setResponseStatus(event, 206)
      const cr = streamResp.headers.get('content-range')
      if (cr) setHeader(event, 'Content-Range', cr)
    }

    setHeader(event, 'Accept-Ranges', 'bytes')
    setHeader(event, 'Access-Control-Allow-Origin', '*')
    setHeader(event, 'Access-Control-Allow-Headers', '*')
    setHeader(event, 'Access-Control-Expose-Headers', 'Content-Range, Accept-Ranges')

    const mime = streamResp.headers.get('content-type') || 'video/mp4'
    setHeader(event, 'Content-Type', mime)
    setHeader(event, 'Content-Disposition', `inline; filename="${asciiName}"; filename*=UTF-8''${encoded}`)
    const cl = streamResp.headers.get('content-length')
    if (cl) setHeader(event, 'Content-Length', cl)
    if (!streamResp.body) {
      throw createError({ statusCode: 502, message: 'CDN 返回空响应' })
    }
    return sendStream(event, Readable.fromWeb(streamResp.body))
  }

  const mime = resp.headers.get('content-type') || 'video/mp4'
  setHeader(event, 'Content-Type', mime)
  setHeader(event, 'Content-Disposition', `attachment; filename="${asciiName}"; filename*=UTF-8''${encoded}`)
  setHeader(event, 'Access-Control-Allow-Origin', '*')
  const cl = resp.headers.get('content-length')
  if (cl) setHeader(event, 'Content-Length', cl)

  if (!resp.body) {
    throw createError({ statusCode: 502, message: 'CDN 返回空响应' })
  }
  return sendStream(event, Readable.fromWeb(resp.body))
})
