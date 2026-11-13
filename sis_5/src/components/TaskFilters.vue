<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap">
    <a-input-search
      v-model:value="searchValue"
      placeholder="Search tasks..."
      style="width: 240px"
      @search="store.setFilter('search', searchValue)"
      @change="store.setFilter('search', searchValue)"
      allowClear
    />

    <a-select
      :value="store.filter.status"
      :options="statusOptions"
      style="width: 160px"
      @change="(val) => store.setFilter('status', val)"
    />

    <a-select
      :value="store.filter.priority"
      :options="priorityOptions"
      style="width: 160px"
      @change="(val) => store.setFilter('priority', val)"
    />

    <a-button @click="onClear">Clear Filters</a-button>

    <a-button @click="$emit('add')">Add Task</a-button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useTasksStore } from "../stores/tasks";
import { useTaskFilters } from "../composables/useTaskFilters";

defineEmits(["add"]);

const store = useTasksStore();
const { statusOptions, priorityOptions } = useTaskFilters();

const searchValue = ref(store.filter.search);

watch(
  () => store.filter.search,
  (val) => {
    searchValue.value = val;
  },
);

function onClear() {
  searchValue.value = "";
  store.clearFilters();
}
</script>
