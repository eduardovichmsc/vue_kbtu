import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([
    {
      id: 1,
      title: 'Example task',
      description: 'This is a sample task to get you started.',
      priority: 'medium',
      status: 'pending',
      createdAt: new Date().toISOString()
    }
  ])

  const filter = ref({
    status: 'all',
    priority: 'all',
    search: ''
  })

  const filteredTasks = computed(() => {
    return tasks.value.filter(task => {
      const matchesStatus = filter.value.status === 'all' || task.status === filter.value.status
      const matchesPriority = filter.value.priority === 'all' || task.priority === filter.value.priority
      const matchesSearch = !filter.value.search ||
        task.title.toLowerCase().includes(filter.value.search.toLowerCase()) ||
        task.description.toLowerCase().includes(filter.value.search.toLowerCase())
      return matchesStatus && matchesPriority && matchesSearch
    })
  })

  const taskStats = computed(() => ({
    total: tasks.value.length,
    pending: tasks.value.filter(t => t.status === 'pending').length,
    inProgress: tasks.value.filter(t => t.status === 'in-progress').length,
    completed: tasks.value.filter(t => t.status === 'completed').length
  }))

  function addTask(taskData) {
    tasks.value.push({
      id: Date.now(),
      title: taskData.title,
      description: taskData.description || '',
      priority: taskData.priority || 'medium',
      status: taskData.status || 'pending',
      createdAt: new Date().toISOString()
    })
  }

  function updateTask(id, updates) {
    const index = tasks.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updates }
    }
  }

  function deleteTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  function toggleTaskStatus(id) {
    const task = tasks.value.find(t => t.id === id)
    if (!task) return
    const cycle = { pending: 'in-progress', 'in-progress': 'completed', completed: 'pending' }
    task.status = cycle[task.status]
  }

  function setFilter(key, value) {
    filter.value[key] = value
  }

  function clearFilters() {
    filter.value = { status: 'all', priority: 'all', search: '' }
  }

  return {
    tasks,
    filter,
    filteredTasks,
    taskStats,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    setFilter,
    clearFilters
  }
})

