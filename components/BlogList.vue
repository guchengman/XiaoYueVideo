<template>
  <div class="mt-8">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl lg:text-3xl font-bold">推荐阅读</h2>
      <NuxtLink
        to="/blog"
        class="text-sm text-[#6366f1] hover:underline whitespace-nowrap"
      >
        查看全部 &rarr;
      </NuxtLink>
    </div>
    <div class="border border-solid border-gray-200 max-h-72 py-3 px-5 overflow-y-auto rounded-md">
      <NuxtLink
        v-for="post in recentPosts"
        :key="post.groupId"
        :to="`/blog/${post.groupId}`"
        class="hover:text-[#6366f1]"
      >
        <div class="py-2 truncate border-b border-solid border-gray-200">
          {{ post.title }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { blogPosts } from '~/utils/blog-data'

const recentPosts = [...blogPosts].reverse().slice(0, 5)
</script>
