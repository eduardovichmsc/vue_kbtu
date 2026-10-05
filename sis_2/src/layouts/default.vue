<script setup>
import AppSidebar from "../components/layout/sidebar.vue";
</script>

<template>
  <div class="flex h-screen bg-gray-50 text-gray-900 overflow-hidden font-sans">
    <!-- <app-sidebar /> -->

    <div class="flex-1 flex flex-col min-w-0">
      <main class="grow overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
