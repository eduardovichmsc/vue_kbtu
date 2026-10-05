<script setup>
import { ref } from "vue";
import HomeHeader from "./components/task-header.vue";
import TaskTable from "./components/task-table.vue";
import TaskFormModal from "./components/task-form-modal.vue";
import TaskStats from "./components/task-stats.vue";

const isModalOpen = ref(false);
const taskToEdit = ref(null);

const openCreateModal = () => {
  taskToEdit.value = null;
  isModalOpen.value = true;
};

const openEditModal = (task) => {
  taskToEdit.value = task;
  isModalOpen.value = true;
};
</script>

<template>
  <div class="h-full flex flex-col mx-auto w-full relative">
    <home-header @open-create-modal="openCreateModal" />
    <task-stats />
    <task-table @edit-task="openEditModal" />
    
    <task-form-modal 
      v-if="isModalOpen" 
      :task-to-edit="taskToEdit"
      @close="isModalOpen = false" 
    />
  </div>
</template>
