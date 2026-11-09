<script setup>
import AppHeader from "../components/layout/header.vue";
import AppFooter from "../components/layout/footer.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col text-gray-800">
    <app-header />

    <main class="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
      <slot />
    </main>

    <app-footer />
  </div>
</template>
