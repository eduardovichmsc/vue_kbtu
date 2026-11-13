<template>
  <a-form
    :model="formState"
    :rules="rules"
    ref="formRef"
    layout="vertical"
    @finish="onFinish"
  >
    <a-form-item label="Title" name="title">
      <a-input v-model:value="formState.title" placeholder="Task title" />
    </a-form-item>

    <a-form-item label="Description" name="description">
      <a-textarea
        v-model:value="formState.description"
        placeholder="Task description"
        :rows="3"
      />
    </a-form-item>

    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item label="Priority" name="priority">
          <a-select v-model:value="formState.priority" :options="formPriorityOptions" style="width: 100%" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="Status" name="status">
          <a-select v-model:value="formState.status" :options="formStatusOptions" style="width: 100%" />
        </a-form-item>
      </a-col>
    </a-row>

    <a-form-item>
      <a-space>
        <a-button type="primary" html-type="submit">
          {{ isEditing ? 'Update' : 'Add Task' }}
        </a-button>
        <a-button @click="$emit('close')">Cancel</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useTaskActions } from '../composables/useTaskActions'
import { useTaskFilters } from '../composables/useTaskFilters'

const props = defineProps({
  editTask: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const { handleAddTask, handleUpdateTask } = useTaskActions()
const { formStatusOptions, formPriorityOptions } = useTaskFilters()

const formRef = ref(null)
const isEditing = ref(false)

const defaultForm = () => ({
  title: '',
  description: '',
  priority: 'medium',
  status: 'pending'
})

const formState = ref(defaultForm())

const rules = {
  title: [{ required: true, message: 'Please enter a title', trigger: 'blur' }]
}

watch(() => props.editTask, (task) => {
  if (task) {
    isEditing.value = true
    formState.value = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status
    }
  } else {
    isEditing.value = false
    formState.value = defaultForm()
  }
}, { immediate: true })

function onFinish() {
  let success
  if (isEditing.value) {
    success = handleUpdateTask(props.editTask.id, { ...formState.value })
  } else {
    success = handleAddTask({ ...formState.value })
  }
  if (success) {
    formState.value = defaultForm()
    formRef.value?.resetFields()
    emit('close')
  }
}
</script>

