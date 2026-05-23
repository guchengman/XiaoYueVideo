import { execFile as rawExecFile } from 'node:child_process'
import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { TEMP_DIR } from './_shared'

function findYtDlp(): string | null {
  const candidates = [
    process.env.YT_DLP_PATH,
    resolve(process.cwd(), 'tools', 'yt-dlp.exe'),
  ]
  for (const p of candidates) {
    if (p && existsSync(p)) return p
  }
  return null
}

/**
 * TikTok CDN returns 403 when accessed directly from server-side fetch().
 * Use yt-dlp to download — it handles CDN auth negotiation correctly.
 */
export async function handleDownload(params: {
  jobId: string
  url: string
  audioUrl?: string
  ext?: string
  formatId?: string
}) {
  const ytDlpPath = findYtDlp()
  if (!ytDlpPath) {
    markError(params.jobId, 'yt-dlp not found')
    return
  }

  const ext = params.ext || 'mp4'
  const isAudio = ext === 'm4a' || ext === 'mp3'
  const outExt = isAudio ? ext : 'mp4'
  const tag = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const outPath = resolve(TEMP_DIR, `${tag}.${outExt}`)

  return new Promise<void>((resolvePromise) => {
    updateProgress(params.jobId, isAudio ? 'audio' : 'video', 0)

    const baseArgs = ['--no-playlist', '--no-warnings', '-o', outPath]
    if (isAudio) {
      if (params.formatId) baseArgs.push('-f', params.formatId)
      baseArgs.push('-x', '--audio-format', ext)
    } else if (params.formatId) {
      const fmt = params.formatId.includes('+') ? params.formatId : `${params.formatId}+bestaudio/best[ext=mp4]`
      baseArgs.push('-f', fmt)
    }
    baseArgs.push(params.url)

    const child = rawExecFile(ytDlpPath, baseArgs, { timeout: 300000, windowsHide: true, maxBuffer: 1024 * 1024 })

    const phase = isAudio ? 'audio' : 'video'
    function parseProgress(data: Buffer) {
      const text = data.toString()
      const m = text.match(/(\d+(?:\.\d+)?)%/)
      if (m) {
        updateProgress(params.jobId, phase, Math.round(parseFloat(m[1])))
      }
    }
    child.stderr?.on('data', parseProgress)
    child.stdout?.on('data', parseProgress)

    child.on('close', (code) => {
      if (code === 0) {
        markDone(params.jobId, outPath)
      } else {
        markError(params.jobId, `yt-dlp exit code ${code}`)
      }
      resolvePromise()
    })

    child.on('error', (err) => {
      markError(params.jobId, err.message || 'TikTok download failed')
      resolvePromise()
    })
  })
}
