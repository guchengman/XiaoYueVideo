import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const execFileAsync = promisify(execFile)
const COOKIE_DIR = resolve(process.cwd(), '..', 'cookies')

interface FormatInfo {
  formatId: string
  ext: string
  url: string
  quality: string
  filesize: number
  hasVideo: boolean
  hasAudio: boolean
}

export interface DouyinParseResult {
  displayTitle: string
  host: string
  hostAlias: string
  formats: FormatInfo[]
  thumbnail: string
  duration: number
  vid: string
}

function formatResult(detail: any, videoId: string): DouyinParseResult {
  const video = detail.video || {}
  const videoUrl =
    video.play_addr?.url_list?.[0] ||
    video.download_addr?.url_list?.[0] ||
    ''

  return {
    displayTitle: detail.desc || `抖音视频 ${videoId}`,
    host: 'douyin',
    hostAlias: '抖音',
    formats: [
      {
        formatId: 'direct',
        ext: 'mp4',
        url: videoUrl,
        quality: video.height ? `${video.height}p` : 'unknown',
        filesize: video.download_size || 0,
        hasVideo: true,
        hasAudio: true,
      },
    ],
    thumbnail:
      video.cover?.url_list?.[0] ||
      video.origin_cover?.url_list?.[0] ||
      '',
    duration: video.duration || 0,
    vid: videoId,
  }
}

function hasCookies(): boolean {
  return existsSync(resolve(COOKIE_DIR, 'douyin_cookies.txt'))
}

// ── Strategy 1: Python / curl_cffi ─────────────────────────────────
// Uses curl_cffi with Chrome TLS impersonation (bypasses WAF blocking).

const SCRIPT = resolve(process.cwd(), 'scripts', 'douyin_parse.py')

async function parseWithPython(cleanUrl: string): Promise<DouyinParseResult | null> {
  try {
    const { stdout } = await execFileAsync('python', [SCRIPT, cleanUrl], {
      timeout: 20_000,
      windowsHide: true,
      env: { ...process.env, PYTHONIOENCODING: 'utf-8' },
    })
    const result = JSON.parse(stdout.trim())
    if (result.error) return null
    if (!result.formats?.length || !result.formats[0].url) return null
    return result as DouyinParseResult
  } catch {
    return null
  }
}

// ── Strategy 2: Playwright / headless browser ──────────────────────
// Loads the page in a real browser to execute anti-bot JS natively.
// Used as fallback when cURL impersenation doesn't suffice.

import { chromium, type Browser, type BrowserContext } from 'playwright'

let browser: Browser | null = null
let browserLastUsed = 0
const IDLE_TIMEOUT = 5 * 60 * 1000
let idleTimer: ReturnType<typeof setInterval> | null = null

async function getBrowser(): Promise<Browser> {
  if (browser?.isConnected()) {
    browserLastUsed = Date.now()
    return browser
  }
  browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-web-security',
    ],
  })
  browserLastUsed = Date.now()
  if (!idleTimer) {
    idleTimer = setInterval(() => {
      if (browser?.isConnected() && Date.now() - browserLastUsed > IDLE_TIMEOUT) {
        browser.close().catch(() => {})
        browser = null
      }
    }, 60_000)
    idleTimer.unref()
  }
  return browser
}

function parseCookieFile() {
  const fp = resolve(COOKIE_DIR, 'douyin_cookies.txt')
  if (!existsSync(fp)) return null
  const content = readFileSync(fp, 'utf-8')
  const cookies: Array<{ name: string; value: string; domain: string; path: string }> = []
  for (const line of content.split('\n')) {
    const t = line.trim()
    if (!t) continue
    let clean = t
    if (t.startsWith('#HttpOnly_')) clean = t.slice('#HttpOnly_'.length)
    else if (t.startsWith('#')) continue
    const cols = clean.split('\t')
    if (cols.length >= 7) {
      cookies.push({
        name: cols[5],
        value: cols[6],
        domain: cols[0].startsWith('.') ? cols[0] : `.${cols[0]}`,
        path: cols[2],
      })
    }
  }
  return cookies.length > 0 ? cookies : null
}

async function parseWithPlaywright(cleanUrl: string): Promise<DouyinParseResult | null> {
  const cookies = parseCookieFile()
  if (!cookies) return null

  let context: BrowserContext | null = null

  try {
    const br = await getBrowser()
    context = await br.newContext({
      viewport: { width: 1920, height: 1080 },
      locale: 'zh-CN',
      timezoneId: 'Asia/Shanghai',
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    })
    await context.addCookies(cookies)

    const page = await context.newPage()
    await page.addInitScript(() => {
      // @ts-ignore
      delete navigator.__proto__.webdriver
      Object.defineProperty(navigator, 'languages', {
        get: () => ['zh-CN', 'zh', 'en'],
      })
      Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5] as any,
      })
      Object.defineProperty(navigator, 'hardwareConcurrency', {
        get: () => 8,
      })
    })

    // Warm up anti-bot context via homepage
    await page
      .goto('https://www.douyin.com/', {
        waitUntil: 'domcontentloaded',
        timeout: 15_000,
      })
      .catch(() => {})
    await page.waitForTimeout(2000)

    // Listen for the detail API call
    let apiBody: string | null = null
    page.on('response', (resp) => {
      const u = resp.url()
      if (
        u.includes('aweme/v1/web/aweme/detail') ||
        u.includes('aweme/v1/web/aweme/aweme')
      ) {
        resp.text().then((t: string) => { apiBody = t }).catch(() => {})
      }
    })

    await page.goto(cleanUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 30_000,
    })
    await page.waitForTimeout(5000)

    if (apiBody) {
      try {
        const data = JSON.parse(apiBody)
        if (data.aweme_detail) {
          return formatResult(
            data.aweme_detail,
            data.aweme_detail.aweme_id || '',
          )
        }
      } catch { /* ignore */ }
    }

    // Fallback: try to extract from page JS state
    const fallback = await page
      .evaluate(() => {
        for (const s of document.querySelectorAll('script')) {
          const t = s.textContent || ''
          if (t.includes('aweme_detail')) {
            const m = t.match(/window\.__INITIAL_STATE__\s*=\s*({.+?});/)
            if (m) return m[1]
            const m2 = t.match(/RENDER_DATA\s*=\s*'([^']+)'/)
            if (m2) return decodeURIComponent(m2[1])
          }
        }
        return null
      })
      .catch(() => null)

    if (fallback) {
      try {
        const data = JSON.parse(fallback)
        const detail =
          data?.aweme_detail || data?.videoInfoRes?.aweme_detail || null
        if (detail) return formatResult(detail, detail.aweme_id || '')
      } catch { /* ignore */ }
    }

    return null
  } catch {
    return null
  } finally {
    if (context) await context.close().catch(() => {})
  }
}

// ── Public API ────────────────────────────────────────────────────

/**
 * Parse a Douyin video.
 *
 * Strategy:
 *   1. Python / curl_cffi (Chrome TLS impersonation) — fastest, works
 *      when the WAF only checks TLS fingerprint.
 *   2. Playwright / headless Chromium — solves JS-based anti-bot
 *      challenges via real browser execution.
 *
 * Returns null when all strategies fail (caller falls through to yt-dlp).
 */
export async function parseDouyinVideo(
  cleanUrl: string,
): Promise<DouyinParseResult | null> {
  if (!hasCookies()) return null

  // Strategy 1: Python/curl_cffi (Chrome TLS impersonation + X-Bogus)
  const pyResult = await parseWithPython(cleanUrl)
  if (pyResult) return pyResult

  // Strategy 2: Playwright / headless Chromium (JS anti-bot execution)
  return parseWithPlaywright(cleanUrl)
}
