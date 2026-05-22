import { execFile } from 'node:child_process'
import { existsSync } from 'node:fs'
import { promisify } from 'node:util'
import { resolve } from 'node:path'

const execFileAsync = promisify(execFile)
const COOKIE_DIR = resolve(process.cwd(), '..', 'cookies')

/** Ensure yt-dlp can find Node.js for JS runtime (anti-bot challenge solving). */
const YT_DLP_ENV = {
  ...process.env,
  NODE: 'C:\\Program Files\\nodejs\\node.exe',
  PATH: `C:\\Program Files\\nodejs;${process.env.PATH || ''}`,
}

function userCookieFile(host: string): string {
  return resolve(COOKIE_DIR, `${host}_cookies.txt`)
}

const hostMap: Record<string, { host: string; hostAlias: string }> = {
  'youtube.com': { host: 'youtube', hostAlias: 'YouTube' },
  'youtu.be': { host: 'youtube', hostAlias: 'YouTube' },
  'twitter.com': { host: 'twitter', hostAlias: 'Twitter' },
  'x.com': { host: 'twitter', hostAlias: 'Twitter' },
  'bilibili.com': { host: 'bilibili', hostAlias: '哔哩哔哩' },
  'douyin.com': { host: 'douyin', hostAlias: '抖音' },
  'iesdouyin.com': { host: 'douyin', hostAlias: '抖音' },
  'kuaishou.com': { host: 'kuaishou', hostAlias: '快手' },
  'weibo.com': { host: 'weibo', hostAlias: '微博' },
  'instagram.com': { host: 'ins', hostAlias: 'Instagram' },
  'tiktok.com': { host: 'tiktok', hostAlias: 'TikTok' },
  'xiaohongshu.com': { host: 'xiaohongshu', hostAlias: '小红书' },
  'facebook.com': { host: 'facebook', hostAlias: 'Facebook' },
  'fb.com': { host: 'facebook', hostAlias: 'Facebook' },
  'ixigua.com': { host: 'ixigua', hostAlias: '西瓜视频' },
  'haokan.baidu.com': { host: 'haokan', hostAlias: '好看视频' },
  'vimeo.com': { host: 'vimeo', hostAlias: 'Vimeo' },
  'pinterest.com': { host: 'pinterest', hostAlias: 'Pinterest' },
  'zhihu.com': { host: 'zhihu', hostAlias: '知乎' },
  'acfun.cn': { host: 'acfun', hostAlias: 'AcFun' },
  'huya.com': { host: 'huya', hostAlias: '虎牙' },
  'douyu.com': { host: 'douyu', hostAlias: '斗鱼' },
  'cctv.com': { host: 'cctv', hostAlias: 'CCTV' },
  'xinpianchang.com': { host: 'xpc', hostAlias: '新片场' },
  'toutiao.com': { host: 'toutiao', hostAlias: '今日头条' },
  'sohu.com': { host: 'souhu', hostAlias: '搜狐视频' },
  '163.com': { host: 'net163', hostAlias: '网易视频' },
  'threads.net': { host: 'threads', hostAlias: 'Threads' },
  'weverse.io': { host: 'weverse', hostAlias: 'Weverse' },
}

function findYtDlp(): string | null {
  const candidates = [
    process.env.YT_DLP_PATH,
    resolve(process.cwd(), '..', 'tools', 'yt-dlp.exe'),
    resolve(process.cwd(), 'tools', 'yt-dlp.exe'),
  ]
  for (const p of candidates) {
    if (p && existsSync(p)) return p
  }
  return null
}

function detectPlatform(url: string) {
  for (const [domain, info] of Object.entries(hostMap)) {
    if (url.includes(domain)) {
      return info
    }
  }
  return null
}

/**
 * Extract the first valid HTTP(S) URL from mixed text.
 * Handles Douyin/TikTok share text that prepends context before the actual URL.
 */
function extractUrl(input: string): string | null {
  const match = input.match(/https?:\/\/[^\s<>"']+/)
  return match ? match[0].replace(/[)）]+$/, '') : null
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const url = body?.url

  if (!url) {
    throw createError({ statusCode: 400, statusMessage: '请提供视频链接' })
  }

  // Extract real URL from mixed text (抖音分享文本等)
  const cleanUrl = extractUrl(url) || url
  if (!cleanUrl) {
    throw createError({ statusCode: 400, statusMessage: '未找到有效的视频链接' })
  }

  const platform = detectPlatform(cleanUrl)

  // Custom Douyin parser: bypass anti-bot JS challenge via direct API call with cookies
  if (platform?.host === 'douyin') {
    try {
      const douyinResult = await parseDouyinVideo(cleanUrl)
      if (douyinResult) {
        return { code: 200, data: douyinResult }
      }
    } catch {
      // Fall through to yt-dlp
    }
  }

  const ytDlpPath = findYtDlp()
  if (!ytDlpPath) {
    return {
      code: 200,
      data: {
        displayTitle: platform ? `来自${platform.hostAlias}的视频` : '未识别的视频链接',
        host: platform?.host || 'unknown',
        hostAlias: platform?.hostAlias || '未知平台',
        formats: [],
        thumbnail: '',
        duration: 0,
      }
    }
  }

  /**
   * Try parsing with cookies: user-uploaded → browser extraction → no cookies.
   */
  async function runYtDlp(cookieHost?: string): Promise<string> {
    const baseArgs = ['--dump-json', '--no-playlist', '--no-download', '--no-warnings']

    if (cookieHost) {
      // 1) User-uploaded cookie file (highest priority)
      const userFile = userCookieFile(cookieHost)
      if (existsSync(userFile)) {
        const { stdout } = await execFileAsync(ytDlpPath!, [
          ...baseArgs, '--cookies', userFile, cleanUrl,
        ], { timeout: 30000, maxBuffer: 10 * 1024 * 1024, windowsHide: true, env: YT_DLP_ENV })
        return stdout
      }

      // 2) Try extracting cookies from installed browsers
      const browsers = ['chrome', 'edge', 'brave', 'opera']
      for (const browser of browsers) {
        try {
          const { stdout } = await execFileAsync(ytDlpPath!, [
            ...baseArgs,
            '--cookies-from-browser', browser,
            cleanUrl,
          ], { timeout: 30000, maxBuffer: 10 * 1024 * 1024, windowsHide: true, env: YT_DLP_ENV })
          return stdout
        } catch (e: any) {
          const msg = e.stderr?.toString() || ''
          if (!msg.includes('Could not copy') && !msg.includes('could not find') && !msg.includes('decrypt_error') && !msg.includes('operating system error 32')) {
            throw e
          }
        }
      }
    }

    // 3) No cookies fallback (works for public videos on most platforms)
    const { stdout } = await execFileAsync(ytDlpPath!, [...baseArgs, cleanUrl], {
      timeout: 30000, maxBuffer: 10 * 1024 * 1024, windowsHide: true, env: YT_DLP_ENV,
    })
    return stdout
  }

  try {
    const raw = await runYtDlp(platform?.host)
    const info = JSON.parse(raw.trim())

    const formats = (info.formats || [])
      .filter((f: any) => f.url)
      .map((f: any) => ({
        formatId: f.format_id,
        ext: f.ext,
        url: f.url,
        quality: f.format_note || f.height ? `${f.height}p` : 'unknown',
        filesize: f.filesize || f.filesize_approx || 0,
        hasVideo: !f.vcodec || f.vcodec !== 'none',
        hasAudio: !f.acodec || f.acodec !== 'none',
      }))

    return {
      code: 200,
      data: {
        displayTitle: info.title || `来自${platform?.hostAlias || '视频网站'}的视频`,
        host: platform?.host || 'unknown',
        hostAlias: platform?.hostAlias || info.extractor_key || '视频网站',
        formats,
        thumbnail: info.thumbnail || '',
        duration: info.duration || 0,
        vid: info.id || '',
      }
    }
  } catch (err: any) {
    if (err.killed || err.signal) {
      throw createError({ statusCode: 504, statusMessage: '视频解析超时，请稍后重试' })
    }

    let msg = err.stderr?.split('\n')[0] || err.message || '未知错误'

    // Give specific guidance for Douyin cookie issues
    if (msg.includes('Fresh cookies') && platform?.host === 'douyin') {
      const userFile = userCookieFile('douyin')
      if (existsSync(userFile)) {
        msg = '已保存的抖音Cookie无效或已过期，请重新导出并保存'
      } else {
        msg = '需要抖音Cookie。请在页面下方"Cookie管理"中上传Cookie后重试'
      }
    }

    throw createError({ statusCode: 422, statusMessage: `解析失败：${msg}` })
  }
})
