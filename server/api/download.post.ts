import { createWriteStream, existsSync, mkdirSync, unlinkSync } from 'node:fs'
import { resolve } from 'node:path'
import { Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)
const TEMP_DIR = resolve(process.cwd(), 'temp', 'downloads')

function progressStream(total: number, cb: (bytes: number) => void): Transform {
  let bytes = 0
  return new Transform({
    transform(chunk, _encoding, callback) {
      bytes += chunk.length
      cb(bytes)
      this.push(chunk)
      callback()
    },
  })
}

function fetchOpts(u: string) {
  const host = new URL(u).hostname
  return {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      ...(host.includes('bilivideo.com') || host.includes('bilibili.com')
        ? { Referer: 'https://www.bilibili.com/' }
        : {}),
    },
  }
}

async function downloadWithProgress(
  url: string,
  dest: string,
  jobId: string,
  phase: 'video' | 'audio',
) {
  const res = await fetch(url, fetchOpts(url))
  if (!res.ok) throw new Error(`${phase} CDN 返回 ${res.status}`)

  const total = parseInt(res.headers.get('content-length') || '0', 10)

  await pipeline(
    res.body!,
    progressStream(total, (bytes) => {
      const pct = total > 0 ? Math.round((bytes / total) * 100) : 0
      updateProgress(jobId, phase, pct)
    }),
    createWriteStream(dest),
  )
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const cdnUrl = body?.url as string | undefined
  const audioUrl = body?.audioUrl as string | undefined

  if (!cdnUrl) {
    throw createError({ statusCode: 400, message: '请提供下载地址' })
  }

  // No audio — redirect fast path
  if (!audioUrl) {
    return sendRedirect(event, cdnUrl)
  }

  const jobId = createJob()
  const tag = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  mkdirSync(TEMP_DIR, { recursive: true })

  const tmp = {
    video: resolve(TEMP_DIR, `${tag}_v.m4s`),
    audio: resolve(TEMP_DIR, `${tag}_a.m4s`),
    out: resolve(TEMP_DIR, `${tag}_out.mp4`),
  }

  // Start async download + merge, return jobId immediately
  ;(async () => {
    try {
      await downloadWithProgress(cdnUrl, tmp.video, jobId, 'video')
      await downloadWithProgress(audioUrl, tmp.audio, jobId, 'audio')

      updateProgress(jobId, 'merge', -1)

      await execFileAsync('ffmpeg', [
        '-i', tmp.video, '-i', tmp.audio,
        '-c:v', 'copy', '-c:a', 'aac',
        '-shortest', '-movflags', '+faststart', '-y', tmp.out,
      ], { timeout: 300000 })

      markDone(jobId, tmp.out)
    } catch (err: any) {
      markError(jobId, err.message || '下载失败')
    }
  })()

  return { code: 200, data: { jobId } }
})
