<template>
  <div class="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-5">
    <NuxtLink
      v-for="p in platformList"
      :key="p.id"
      :to="p.path"
      class="platform-card flex flex-col justify-center items-center rounded-md bg-[#f7fafa] py-6 md:py-8 lg:py-12 hover:bg-[#f0faf4]"
    >
      <img
        width="36"
        height="36"
        :src="p.icon"
        :alt="p.name"
        class="w-9 h-9 object-contain"
        loading="lazy"
      />
      <p class="mt-3 text-sm md:text-md">{{ p.name }}</p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { platforms } from '~/utils/platform'

const props = withDefaults(defineProps<{
  platformList?: typeof platforms
}>(), {
  platformList: () => platforms
})
</script>
