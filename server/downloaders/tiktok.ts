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
}) {
  const ytDlpPath = findYtDlp()
  if (!ytDlpPath) {
    markError(params.jobId, 'yt-dlp not found')
    return
  }

  const tag = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const outPath = resolve(TEMP_DIR, `${tag}.mp4`)

  return new Promise<void>((resolvePromise) => {
    updateProgress(params.jobId, 'video', 0)

    const child = rawExecFile(ytDlpPath, [
      '--no-playlist', '--no-warnings',
      '-o', outPath,
      params.url,
    ], { timeout: 300000, windowsHide: true, maxBuffer: 1024 * 1024 })

    child.stderr?.on('data', (data: Buffer) => {
      const text = data.toString()
      const m = text.match(/(\d+(?:\.\d+)?)%/)
      if (m) {
        updateProgress(params.jobId, 'video', Math.round(parseFloat(m[1])))
      }
    })

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
