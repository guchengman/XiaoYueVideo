import { defineStore } from 'pinia'
import type { VideoInfo } from '~/types'

const HISTORY_KEY = 'xiaoyuevideo_history'
const MAX_HISTORY = 50

function loadHistory(): string[] {
  if (import.meta.client) {
    try {
      const raw = localStorage.getItem(HISTORY_KEY)
      return raw ? JSON.parse(raw) : []
    } catch { /* ignore */ }
  }
  return []
}

function saveHistory(items: string[]) {
  if (import.meta.client) {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(items))
    } catch { /* ignore */ }
  }
}

/** Extract the first valid HTTP(S) URL from mixed text */
function extractUrl(input: string): string {
  const match = input.match(/https?:\/\/[^\s<>"']+/)
  return match ? match[0].replace(/[)）]+$/, '') : input.trim()
}

export interface LogEntry {
  time: string
  level: 'info' | 'ok' | 'warn' | 'error'
  msg: string
}

export const useVideoStore = defineStore('video', () => {
  const inputUrl = ref('')
  const isParsing = ref(false)
  const parseResult = ref<VideoInfo | null>(null)
  const error = ref('')
  const history = ref<string[]>(loadHistory())
  const logs = ref<LogEntry[]>([])

  function addLog(level: LogEntry['level'], msg: string) {
    const now = new Date()
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
    logs.value.push({ time, level, msg })
  }

  function clearLogs() {
    logs.value = []
  }

  function setUrl(url: string) {
    inputUrl.value = url
  }

  async function parseVideo() {
    if (!inputUrl.value.trim()) {
      error.value = '请先粘贴视频链接'
      addLog('warn', '输入为空，请粘贴视频链接')
      return
    }

    isParsing.value = true
    error.value = ''
    parseResult.value = null
    clearLogs()
    addLog('info', `开始解析：${inputUrl.value.trim()}`)

    try {
      const cleanUrl = extractUrl(inputUrl.value)
      addLog('info', `提取链接：${cleanUrl}`)
      addLog('info', '正在请求解析服务...')

      const res = await $fetch<{ code: number; data: VideoInfo }>('/api/parse', {
        method: 'POST',
        body: { url: cleanUrl },
      })
      parseResult.value = res.data

      addLog('ok', `解析成功！来自 ${res.data.hostAlias}`)
      addLog('info', `标题：${res.data.displayTitle}`)
      addLog('info', `共 ${res.data.formats.length} 个可用格式`)

      // Add clean URL to history
      history.value = history.value.filter(h => h !== cleanUrl)
      history.value.unshift(cleanUrl)
      if (history.value.length > MAX_HISTORY) history.value.pop()
      saveHistory(history.value)
    } catch (e: any) {
      const msg = e?.data?.message || e?.data?.statusMessage || e?.message || '解析未成功，请确认链接是否有效'
      error.value = msg
      addLog('error', msg)
    } finally {
      isParsing.value = false
    }
  }

  function clearResult() {
    parseResult.value = null
    error.value = ''
  }

  function clearHistory() {
    history.value = []
    saveHistory([])
  }

  return { inputUrl, isParsing, parseResult, error, history, logs, setUrl, parseVideo, clearResult, clearHistory, addLog, clearLogs }
})
