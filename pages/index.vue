<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <div class="mt-12 pb-8">
      <h1 class="text-3xl lg:text-5xl font-bold">
        <span class="text-[#6366f1]">xiaoyuevideo</span> 在线视频下载
      </h1>
      <h2 class="py-3 text-sm text-gray-500">
        免费解析，高速下载，支持海量视频平台
      </h2>
    </div>

    <VideoInput />
    <StepsGuide />

    <div class="mx-auto max-w-5xl text-left leading-6">
      <!-- Features -->
      <FeaturesSection />

      <!-- Platform Grid -->
      <div class="mt-8">
        <h2 class="text-2xl lg:text-3xl font-bold">视频平台</h2>
        <p class="my-3 text-gray-500">覆盖国内外主流社交与视频网站，一键解析下载</p>
        <PlatformGrid />
      </div>

      <!-- FAQ -->
      <FaqSection />

      <!-- Blog List -->
      <div class="mt-8 mb-16">
        <BlogList />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '在线视频下载_免费解析保存各平台视频_xiaoyuevideo'
})
</script>
