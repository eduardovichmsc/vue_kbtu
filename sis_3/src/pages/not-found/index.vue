<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="max-w-xl mx-auto my-16">
    <div class="border border-stone-300 bg-white p-8 sm:p-12 text-center space-y-6">
      <div class="inline-block font-mono text-xs uppercase px-3 py-1 bg-stone-100 border border-stone-300 text-stone-600">
        HTTP 404
      </div>

      <h1 class="text-3xl font-bold tracking-tight text-stone-900">
        Page Not Found
      </h1>

      <p class="text-xs font-mono text-stone-500 max-w-sm mx-auto">
        The requested path <span class="text-stone-900 font-bold">{{ route.fullPath }}</span> does not exist or has been moved.
      </p>

      <div class="pt-4 flex items-center justify-center gap-3 font-mono text-xs">
        <router-link
          to="/"
          class="px-5 py-2.5 border border-stone-900 bg-stone-900 text-white hover:bg-stone-800 transition-colors"
        >
          &larr; Return Home
        </router-link>
        <router-link
          to="/posts"
          class="px-5 py-2.5 border border-stone-300 bg-white hover:border-stone-900 text-stone-800 transition-colors"
        >
          Browse Articles
        </router-link>
      </div>
    </div>
  </div>
</template>
