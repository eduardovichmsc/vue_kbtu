import { reactive, watch } from "vue";
import dbData from "../data/db.json";
import { spacesStore } from "./spaces.js";

const savedTasks = localStorage.getItem("tasks");
let initialTasks = savedTasks ? JSON.parse(savedTasks) : dbData.tasks;

// initialTasks = initialTasks.map(t => ({
//   ...t,
//   description: t.description || 'No description provided',
//   creationDate: t.creationDate || 'Sep 25, 2026'
// }))

export const tasksStore = reactive({
  tasks: initialTasks,
  searchQuery: "",
  statusFilter: "All",
  priorityFilter: "All",

  get spaceTasks() {
    return this.tasks.filter((t) => t.spaceId === spacesStore.activeSpaceId);
  },

  get activeTasks() {
    return this.spaceTasks.filter((t) => {
      if (
        this.searchQuery &&
        !t.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
        return false;
      if (this.statusFilter !== "All" && t.status !== this.statusFilter)
        return false;
      if (this.priorityFilter !== "All" && t.priority !== this.priorityFilter)
        return false;
      return true;
    });
  },

  get stats() {
    const total = this.spaceTasks.length;
    const completed = this.spaceTasks.filter((t) => t.status === "Done").length;
    const active = total - completed;
    return { total, active, completed };
  },

  getTaskCountForSpace(spaceId) {
    return this.tasks.filter((t) => t.spaceId === spaceId).length;
  },

  addTask(task) {
    this.tasks.push({
      id: Date.now(),
      spaceId: spacesStore.activeSpaceId,
      ...task,
    });
  },

  updateTask(id, updatedFields) {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updatedFields };
    }
  },

  deleteTask(id) {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  },
});

watch(
  () => tasksStore.tasks,
  (newTasks) => {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  },
  { deep: true },
);
