<script setup>
defineProps({
  text: {
    type: String,
    default: 'Loading data...'
  }
})
</script>

<template>
  <div class="border border-stone-300 bg-white p-8 text-center my-6">
    <div class="inline-flex items-center gap-3 font-mono text-xs text-stone-600 uppercase tracking-widest">
      <span class="inline-block w-2.5 h-2.5 bg-stone-900 animate-ping"></span>
      <span>{{ text }}</span>
    </div>
  </div>
</template>
