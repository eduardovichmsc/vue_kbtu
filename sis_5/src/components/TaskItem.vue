<template>
  <div style="padding: 12px 0; border-bottom: 1px solid #f0f0f0">
    <a-row align="middle" :gutter="16">
      <a-col :flex="1">
        <div
          style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap"
        >
          <span style="font-weight: 500">{{ task.title }}</span>
          <a-tag :color="priorityColor">{{ task.priority }}</a-tag>
          <a-tag :color="statusColor">{{ statusLabel }}</a-tag>
        </div>
        <div
          v-if="task.description"
          style="color: #8c8c8c; font-size: 13px; margin-top: 2px"
        >
          {{ task.description }}
        </div>
      </a-col>

      <a-col>
        <a-space>
          <a-tooltip :title="toggleLabel">
            <a-button size="small" @click="handleToggleStatus(task.id)">
              <template #icon>
                <check-outlined v-if="task.status === 'completed'" />
                <caret-right-outlined v-else-if="task.status === 'pending'" />
                <check-circle-outlined v-else />
              </template>
            </a-button>
          </a-tooltip>

          <a-tooltip title="Edit">
            <a-button size="small" @click="$emit('edit', task)">
              <template #icon><edit-outlined /></template>
            </a-button>
          </a-tooltip>

          <a-popconfirm
            title="Delete this task?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="handleDeleteTask(task.id)"
          >
            <a-tooltip title="Delete">
              <a-button size="small" danger>
                <template #icon><delete-outlined /></template>
              </a-button>
            </a-tooltip>
          </a-popconfirm>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { computed } from "vue";
import {
  CheckOutlined,
  CaretRightOutlined,
  CheckCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { useTaskActions } from "../composables/useTaskActions";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

defineEmits(["edit"]);

const { handleToggleStatus, handleDeleteTask } = useTaskActions();

const priorityColor = computed(
  () =>
    ({
      low: "default",
      medium: "blue",
      high: "red",
    })[props.task.priority],
);

const statusColor = computed(
  () =>
    ({
      pending: "default",
      "in-progress": "processing",
      completed: "success",
    })[props.task.status],
);

const statusLabel = computed(
  () =>
    ({
      pending: "Pending",
      "in-progress": "In Progress",
      completed: "Completed",
    })[props.task.status],
);

const toggleLabel = computed(
  () =>
    ({
      pending: "Start task",
      "in-progress": "Mark as done",
      completed: "Reset to pending",
    })[props.task.status],
);
</script>
