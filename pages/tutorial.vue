<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <div class="mt-12 pb-8">
      <h1 class="text-3xl lg:text-5xl font-bold">
        <span class="text-[#6366f1]">使用</span>教程
      </h1>
      <h2 class="py-3 text-sm text-gray-500">手把手教你用XiaoYueVideo下载视频</h2>
    </div>

    <div class="max-w-5xl mx-auto mb-16">
      <div class="space-y-8">
        <div v-for="(tutorial, index) in tutorials" :key="index" class="border border-gray-200 rounded-lg p-6">
          <h3 class="text-xl font-semibold mb-3 text-[#6366f1]">{{ tutorial.title }}</h3>
          <div class="text-gray-600 leading-relaxed space-y-2" v-html="tutorial.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: '使用教程_XiaoYueVideo视频下载帮助' })

const tutorials = [
  {
    title: 'XiaoYueVideo视频下载操作指南',
    content: `<p>1. 找到你想下载的视频页面，复制浏览器地址栏的链接</p>
              <p>2. 回到XiaoYueVideo，将链接粘贴到输入框</p>
              <p>3. 点击"开始"按钮，系统会自动解析视频源</p>
              <p>4. 解析完成后，选择画质并点击下载按钮</p>
              <p>5. 视频就会保存到你的设备中了</p>`
  },
  {
    title: 'iPhone/iPad如何将视频保存到相册',
    content: `<p>由于iOS系统限制，Safari不能直接下载文件，可以试试以下方案：</p>
              <p>方案一：换成Chrome浏览器，下载体验更好</p>
              <p>方案二：在Safari中点击分享图标，选"保存到文件"</p>
              <p>方案三：用第三方下载管理器App来协助保存</p>`
  },
  {
    title: '想批量下载视频怎么办',
    content: `<p>XiaoYueVideo目前专注于单个视频的解析与下载。<br>
              如果你需要批量处理，可以考虑这些专业工具：</p>
              <p>• yt-dlp：强大的命令行工具，支持YouTube、B站等平台批量下载</p>
              <p>• 各视频平台自带的下载或收藏功能</p>`
  }
]
</script>
