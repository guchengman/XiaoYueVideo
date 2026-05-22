<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <div class="mt-12 pb-8">
      <h1 class="text-3xl lg:text-5xl font-bold">
        <span class="text-[#6366f1]">VIP视频</span>免费观看
      </h1>
      <h2 class="py-3 text-sm text-gray-500">聚合各平台VIP资源，免会员直接观看</h2>
    </div>

    <div class="max-w-5xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="source in vipSources" :key="source.name" class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
          <h3 class="text-lg font-semibold mb-2">{{ source.name }}</h3>
          <p class="text-sm text-gray-500 mb-4">{{ source.description }}</p>
          <div class="flex flex-wrap gap-2">
            <a v-for="item in source.links" :key="item" :href="item.url" target="_blank"
              class="text-sm text-[#6366f1] hover:underline">
              {{ item.label }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'VIP视频免费观看_XiaoYueVideo' })

const vipSources = [
  {
    name: '影视资源',
    description: '热门电影免费在线看',
    links: [
      { label: '正在热映', url: '#' },
      { label: '高分经典', url: '#' },
    ]
  },
  {
    name: '连续剧资源',
    description: '最新剧集同步更新',
    links: [
      { label: '热门剧集', url: '#' },
      { label: '完结剧集', url: '#' },
    ]
  },
  {
    name: '综艺娱乐',
    description: '全网热门综艺随心看',
    links: [
      { label: '热门综艺', url: '#' },
      { label: '经典综艺', url: '#' },
    ]
  }
]
</script>
