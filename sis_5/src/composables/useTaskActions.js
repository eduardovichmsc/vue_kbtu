import { useTasksStore } from '../stores/tasks'
import { message } from 'ant-design-vue'

export function useTaskActions() {
  const store = useTasksStore()

  function handleAddTask(formData) {
    if (!formData.title || !formData.title.trim()) {
      message.error('Title is required')
      return false
    }
    store.addTask(formData)
    message.success('Task added')
    return true
  }

  function handleUpdateTask(id, updates) {
    if (!updates.title || !updates.title.trim()) {
      message.error('Title is required')
      return false
    }
    store.updateTask(id, updates)
    message.success('Task updated')
    return true
  }

  function handleDeleteTask(id) {
    store.deleteTask(id)
    message.success('Task deleted')
  }

  function handleToggleStatus(id) {
    store.toggleTaskStatus(id)
  }

  return {
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    handleToggleStatus
  }
}

