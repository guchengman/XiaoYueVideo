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

        <div class="flex flex-wrap gap-3">
          <button class="button-1 text-sm" :disabled="!selectedFormat" @click="downloadVideo">
            保存视频
          </button>
          <button class="button-1 text-sm bg-blue-500 hover:bg-blue-600"
            :disabled="!bestAudioFormat" @click="downloadAudio">
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

const videoFormats = computed(() => {
  return (store.parseResult?.formats || []).filter(f => f.hasVideo)
})

const selectedFormat = computed(() => {
  if (!selectedFormatId.value) return null
  return (store.parseResult?.formats || []).find(f => f.formatId === selectedFormatId.value) || null
})

const bestAudioFormat = computed(() => {
  const audioOnly = (store.parseResult?.formats || []).filter(f => !f.hasVideo && f.hasAudio)
  return audioOnly.sort((a, b) => b.filesize - a.filesize)[0] || null
})

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

  let downloadUrl = `/api/download?url=${encodeURIComponent(fmt.url)}`

  // If video has no audio, include the best audio track for server-side merging
  if (!fmt.hasAudio && bestAudioFormat.value) {
    downloadUrl += `&audioUrl=${encodeURIComponent(bestAudioFormat.value.url)}`
    downloadUrl += `&ref=${encodeURIComponent(store.inputUrl)}`
    store.addLog('info', '检测到视频不含音频，将自动合并音轨')
  }

  await triggerDownloadUrl(downloadUrl, `${store.parseResult?.displayTitle || 'video'}.${fmt.ext}`)
  store.addLog('ok', '视频下载已启动')
}

async function downloadAudio() {
  const fmt = bestAudioFormat.value
  if (!fmt) return
  store.addLog('info', `开始提取音频：${fmt.ext}`)
  await triggerDownloadUrl(`/api/download?url=${encodeURIComponent(fmt.url)}`, `${store.parseResult?.displayTitle || 'audio'}.${fmt.ext}`)
  store.addLog('ok', '音频下载已启动')
}

async function triggerDownloadUrl(downloadUrl: string, filename: string) {
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
