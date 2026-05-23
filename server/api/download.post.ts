import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { getHandler } from '../downloaders/index'
import { TEMP_DIR, downloadWithProgress, getFetchOpts, extractAudioFromVideo, downloadM3u8ToMp4 } from '../downloaders/_shared'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const cdnUrl = body?.url as string | undefined
  const audioUrl = body?.audioUrl as string | undefined
  const host = body?.host as string | undefined
  const ext = body?.ext as string | undefined
  const filename = body?.filename as string | undefined
  const extractAudio = body?.extractAudio as boolean | undefined
  const formatId = body?.formatId as string | undefined
  const pageUrl = body?.pageUrl as string | undefined

  if (!cdnUrl) {
    throw createError({ statusCode: 400, message: '请提供下载地址' })
  }

  // Dispatch to platform-specific downloader for single-file hosts (e.g. TikTok uses yt-dlp)
  const CUSTOM_SINGLE_HOSTS = ['tiktok']
  const needsCustomDownloader = host && CUSTOM_SINGLE_HOSTS.includes(host)

  if (needsCustomDownloader) {
    const jobId = createJob(ext || 'mp4', filename)
    mkdirSync(TEMP_DIR, { recursive: true })
    const { handleDownload } = await getHandler(host)
    // TikTok downloader uses yt-dlp which needs the original page URL, not CDN URL
    handleDownload({ jobId, url: pageUrl || cdnUrl, ext, formatId }).catch((err) => {
      markError(jobId, err.message || '下载失败')
    })
    return { code: 200, data: { jobId } }
  }

  // No audio — download single file (or extract audio from video)
  if (!audioUrl) {
    const audioExts = new Set(['m4a', 'mp3', 'aac', 'opus', 'ogg', 'flac', 'wav', 'wma'])
    const outExt = extractAudio && ext && !audioExts.has(ext) ? 'm4a' : (ext || 'mp4')
    const isM3u8 = cdnUrl.includes('.m3u8')
    const actualExt = isM3u8 ? 'mp4' : outExt
    const jobId = createJob(actualExt, filename)
    mkdirSync(TEMP_DIR, { recursive: true })

    const tag = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    const outPath = resolve(TEMP_DIR, `${tag}.${actualExt}`)

    const run = async () => {
      if (extractAudio) {
        const videoPath = resolve(TEMP_DIR, `${tag}_video.mp4`)
        updateProgress(jobId, 'video', 0)
        if (isM3u8) {
          await downloadM3u8ToMp4(cdnUrl, videoPath, jobId, host || 'kuaishou')
        } else {
          await downloadWithProgress(cdnUrl, videoPath, jobId, 'video', getFetchOpts(host || 'default'))
        }
        updateProgress(jobId, 'audio', 0)
        await extractAudioFromVideo(videoPath, outPath, outExt)
        updateProgress(jobId, 'audio', 100)
        const { unlinkSync } = await import('node:fs')
        try { unlinkSync(videoPath) } catch { /* ignore */ }
      } else if (isM3u8) {
        await downloadM3u8ToMp4(cdnUrl, outPath, jobId, host || 'kuaishou')
      } else {
        await downloadWithProgress(cdnUrl, outPath, jobId, 'video', getFetchOpts(host || 'default'))
      }
      markDone(jobId, outPath)
    }
    run().catch((err) => markError(jobId, err.message || '下载失败'))

    return { code: 200, data: { jobId } }
  }

  const jobId = createJob(ext || 'mp4', filename)
  mkdirSync(TEMP_DIR, { recursive: true })

  // Dispatch to platform-specific downloader
  const { handleDownload } = await getHandler(host || 'default')
  // TikTok downloader uses yt-dlp which needs the original page URL, not CDN URL
  handleDownload({ jobId, url: pageUrl || cdnUrl, audioUrl, ext, formatId }).catch((err) => {
    markError(jobId, err.message || '下载失败')
  })

  return { code: 200, data: { jobId } }
})
