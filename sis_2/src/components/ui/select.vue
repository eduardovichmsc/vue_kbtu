<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  options: {
    type: Array,
    required: true
  }
})
defineEmits(['update:modelValue'])
</script>

<template>
  <select
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option
      v-for="opt in options"
      :key="typeof opt === 'object' ? opt.value : opt"
      :value="typeof opt === 'object' ? opt.value : opt"
      class="bg-white"
    >
      {{ typeof opt === 'object' ? opt.label : opt }}
    </option>
  </select>
</template>
