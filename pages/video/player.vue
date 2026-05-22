<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <div class="mt-12 pb-8">
      <h1 class="text-3xl lg:text-5xl font-bold">
        <span class="text-[#6366f1]">在线</span>播放器
      </h1>
      <h2 class="py-3 text-sm text-gray-500">粘贴视频链接，在线预览播放</h2>
    </div>

    <div class="max-w-5xl mx-auto">
      <div class="flex mb-8">
        <input
          v-model="playerUrl"
          type="text"
          class="flex-1 h-12 px-4 text-base border border-gray-200 rounded-l-md focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 placeholder-gray-300"
          placeholder="粘贴视频链接，按回车播放"
          @keyup.enter="play"
        />
        <button class="button-1 w-24 ml-0 rounded-l-none rounded-r-md text-base h-12" @click="play" :disabled="loading">
          {{ loading ? '解析中…' : '播放' }}
        </button>
      </div>

      <div v-if="errorMsg" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-4">
        {{ errorMsg }}
      </div>

      <div v-if="playing && videoSrc" class="aspect-video bg-black rounded-lg overflow-hidden">
        <video
          ref="videoEl"
          class="w-full h-full"
          :src="videoSrc"
          controls
          autoplay
          playsinline
        ></video>
      </div>

      <div v-else-if="!playing" class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
        <div class="text-center">
          <svg class="w-16 h-16 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10" />
            <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
          </svg>
          <p>粘贴链接，开始播放</p>
        </div>
      </div>

      <div v-if="parsedInfo" class="mt-4 p-4 bg-gray-50 rounded-lg">
        <p class="text-sm text-gray-600">标题：{{ parsedInfo.displayTitle }}</p>
        <p class="text-sm text-gray-500">来源：{{ parsedInfo.hostAlias }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: '在线播放器_XiaoYueVideo' })

const playerUrl = ref('')
const playing = ref(false)
const loading = ref(false)
const errorMsg = ref('')
const videoSrc = ref('')
const parsedInfo = ref<{ displayTitle: string; hostAlias: string } | null>(null)
const videoEl = ref<HTMLVideoElement | null>(null)

async function play() {
  const url = playerUrl.value.trim()
  if (!url) return

  loading.value = true
  errorMsg.value = ''
  playing.value = false
  videoSrc.value = ''
  parsedInfo.value = null

  // Check if it's a direct video URL
  if (isDirectVideoUrl(url)) {
    videoSrc.value = `/api/download?url=${encodeURIComponent(url)}`
    playing.value = true
    parsedInfo.value = { displayTitle: url.split('/').pop() || 'video', hostAlias: '直接链接' }
    loading.value = false
    return
  }

  // Try parsing with the API
  try {
    const res = await $fetch<{ code: number; data: any }>('/api/parse', {
      method: 'POST',
      body: { url },
    })

    if (res.data?.formats?.length) {
      const best = res.data.formats.filter((f: any) => f.hasVideo && f.url)
        .sort((a: any, b: any) => b.filesize - a.filesize)[0] || res.data.formats[0]
      videoSrc.value = `/api/download?url=${encodeURIComponent(best.url)}`
      playing.value = true
      parsedInfo.value = { displayTitle: res.data.displayTitle, hostAlias: res.data.hostAlias }
    } else {
      errorMsg.value = '未能解析出可播放的视频源'
    }
  } catch (e: any) {
    errorMsg.value = e?.data?.statusMessage || '解析失败，请检查链接'
  } finally {
    loading.value = false
  }
}

function isDirectVideoUrl(url: string) {
  return /\.(mp4|webm|mkv|avi|mov|m3u8)(\?|$)/i.test(url)
}
</script>
