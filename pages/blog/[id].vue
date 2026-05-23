<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <div class="mt-12 pb-8">
      <NuxtLink to="/blog" class="text-sm text-[#6366f1] hover:underline mb-4 inline-block">
        &larr; 返回文章列表
      </NuxtLink>
      <article class="max-w-4xl mx-auto">
        <h1 class="text-3xl lg:text-4xl font-bold mb-6">{{ post?.title || '文章详情' }}</h1>
        <div class="text-gray-600 leading-relaxed space-y-4 prose-a:text-[#6366f1] prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-strong:text-gray-800" v-html="post?.content || '文章内容加载中...'"></div>
        <div class="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-400">
          <p>本文由 XiaoYueVideo 整理发布，仅供参考学习。</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { blogPosts } from '~/utils/blog-data'

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
