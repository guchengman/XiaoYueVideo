<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <div class="mt-12 pb-8">
      <h1 class="text-3xl lg:text-5xl font-bold">
        <span class="text-[#6366f1]">文章</span>资讯
      </h1>
      <h2 class="py-3 text-sm text-gray-500">视频下载技巧、平台使用指南与工具评测</h2>
    </div>

    <div class="max-w-5xl mx-auto mb-16">
      <div class="space-y-4">
        <NuxtLink
          v-for="post in blogPosts"
          :key="post.groupId"
          :to="`/blog/${post.groupId}`"
          class="block border border-gray-200 rounded-lg p-5 hover:border-[#6366f1] hover:shadow-md transition"
        >
          <h3 class="text-lg font-semibold text-gray-800 hover:text-[#6366f1] mb-2">{{ post.title }}</h3>
          <p class="text-sm text-gray-500 leading-relaxed">{{ post.summary }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { blogPosts } from '~/utils/blog-data'

useHead({ title: '博客文章_XiaoYueVideo下载技巧' })
</script>
