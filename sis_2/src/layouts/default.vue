<script setup>
import AppHeader from '../components/layout/header.vue'
import AppFooter from '../components/layout/footer.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <app-header />

    <main class="flex-grow max-w-7xl mx-auto w-full p-6">
      <slot />
    </main>
    
    <app-footer />
  </div>
</template>
