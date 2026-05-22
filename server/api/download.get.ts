import { execFile } from 'node:child_process'
import { createReadStream, createWriteStream, existsSync, mkdirSync, unlinkSync } from 'node:fs'
import { resolve } from 'node:path'
import { promisify } from 'node:util'
import { pipeline } from 'node:stream/promises'

const execFileAsync = promisify(execFile)
const TEMP_DIR = resolve(process.cwd(), '..', 'temp', 'downloads')

const YT_DLP_ENV = {
  ...process.env,
  NODE: 'C:\\Program Files\\nodejs\\node.exe',
  PATH: `C:\\Program Files\\nodejs;${process.env.PATH || ''}`,
}

function findYtDlp(): string | null {
  for (const p of [
    process.env.YT_DLP_PATH,
    resolve(process.cwd(), '..', 'tools', 'yt-dlp.exe'),
    resolve(process.cwd(), 'tools', 'yt-dlp.exe'),
  ]) {
    if (p && existsSync(p)) return p
  }
  return null
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const cdnUrl = query.url as string | undefined
  const audioUrl = query.audioUrl as string | undefined
  const refUrl = query.ref as string | undefined

  if (!cdnUrl) {
    throw createError({ statusCode: 400, message: '请提供下载地址' })
  }

  // No audio URL — redirect directly to CDN (fast path for non-Bilibili)
  if (!audioUrl) {
    return sendRedirect(event, cdnUrl)
  }

  // Need to merge video + audio — use yt-dlp for fresh CDN URLs
  if (refUrl && findYtDlp()) {
    const tag = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    const tmpFile = resolve(TEMP_DIR, `${tag}.mp4`)
    mkdirSync(TEMP_DIR, { recursive: true })

    try {
      const { stderr } = await execFileAsync(findYtDlp()!, [
        '--format', 'bv*+bestaudio/best',
        '--output', tmpFile,
        '--merge-output-format', 'mp4',
        '--no-playlist',
        '--quiet',
        refUrl,
      ], {
        timeout: 600000,
        maxBuffer: 1024 * 1024,
        windowsHide: true,
        env: YT_DLP_ENV,
      })

      if (!existsSync(tmpFile)) {
        throw createError({ statusCode: 502, message: '视频下载失败：yt-dlp 未生成输出文件' })
      }

      const { stat } = await import('node:fs/promises')
      const st = await stat(tmpFile)
      setHeader(event, 'Content-Type', 'video/mp4')
      setHeader(event, 'Content-Disposition', 'attachment; filename="video.mp4"')
      setHeader(event, 'Content-Length', st.size)
      setHeader(event, 'Access-Control-Allow-Origin', '*')
      return sendStream(event, createReadStream(tmpFile))
    } catch (err: any) {
      console.error('yt-dlp download failed:', err.message)
      if (err.stderr) console.error('yt-dlp stderr:', err.stderr.slice(0, 500))
    } finally {
      try { unlinkSync(tmpFile) } catch { /* ignore */ }
    }
  }

  // Fallback: direct CDN fetch + ffmpeg merge
  const tag = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  mkdirSync(TEMP_DIR, { recursive: true })
  const tmp = {
    video: resolve(TEMP_DIR, `${tag}_v.m4s`),
    audio: resolve(TEMP_DIR, `${tag}_a.m4s`),
    out: resolve(TEMP_DIR, `${tag}_out.mp4`),
  }

  function fetchOpts(u: string) {
    const host = new URL(u).hostname
    return {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        ...(host.includes('bilivideo.com') || host.includes('bilibili.com')
          ? { 'Referer': 'https://www.bilibili.com/' }
          : {}),
      },
    }
  }

  try {
    const [vRes, aRes] = await Promise.all([
      fetch(cdnUrl, fetchOpts(cdnUrl)),
      fetch(audioUrl, fetchOpts(audioUrl)),
    ])
    if (!vRes.ok) throw new Error(`CDN video 返回 ${vRes.status}`)
    if (!aRes.ok) throw new Error(`CDN audio 返回 ${aRes.status}`)

    await Promise.all([
      pipeline(vRes.body!, createWriteStream(tmp.video)),
      pipeline(aRes.body!, createWriteStream(tmp.audio)),
    ])

    await execFileAsync('ffmpeg', [
      '-i', tmp.video, '-i', tmp.audio,
      '-c:v', 'copy', '-c:a', 'aac',
      '-shortest', '-movflags', '+faststart', '-y', tmp.out,
    ], { timeout: 300000 })

    const { stat } = await import('node:fs/promises')
    const st = await stat(tmp.out)
    setHeader(event, 'Content-Type', 'video/mp4')
    setHeader(event, 'Content-Disposition', 'attachment; filename="video.mp4"')
    setHeader(event, 'Content-Length', st.size)
    setHeader(event, 'Access-Control-Allow-Origin', '*')
    return sendStream(event, createReadStream(tmp.out))
  } catch (err: any) {
    const msg = err.message || '未知错误'
    // Log the actual error for debugging
    console.error('download+merge failed:', msg)
    throw createError({ statusCode: 502, message: `下载合并失败：${msg}` })
  } finally {
    for (const p of Object.values(tmp)) {
      try { unlinkSync(p as string) } catch { /* ignore */ }
    }
  }
})
