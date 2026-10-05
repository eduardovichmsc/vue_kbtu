<script setup>
import { X } from 'lucide-vue-next'
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['close'])

defineProps({
  title: { type: String, default: 'Modal' }
})

// Lifecycle hooks to handle body scrolling when modal is open
onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
    <div class="bg-white w-full max-w-md rounded-2xl border border-gray-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
      <!-- Header Slot -->
      <div class="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
        <h2 class="text-lg font-semibold text-gray-900">
          <slot name="title">{{ title }}</slot>
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100">
          <X class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Body Slot -->
      <div class="p-5 overflow-y-auto custom-scrollbar">
        <slot name="body"></slot>
      </div>
      
      <!-- Footer Slot -->
      <div class="p-5 border-t border-gray-100 shrink-0">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 4px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #d1d5db;
}
</style>
