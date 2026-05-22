<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <div class="mt-12 pb-8">
      <h1 class="text-3xl lg:text-5xl font-bold">
        <span class="text-[#6366f1]">{{ platformName }} </span>{{ platformNameCn }}视频下载
      </h1>
      <h2 class="py-3 text-sm text-gray-500">
        免费在线解析{{ platformName }}视频，高清无水印，极速稳定
      </h2>
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

useHead({
  title: `${props.platformName}视频下载_免费在线保存${props.platformName}视频_XiaoYueVideo`
})
</script>
