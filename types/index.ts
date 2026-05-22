export interface Platform {
  id: string
  name: string
  path: string
  icon: string
  description: string
}

export interface BlogPost {
  id: string
  title: string
  date: string
  groupId: string
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

export interface VideoInfo {
  displayTitle: string
  host: string
  hostAlias: string
  formats: VideoFormat[]
  thumbnail: string
  duration: number
  vid: string
}

export interface ParseResult {
  code: number
  data: VideoInfo | null
}
