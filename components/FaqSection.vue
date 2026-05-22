<template>
  <div class="mt-16 mx-auto text-left">
    <div class="faq text-left leading-normal">
      <h2 class="text-2xl lg:text-3xl font-bold pb-8">常见疑问</h2>
      <div v-for="(faq, index) in faqs" :key="index" class="item" :id="`index${index + 1}`">
        <div class="q" @click="toggle(index)">
          <span class="mr-2 text-[#6366f1]">{{ openIndex === index ? '▼' : '▶' }}</span>
          {{ faq.q }}
        </div>
        <Transition name="slide">
          <div v-if="openIndex === index" class="a pl-5">
            {{ faq.a }}
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faqs } from '~/utils/platform'

const openIndex = ref<number | null>(0)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
