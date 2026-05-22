import { createReadStream, existsSync, unlinkSync } from 'node:fs'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const jobId = query.jobId as string | undefined

  // Job-based: stream the prepared merged file
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
    setHeader(event, 'Content-Type', 'video/mp4')
    setHeader(event, 'Content-Disposition', 'attachment; filename="video.mp4"')
    setHeader(event, 'Content-Length', st.size)
    setHeader(event, 'Access-Control-Allow-Origin', '*')

    // Cleanup after stream finishes
    event.node.res.on('close', () => {
      try { unlinkSync(job.filePath) } catch { /* ignore */ }
      removeJob(jobId)
    })

    return sendStream(event, createReadStream(job.filePath))
  }

  // Direct URL: redirect to CDN (audio-only or no-audio videos)
  const cdnUrl = query.url as string | undefined
  if (!cdnUrl) {
    throw createError({ statusCode: 400, message: '请提供下载地址' })
  }
  return sendRedirect(event, cdnUrl)
})
