<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <div class="mt-12 pb-8">
      <h1 class="text-3xl lg:text-5xl font-bold">
        <span class="text-[#6366f1]">VIP视频</span>免费观看
      </h1>
      <h2 class="py-3 text-sm text-gray-500">聚合多平台VIP资源，粘贴链接免费在线观看</h2>
    </div>

    <!-- URL Input + Parser Select -->
    <div class="max-w-5xl mx-auto">
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="flex-1 flex max-sm:flex-col max-sm:gap-2">
          <input
            v-model="videoUrl"
            type="text"
            class="flex-1 h-12 px-4 text-base border border-gray-200 rounded-l-md max-sm:rounded-md focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 placeholder-gray-300"
            placeholder="粘贴腾讯/爱奇艺/优酷/芒果TV等视频链接"
            @keyup.enter="play"
          />
          <select
            v-model="selectedParserId"
            class="h-12 px-3 text-sm border-t border-b border-gray-200 bg-white focus:outline-none text-gray-600 max-sm:w-full max-sm:border max-sm:rounded-md"
            title="选择解析线路"
          >
            <option v-for="p in vipParsers" :key="p.id" :value="p.id">{{ p.name }}</option>
          </select>
          <button class="button-1 w-24 ml-0 rounded-l-none rounded-r-md text-base h-12 max-sm:w-full max-sm:rounded-md" :disabled="!videoUrl.trim()" @click="play">
            播放
          </button>
        </div>
      </div>

      <!-- Error message -->
      <div v-if="errorMsg" class="mt-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
        {{ errorMsg }}
      </div>

      <!-- Tip -->
      <div class="mt-2 text-xs text-gray-400">
        提示：选择"自动选择"后，系统会优先使用上次成功的线路；播放失败可点击「切换线路」自动尝试其它接口
      </div>

      <!-- Parser recommendation guide -->
      <div class="mt-3">
        <details class="text-xs text-gray-400">
          <summary class="cursor-pointer hover:text-gray-600 select-none">推荐搭配（点击展开）</summary>
          <div class="mt-2 flex flex-wrap gap-x-6 gap-y-1.5">
            <div v-for="r in parserRecommendations" :key="r.platform" class="flex items-center gap-1">
              <span class="text-gray-500">{{ r.platform }}：</span>
              <span class="text-[#6366f1]">{{ r.parsers.map(id => parserName(id)).join(' / ') }}</span>
            </div>
          </div>
        </details>
      </div>
    </div>

    <!-- Player Area -->
    <div v-if="playingUrl" class="max-w-5xl mx-auto mt-6">
      <div class="aspect-video bg-black rounded-lg overflow-hidden relative">
        <iframe
          :src="playingUrl"
          :key="playerKey"
          class="absolute inset-0 w-full h-full"
          frameborder="0"
          allowfullscreen
          allow="autoplay; fullscreen"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div class="mt-3 flex flex-wrap items-center gap-2">
        <span class="text-sm text-gray-500">当前线路：</span>
        <span class="text-sm font-medium text-[#6366f1]">{{ currentParserName }}</span>
        <button v-if="playingUrl && autoCandidates.length > 0" class="text-xs text-[#6366f1] hover:text-indigo-700 border border-[#6366f1]/30 rounded px-2 py-0.5" @click="switchParser">
          切换线路
        </button>
        <button v-if="playingUrl" class="text-xs text-gray-400 hover:text-red-500 ml-auto" @click="stopPlay">
          关闭播放
        </button>
      </div>
    </div>

    <!-- Episode List -->
    <div v-if="episodes.length > 0" class="max-w-5xl mx-auto mt-6">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-semibold text-gray-700">选集（共 {{ episodes.length }} 集）</h3>
        <span v-if="currentEpisodeTitle" class="text-xs text-gray-400 truncate ml-4">{{ currentEpisodeTitle }}</span>
      </div>
      <div class="flex flex-wrap gap-2 max-h-56 overflow-y-auto p-2 border border-gray-100 rounded-lg">
        <button
          v-for="ep in episodes"
          :key="ep.id"
          class="px-3 py-1.5 text-xs rounded transition"
          :class="activeEpisodeId === ep.id ? 'bg-[#6366f1] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          @click="playEpisode(ep)"
        >
          {{ ep.num ? `第${ep.num}集` : ep.title }}
        </button>
      </div>
    </div>

    <!-- Loading episodes -->
    <div v-if="isLoadingEpisodes" class="max-w-5xl mx-auto mt-6">
      <div class="text-center text-sm text-gray-400 py-2">正在获取剧集列表...</div>
    </div>

    <!-- Empty state (no video playing) -->
    <div v-else-if="!playingUrl" class="max-w-5xl mx-auto mt-6">
      <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
        <div class="text-center">
          <svg class="w-16 h-16 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
          </svg>
          <p>粘贴链接，选择线路，点击播放</p>
          <p class="text-xs mt-2">支持腾讯视频、爱奇艺、优酷、芒果TV、B站等平台</p>
        </div>
      </div>
    </div>

    <!-- Category Tabs -->
    <div class="max-w-5xl mx-auto mt-12">
      <div class="flex gap-4 border-b border-gray-200 mb-6">
        <button
          v-for="cat in vipCategories"
          :key="cat.id"
          class="pb-2 text-sm font-medium transition"
          :class="activeCategory === cat.id ? 'text-[#6366f1] border-b-2 border-[#6366f1]' : 'text-gray-500 hover:text-gray-700'"
          @click="activeCategory = cat.id"
        >
          {{ cat.name }}
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="item in currentCategoryItems"
          :key="item.label"
          class="border border-gray-200 rounded-lg p-4 hover:border-[#6366f1] hover:shadow-md transition cursor-pointer"
          @click="quickPlay(item.url)"
        >
          <h4 class="text-sm font-medium text-gray-700 hover:text-[#6366f1]">{{ item.label }}</h4>
          <p class="text-xs text-gray-400 mt-1 truncate">{{ item.url }}</p>
        </div>
      </div>
    </div>

    <!-- Platform Cards -->
    <div class="max-w-5xl mx-auto mt-12 mb-16">
      <h3 class="text-lg font-semibold mb-4">支持平台</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        <a
          v-for="p in vipPlatforms"
          :key="p.name"
          :href="p.url"
          target="_blank"
          rel="noopener noreferrer"
          class="border border-gray-200 rounded-lg p-4 text-center hover:border-[#6366f1] hover:shadow-md transition"
        >
          <div class="w-10 h-10 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-[#6366f1]">
            {{ p.name.charAt(0) }}
          </div>
          <span class="text-sm text-gray-600">{{ p.name }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { vipParsers, vipCategories, vipPlatforms, buildParserUrl, parserRecommendations, getPlatformHostname, getSavedParser, getParserCandidates, saveParser } from '~/utils/vip-parsers'
import type { VipParser } from '~/utils/vip-parsers'
import type { Episode } from '~/types'

useHead({ title: 'VIP视频免费观看_XiaoYueVideo' })

const videoUrl = ref('')
const selectedParserId = ref(vipParsers[0].id)
const playingUrl = ref('')
const playerKey = ref(0)
const errorMsg = ref('')
const activeCategory = ref('movie')
const resolvedParserName = ref('')
const autoCandidates = ref<VipParser[]>([])
const autoIndex = ref(0)
const autoHostname = ref('')

// Episode state
const episodes = ref<Episode[]>([])
const activeEpisodeId = ref('')
const isLoadingEpisodes = ref(false)
const currentEpisodeTitle = ref('')

function setPlayingUrl(url: string) {
  playingUrl.value = ''
  playerKey.value++
  // Force a tick so the iframe unmounts before re-mounting
  nextTick(() => {
    playingUrl.value = url
  })
}

const currentParser = computed(() => {
  if (selectedParserId.value === 'auto') return null
  return vipParsers.find(p => p.id === selectedParserId.value) || null
})
const currentParserName = computed(() => resolvedParserName.value || currentParser.value?.name || '')
const currentCategoryItems = computed(() => vipCategories.find(c => c.id === activeCategory.value)?.items || [])

function parserName(id: string): string {
  return vipParsers.find(p => p.id === id)?.name || id
}

async function play() {
  const url = videoUrl.value.trim()
  if (!url) return

  errorMsg.value = ''
  episodes.value = []
  activeEpisodeId.value = ''
  currentEpisodeTitle.value = ''

  if (!/^https?:\/\//i.test(url)) {
    errorMsg.value = '请输入有效的视频链接（以 http:// 或 https:// 开头）'
    return
  }

  // Try to fetch episodes for playlist/series URLs
  const hostname = getPlatformHostname(url)
  if (hostname) {
    await fetchEpisodes(url)
  }

  if (selectedParserId.value === 'auto') {
    startAutoPlay(url)
    return
  }

  const parser = vipParsers.find(p => p.id === selectedParserId.value)
  if (!parser) {
    errorMsg.value = '请选择解析线路'
    return
  }

  resolvedParserName.value = ''
  autoCandidates.value = []
  setPlayingUrl(buildParserUrl(parser, url))
}

function startAutoPlay(url: string) {
  const hostname = getPlatformHostname(url)
  if (!hostname) {
    errorMsg.value = '未识别到支持的视频平台，请手动选择解析线路'
    return
  }

  autoHostname.value = hostname
  autoCandidates.value = getParserCandidates(hostname)

  if (autoCandidates.value.length === 0) {
    errorMsg.value = '未找到可用解析线路'
    return
  }

  // Try saved parser first, fall back to first candidate
  const savedId = getSavedParser(hostname)
  const startIdx = savedId ? autoCandidates.value.findIndex(p => p.id === savedId) : -1
  autoIndex.value = startIdx >= 0 ? startIdx : 0

  const parser = autoCandidates.value[autoIndex.value]
  resolvedParserName.value = '自动选择（' + parser.name + '）'
  setPlayingUrl(buildParserUrl(parser, url))
}

function switchParser() {
  if (autoCandidates.value.length === 0) return

  // Move to next candidate
  autoIndex.value = (autoIndex.value + 1) % autoCandidates.value.length
  const parser = autoCandidates.value[autoIndex.value]
  resolvedParserName.value = '自动选择（' + parser.name + '）'
  setPlayingUrl(buildParserUrl(parser, videoUrl.value.trim()))

  // Save this parser as the preferred one for this platform
  const hostname = autoHostname.value || getPlatformHostname(videoUrl.value.trim())
  if (hostname) {
    saveParser(hostname, parser.id)
  }
}

function stopPlay() {
  playingUrl.value = ''
  playerKey.value++
  errorMsg.value = ''
  resolvedParserName.value = ''
  autoCandidates.value = []
  autoIndex.value = 0
  autoHostname.value = ''
  episodes.value = []
  activeEpisodeId.value = ''
  currentEpisodeTitle.value = ''
}

async function fetchEpisodes(url: string) {
  isLoadingEpisodes.value = true
  episodes.value = []
  activeEpisodeId.value = ''
  currentEpisodeTitle.value = ''
  try {
    const res = await $fetch<{ code: number; data: { episodes?: Episode[] } }>('/api/parse', {
      method: 'POST',
      body: { url, playlist: true },
    })
    if (res.data?.episodes?.length) {
      episodes.value = res.data.episodes
    }
  } catch {
    // Not a playlist or error — ignore
  } finally {
    isLoadingEpisodes.value = false
  }
}

function playEpisode(ep: Episode) {
  activeEpisodeId.value = ep.id
  currentEpisodeTitle.value = ep.title
  errorMsg.value = ''

  const epUrl = ep.url || videoUrl.value.trim()
  const parserId = selectedParserId.value
  const hostname = getPlatformHostname(epUrl)
  const candidates = hostname ? getParserCandidates(hostname) : []

  if (parserId === 'auto') {
    if (candidates.length > 0) {
      const savedId = getSavedParser(hostname!)
      const startIdx = savedId ? candidates.findIndex(p => p.id === savedId) : -1
      autoIndex.value = startIdx >= 0 ? startIdx : 0
      autoCandidates.value = candidates
      const parser = candidates[autoIndex.value]
      resolvedParserName.value = '自动选择（' + parser.name + '）'
      setPlayingUrl(buildParserUrl(parser, epUrl))
      return
    }
  } else {
    const parser = vipParsers.find(p => p.id === parserId)
    if (parser) {
      resolvedParserName.value = ''
      setPlayingUrl(buildParserUrl(parser, epUrl))
      return
    }
  }

  // Fallback: try auto with first candidate
  if (candidates.length > 0) {
    autoCandidates.value = candidates
    autoIndex.value = 0
    const parser = candidates[0]
    resolvedParserName.value = '自动选择（' + parser.name + '）'
    setPlayingUrl(buildParserUrl(parser, epUrl))
  } else {
    errorMsg.value = '未找到可用解析线路'
  }
}

async function quickPlay(url: string) {
  videoUrl.value = url
  selectedParserId.value = 'auto'
  errorMsg.value = ''
  episodes.value = []
  activeEpisodeId.value = ''
  currentEpisodeTitle.value = ''

  const hostname = getPlatformHostname(url)
  if (hostname) {
    await fetchEpisodes(url)
  }
  startAutoPlay(url)
}
</script>
