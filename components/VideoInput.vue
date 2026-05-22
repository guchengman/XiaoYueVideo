<template>
  <div class="max-w-5xl mx-auto flex justify-center items-center">
    <div class="flex-1 flex">
      <input
        v-model="store.inputUrl"
        type="text"
        class="flex-1 h-12 px-4 text-base border border-gray-200 rounded-l-md focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 placeholder-gray-300"
        placeholder="把视频链接粘贴到这里，点击开始解析"
        @keyup.enter="handleParse"
      />
      <button
        class="button-1 w-24 ml-0 rounded-l-none rounded-r-md text-base h-12"
        :disabled="store.isParsing"
        @click="handleParse"
      >
        <span v-if="store.isParsing" class="inline-block animate-spin">⟳</span>
        <span v-else>开始</span>
      </button>
    </div>
  </div>

  <!-- Error message -->
  <div v-if="store.error" class="max-w-5xl mx-auto mt-4">
    <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
      {{ store.error }}
    </div>
  </div>

  <!-- Parse result -->
  <div v-if="store.parseResult" class="max-w-5xl mx-auto mt-8">
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex gap-4">
        <img v-if="store.parseResult.thumbnail" :src="store.parseResult.thumbnail"
          class="w-32 h-20 object-cover rounded flex-shrink-0" alt="thumbnail" />
        <div class="flex-1 min-w-0">
          <h3 class="text-lg font-semibold mb-1 truncate">{{ store.parseResult.displayTitle }}</h3>
          <p class="text-sm text-gray-500 mb-1">来自：{{ store.parseResult.hostAlias }}</p>
          <p v-if="store.parseResult.duration" class="text-xs text-gray-400">
            时长：{{ formatDuration(store.parseResult.duration) }}
          </p>
        </div>
      </div>

      <div v-if="store.parseResult.formats.length > 0" class="mt-4">
        <div class="flex items-center gap-2 mb-3">
          <label class="text-sm text-gray-600">画质：</label>
          <select v-model="selectedFormatId"
            class="text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-[#6366f1]">
            <option v-for="f in videoFormats" :key="f.formatId" :value="f.formatId">
              {{ f.quality }} ({{ f.ext }}){{ f.filesize ? ` - ${formatSize(f.filesize)}` : '' }}
            </option>
          </select>
        </div>

        <!-- Download progress bar -->
        <div v-if="isDownloading" class="mb-3">
          <div class="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>{{ phaseText }}</span>
            <span>{{ downloadPct >= 0 ? downloadPct + '%' : '' }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-300"
              :class="downloadPct >= 0 ? 'bg-[#6366f1]' : 'bg-[#6366f1] animate-pulse'"
              :style="{ width: downloadPct >= 0 ? downloadPct + '%' : '100%' }"
            />
          </div>
        </div>

        <div class="flex flex-wrap gap-3">
          <button class="button-1 text-sm" :disabled="!selectedFormat || isDownloading" @click="downloadVideo">
            {{ isDownloading ? '准备中...' : '保存视频' }}
          </button>
          <button class="button-1 text-sm bg-blue-500 hover:bg-blue-600"
            :disabled="!bestAudioFormat || isDownloading" @click="downloadAudio">
            提取音频
          </button>
        </div>
      </div>

      <p v-else class="mt-3 text-sm text-gray-400">暂无可用下载地址</p>
    </div>
  </div>

  <!-- Log Console -->
  <div class="max-w-5xl mx-auto mt-4">
    <LogConsole />
  </div>

  <!-- Cookie Manager -->
  <div class="max-w-5xl mx-auto mt-4">
    <CookieManager />
  </div>
</template>

<script setup lang="ts">
import type { VideoFormat } from '~/types'

const store = useVideoStore()
const selectedFormatId = ref('')

// Download progress state
const isDownloading = ref(false)
const downloadPhase = ref('')
const downloadPct = ref(0)

const phaseText = computed(() => {
  switch (downloadPhase.value) {
    case 'video': return '正在下载视频...'
    case 'audio': return '正在下载音频...'
    case 'merge': return '正在合并音视频...'
    default: return '准备中...'
  }
})

const videoFormats = computed(() => {
  return (store.parseResult?.formats || []).filter(f => f.hasVideo)
})

const selectedFormat = computed(() => {
  if (!selectedFormatId.value) return null
  return (store.parseResult?.formats || []).find(f => f.formatId === selectedFormatId.value) || null
})

const bestAudioFormat = computed(() => {
  const fmts = store.parseResult?.formats || []
  // Prefer audio-only formats
  const audioOnly = fmts.filter(f => !f.hasVideo && f.hasAudio).sort((a, b) => b.filesize - a.filesize)
  if (audioOnly.length > 0) return audioOnly[0]
  // Fallback: any format with audio (will be extracted via ffmpeg)
  return fmts.filter(f => f.hasAudio).sort((a, b) => b.filesize - a.filesize)[0] || null
})

function buildFilename(ext: string): string {
  const host = store.parseResult?.host || 'video'
  const title = store.parseResult?.displayTitle || ''
  const safeTitle = title.replace(/[\\/:*?"<>|#]/g, '').slice(0, 60) || `video_${Date.now().toString(36)}`
  return `${host}_${safeTitle}.${ext}`
}

function handleParse() {
  store.parseVideo()
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

async function downloadVideo() {
  const fmt = selectedFormat.value
  if (!fmt) return
  store.addLog('info', `开始下载视频：${fmt.quality} (${fmt.ext})`)

  const isM3u8 = fmt.url.includes('.m3u8')

  // Single file with audio — proxy download via server for proper headers
  // m3u8 streams need server-side ffmpeg conversion, so skip the quick path
  // TikTok uses async job pattern (yt-dlp downloader) instead of direct stream
  if (!isM3u8 && (fmt.hasAudio || !bestAudioFormat.value)) {
    const isTikTok = store.parseResult?.host === 'tiktok'

    if (isTikTok) {
      isDownloading.value = true
      downloadPhase.value = 'video'
      downloadPct.value = 0
      let es: EventSource | null = null
      try {
        const res = await $fetch<{ code: number; data: { jobId: string } }>('/api/download', {
          params: {
            url: fmt.url,
            host: 'tiktok',
            filename: buildFilename(fmt.ext),
            pageUrl: store.inputUrl,
            formatId: fmt.formatId,
          },
        })
        const jobId = res.data.jobId
        es = new EventSource(`/api/download-progress?jobId=${encodeURIComponent(jobId)}`)
        await new Promise<void>((resolve, reject) => {
          es!.addEventListener('progress', (e: MessageEvent) => {
            const d = JSON.parse(e.data)
            downloadPhase.value = d.phase
            downloadPct.value = d.pct
          })
          es!.addEventListener('done', () => { resolve() })
          es!.addEventListener('error', (e: Event) => {
            const target = e.target as EventSource
            if (target.readyState === EventSource.CLOSED) {
              reject(new Error('下载进度连接已断开'))
            }
          })
        })
        triggerDownload(`/api/download?jobId=${encodeURIComponent(jobId)}`, buildFilename('mp4'))
        store.addLog('ok', '视频下载已启动')
      } catch (e: any) {
        const msg = e?.message || '下载失败'
        store.addLog('error', msg)
      } finally {
        es?.close()
        isDownloading.value = false
        downloadPhase.value = ''
        downloadPct.value = 0
      }
      return
    }

    const params = new URLSearchParams({
      url: fmt.url,
      host: store.parseResult?.host || '',
      filename: buildFilename(fmt.ext),
    })
    triggerDownload(`/api/download?${params}`, buildFilename(fmt.ext))
    store.addLog('ok', '视频下载已启动')
    return
  }

  // Need to merge video + audio — use server-side pipeline
  isDownloading.value = true
  downloadPhase.value = 'video'
  downloadPct.value = 0

  let es: EventSource | null = null

  try {
    const res = await $fetch<{ code: number; data: { jobId: string } }>('/api/download', {
      method: 'POST',
      body: {
        url: fmt.url,
        audioUrl: bestAudioFormat.value.url,
        host: store.parseResult?.host || '',
        ext: 'mp4',
        filename: buildFilename('mp4'),
        ...(store.parseResult?.host === 'tiktok' ? { pageUrl: store.inputUrl, formatId: fmt.formatId } : {}),
      },
    })

    const jobId = res.data.jobId

    es = new EventSource(`/api/download-progress?jobId=${encodeURIComponent(jobId)}`)

    await new Promise<void>((resolve, reject) => {
      es!.addEventListener('progress', (e: MessageEvent) => {
        const d = JSON.parse(e.data)
        downloadPhase.value = d.phase
        downloadPct.value = d.pct
      })

      es!.addEventListener('done', () => {
        store.addLog('ok', '合并完成，正在保存文件...')
        resolve()
      })

      es!.addEventListener('error', (e: MessageEvent) => {
        if (e.data) {
          try {
            const d = JSON.parse(e.data)
            reject(new Error(d.message || '下载失败'))
          } catch {
            reject(new Error('下载失败'))
          }
        }
      })

      es!.onerror = () => {
        if (es!.readyState === EventSource.CLOSED) {
          reject(new Error('进度连接已断开'))
        }
      }
    })

    triggerDownload(`/api/download?jobId=${encodeURIComponent(jobId)}`, buildFilename('mp4'))
    store.addLog('ok', '视频下载已启动')
  } catch (e: any) {
    const msg = e?.message || '下载失败'
    store.addLog('error', msg)
  } finally {
    es?.close()
    isDownloading.value = false
    downloadPhase.value = ''
    downloadPct.value = 0
  }
}

async function downloadAudio() {
  const fmt = bestAudioFormat.value
  if (!fmt) return
  store.addLog('info', `开始提取音频：${fmt.ext}`)

  // Audio-only format — proxy download via server
  if (!fmt.hasVideo) {
    const isTikTok = store.parseResult?.host === 'tiktok'

    if (isTikTok) {
      isDownloading.value = true
      downloadPhase.value = 'audio'
      downloadPct.value = 0
      let es: EventSource | null = null
      try {
        const res = await $fetch<{ code: number; data: { jobId: string } }>('/api/download', {
          params: {
            url: fmt.url,
            host: 'tiktok',
            filename: buildFilename(fmt.ext),
            pageUrl: store.inputUrl,
            formatId: fmt.formatId,
          },
        })
        const jobId = res.data.jobId
        es = new EventSource(`/api/download-progress?jobId=${encodeURIComponent(jobId)}`)
        await new Promise<void>((resolve, reject) => {
          es!.addEventListener('progress', (e: MessageEvent) => {
            const d = JSON.parse(e.data)
            downloadPhase.value = d.phase
            downloadPct.value = d.pct
          })
          es!.addEventListener('done', () => { resolve() })
          es!.addEventListener('error', (e: Event) => {
            const target = e.target as EventSource
            if (target.readyState === EventSource.CLOSED) {
              reject(new Error('下载进度连接已断开'))
            }
          })
        })
        triggerDownload(`/api/download?jobId=${encodeURIComponent(jobId)}`, buildFilename(fmt.ext))
        store.addLog('ok', '音频下载已启动')
      } catch (e: any) {
        const msg = e?.message || '下载失败'
        store.addLog('error', msg)
      } finally {
        es?.close()
        isDownloading.value = false
        downloadPhase.value = ''
        downloadPct.value = 0
      }
      return
    }

    const params = new URLSearchParams({
      url: fmt.url,
      host: store.parseResult?.host || '',
      filename: buildFilename(fmt.ext),
    })
    triggerDownload(`/api/download?${params}`, buildFilename(fmt.ext))
    store.addLog('ok', '音频下载已启动')
    return
  }

  // Video format — server extracts audio via ffmpeg
  isDownloading.value = true
  downloadPhase.value = 'video'
  downloadPct.value = 0

  let es: EventSource | null = null

  try {
    const res = await $fetch<{ code: number; data: { jobId: string } }>('/api/download', {
      method: 'POST',
      body: {
        url: fmt.url,
        host: store.parseResult?.host || '',
        ext: fmt.ext,
        filename: buildFilename(fmt.ext),
        extractAudio: true,
        ...(store.parseResult?.host === 'tiktok' ? { pageUrl: store.inputUrl, formatId: fmt.formatId } : {}),
      },
    })

    const jobId = res.data.jobId

    es = new EventSource(`/api/download-progress?jobId=${encodeURIComponent(jobId)}`)

    await new Promise<void>((resolve, reject) => {
      es!.addEventListener('progress', (e: MessageEvent) => {
        const d = JSON.parse(e.data)
        downloadPhase.value = d.phase
        downloadPct.value = d.pct
      })

      es!.addEventListener('done', () => {
        resolve()
      })

      es!.addEventListener('error', (e: MessageEvent) => {
        if (e.data) {
          try {
            const d = JSON.parse(e.data)
            reject(new Error(d.message || '下载失败'))
          } catch {
            reject(new Error('下载失败'))
          }
        }
      })

      es!.onerror = () => {
        if (es!.readyState === EventSource.CLOSED) {
          reject(new Error('进度连接已断开'))
        }
      }
    })

    triggerDownload(`/api/download?jobId=${encodeURIComponent(jobId)}`, buildFilename(fmt.ext))
    store.addLog('ok', '音频下载完成')
  } catch (e: any) {
    const msg = e?.message || '下载失败'
    store.addLog('error', msg)
  } finally {
    es?.close()
    isDownloading.value = false
    downloadPhase.value = ''
    downloadPct.value = 0
  }
}

function triggerDownload(downloadUrl: string, filename: string) {
  try {
    const anchor = document.createElement('a')
    anchor.href = downloadUrl
    anchor.download = filename
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  } catch {
    window.open(downloadUrl, '_blank')
  }
}

watch(() => store.parseResult, (val) => {
  if (val?.formats?.length) {
    selectedFormatId.value = videoFormats.value[0]?.formatId || ''
  }
})
</script>
