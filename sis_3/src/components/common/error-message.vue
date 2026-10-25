<script setup>
defineProps({
  message: {
    type: String,
    default: 'An unexpected error occurred.'
  },
  showRetry: {
    type: Boolean,
    default: true
  }
})

defineEmits(['retry'])
</script>

<template>
  <div class="border border-red-600 bg-red-50 p-6 my-6 text-red-950">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <p class="font-mono text-xs font-bold uppercase tracking-wider text-red-700">Error</p>
        <p class="text-sm mt-1 text-red-900">{{ message }}</p>
      </div>
      <button
        v-if="showRetry"
        type="button"
        @click="$emit('retry')"
        class="self-start sm:self-auto font-mono text-xs uppercase px-4 py-2 border border-red-800 bg-white hover:bg-red-800 hover:text-white transition-colors cursor-pointer"
      >
        Retry Request
      </button>
    </div>
  </div>
</template>
