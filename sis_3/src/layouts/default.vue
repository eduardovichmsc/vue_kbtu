<script setup>
import AppHeader from '../components/layout/header.vue'
import AppFooter from '../components/layout/footer.vue'
</script>

<template>
  <div class="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans">
    <app-header />

    <main class="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
      <slot />
    </main>
    
    <app-footer />
  </div>
</template>
