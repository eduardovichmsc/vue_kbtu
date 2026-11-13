import { ref } from 'vue'

export function useTaskFilters() {
  const statusOptions = ref([
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ])

  const priorityOptions = ref([
    { value: 'all', label: 'All Priorities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ])

  const formStatusOptions = ref([
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ])

  const formPriorityOptions = ref([
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ])

  return {
    statusOptions,
    priorityOptions,
    formStatusOptions,
    formPriorityOptions
  }
}

