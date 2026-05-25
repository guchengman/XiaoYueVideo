<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <div class="mt-12 pb-8">
      <h1 class="text-3xl lg:text-5xl font-bold">
        <span class="text-[#6366f1]">文章</span>资讯
      </h1>
      <h2 class="py-3 text-sm text-gray-500">视频下载技巧、平台使用指南与工具评测</h2>
    </div>

    <div class="max-w-5xl mx-auto mb-16">
      <!-- 文章网格 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <NuxtLink
          v-for="post in pagedPosts"
          :key="post.groupId"
          :to="`/blog/${post.groupId}`"
          class="block border border-gray-200 rounded-lg p-4 sm:p-5 lg:p-6 hover:border-[#6366f1] hover:shadow-md transition min-h-[120px] flex flex-col"
        >
          <h3 class="text-base sm:text-lg font-semibold text-gray-800 hover:text-[#6366f1] mb-2 line-clamp-2">
            {{ post.title }}
          </h3>
          <p class="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
            {{ post.summary }}
          </p>
        </NuxtLink>
      </div>

      <!-- 空状态 -->
      <div v-if="totalPages === 0" class="text-center py-20 text-gray-400">
        暂无文章
      </div>

      <!-- 分页控件 -->
      <nav
        v-if="totalPages > 1"
        class="flex items-center justify-center gap-2 mt-10 flex-wrap"
      >
        <NuxtLink
          :to="currentPage > 2 ? '/blog?page=' + (currentPage - 1) : '/blog'"
          :class="[
            'inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-md text-sm border transition',
            currentPage === 1
              ? 'border-gray-200 text-gray-300 cursor-not-allowed pointer-events-none'
              : 'border-gray-300 text-gray-600 hover:border-[#6366f1] hover:text-[#6366f1]'
          ]"
          aria-label="上一页"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </NuxtLink>

        <template v-for="i in totalPages" :key="i">
          <NuxtLink
            :to="i === 1 ? '/blog' : '/blog?page=' + i"
            :class="[
              'inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-md text-sm border transition',
              i === currentPage
                ? 'bg-[#6366f1] text-white border-[#6366f1]'
                : 'border-gray-300 text-gray-600 hover:border-[#6366f1] hover:text-[#6366f1]'
            ]"
          >
            {{ i }}
          </NuxtLink>
        </template>

        <NuxtLink
          :to="'/blog?page=' + (currentPage + 1)"
          :class="[
            'inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-md text-sm border transition',
            currentPage === totalPages
              ? 'border-gray-200 text-gray-300 cursor-not-allowed pointer-events-none'
              : 'border-gray-300 text-gray-600 hover:border-[#6366f1] hover:text-[#6366f1]'
          ]"
          aria-label="下一页"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { blogPosts } from '~/utils/blog-data'

import { computed } from 'vue'

const pageSize = 10
const allPosts = [...blogPosts].reverse()
const route = useRoute()

const totalPages = computed(() => Math.ceil(allPosts.length / pageSize))

const currentPage = computed(() => {
  const raw = Number(route.query.page) || 1
  return Math.max(1, Math.min(raw, totalPages.value || 1))
})

const pagedPosts = computed(() => {
  const page = currentPage.value
  return allPosts.slice((page - 1) * pageSize, page * pageSize)
})

useHead({
  title: () => currentPage.value > 1
    ? `文章资讯 第${currentPage.value}页 - xiaoyuevideo`
    : '文章资讯 - xiaoyuevideo'
})
</script>
