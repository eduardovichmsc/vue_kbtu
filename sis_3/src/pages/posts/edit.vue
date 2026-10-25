<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePosts } from '../../stores/posts'
import LoadingSpinner from '../../components/common/loading-spinner.vue'
import ErrorMessage from '../../components/common/error-message.vue'

const route = useRoute()
const router = useRouter()
const { fetchPostById, updatePost } = usePosts()

const title = ref('')
const body = ref('')
const initialLoading = ref(true)
const isSubmitting = ref(false)
const error = ref(null)

onMounted(async () => {
  try {
    const post = await fetchPostById(route.params.id)
    title.value = post.title || ''
    body.value = post.body || ''
  } catch (err) {
    error.value = err.message || 'Failed to load article for editing'
  } finally {
    initialLoading.value = false
  }
})

async function handleUpdate() {
  if (!title.value.trim() || !body.value.trim()) return

  isSubmitting.value = true
  error.value = null

  try {
    await updatePost(route.params.id, {
      title: title.value.trim(),
      body: body.value.trim()
    })
    router.push({ name: 'post-detail', params: { id: route.params.id } })
  } catch (err) {
    error.value = err.message || 'Failed to update article'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <div class="border-b border-stone-300 pb-4 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-stone-900">Edit Article #{{ route.params.id }}</h1>
        <p class="text-xs font-mono text-stone-500 mt-1">Update article via PUT request to the API</p>
      </div>

      <router-link
        :to="`/posts/${route.params.id}`"
        class="font-mono text-xs text-stone-600 hover:text-stone-900 underline"
      >
        Cancel
      </router-link>
    </div>

    <LoadingSpinner v-if="initialLoading" text="Loading article for editing..." />
    <ErrorMessage v-else-if="error && !title" :message="error" :show-retry="false" />

    <form v-else @submit.prevent="handleUpdate" class="border border-stone-300 bg-white p-6 sm:p-8 space-y-6">
      <ErrorMessage v-if="error" :message="error" :show-retry="false" />

      <div>
        <label class="block font-mono text-xs uppercase font-bold text-stone-800 mb-2">
          Article Title <span class="text-red-600">*</span>
        </label>
        <input
          v-model="title"
          type="text"
          required
          class="w-full px-3 py-2 text-sm border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
        />
      </div>

      <div>
        <label class="block font-mono text-xs uppercase font-bold text-stone-800 mb-2">
          Content / Body <span class="text-red-600">*</span>
        </label>
        <textarea
          v-model="body"
          rows="10"
          required
          class="w-full px-3 py-2 text-sm border border-stone-300 focus:outline-none focus:border-stone-900 bg-white font-sans leading-relaxed"
        ></textarea>
      </div>

      <div class="pt-4 border-t border-stone-200 flex items-center justify-between font-mono text-xs">
        <span class="text-stone-500">Method: PUT /posts/{{ route.params.id }} (axios)</span>

        <div class="flex items-center gap-3">
          <router-link
            :to="`/posts/${route.params.id}`"
            class="px-4 py-2 border border-stone-300 bg-white hover:bg-stone-50 text-stone-700"
          >
            Cancel
          </router-link>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-6 py-2 border border-stone-900 bg-stone-900 text-white hover:bg-stone-800 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {{ isSubmitting ? 'Saving changes...' : 'Save Changes' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
