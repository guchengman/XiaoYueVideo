<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <div class="mt-12 pb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl lg:text-5xl font-bold">
            <span class="text-[#6366f1]">解析</span>历史
          </h1>
          <h2 class="py-3 text-sm text-gray-500">查看最近的视频解析记录</h2>
        </div>
        <button v-if="history.length > 0" @click="clearAll"
          class="text-xs text-gray-400 hover:text-red-500 transition px-3 py-2 border border-gray-200 rounded">
          清空记录
        </button>
      </div>
    </div>

    <div class="max-w-5xl mx-auto mb-16">
      <div v-if="history.length === 0" class="text-center py-16 text-gray-400">
        <svg class="w-16 h-16 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
        <p>还没有解析记录</p>
      </div>

      <div v-else class="space-y-2">
        <div
          v-for="(item, index) in history"
          :key="index"
          class="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 hover:border-[#6366f1]"
        >
          <span class="text-sm text-gray-600 truncate flex-1">{{ item }}</span>
          <button class="text-xs text-[#6366f1] hover:underline ml-2" @click="reParse(item)">再次解析</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: '解析历史_xiaoyuevideo' })

const HISTORY_KEY = 'xiaoyuevideo_history'

const history = ref<string[]>([])

onMounted(() => {
  history.value = loadHistory()
})

function loadHistory(): string[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveHistory(items: string[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items))
  } catch { /* ignore */ }
}

function reParse(url: string) {
  navigateTo({ path: '/', query: { url } })
}

function clearAll() {
  history.value = []
  saveHistory([])
}
</script>
