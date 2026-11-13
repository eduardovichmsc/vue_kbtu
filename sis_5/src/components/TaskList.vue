<template>
  <div>
    <a-row :gutter="16" style="margin-bottom: 16px">
      <a-col :span="6">
        <a-statistic title="Total" :value="store.taskStats.total" />
      </a-col>
      <a-col :span="6">
        <a-statistic title="Pending" :value="store.taskStats.pending" />
      </a-col>
      <a-col :span="6">
        <a-statistic title="In Progress" :value="store.taskStats.inProgress" />
      </a-col>
      <a-col :span="6">
        <a-statistic title="Completed" :value="store.taskStats.completed" />
      </a-col>
    </a-row>

    <div v-if="store.filteredTasks.length === 0">
      <a-empty description="No tasks found" />
    </div>

    <div v-else>
      <TaskItem
        v-for="task in store.filteredTasks"
        :key="task.id"
        :task="task"
        @edit="$emit('edit', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { useTasksStore } from '../stores/tasks'
import TaskItem from './TaskItem.vue'

defineEmits(['edit'])

const store = useTasksStore()
</script>

