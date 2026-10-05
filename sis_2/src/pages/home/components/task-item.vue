<script setup>
import { Flag, Trash2, Pencil, CheckCircle2, Circle } from "lucide-vue-next";
import { tasksStore } from "../../../store/index.js";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["editTask"]);

const toggleComplete = () => {
  if (props.task.status === "Done") {
    tasksStore.updateTask(props.task.id, {
      status: "To do",
      statusColor: "bg-gray-100 text-gray-600 border-gray-200",
      statusDot: "bg-gray-500",
    });
  } else {
    tasksStore.updateTask(props.task.id, {
      status: "Done",
      statusColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
      statusDot: "bg-emerald-500",
    });
  }
};
</script>

<template>
  <tr class="hover:bg-gray-50 transition-colors group cursor-pointer">
    <td class="px-6 py-4">
      <div class="flex items-start gap-3">
        <button
          @click.stop="toggleComplete"
          class="text-gray-500 hover:text-emerald-400 transition-colors mt-0.5"
        >
          <CheckCircle2
            v-if="task.status === 'Done'"
            class="w-5 h-5 text-emerald-400"
          />
          <Circle v-else class="w-5 h-5" />
        </button>
        <div class="flex flex-col">
          <span
            class="text-gray-900 font-medium transition-all"
            :class="{ 'line-through text-gray-400': task.status === 'Done' }"
            >{{ task.name }}</span
          >
          <span
            v-if="task.description"
            class="text-xs text-gray-500 mt-1 truncate max-w-[250px]"
            :class="{ 'line-through text-gray-400': task.status === 'Done' }"
            >{{ task.description }}</span
          >
          <span
            v-if="task.creationDate"
            class="text-[10px] text-gray-400 mt-1 font-medium"
            >Created: {{ task.creationDate }}</span
          >
        </div>
      </div>
    </td>
    <td class="px-6 py-4">
      <div class="flex items-center gap-2">
        <div
          class="w-6 h-6 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-[10px] font-bold border border-indigo-500/20"
        >
          {{ task.assigneeInitials }}
        </div>
        <span class="text-gray-700">{{ task.assignee }}</span>
      </div>
    </td>
    <td class="px-6 py-4">
      <div class="flex items-center gap-2 text-gray-700">
        <Flag class="w-4 h-4" :class="task.priorityColor" />
        {{ task.priority }}
      </div>
    </td>
    <td class="px-6 py-4 text-gray-700">{{ task.deadline }}</td>
    <td class="px-6 py-4">
      <div
        class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border text-xs font-medium"
        :class="task.statusColor"
      >
        <div class="w-1.5 h-1.5 rounded-full" :class="task.statusDot"></div>
        {{ task.status }}
      </div>
    </td>
    <td class="px-6 py-4 text-right">
      <div class="flex items-center justify-end gap-1 transition-opacity">
        <button
          @click.stop="emit('editTask', task)"
          class="text-gray-400 hover:text-indigo-600 transition-colors p-1.5 hover:bg-gray-100 rounded-lg"
          title="Edit task"
        >
          <Pencil class="w-4 h-4" />
        </button>
        <button
          @click.stop="tasksStore.deleteTask(task.id)"
          class="text-gray-400 hover:text-red-600 transition-colors p-1.5 hover:bg-gray-100 rounded-lg"
          title="Delete task"
        >
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </td>
  </tr>
</template>
