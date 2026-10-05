<script setup>
import { tasksStore } from "../../../store/index.js";
</script>

<template>
  <div class="flex justify-end gap-4 mb-4 shrink-0">
    <!-- Total -->
    <div
      class="h-24 w-1/10 bg-white shadow-sm border border-gray-200 rounded-xl p-4"
    >
      <p class="text-sm text-gray-500 font-medium">Total Tasks</p>
      <p class="text-3xl font-bold text-gray-900 mt-1">
        {{ tasksStore.stats.total }}
      </p>
    </div>

    <!-- Active -->
    <div
      class="h-24 w-1/10 bg-white shadow-sm border border-gray-200 rounded-xl p-4"
    >
      <p class="text-sm text-gray-500 font-medium">Active Tasks</p>
      <p class="text-3xl font-bold text-gray-900 mt-1">
        {{ tasksStore.stats.active }}
      </p>
    </div>

    <!-- Completed -->
    <div
      class="h-24 w-1/10 bg-white shadow-sm border border-gray-200 rounded-xl p-4"
    >
      <p class="text-sm text-gray-500 font-medium">Completed Tasks</p>
      <p class="text-3xl font-bold text-gray-900 mt-1">
        {{ tasksStore.stats.completed }}
      </p>
    </div>
  </div>
</template>
