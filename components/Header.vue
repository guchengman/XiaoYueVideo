<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-3 h-14">
      <div class="flex items-center gap-1.5">
        <NuxtLink to="/" class="flex gap-2 items-end">
          <span class="text-2xl font-bold text-[#6366f1]">XiaoYueVideo</span>
        </NuxtLink>
      </div>

      <nav>
        <ul class="items-center gap-x-8 hidden lg:flex">
          <li class="relative" @mouseenter="openDropdown = true" @mouseleave="openDropdown = false">
            <div class="relative">
              <span class="text-sm font-semibold flex items-center gap-1 cursor-pointer text-gray-700 hover:text-[#6366f1]">
                视频下载
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
              <Transition name="fade">
                <div v-if="openDropdown" class="z-50 w-64 absolute top-full left-0 mt-1">
                  <div class="bg-white ring-1 ring-gray-200 rounded-md shadow-lg p-2 space-y-1">
                    <NuxtLink v-for="p in dropdownPlatforms" :key="p.id" :to="p.path"
                      class="block px-2 py-1.5 rounded-md hover:bg-gray-50 text-sm">
                      <span class="font-semibold">{{ p.name }}</span>
                      <span class="text-xs text-gray-500 ml-1">{{ p.description }}</span>
                    </NuxtLink>
                  </div>
                </div>
              </Transition>
            </div>
          </li>
          <li v-for="item in navItems" :key="item.path">
            <NuxtLink :to="item.path"
              class="text-sm font-semibold flex items-center gap-1 hover:text-[#6366f1] text-gray-700"
              :class="{ 'text-[#6366f1]': isActive(item.path) }">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-3 lg:hidden">
        <button type="button" class="p-1.5 text-gray-700 hover:bg-gray-50 rounded-md" @click="mobileMenuOpen = !mobileMenuOpen">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="fade">
      <div v-if="mobileMenuOpen" class="lg:hidden border-t border-gray-200 bg-white">
        <div class="px-4 py-3 space-y-2">
          <div class="font-semibold text-sm text-gray-500 mb-1">选择平台</div>
          <NuxtLink v-for="p in allPlatforms" :key="p.id" :to="p.path" class="block px-2 py-1.5 text-sm hover:bg-gray-50 rounded-md"
            @click="mobileMenuOpen = false">
            {{ p.name }}
          </NuxtLink>
          <div class="border-t border-gray-100 my-2"></div>
          <NuxtLink v-for="item in navItems" :key="item.path" :to="item.path"
            class="block px-2 py-1.5 text-sm hover:bg-gray-50 rounded-md" @click="mobileMenuOpen = false">
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { platforms } from '~/utils/platform'

const route = useRoute()
const openDropdown = ref(false)
const mobileMenuOpen = ref(false)

const dropdownPlatforms = platforms.slice(0, 9)
const allPlatforms = platforms

const navItems = [
  { label: 'VIP免费看', path: '/video/vip' },
  { label: '在线播放', path: '/video/player' },
  { label: '使用教程', path: '/tutorial' },
  { label: '文章资讯', path: '/blog' },
  { label: '历史记录', path: '/history' },
  { label: '联系反馈', path: '/contact' },
]

function isActive(path: string) {
  return route.path === path
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
