<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <div class="mt-12 pb-8">
      <h1 class="text-3xl lg:text-5xl font-bold">
        <span class="text-[#6366f1]">{{ platformName }} </span>{{ platformNameCn }}视频下载
      </h1>
      <h2 class="py-3 text-sm text-gray-500">
        免费在线解析{{ platformName }}视频，高清无水印，极速稳定
      </h2>
      <a :href="platformUrl" target="_blank" rel="noopener noreferrer"
        class="inline-flex items-center gap-1 text-sm text-[#6366f1] hover:underline mt-1">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        访问 {{ platformName }} 官网
      </a>
    </div>

    <VideoInput />
    <StepsGuide />

    <div class="mx-auto max-w-5xl text-left leading-6 mb-16">
      <FeaturesSection />

      <div class="mt-8">
        <h2 class="text-2xl lg:text-3xl font-bold">关于{{ platformName }}视频下载</h2>
        <div class="mt-4 text-gray-600 leading-relaxed space-y-3">
          <p>
            {{ platformName }}拥有海量优质的视频内容。
            通过XiaoYueVideo，您可以免费将{{ platformName }}视频保存到本地，
            支持高清画质，无水印，方便快捷。
          </p>
          <p>
            操作很简单：复制{{ platformName }}视频链接 → 粘贴到输入框 → 点击解析下载。
            全程免费，不限次数，无需注册。
          </p>
        </div>
      </div>

      <FaqSection />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  platformId: string
  platformName: string
  platformNameCn: string
}>()

const platformUrls: Record<string, string> = {
  bilibili: 'https://www.bilibili.com',
  douyin: 'https://www.douyin.com',
  kuaishou: 'https://www.kuaishou.com',
  weibo: 'https://weibo.com',
  youtube: 'https://www.youtube.com',
  twitter: 'https://x.com',
  tiktok: 'https://www.tiktok.com',
  instagram: 'https://www.instagram.com',
  xiaohongshu: 'https://www.xiaohongshu.com',
  ixigua: 'https://www.ixigua.com',
  zhihu: 'https://www.zhihu.com',
  acfun: 'https://www.acfun.cn',
  huya: 'https://www.huya.com',
  douyu: 'https://www.douyu.com',
  vimeo: 'https://vimeo.com',
  pinterest: 'https://www.pinterest.com',
  facebook: 'https://www.facebook.com',
  haokan: 'https://haokan.baidu.com',
  cctv: 'https://www.cctv.com',
  xpc: 'https://www.xinpianchang.com',
  toutiao: 'https://www.toutiao.com',
  souhu: 'https://tv.sohu.com',
  net163: 'https://v.163.com',
  threads: 'https://www.threads.net',
  weverse: 'https://weverse.io',
  gzh: 'https://mp.weixin.qq.com',
}

const platformUrl = computed(() => platformUrls[props.platformId] || `https://www.${props.platformId}.com`)

useHead({
  title: `${props.platformName}视频下载_免费在线保存${props.platformName}视频_XiaoYueVideo`
})
</script>
