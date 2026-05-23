export interface Platform {
  id: string
  name: string
  path: string
  icon: string
  description: string
}

export interface VideoFormat {
  formatId: string
  ext: string
  url: string
  quality: string
  filesize: number
  hasVideo: boolean
  hasAudio: boolean
}

export interface Episode {
  title: string
  url: string
  id: string
  num?: number
}

export interface VideoInfo {
  displayTitle: string
  host: string
  hostAlias: string
  formats: VideoFormat[]
  thumbnail: string
  duration: number
  vid: string
  episodes?: Episode[]
}

export interface ParseResult {
  code: number
  data: VideoInfo | null
}
