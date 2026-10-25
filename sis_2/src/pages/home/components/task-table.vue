<script setup>
import { tasksStore } from "../../../store/index.js";
import TaskItem from "./task-item.vue";

const emit = defineEmits(["editTask"]);
</script>

<template>
  <div class="flex-1 overflow-auto bg-white border border-gray-200 rounded-xl">
    <table class="w-full text-left text-sm whitespace-nowrap">
      <thead class="text-black border-b border-gray-200">
        <tr class="">
          <th class="px-6 py-4 font-balance">Name</th>
          <!-- <th class="px-6 py-4 font-balance">Assignee</th> -->
          <th class="px-6 py-4 font-balance">Priority</th>
          <th class="px-6 py-4 font-balance">Deadline</th>
          <th class="px-6 py-4 font-balance">Status</th>
          <th class="px-6 py-4 font-balance text-right">Actions</th>
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
