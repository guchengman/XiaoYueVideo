<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <div class="mt-12 pb-8">
      <NuxtLink to="/blog" class="text-sm text-[#6366f1] hover:underline mb-4 inline-block">
        &larr; 返回文章列表
      </NuxtLink>
      <article class="max-w-4xl mx-auto">
        <h1 class="text-3xl lg:text-4xl font-bold mb-6">{{ post?.title || '文章详情' }}</h1>
        <div class="text-gray-600 leading-relaxed space-y-4">
          <p>以下是对"{{ post?.title }}"的详细介绍。</p>
          <p>XiaoYueVideo是一款完全免费、无需注册的高效视频下载工具。</p>
          <p>使用步骤：</p>
          <ol class="list-decimal pl-5 space-y-2">
            <li>从目标平台复制视频链接</li>
            <li>打开XiaoYueVideo网站并粘贴链接</li>
            <li>点击解析，等待系统识别视频源</li>
            <li>选择清晰度并下载视频</li>
          </ol>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { blogPosts } from '~/utils/platform'

const route = useRoute()
const id = route.params.id as string

const post = blogPosts.find(p => p.groupId === id)

useHead({
  title: `${post?.title || '文章详情'} - XiaoYueVideo`
})

if (!post) {
  throw createError({ statusCode: 404, message: '文章不存在' })
}
</script>
