<template>
  <div class="min-h-screen bg-white flex flex-col my-20">
    <main class="flex-1 p-6 max-w-4xl mx-auto w-full">
      <div class="flex mb-4">
        <TaskFilters @add="openAdd" />
      </div>

      <div class="bg-white border border-gray-200 rounded p-4">
        <TaskList @edit="openEdit" />
      </div>
    </main>

    <div
      v-if="modalVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div class="bg-white rounded shadow-lg w-full max-w-lg p-6 relative">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ editingTask ? "Edit Task" : "New Task" }}
          </h3>
          <button
            type="button"
            class="text-gray-400 hover:text-gray-600 text-xl font-bold leading-none"
            @click="closeModal"
          >
            &times;
          </button>
        </div>
        <TaskForm :edit-task="editingTask" @close="closeModal" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TaskFilters from "../components/TaskFilters.vue";
import TaskList from "../components/TaskList.vue";
import TaskForm from "../components/TaskForm.vue";

const modalVisible = ref(false);
const editingTask = ref(null);

function openAdd() {
  editingTask.value = null;
  modalVisible.value = true;
}

function openEdit(task) {
  editingTask.value = task;
  modalVisible.value = true;
}

function closeModal() {
  modalVisible.value = false;
  editingTask.value = null;
}
</script>
