import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const COOKIE_DIR = resolve(process.cwd(), 'cookies')

interface FormatInfo {
  formatId: string
  ext: string
  url: string
  quality: string
  filesize: number
  hasVideo: boolean
  hasAudio: boolean
}

export interface KuaishouParseResult {
  displayTitle: string
  host: string
  hostAlias: string
  formats: FormatInfo[]
  thumbnail: string
  duration: number
  vid: string
}

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

function parseCookieHeader(): string {
  const fp = resolve(COOKIE_DIR, 'kuaishou_cookies.txt')
  if (!existsSync(fp)) return ''

  const content = readFileSync(fp, 'utf-8')
  const cookies: string[] = []

  for (const line of content.split('\n')) {
    const t = line.trim()
    if (!t) continue
    let clean = t
    if (t.startsWith('#HttpOnly_')) clean = t.slice('#HttpOnly_'.length)
    else if (t.startsWith('#')) continue

    const cols = clean.split('\t')
    if (cols.length >= 7) {
      cookies.push(`${cols[5]}=${cols[6]}`)
    }
  }
  return cookies.join('; ')
}

function decodeUnicode(s: string): string {
  try {
    return JSON.parse('"' + s.replace(/"/g, '\\"') + '"')
  } catch {
    return s
  }
}

function extractTitle(html: string): string {
  const m = html.match(/<title>([^<]+)<\/title>/)
  if (!m) return '快手视频'
  return m[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim()
}

/**
 * Extract video URL from HTTP response HTML, same logic as the Python script.
 * Priority: adaptationSet hd15 > adaptationSet any mp4 > photoUrl
 */
function extractVideoUrl(html: string): string | null {
  // Strategy A: adaptationSet — highest quality, no watermark
  const adIdx = html.indexOf('"adaptationSet":[')
  if (adIdx >= 0) {
    // Extract from this position to find all "url":"..." entries
    const segment = html.slice(adIdx, adIdx + 20000)
    const urlMatches = segment.match(/"url":"([^"]+)"/g)
    if (urlMatches) {
      const urls = urlMatches
        .map(m => m.replace(/"url":"([^"]+)"/, '$1'))
        .map(decodeUnicode)
      const best = urls.find(u => u.includes('hd15')) || urls.find(u => u.includes('.mp4'))
      if (best) return best
    }
  }

  // Strategy B: photoUrl — original upload (may have watermark)
  const puMatch = html.match(/"photoUrl":"([^"]+\.mp4[^"]*)"/)
  if (puMatch) {
    return decodeUnicode(puMatch[1])
  }

  return null
}

function extractThumbnail(html: string): string {
  // Try to find jpg cover near photoUrl
  const puMatch = html.match(/"photoUrl":"([^"]+\.jpg[^"]*)"/)
  if (puMatch) return decodeUnicode(puMatch[1])
  return ''
}

export async function parseKuaishouVideo(cleanUrl: string): Promise<KuaishouParseResult | null> {
  const cookieHeader = parseCookieHeader()

  try {
    // Step 1: Fetch the video page
    const resp = await fetch(cleanUrl, {
      headers: {
        'User-Agent': UA,
        'Cookie': cookieHeader,
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'zh-CN,zh;q=0.9',
      },
      redirect: 'follow',
    })
    if (!resp.ok) {
      console.log(`[kuaishou] HTTP ${resp.status} fetching page`)
      return null
    }

    const html = await resp.text()
    console.log(`[kuaishou] Page fetched: ${html.length} bytes`)

    const title = extractTitle(html)
    const videoUrl = extractVideoUrl(html)
    const thumbnail = extractThumbnail(html)

    if (!videoUrl) {
      console.log('[kuaishou] No video URL found in page HTML')
      return null
    }

    const isHd = videoUrl.includes('hd15')
    console.log(`[kuaishou] Found: title="${title}" quality=${isHd ? 'hd15' : 'standard'}`)

    return {
      displayTitle: title,
      host: 'kuaishou',
      hostAlias: '快手',
      formats: [{
        formatId: isHd ? 'hd15' : 'direct',
        ext: 'mp4',
        url: videoUrl,
        quality: isHd ? '1080p' : 'unknown',
        filesize: 0,
        hasVideo: true,
        hasAudio: true,
      }],
      thumbnail,
      duration: 0,
      vid: '',
    }
  } catch (e: any) {
    console.log(`[kuaishou] HTTP parse error: ${e?.message || e}`)
    return null
  }
}
