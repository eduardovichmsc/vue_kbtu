<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePosts } from '../../stores/posts'
import { useAuth } from '../../stores/auth'
import ErrorMessage from '../../components/common/error-message.vue'

const router = useRouter()
const { createPost, users, fetchUsers } = usePosts()
const { user } = useAuth()

const title = ref('')
const body = ref('')
const selectedUserId = ref(user.value?.id || 1)
const isSubmitting = ref(false)
const error = ref(null)

onMounted(async () => {
  if (users.value.length === 0) {
    try {
      await fetchUsers()
    } catch {}
  }
})

async function handleSubmit() {
  if (!title.value.trim() || !body.value.trim()) return

  isSubmitting.value = true
  error.value = null

  try {
    const payload = {
      title: title.value.trim(),
      body: body.value.trim(),
      userId: Number(selectedUserId.value)
    }

    const created = await createPost(payload)
    router.push({ name: 'post-detail', params: { id: created.id } })
  } catch (err) {
    error.value = err.message || 'Failed to publish article'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <div class="border-b border-stone-300 pb-4 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-stone-900">Write New Article</h1>
        <p class="text-xs font-mono text-stone-500 mt-1">Publish an entry via POST request to the API</p>
      </div>

      <router-link to="/posts" class="font-mono text-xs text-stone-600 hover:text-stone-900 underline">
        Cancel
      </router-link>
    </div>

    <ErrorMessage v-if="error" :message="error" :show-retry="false" />

    <form @submit.prevent="handleSubmit" class="border border-stone-300 bg-white p-6 sm:p-8 space-y-6">
      <div>
        <label class="block font-mono text-xs uppercase font-bold text-stone-800 mb-2">
          Article Title <span class="text-red-600">*</span>
        </label>
        <input
          v-model="title"
          type="text"
          required
          placeholder="e.g. Architecting Distributed Systems with Event Sourcing"
          class="w-full px-3 py-2 text-sm border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
        />
      </div>

      <div>
        <label class="block font-mono text-xs uppercase font-bold text-stone-800 mb-2">
          Author <span class="text-red-600">*</span>
        </label>
        <select
          v-model="selectedUserId"
          class="w-full px-3 py-2 text-sm border border-stone-300 focus:outline-none focus:border-stone-900 bg-white cursor-pointer"
        >
          <option v-for="u in users" :key="u.id" :value="u.id">
            {{ u.name }} (@{{ u.username }})
          </option>
          <option v-if="users.length === 0" :value="1">Default Author (Alex Mercer)</option>
        </select>
      </div>

      <div>
        <label class="block font-mono text-xs uppercase font-bold text-stone-800 mb-2">
          Content / Body <span class="text-red-600">*</span>
        </label>
        <textarea
          v-model="body"
          rows="10"
          required
          placeholder="Write the full content of your article..."
          class="w-full px-3 py-2 text-sm border border-stone-300 focus:outline-none focus:border-stone-900 bg-white font-sans leading-relaxed"
        ></textarea>
      </div>

      <div class="pt-4 border-t border-stone-200 flex items-center justify-between font-mono text-xs">
        <span class="text-stone-500">Method: POST /posts (axios)</span>
        
        <div class="flex items-center gap-3">
          <router-link
            to="/posts"
            class="px-4 py-2 border border-stone-300 bg-white hover:bg-stone-50 text-stone-700"
          >
            Cancel
          </router-link>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-6 py-2 border border-stone-900 bg-stone-900 text-white hover:bg-stone-800 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {{ isSubmitting ? 'Publishing...' : 'Publish Article' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
