<script setup>
import { UserPlus, MoreHorizontal, Search } from "lucide-vue-next";
import { spacesStore, tasksStore } from "../../../store/index.js";

const emit = defineEmits(["openCreateModal"]);

const statusOptions = [
  { value: "All", label: "All Statuses" },
  { value: "To do", label: "To do" },
  { value: "Done", label: "Done" },
];

const priorityOptions = [
  { value: "All", label: "All Priorities" },
  { value: "Low", label: "Low" },
  { value: "High", label: "High" },
];
</script>

<template>
  <div class="my-2 shrink-0">
    <div class="flex items-center justify-between gap-4 mb-4">
      <div class="flex items-center gap-4">
        <h1 class="text-3xl font-bold text-gray-900 tracking-tight">
          {{ spacesStore.activeSpace.name }}
        </h1>
        <!-- <div class="flex items-center gap-1 text-gray-400">
          <button
            class="p-1.5 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <UserPlus class="w-4 h-4" />
          </button>
          <button
            class="p-1.5 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <MoreHorizontal class="w-4 h-4" />
          </button>
        </div> -->
      </div>

      <div class="flex items-center">
        <div class="flex items-center gap-2">
          <!-- Search -->
          <div class="relative">
            <Search
              class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              v-model="tasksStore.searchQuery"
              type="text"
              placeholder="Search tasks..."
              class="bg-white border border-gray-200 shadow-sm rounded-lg pl-9 pr-4 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors w-64"
            />
          </div>

          <!-- Status Filter -->
          <Select
            v-model="tasksStore.statusFilter"
            :options="statusOptions"
            class="bg-white hover:bg-gray-50 shadow-sm border border-gray-200 rounded-lg text-sm text-gray-700 transition-colors px-3 py-1.5 focus:outline-none appearance-none cursor-pointer outline-none text-left"
          />

          <!-- Priority Filter -->
          <Select
            v-model="tasksStore.priorityFilter"
            :options="priorityOptions"
            class="bg-white hover:bg-gray-50 shadow-sm border border-gray-200 rounded-lg text-sm text-gray-700 transition-colors px-3 py-1.5 focus:outline-none appearance-none cursor-pointer outline-none text-left"
          />
        </div>

        <button
          @click="$emit('openCreateModal')"
          class="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-all shadow-md active:scale-95 ml-2"
        >
          Create Task
        </button>
      </div>
    </div>
  </div>
</template>
