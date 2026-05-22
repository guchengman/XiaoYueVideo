<template>
  <footer class="bg-[#4338ca] text-white">
    <div class="max-w-5xl mx-auto py-9 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div class="flex flex-col text-left">
        <h3 class="text-xl font-semibold mb-2">热门平台：</h3>
        <NuxtLink to="/bilibili" class="truncate hover:underline">B站视频在线保存</NuxtLink>
        <NuxtLink to="/douyin" class="truncate hover:underline">抖音去水印下载</NuxtLink>
        <NuxtLink to="/youtube" class="truncate hover:underline">YouTube视频下载</NuxtLink>
        <NuxtLink to="/twitter" class="truncate hover:underline">X/Twitter视频提取</NuxtLink>
      </div>
      <div class="flex flex-col text-left">
        <h3 class="text-xl font-semibold mb-2">帮助指南：</h3>
        <NuxtLink to="/tutorial" class="truncate hover:underline">XiaoYueVideo使用教程</NuxtLink>
        <NuxtLink to="/tutorial" class="truncate hover:underline">iPhone/iPad保存视频到相册</NuxtLink>
      </div>
      <div class="text-left">
        <div>免责声明：本站不存储任何视频文件，所有内容均来自原始平台，版权归原作者所有</div>
        <div class="mt-8">Copyright &copy;2024 ~ 2026 XiaoYueVideo. All rights reserved.</div>
      </div>
    </div>
  </footer>
</template>
