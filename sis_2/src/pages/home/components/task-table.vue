<script setup>
import { tasksStore } from "../../../store/index.js";
import TaskItem from "./task-item.vue";

const emit = defineEmits(["editTask"]);
</script>

<template>
  <div
    class="flex-1 overflow-auto bg-white border border-gray-200 shadow-sm rounded-xl"
  >
    <table class="w-full text-left text-sm whitespace-nowrap">
      <thead class="text-gray-500 border-b border-gray-200 bg-gray-50">
        <tr>
          <th class="px-6 py-4 font-medium">Name</th>
          <th class="px-6 py-4 font-medium">Assignee</th>
          <th class="px-6 py-4 font-medium">Priority</th>
          <th class="px-6 py-4 font-medium">Deadline</th>
          <th class="px-6 py-4 font-medium">Status</th>
          <th class="px-6 py-4 font-medium text-right">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <task-item 
          v-for="task in tasksStore.activeTasks" 
          :key="task.id" 
          :task="task" 
          @edit-task="emit('editTask', $event)" 
        />
      </tbody>
    </table>
  </div>
</template>
