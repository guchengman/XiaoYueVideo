<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <div class="mt-12 pb-8">
      <h1 class="text-3xl lg:text-5xl font-bold">
        <span class="text-[#6366f1]">在线</span>播放器
      </h1>
      <h2 class="py-3 text-sm text-gray-500">粘贴视频链接，在线预览播放，支持画质切换与倍速</h2>
    </div>

    <div class="max-w-5xl mx-auto">
      <!-- URL Input -->
      <div class="flex mb-4">
        <input
          v-model="inputUrl"
          type="text"
          class="flex-1 h-12 px-4 text-base border border-gray-200 rounded-l-md focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 placeholder-gray-300"
          placeholder="粘贴视频链接（支持 B站/YouTube/抖音等平台，或 mp4/m3u8 直链）"
          @keyup.enter="handlePlay"
        />
        <button class="button-1 w-24 ml-0 rounded-l-none rounded-r-md text-base h-12" :disabled="isLoading" @click="handlePlay">
          <span v-if="isLoading" class="inline-block animate-spin">⟳</span>
          <span v-else>播放</span>
        </button>
      </div>

      <!-- Error -->
      <div v-if="errorMsg" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-4">
        {{ errorMsg }}
      </div>

      <!-- Merge Progress -->
      <div v-if="isMerging" class="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div class="flex items-center justify-between text-xs text-blue-700 mb-1">
          <span>{{ mergePhaseText }}</span>
          <span>{{ mergePct >= 0 ? mergePct + '%' : '' }}</span>
        </div>
        <div class="w-full bg-blue-100 rounded-full h-2 overflow-hidden">
          <div class="h-full rounded-full bg-[#6366f1] transition-all duration-300" :style="{ width: mergePct >= 0 ? mergePct + '%' : '100%' }" />
        </div>
      </div>

      <!-- Video Info -->
      <div v-if="parsedInfo" class="mb-4 p-3 bg-gray-50 rounded-lg flex items-center gap-3">
        <img v-if="parsedInfo.thumbnail" :src="parsedInfo.thumbnail" class="w-16 h-10 object-cover rounded flex-shrink-0" alt="" />
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-gray-700 truncate">{{ parsedInfo.displayTitle }}</p>
          <p class="text-xs text-gray-400 mt-0.5">
            {{ parsedInfo.hostAlias }}
            <span v-if="parsedInfo.duration"> · {{ formatDuration(parsedInfo.duration) }}</span>
            <span v-if="currentQuality"> · {{ currentQuality }}</span>
          </p>
        </div>
        <!-- Quality selector -->
        <select v-if="qualities.length > 1 && !currentOriginalUrl.includes('.m3u8')"
          v-model="currentQuality"
          class="text-xs border border-gray-200 rounded px-2 py-1 bg-white focus:outline-none focus:border-[#6366f1]"
          title="切换画质"
          @change="switchQuality"
        >
          <option v-for="q in qualities" :key="q.name" :value="q.name">{{ q.name }}</option>
        </select>
      </div>

      <!-- Player Area -->
      <div v-if="playing" class="aspect-video bg-black rounded-lg overflow-hidden relative">
        <ClientOnly>
          <div ref="playerRef" class="w-full h-full"></div>
          <template #fallback>
            <div class="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              加载播放器中...
            </div>
          </template>
        </ClientOnly>
      </div>

      <!-- Empty State -->
      <div v-else class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
        <div class="text-center">
          <svg class="w-16 h-16 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10" />
            <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
          </svg>
          <p>粘贴链接，点击播放</p>
          <p class="text-xs mt-2">支持主流视频平台和 MP4/M3U8 直链</p>
        </div>
      </div>

      <!-- Format options -->
      <div v-if="parsedInfo && formats.length > 0 && (!playing || isMerging)" class="mt-4">
        <p class="text-sm text-gray-500 mb-2">选择画质后点击播放：</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="f in videoFormats"
            :key="f.formatId"
            class="px-3 py-1.5 text-sm rounded border transition"
            :class="selectedFormatId === f.formatId ? 'bg-[#6366f1] text-white border-[#6366f1]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#6366f1]'"
            @click="selectFormat(f)"
          >
            {{ f.quality }} ({{ f.ext }}){{ f.filesize ? ` · ${formatSize(f.filesize)}` : '' }}
          </button>
        </div>
      </div>

      <!-- Bottom Controls (visible when playing) -->
      <div v-if="playing" class="mt-3 flex flex-wrap items-center gap-3">
        <button class="text-xs text-gray-400 hover:text-red-500" @click="stopPlay">
          关闭播放
        </button>
        <span class="text-xs text-gray-400">空格暂停/播放 · 方向键快进/后退 · F 全屏</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VideoFormat } from '~/types'

useHead({ title: '在线播放器_XiaoYueVideo' })

const inputUrl = ref('')
const isLoading = ref(false)
const errorMsg = ref('')
const playing = ref(false)
const parsedInfo = ref<{ displayTitle: string; hostAlias: string; host: string; thumbnail: string; duration: number } | null>(null)
const formats = ref<VideoFormat[]>([])
const selectedFormatId = ref('')
const currentQuality = ref('')
const qualities = ref<{ name: string; url: string; originalUrl?: string }[]>([])

const playerRef = ref<HTMLDivElement | null>(null)
const currentPlayUrl = ref('')
const currentOriginalUrl = ref('')
let artPlayer: any = null

// DASH merge state
const isMerging = ref(false)
const mergePhase = ref('')
const mergePct = ref(0)
const mergedJobId = ref('')

const mergePhaseText = computed(() => {
  switch (mergePhase.value) {
    case 'video': return '正在下载视频流...'
    case 'audio': return '正在下载音频流...'
    case 'merge': return '正在合并音视频...'
    default: return '准备中...'
  }
})

const videoFormats = computed(() => formats.value.filter(f => f.hasVideo))

function isDirectUrl(url: string) {
  return /\.(mp4|webm|m3u8)([?#]|$)/i.test(url)
}

function buildProxyUrl(url: string): string {
  // m3u8 handled directly by hls.js, no proxy needed
  if (url.includes('.m3u8')) return url
  const host = parsedInfo.value?.host || ''
  return `/api/download?url=${encodeURIComponent(url)}&host=${host}&inline=true`
}

function findBestAudioFormat(): any {
  const fmts = formats.value
  const audioOnly = fmts.filter(f => !f.hasVideo && f.hasAudio && f.url).sort((a, b) => b.filesize - a.filesize)
  if (audioOnly.length > 0) return audioOnly[0]
  return fmts.filter(f => f.hasAudio && f.url).sort((a, b) => b.filesize - a.filesize)[0] || null
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function formatSize(bytes: number) {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
}

async function handlePlay() {
  const url = inputUrl.value.trim()
  if (!url) return

  isLoading.value = true
  errorMsg.value = ''
  playing.value = false
  parsedInfo.value = null
  formats.value = []
  qualities.value = []
  currentQuality.value = ''

  destroyPlayer()

  // Direct video URL
  if (isDirectUrl(url)) {
    const filename = url.split('/').pop() || 'video'
    parsedInfo.value = {
      displayTitle: filename,
      hostAlias: '直接链接',
      host: 'default',
      thumbnail: '',
      duration: 0,
    }
    const directPlayUrl = url.includes('.m3u8') ? url : buildProxyUrl(url)
    currentOriginalUrl.value = url
    startPlayer(directPlayUrl)
    return
  }

  // Platform URL
  try {
    const res = await $fetch<{ code: number; data: any }>('/api/parse', {
      method: 'POST',
      body: { url },
    })

    if (!res.data?.formats?.length) {
      errorMsg.value = '未能解析出可播放的视频源'
      isLoading.value = false
      return
    }

    parsedInfo.value = {
      displayTitle: res.data.displayTitle || '视频',
      hostAlias: res.data.hostAlias || '未知',
      host: res.data.host || 'default',
      thumbnail: res.data.thumbnail || '',
      duration: res.data.duration || 0,
    }

    formats.value = res.data.formats
    const videoFmts = res.data.formats.filter((f: any) => f.hasVideo && f.url)
    if (videoFmts.length === 0) {
      errorMsg.value = '未找到可播放的视频流'
      isLoading.value = false
      return
    }

    // Auto-play the best quality
    const sortedVideoFmts = [...videoFmts].sort((a: any, b: any) => (b.height || 0) - (a.height || 0))
    const best = sortedVideoFmts[0]
    selectedFormatId.value = best.formatId
    currentQuality.value = best.quality
    const qualityList = sortedVideoFmts.map((f: any) => ({
      name: f.quality,
      url: f.url.includes('.m3u8') ? f.url : buildProxyUrl(f.url),
      originalUrl: f.url,
    }))
    qualities.value = qualityList

    // DASH: video-only format needs audio merge
    if (!best.hasAudio) {
      // Prefer a combined format (hasVideo+hasAudio) for instant playback
      const combinedFmt = sortedVideoFmts.find((f: any) => f.hasAudio)
      if (combinedFmt) {
        currentOriginalUrl.value = combinedFmt.url
        currentQuality.value = combinedFmt.quality
        selectedFormatId.value = combinedFmt.formatId
        const url = combinedFmt.url.includes('.m3u8') ? combinedFmt.url : buildProxyUrl(combinedFmt.url)
        startPlayer(url)
      } else {
        // All formats are video-only — merge with audio stream
        const audioFmt = findBestAudioFormat()
        if (audioFmt) {
          currentOriginalUrl.value = best.url
          isLoading.value = false
          await startMergeAndPlay(best, audioFmt)
          return
        }
      }
    } else {
      // Best format has audio — play directly
      const bestUrl = best.url.includes('.m3u8') ? best.url : buildProxyUrl(best.url)
      currentOriginalUrl.value = best.url
      startPlayer(bestUrl)
    }
  } catch (e: any) {
    errorMsg.value = e?.data?.message || e?.message || '解析失败，请检查链接'
  } finally {
    isLoading.value = false
  }
}

function startPlayer(url: string) {
  playing.value = true

  // Delay mount so DOM renders the container first
  nextTick(() => initPlayer(url))
}

async function initPlayer(url: string) {
  if (!playerRef.value) return

  destroyPlayer()

  const isHls = currentOriginalUrl.value.includes('.m3u8')

  const options: any = {
    container: playerRef.value,
    url: url,
    theme: '#6366f1',
    lang: 'zh-cn',
    volume: 0.7,
    isLive: false,
    muted: false,
    autoplay: true,
    autoSize: false,
    fullscreen: true,
    fullscreenWeb: false,
    miniProgressBar: true,
    mutex: true,
    backdrop: true,
    playsInline: true,
    setting: true,
    pip: true,
    playbackRate: true,
  }

  // Quality layers for non-HLS streams
  if (!isHls && qualities.value.length > 0) {
    options.quality = qualities.value.map(q => ({
      html: q.name,
      url: q.url,
      default: q.name === currentQuality.value,
    }))
  }

  // HLS support via hls.js
  if (isHls) {
    options.customType = {
      m3u8(video: HTMLVideoElement, m3u8Url: string) {
        import('hls.js').then(({ default: Hls }) => {
          if (Hls.isSupported()) {
            const hls = new Hls()
            hls.loadSource(m3u8Url)
            hls.attachMedia(video)
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = m3u8Url
          }
        })
      },
    }
  }

  try {
    artPlayer = new (await import('artplayer')).default(options)
  } catch (e: any) {
    errorMsg.value = '播放器加载失败：' + (e.message || '未知错误')
    playing.value = false
  }
}

function switchQuality() {
  if (!artPlayer || !currentQuality.value) return
  const q = qualities.value.find(q => q.name === currentQuality.value)
  if (q) {
    artPlayer.switchQuality(q.name)
  }
}

async function startMergeAndPlay(videoFmt: any, audioFmt: any) {
  isMerging.value = true
  mergePhase.value = 'video'
  mergePct.value = 0

  try {
    const res = await $fetch<{ code: number; data: { jobId: string } }>('/api/download', {
      method: 'POST',
      body: {
        url: videoFmt.url,
        audioUrl: audioFmt.url,
        host: parsedInfo.value?.host || '',
        ext: 'mp4',
        filename: 'video.mp4',
      },
    })

    const jobId = res.data.jobId
    mergedJobId.value = jobId

    // Wait for merge completion via SSE
    const es = new EventSource(`/api/download-progress?jobId=${encodeURIComponent(jobId)}`)
    await new Promise<void>((resolve, reject) => {
      es.addEventListener('progress', (e: MessageEvent) => {
        const d = JSON.parse(e.data)
        mergePhase.value = d.phase
        mergePct.value = d.pct
      })
      es.addEventListener('done', () => { resolve() })
      es.addEventListener('error', (e: Event) => {
        const me = e as MessageEvent
        if (me.data && typeof me.data === 'string') {
          try { reject(new Error(JSON.parse(me.data).message || '合并失败')) }
          catch { reject(new Error('合并失败')) }
        } else if (es.readyState === EventSource.CLOSED) {
          reject(new Error('进度连接已断开'))
        }
      })
    })
    es.close()

    // Play the merged file
    const mergedUrl = `/api/download?jobId=${encodeURIComponent(jobId)}`
    currentOriginalUrl.value = mergedUrl
    qualities.value = []
    startPlayer(mergedUrl)
  } catch (e: any) {
    errorMsg.value = e?.message || '音视频合并失败'
  } finally {
    isMerging.value = false
  }
}

function selectFormat(f: VideoFormat) {
  selectedFormatId.value = f.formatId
  currentQuality.value = f.quality

  // DASH format needs audio merge
  if (!f.hasAudio) {
    const audioFmt = findBestAudioFormat()
    if (audioFmt) {
      destroyPlayer()
      startMergeAndPlay(f, audioFmt)
      return
    }
  }

  const src = f.url.includes('.m3u8') ? f.url : buildProxyUrl(f.url)
  const wasHls = currentOriginalUrl.value.includes('.m3u8')
  currentOriginalUrl.value = f.url
  if (artPlayer) {
    if (f.url.includes('.m3u8') !== wasHls) {
      initPlayer(src)
    } else {
      artPlayer.switchUrl(src)
      artPlayer.play()
    }
  } else {
    startPlayer(src)
  }
}

function destroyPlayer() {
  if (artPlayer) {
    artPlayer.destroy()
    artPlayer = null
  }
}

function stopPlay() {
  destroyPlayer()
  playing.value = false
  qualities.value = []
  currentQuality.value = ''
  currentOriginalUrl.value = ''
  isMerging.value = false
  mergePhase.value = ''
  mergePct.value = 0
  mergedJobId.value = ''
}

onBeforeUnmount(() => {
  destroyPlayer()
})
</script>
