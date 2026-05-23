import { resolve } from 'node:path'

export default defineNuxtConfig({
  compatibilityDate: '2026-05-21',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  vite: {
    resolve: {
      alias: {
        '#app-manifest': resolve(__dirname, 'app', 'empty.mjs'),
      }
    }
  },
  app: {
    head: {
      title: '全网视频在线下载_哔哩哔哩_抖音_YouTube_快手等平台视频保存_xiaoyuevideo',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes',
      meta: [
        { name: 'keywords', content: '视频下载,在线视频下载,免费下载视频,哔哩哔哩下载,抖音无水印,油管下载,快手保存,短视频保存,视频提取' },
        { name: 'description', content: 'xiaoyuevideo提供免费的在线视频解析与下载服务，覆盖哔哩哔哩、抖音、快手、微博、小红书、YouTube、Instagram等主流平台，无需注册即可高速下载无水印视频，是您保存网络视频的好帮手。' },
        { name: 'author', content: 'xiaoyuevideo' },
        { name: 'copyright', content: 'xiaoyuevideo' },
        { name: 'referrer', content: 'no-referrer' },
        { name: 'applicable-device', content: 'pc,mobile' }
      ],
      link: [
        { rel: 'shortcut icon', href: '/favicon.ico' }
      ]
    }
  },
  nitro: {
    routeRules: {
      '/api/**': { cors: true }
    }
  }
})
