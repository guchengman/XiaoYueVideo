import { resolve } from 'node:path'
import { downloadWithProgress, mergeToMp4, TEMP_DIR } from './_shared'

function fetchOpts(u: string): RequestInit {
  return {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  }
}

export async function handleDownload(params: {
  jobId: string
  url: string
  audioUrl?: string
}) {
  if (!params.audioUrl) {
    markError(params.jobId, '缺少音频地址')
    return
  }

  const tag = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const videoPath = resolve(TEMP_DIR, `${tag}_v.m4s`)
  const audioPath = resolve(TEMP_DIR, `${tag}_a.m4s`)
  const outPath = resolve(TEMP_DIR, `${tag}_out.mp4`)

  try {
    await downloadWithProgress(params.url, videoPath, params.jobId, 'video', fetchOpts(params.url))
    await downloadWithProgress(params.audioUrl, audioPath, params.jobId, 'audio', fetchOpts(params.audioUrl))
    updateProgress(params.jobId, 'merge', -1)
    await mergeToMp4(videoPath, audioPath, outPath)
    markDone(params.jobId, outPath)
  } catch (err: any) {
    markError(params.jobId, err.message || '下载失败')
  }
}
