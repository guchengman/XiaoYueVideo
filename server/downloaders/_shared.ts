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
  return { headers: { 'User-Agent': ua } }
}

export async function mergeToMp4(videoPath: string, audioPath: string, outPath: string) {
  await execFileAsync('ffmpeg', [
    '-i', videoPath, '-i', audioPath,
    '-c:v', 'copy', '-c:a', 'aac',
    '-shortest', '-movflags', '+faststart', '-y', outPath,
  ], { timeout: 300000 })
}
