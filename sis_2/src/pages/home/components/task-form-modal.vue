<script setup>
import { ref, onMounted } from "vue";
import { tasksStore } from "../../../store/index.js";
import dbData from "../../../data/db.json";

const props = defineProps({
  taskToEdit: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close"]);

const priorityOptions = ["Low", "High"];
const statusOptions = ["To do", "Done"];

const taskForm = ref({
  name: "",
  description: "",
  priority: "Low",
  status: "To do",
  deadline: "",
});

onMounted(() => {
  if (props.taskToEdit) {
    taskForm.value = {
      name: props.taskToEdit.name,
      description: props.taskToEdit.description || "",
      priority: props.taskToEdit.priority,
      status: props.taskToEdit.status,
      deadline:
        props.taskToEdit.deadline === "No set date"
          ? ""
          : props.taskToEdit.deadline,
    };
  }
});

const submitTask = () => {
  if (!taskForm.value.name) return;

  const taskData = {
    name: taskForm.value.name,
    description: taskForm.value.description,
    priority: taskForm.value.priority,
    status: taskForm.value.status,
    deadline: taskForm.value.deadline || "No set date",
  };

  if (taskData.priority === "High") taskData.priorityColor = "text-orange-500";
  else taskData.priorityColor = "text-gray-500";

  if (taskData.status === "Done") {
    taskData.statusColor =
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    taskData.statusDot = "bg-emerald-400";
  } else {
    taskData.statusColor = "bg-gray-500/10 text-gray-400 border-gray-500/20";
    taskData.statusDot = "bg-gray-400";
  }

  if (props.taskToEdit) {
    tasksStore.updateTask(props.taskToEdit.id, taskData);
  } else {
    taskData.creationDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    taskData.assignee = dbData.currentUser.name;
    taskData.assigneeInitials = dbData.currentUser.initials;
    tasksStore.addTask(taskData);
  }

  emit("close");
};
</script>

<template>
  <Modal
    :title="taskToEdit ? 'Edit task' : 'Create new task'"
    @close="$emit('close')"
  >
    <template #body>
      <form
        id="task-form"
        @submit.prevent="submitTask"
        class="flex flex-col gap-5"
      >
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1.5"
            >Task Name</label
          >
          <input
            v-model="taskForm.name"
            type="text"
            placeholder="e.g. Design homepage"
            class="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors shadow-sm"
            required
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1.5"
            >Description</label
          >
          <textarea
            v-model="taskForm.description"
            rows="3"
            placeholder="Optional details..."
            class="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none shadow-sm"
          ></textarea>
        </div>

        <!-- Dropdowns -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1.5"
              >Priority</label
            >
            <div class="relative">
              <Select
                v-model="taskForm.priority"
                :options="priorityOptions"
                class="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors appearance-none cursor-pointer shadow-sm"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1.5"
              >Status</label
            >
            <div class="relative">
              <Select
                v-model="taskForm.status"
                :options="statusOptions"
                class="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors appearance-none cursor-pointer shadow-sm"
              />
            </div>
          </div>
        </div>

        <!-- Deadline -->
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1.5"
            >Deadline</label
          >
          <input
            v-model="taskForm.deadline"
            type="text"
            placeholder="e.g. Aug 15, 2026"
            class="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors shadow-sm"
          />
        </div>
      </form>
    </template>

    <template #footer>
      <div class="flex justify-end gap-3">
        <button
          type="button"
          @click="$emit('close')"
          class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          form="task-form"
          type="submit"
          class="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow-md active:scale-95"
        >
          {{ taskToEdit ? "Save Changes" : "Create Task" }}
        </button>
      </div>
    </template>
  </Modal>
</template>
