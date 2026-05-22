import { resolve } from 'node:path'
import { TEMP_DIR } from './_shared'

/**
 * Douyin download handler.
 *
 * Douyin parsed formats already contain both video + audio in a single MP4,
 * so the client passes no audioUrl and the POST endpoint redirects directly.
 * This handler is a placeholder for future Douyin-specific download needs
 * (e.g. cookie-authenticated HD streams).
 */
export async function handleDownload(params: {
  jobId: string
  url: string
  audioUrl?: string
}) {
  // Douyin formats are already merged — this should not normally be reached
  // since the POST endpoint redirects when there's no audioUrl.
  // If we get here with audioUrl, fall through to generic merge.
  if (params.audioUrl) {
    const { downloadWithProgress, mergeToMp4 } = await import('./_shared')
    const tag = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    const videoPath = resolve(TEMP_DIR, `${tag}_v.m4s`)
    const audioPath = resolve(TEMP_DIR, `${tag}_a.m4s`)
    const outPath = resolve(TEMP_DIR, `${tag}_out.mp4`)

    try {
      await downloadWithProgress(params.url, videoPath, params.jobId, 'video')
      await downloadWithProgress(params.audioUrl, audioPath, params.jobId, 'audio')
      updateProgress(params.jobId, 'merge', -1)
      await mergeToMp4(videoPath, audioPath, outPath)
      markDone(params.jobId, outPath)
    } catch (err: any) {
      markError(params.jobId, err.message || '下载失败')
    }
    return
  }

  markDone(params.jobId, '') // no-op
}
