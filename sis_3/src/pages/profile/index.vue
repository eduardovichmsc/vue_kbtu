<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../stores/auth'
import { usePosts } from '../../stores/posts'

const router = useRouter()
const { user, logout } = useAuth()
const { posts } = usePosts()

const myArticles = computed(() => {
  return posts.value.filter(p => Number(p.userId) === Number(user.value?.id || 1))
})

function handleLogout() {
  logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <div class="border-b border-stone-300 pb-4 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-stone-900">Author Profile</h1>
        <p class="text-xs font-mono text-stone-500 mt-1">Authenticated user session & authored articles</p>
      </div>

      <button
        type="button"
        @click="handleLogout"
        class="font-mono text-xs uppercase px-3 py-1.5 border border-stone-900 bg-white hover:bg-stone-900 hover:text-white transition-colors cursor-pointer"
      >
        Sign Out
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="border border-stone-300 bg-white p-6 space-y-4">
        <div class="font-mono text-xs uppercase font-bold text-stone-600 border-b border-stone-200 pb-2">
          User Account
        </div>

        <div class="space-y-3 text-xs">
          <div>
            <div class="font-mono text-stone-500">Name</div>
            <div class="font-bold text-stone-900 text-sm">{{ user?.name }}</div>
          </div>
          <div>
            <div class="font-mono text-stone-500">Username</div>
            <div class="font-mono text-stone-800">@{{ user?.username }}</div>
          </div>
          <div>
            <div class="font-mono text-stone-500">Email</div>
            <div class="text-stone-800">{{ user?.email }}</div>
          </div>
          <div>
            <div class="font-mono text-stone-500">Session Token</div>
            <div class="font-mono text-[11px] text-stone-600 truncate bg-stone-100 p-1 border border-stone-200">
              {{ user?.token }}
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-stone-200">
          <router-link
            to="/posts/new"
            class="block w-full text-center py-2 font-mono uppercase tracking-wider text-xs border border-stone-900 bg-stone-900 text-white hover:bg-stone-800 transition-colors"
          >
            + Write Article
          </router-link>
        </div>
      </div>

      <div class="md:col-span-2 border border-stone-300 bg-white p-6 space-y-4">
        <div class="flex items-center justify-between border-b border-stone-200 pb-2">
          <div class="font-mono text-xs uppercase font-bold text-stone-600">
            Authored Articles ({{ myArticles.length }})
          </div>
          <router-link to="/posts/new" class="font-mono text-xs text-stone-900 underline">
            + New
          </router-link>
        </div>

        <div v-if="myArticles.length === 0" class="text-xs text-stone-500 font-mono py-8 text-center">
          You haven't published any articles yet.
          <router-link to="/posts/new" class="text-stone-900 underline block mt-2">
            Write your first post &rarr;
          </router-link>
        </div>

        <div v-else class="divide-y divide-stone-200">
          <div
            v-for="article in myArticles"
            :key="article.id"
            class="py-3 flex items-center justify-between gap-4 text-xs"
          >
            <div class="space-y-1">
              <div class="font-mono text-[11px] text-stone-500">#{{ article.id }}</div>
              <router-link :to="`/posts/${article.id}`" class="font-bold text-stone-900 hover:underline capitalize">
                {{ article.title }}
              </router-link>
            </div>
            <div class="flex items-center gap-2 font-mono">
              <router-link
                :to="`/posts/${article.id}/edit`"
                class="px-2 py-1 border border-stone-300 hover:border-stone-900"
              >
                Edit
              </router-link>
              <router-link
                :to="`/posts/${article.id}`"
                class="px-2 py-1 border border-stone-900 bg-stone-900 text-white"
              >
                View
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
