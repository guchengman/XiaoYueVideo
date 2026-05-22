<template>
  <div class="border border-gray-200 rounded-lg overflow-hidden">
    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-[#6366f1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2a10 10 0 0 1 10 10c0 1.5-.3 2.9-.9 4.2l-1.8-.6a4 4 0 0 0-5.1 2.5l-.6 1.8A10 10 0 0 1 12 22" />
          <path d="M18 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          <path d="M8 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          <path d="M6 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        </svg>
        <span class="font-medium text-sm text-gray-700">Cookie 管理</span>
        <span v-if="status === 'checking'" class="text-xs text-gray-400 animate-pulse">检查中...</span>
        <span v-else-if="status === 'exists'" class="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">已配置 ({{ cookieCount }} 条)</span>
        <span v-else-if="status === 'empty'" class="text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded">未配置</span>
      </div>
      <button @click="expanded = !expanded" class="text-gray-400 hover:text-gray-600 transition text-xs flex items-center gap-1">
        {{ expanded ? '收起' : '管理' }}
        <svg :class="{'rotate-180': expanded}" class="w-3 h-3 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </div>

    <div v-if="expanded" class="p-4 space-y-4">
      <!-- Platform selector -->
      <div class="flex items-center gap-2">
        <label class="text-sm text-gray-600 w-16">平台：</label>
        <select v-model="selectedPlatform" @change="checkStatus"
          class="text-sm border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-[#6366f1]">
          <option v-for="p in platforms" :key="p.value" :value="p.value">{{ p.label }}</option>
        </select>
      </div>

      <!-- Paste cookies -->
      <div>
        <label class="text-sm text-gray-600 block mb-1">粘贴 Cookie（Netscape 格式）：</label>
        <textarea v-model="cookieText" rows="6"
          class="w-full text-xs font-mono border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-[#6366f1]"
          placeholder="在此粘贴从浏览器导出的 Cookie 内容..."></textarea>
      </div>

      <!-- Buttons -->
      <div class="flex gap-2">
        <button @click="saveCookies" :disabled="saving || !cookieText.trim()"
          class="button-1 text-xs" style="padding:0.4rem 1rem">
          {{ saving ? '保存中...' : '保存 Cookie' }}
        </button>
        <button v-if="status === 'exists'" @click="clearCookies"
          class="text-xs text-red-500 hover:text-red-700 border border-red-200 rounded px-3 py-1.5 transition">
          清除 Cookie
        </button>
        <button @click="showInstructions = !showInstructions"
          class="text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded px-3 py-1.5 transition">
          {{ showInstructions ? '隐藏说明' : '导出方法' }}
        </button>
      </div>

      <!-- Status message -->
      <div v-if="msg" :class="msgType === 'ok' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'" class="text-xs px-3 py-2 rounded">
        {{ msg }}
      </div>

      <!-- Export instructions -->
      <div v-if="showInstructions" class="bg-gray-50 rounded-lg p-4 text-xs text-gray-600 space-y-3">
        <p class="font-medium text-gray-700">Cookie 导出说明</p>

        <div class="bg-yellow-50 border border-yellow-200 rounded p-3 text-yellow-800">
          <p class="font-medium mb-1">⚠️ 关键要求</p>
          <p>必须导出<strong>全部 Cookie</strong>（至少 10~20 条），仅导出 1 条无效。</p>
          <p>以抖音为例，必须包含以下关键 Cookie：<code class="bg-gray-100 px-1 rounded">ttwid</code>、<code class="bg-gray-100 px-1 rounded">passport_csrf_token</code>、<code class="bg-gray-100 px-1 rounded">sid_guard</code>、<code class="bg-gray-100 px-1 rounded">sessionid</code>、<code class="bg-gray-100 px-1 rounded">uid_tt</code> 等。</p>
        </div>

        <div>
          <p class="font-medium text-gray-700 mb-1">方法一：使用 Cookie-Editor 扩展（推荐）</p>
          <ol class="list-decimal pl-4 space-y-1">
            <li>Chrome 应用商店搜索安装 <strong>Cookie-Editor</strong></li>
            <li>打开 <span class="text-[#6366f1] font-medium">{{ platformDomain }}</span> 并<strong>登录账号</strong></li>
            <li>点击浏览器右上角 Cookie-Editor 扩展图标</li>
            <li>点击左下角 <strong>Export</strong> 按钮（<span class="text-red-500">不是逐个勾选</span>）</li>
            <li>复制全部导出的文本，粘贴到上方文本框</li>
            <li>点击 "保存 Cookie"，保存成功后状态会显示 <span class="text-green-600">已配置 (N 条)</span></li>
          </ol>
        </div>

        <div>
          <p class="font-medium text-gray-700 mb-1">方法二：使用 Get cookies.txt 扩展</p>
          <ol class="list-decimal pl-4 space-y-1">
            <li>Chrome 应用商店搜索安装 <strong>Get cookies.txt</strong></li>
            <li>打开 {{ platformDomain }} 并登录</li>
            <li>点击扩展图标 → <strong>Export All Cookies</strong>（Netscape 格式）</li>
            <li>将导出的 .txt 文件内容粘贴到上方文本框</li>
          </ol>
        </div>

        <div>
          <p class="font-medium text-gray-700 mb-1">方法三：Python 脚本自动提取</p>
          <p>关闭 Chrome 后，在项目目录运行：</p>
          <code class="block bg-gray-800 text-green-400 p-2 rounded mt-1 whitespace-pre-wrap">python3 scripts\chrome_cookie_extract.py {{ selectedPlatform }} ..\cookies\{{ selectedPlatform }}_cookies.txt</code>
        </div>

        <div class="border-t border-gray-200 pt-2">
          <p class="font-medium text-gray-700 mb-1">✅ 导出成功后的效果（示例）：</p>
          <code class="block bg-gray-800 text-green-400 p-2 rounded text-[10px] leading-5 whitespace-pre-wrap"># Netscape HTTP Cookie File
# This file was generated by Cookie-Editor
.douyin.com	TRUE	/	TRUE	1764633600	ttwid	e8af8eec168e6006...
.douyin.com	TRUE	/	FALSE	0	passport_csrf_token	abc123def456...
.douyin.com	TRUE	/	TRUE	1764633600	sessionid	xyz789abc012...
.douyin.com	TRUE	/	TRUE	1764633600	sid_guard	abc123def456...
.douyin.com	TRUE	/	TRUE	1764633600	uid_tt	...</code>
          <p class="mt-1">保存后应显示 <strong>已配置 (10+ 条)</strong>，少于 5 条说明导出不完整。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const platforms = [
  { value: 'douyin', label: '抖音 Douyin' },
  { value: 'bilibili', label: '哔哩哔哩 Bilibili' },
  { value: 'kuaishou', label: '快手 Kuaishou' },
  { value: 'weibo', label: '微博 Weibo' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'twitter', label: 'Twitter/X' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'xiaohongshu', label: '小红书' },
]

const selectedPlatform = ref('douyin')
const cookieText = ref('')
const saving = ref(false)
const expanded = ref(false)
const showInstructions = ref(false)
const status = ref<'checking' | 'exists' | 'empty'>('checking')
const cookieCount = ref(0)
const msg = ref('')
const msgType = ref<'ok' | 'error'>('ok')

const platformDomain = computed(() => {
  const map: Record<string, string> = {
    douyin: 'douyin.com',
    bilibili: 'bilibili.com',
    kuaishou: 'kuaishou.com',
    weibo: 'weibo.com',
    tiktok: 'tiktok.com',
    twitter: 'twitter.com',
    instagram: 'instagram.com',
    xiaohongshu: 'xiaohongshu.com',
  }
  return map[selectedPlatform.value] || selectedPlatform.value
})

async function checkStatus() {
  status.value = 'checking'
  try {
    const res = await $fetch<{ code: number; data: { exists: boolean; count: number; preview: string } }>('/api/cookies', {
      params: { platform: selectedPlatform.value },
    })
    status.value = res.data.exists ? 'exists' : 'empty'
    cookieCount.value = res.data.count
    if (res.data.exists) {
      cookieText.value = res.data.preview
    }
  } catch {
    status.value = 'empty'
    cookieCount.value = 0
  }
}

async function saveCookies() {
  saving.value = true
  msg.value = ''
  try {
    const res = await $fetch<{ code: number; message: string }>('/api/cookies', {
      method: 'POST',
      body: { platform: selectedPlatform.value, content: cookieText.value },
    })
    msg.value = res.message
    msgType.value = 'ok'
    await checkStatus()
  } catch (e: any) {
    msg.value = e?.data?.message || '保存失败'
    msgType.value = 'error'
  } finally {
    saving.value = false
  }
}

async function clearCookies() {
  msg.value = ''
  try {
    await $fetch('/api/cookies', {
      method: 'DELETE',
      params: { platform: selectedPlatform.value },
    })
    msg.value = 'Cookie 已清除'
    msgType.value = 'ok'
    cookieText.value = ''
    await checkStatus()
  } catch (e: any) {
    msg.value = e?.data?.message || '清除失败'
    msgType.value = 'error'
  }
}

onMounted(() => {
  checkStatus()
})
</script>
