<template>
  <footer class="border-t border-stone-300 bg-white mt-auto py-6">
    <div
      class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600"
    >
      <div class="flex items-center gap-6 font-mono text-[11px]">
        <router-link to="/" class="hover:text-stone-900 underline"
          >Home</router-link
        >
        <router-link to="/posts" class="hover:text-stone-900 underline"
          >Articles</router-link
        >
        <router-link to="/posts/new" class="hover:text-stone-900 underline"
          >Write</router-link
        >
        <a
          href="https://jsonplaceholder.typicode.com"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-stone-900 underline"
          >JSONPlaceholder</a
        >
      </div>
    </div>
  </footer>
</template>
