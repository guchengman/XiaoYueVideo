import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

export const TEMP_DIR = resolve(process.cwd(), 'temp', 'downloads')

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

export async function downloadWithProgress(
  url: string,
  dest: string,
  jobId: string,
  phase: 'video' | 'audio',
  fetchOpts: RequestInit = {},
) {
  const res = await fetch(url, fetchOpts)
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

export function getFetchOpts(host: string): RequestInit {
  const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  if (host === 'bilibili') {
    return { headers: { 'User-Agent': ua, Referer: 'https://www.bilibili.com/' } }
  }
  if (host === 'douyin') {
    return { headers: { 'User-Agent': ua, Referer: 'https://www.douyin.com/' } }
  }
  if (host === 'kuaishou') {
    return { headers: { 'User-Agent': ua, Referer: 'https://www.kuaishou.com/' } }
  }
  if (host === 'weibo') {
    return { headers: { 'User-Agent': ua, Referer: 'https://weibo.com/' } }
  }
  return { headers: { 'User-Agent': ua } }
}

export async function mergeToMp4(videoPath: string, audioPath: string, outPath: string) {
  await execFileAsync('ffmpeg', [
    '-i', videoPath, '-i', audioPath,
    '-c:v', 'copy', '-c:a', 'aac',
    '-shortest', '-movflags', '+faststart', '-y', outPath,
  ], { timeout: 300000 })
}

export async function extractAudioFromVideo(videoPath: string, outPath: string, ext: string) {
  const codec = ext === 'mp3' ? 'libmp3lame' : 'aac'
  await execFileAsync('ffmpeg', [
    '-i', videoPath, '-vn', '-c:a', codec, '-y', outPath,
  ], { timeout: 300000 })
}

/**
 * Download an m3u8/HLS stream and convert to mp4 using ffmpeg.
 * Reports progress by parsing ffmpeg stderr.
 */
export async function downloadM3u8ToMp4(m3u8Url: string, outPath: string, jobId: string) {
  return new Promise<void>((resolve, reject) => {
    const ffmpeg = execFile('ffmpeg', [
      '-headers', 'Referer: https://www.kuaishou.com/',
      '-i', m3u8Url,
      '-c', 'copy',
      '-bsf:a', 'aac_adtstoasc',
      '-movflags', '+faststart',
      '-y', outPath,
    ], { timeout: 600000, windowsHide: true })

    updateProgress(jobId, 'video', -1)

    ffmpeg.stderr?.on('data', (data: Buffer) => {
      // ffmpeg progress lines look like: "  frame=  123 fps=..."
      // or "time=00:01:23.45 bitrate=..."
      const text = data.toString()
      const timeMatch = text.match(/time=(\d+):(\d+):(\d+)/)
      if (timeMatch) {
        const h = parseInt(timeMatch[1], 10)
        const m = parseInt(timeMatch[2], 10)
        const s = parseInt(timeMatch[3], 10)
        const totalSecs = h * 3600 + m * 60 + s
        updateProgress(jobId, 'video', totalSecs)
      }
    })

    ffmpeg.on('close', (code) => {
      if (code === 0) {
        updateProgress(jobId, 'video', 100)
        resolve()
      } else {
        reject(new Error(`ffmpeg 退出码 ${code}`))
      }
    })

    ffmpeg.on('error', (err) => {
      reject(new Error(`ffmpeg 启动失败: ${err.message}`))
    })
  })
}
