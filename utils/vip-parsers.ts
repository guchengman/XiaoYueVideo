export interface VipParser {
  id: string
  name: string
  url: string
  /** Query parameter name used by this parser (default: 'url') */
  param?: string
  /** Platform hostnames this parser works well with */
  recommends?: string[]
}

export interface VipCategory {
  id: string
  name: string
  items: { label: string; url: string }[]
}

export const vipParsers: VipParser[] = [
  { id: 'auto', name: '自动选择', url: '' },
  { id: 'xmflv', name: '虾米解析', url: 'https://jx.xmflv.com/?url=', recommends: ['v.qq.com', 'www.youku.com'] },
  { id: 'm3u8tv', name: '万能接口', url: 'https://jx.m3u8.tv/jiexi/?url=', recommends: ['v.qq.com', 'www.iqiyi.com'] },
  { id: 'playerjy', name: '极速解析', url: 'https://jx.playerjy.com/?url=', recommends: ['www.youku.com', 'www.bilibili.com'] },
  { id: 'bljiex', name: 'BL解析', url: 'https://svip.bljiex.cc/?v=', param: 'v', recommends: ['www.iqiyi.com'] },
  { id: 'lfeifei', name: '飞速解析', url: 'https://jx.lfeifei.cn/?url=', recommends: ['www.iqiyi.com', 'v.qq.com'] },
  { id: 'yemu', name: '稳定线路', url: 'https://www.yemu.xyz/?url=', recommends: ['tv.sohu.com', 'www.iqiyi.com'] },
  { id: 'ckplayer', name: 'CK解析', url: 'https://www.ckplayer.vip/jiexi/?url=', recommends: ['www.mgtv.com'] },
  { id: '789jx', name: '789优选', url: 'https://jx.789jx.com/?url=', recommends: ['www.mgtv.com', 'tv.sohu.com'] },
  { id: 'pouyun', name: '剖元解析', url: 'https://www.pouyun.com/?url=', recommends: ['www.mgtv.com', 'www.bilibili.com'] },
  { id: 'jsonplayer', name: 'JSON解析', url: 'https://jx.jsonplayer.com/player/?url=', recommends: ['www.bilibili.com'] },
]

export const vipPlatforms = [
  { name: '腾讯视频', url: 'https://v.qq.com', icon: 'tencent' },
  { name: '爱奇艺', url: 'https://www.iqiyi.com', icon: 'iqiyi' },
  { name: '优酷', url: 'https://www.youku.com', icon: 'youku' },
  { name: '芒果TV', url: 'https://www.mgtv.com', icon: 'mgtv' },
  { name: '哔哩哔哩', url: 'https://www.bilibili.com', icon: 'bilibili' },
  { name: '搜狐视频', url: 'https://tv.sohu.com', icon: 'sohu' },
]

export const vipCategories: VipCategory[] = [
  {
    id: 'movie',
    name: '影视',
    items: [
      { label: '热映电影', url: 'https://v.qq.com/channel/movie' },
      { label: '高分经典', url: 'https://www.iqiyi.com/dianying' },
      { label: '最新大片', url: 'https://www.youku.com/category/show' },
    ],
  },
  {
    id: 'tv',
    name: '电视剧',
    items: [
      { label: '热播剧集', url: 'https://v.qq.com/channel/tv' },
      { label: '独播剧场', url: 'https://www.iqiyi.com/dianshiju' },
      { label: '完结剧集', url: 'https://www.mgtv.com/l/tv' },
    ],
  },
  {
    id: 'variety',
    name: '综艺',
    items: [
      { label: '热门综艺', url: 'https://v.qq.com/channel/variety' },
      { label: '王牌综艺', url: 'https://www.iqiyi.com/zongyi' },
    ],
  },
  {
    id: 'anime',
    name: '动漫',
    items: [
      { label: '热门动漫', url: 'https://v.qq.com/channel/cartoon' },
      { label: '国漫精选', url: 'https://www.bilibili.com/anime' },
    ],
  },
]

export function buildParserUrl(parser: VipParser, videoUrl: string): string {
  const param = parser.param || 'url'
  // Most parser URLs already end with ?param=, just append the value
  if (new RegExp(`\\?${param}=$`).test(parser.url)) {
    return `${parser.url}${encodeURIComponent(videoUrl)}`
  }
  const separator = parser.url.includes('?') ? '&' : '?'
  return `${parser.url}${separator}${param}=${encodeURIComponent(videoUrl)}`
}

/** Map hostname keyword → best parser IDs in priority order */
export const platformParserPriority: Record<string, string[]> = {
  'v.qq.com': ['xmflv', 'playerjy', 'm3u8tv', 'lfeifei'],
  'www.iqiyi.com': ['bljiex', 'lfeifei', 'yemu', 'm3u8tv'],
  'iqiyi.com': ['bljiex', 'lfeifei', 'yemu', 'm3u8tv'],
  'www.youku.com': ['playerjy', 'xmflv', 'm3u8tv'],
  'youku.com': ['playerjy', 'xmflv', 'm3u8tv'],
  'www.mgtv.com': ['ckplayer', '789jx', 'pouyun'],
  'mgtv.com': ['ckplayer', '789jx', 'pouyun'],
  'www.bilibili.com': ['jsonplayer', 'pouyun', 'playerjy'],
  'bilibili.com': ['jsonplayer', 'pouyun', 'playerjy'],
  'tv.sohu.com': ['yemu', '789jx'],
  'sohu.com': ['yemu', '789jx'],
}

/**
 * Auto-detect the best parser for a given video URL.
 * Returns the first non-auto parser that matches, or falls back to the first real parser.
 */
export function detectBestParser(videoUrl: string, parsers: VipParser[]): VipParser {
  const realParsers = parsers.filter(p => p.id !== 'auto')
  for (const [hostname, priorityIds] of Object.entries(platformParserPriority)) {
    if (videoUrl.includes(hostname)) {
      for (const id of priorityIds) {
        const parser = realParsers.find(p => p.id === id)
        if (parser) return parser
      }
    }
  }
  return realParsers[0]
}

/**
 * Extract platform display name from a video URL.
 * Returns null if unknown.
 */
export function detectPlatform(url: string): string | null {
  const map: Record<string, string> = {
    'v.qq.com': '腾讯视频',
    'www.iqiyi.com': '爱奇艺',
    'iqiyi.com': '爱奇艺',
    'www.youku.com': '优酷',
    'youku.com': '优酷',
    'www.mgtv.com': '芒果TV',
    'mgtv.com': '芒果TV',
    'www.bilibili.com': '哔哩哔哩',
    'bilibili.com': '哔哩哔哩',
    'tv.sohu.com': '搜狐视频',
    'sohu.com': '搜狐视频',
  }
  for (const [keyword, name] of Object.entries(map)) {
    if (url.includes(keyword)) return name
  }
  return null
}

/** All platform-to-parser recommendations for the guide UI */
export const parserRecommendations: { platform: string; hostname: string; parsers: string[] }[] = [
  { platform: '腾讯视频', hostname: 'v.qq.com', parsers: ['xmflv', 'playerjy', 'm3u8tv'] },
  { platform: '爱奇艺', hostname: 'www.iqiyi.com', parsers: ['bljiex', 'lfeifei', 'yemu'] },
  { platform: '优酷', hostname: 'www.youku.com', parsers: ['playerjy', 'xmflv'] },
  { platform: '芒果TV', hostname: 'www.mgtv.com', parsers: ['ckplayer', '789jx', 'pouyun'] },
  { platform: '哔哩哔哩', hostname: 'www.bilibili.com', parsers: ['jsonplayer', 'pouyun'] },
  { platform: '搜狐视频', hostname: 'tv.sohu.com', parsers: ['yemu', '789jx'] },
]

const PARSER_MEMORY_KEY = 'xiaoyuevideo_parser_memory'

/** Get the platform hostname key from a video URL for parser memory lookups */
export function getPlatformHostname(url: string): string | null {
  for (const hostname of Object.keys(platformParserPriority)) {
    if (url.includes(hostname)) return hostname
  }
  return null
}

/** Read the saved parser ID for a given platform hostname */
export function getSavedParser(hostname: string): string | null {
  if (!process.client) return null
  try {
    const raw = localStorage.getItem(PARSER_MEMORY_KEY)
    if (raw) {
      const map = JSON.parse(raw)
      return map[hostname] || null
    }
  } catch { /* ignore */ }
  return null
}

/** Save a parser ID as the preferred one for a platform hostname */
export function saveParser(hostname: string, parserId: string) {
  if (!process.client) return
  try {
    const raw = localStorage.getItem(PARSER_MEMORY_KEY)
    const map = raw ? JSON.parse(raw) : {}
    map[hostname] = parserId
    localStorage.setItem(PARSER_MEMORY_KEY, JSON.stringify(map))
  } catch { /* ignore */ }
}

/** Get the list of valid parser candidates for a platform hostname */
export function getParserCandidates(hostname: string): VipParser[] {
  const ids = platformParserPriority[hostname]
  if (!ids) return []
  return ids
    .map(id => vipParsers.find(p => p.id === id))
    .filter((p): p is VipParser => p !== undefined)
}
