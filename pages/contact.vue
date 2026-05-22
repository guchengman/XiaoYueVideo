<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <div class="mt-12 pb-8">
      <h1 class="text-3xl lg:text-5xl font-bold">
        <span class="text-[#6366f1]">联系</span>我们
      </h1>
      <h2 class="py-3 text-sm text-gray-500">遇到问题或有想法，随时和我们聊聊</h2>
    </div>

    <div class="max-w-5xl mx-auto mb-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-6">
          <div class="border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-semibold mb-4">联系方式</h3>
            <div class="space-y-3 text-gray-600">
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-[#6366f1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>xiaoyuevideo@example.com</span>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-[#6366f1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span>用户交流群：发送邮件获取入群方式</span>
              </div>
            </div>
          </div>
        </div>

        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold mb-4">意见反馈</h3>
          <form @submit.prevent="submitFeedback" class="space-y-4">
            <div>
              <label class="block text-sm text-gray-600 mb-1">邮箱</label>
              <input v-model="form.email" type="email" class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" placeholder="你的邮箱（选填）" />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">内容</label>
              <textarea v-model="form.content" rows="4" class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm" placeholder="请告诉我们你的想法…" required></textarea>
            </div>
            <button type="submit" class="button-1 text-sm" :disabled="submitting">
              {{ submitting ? '发送中…' : '提交' }}
            </button>
          </form>
          <p v-if="submitted" class="mt-4 text-sm text-[#6366f1]">谢谢！我们已收到你的反馈 ~</p>
          <p v-if="submitError" class="mt-4 text-sm text-red-500">{{ submitError }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: '联系我们_XiaoYueVideo' })

const form = reactive({ email: '', content: '' })
const submitted = ref(false)
const submitting = ref(false)
const submitError = ref('')

async function submitFeedback() {
  if (!form.content.trim()) return
  submitting.value = true
  submitError.value = ''

  try {
    await $fetch('/api/feedback', {
      method: 'POST',
      body: { email: form.email, content: form.content },
    })
    submitted.value = true
    form.email = ''
    form.content = ''
    setTimeout(() => { submitted.value = false }, 3000)
  } catch (e: any) {
    submitError.value = e?.data?.message || '提交失败，请稍后重试'
  } finally {
    submitting.value = false
  }
}
</script>
