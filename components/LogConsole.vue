<template>
  <div class="border border-gray-200 rounded-lg overflow-hidden" v-if="store.logs.length > 0">
    <div class="flex items-center justify-between px-4 py-2 bg-[#1e1e1e] text-gray-300 text-xs select-none">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-[#ff5f57] inline-block"></span>
        <span class="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
        <span class="w-3 h-3 rounded-full bg-[#28c840] inline-block"></span>
        <span class="ml-2 font-medium">控制台</span>
      </div>
      <div class="flex items-center gap-2">
        <button @click="expanded = !expanded" class="text-gray-500 hover:text-white transition text-xs" :title="expanded ? '收起' : '展开'">
          <svg :class="{ 'rotate-180': expanded }" class="w-3 h-3 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <button @click="store.clearLogs" class="text-gray-500 hover:text-white transition text-xs">
          清空
        </button>
      </div>
    </div>
    <div v-if="expanded" ref="logBody" class="bg-[#252526] p-4 max-h-64 sm:h-64 overflow-y-auto font-mono text-sm leading-6">
      <div v-for="(log, i) in store.logs" :key="i" class="log-line whitespace-pre-wrap break-all">
        <span class="text-gray-500 mr-2 select-none">{{ log.time }}</span>
        <span :class="levelClass(log.level)" class="mr-2 select-none w-12 inline-block text-center text-xs font-bold uppercase rounded shrink-0">{{ log.level }}</span>
        <span :class="msgClass(log.level)">{{ log.msg }}</span>
      </div>
      <div v-if="store.isParsing" class="text-gray-500 mt-1">
        <span class="inline-block animate-pulse">▊</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useVideoStore()
const logBody = ref<HTMLElement | null>(null)
const expanded = ref(true)

function levelClass(level: string) {
  return {
    'text-[#ff5f57] bg-[#ff5f5715]': level === 'error',
    'text-[#ffbd2e] bg-[#ffbd2e15]': level === 'warn',
    'text-[#28c840] bg-[#28c84015]': level === 'ok',
    'text-[#569cd6] bg-[#569cd615]': level === 'info',
  }
}

function msgClass(level: string) {
  return {
    'text-red-400': level === 'error',
    'text-yellow-400': level === 'warn',
    'text-green-400': level === 'ok',
    'text-gray-200': level === 'info',
  }
}

watch(() => store.logs.length, () => {
  nextTick(() => {
    if (logBody.value) {
      logBody.value.scrollTop = logBody.value.scrollHeight
    }
  })
})
</script>
