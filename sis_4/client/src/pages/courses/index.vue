<script setup>
import { ref, onMounted, computed } from "vue";
import { studentService } from "@/api/studentService";
import { SearchOutlined } from "@ant-design/icons-vue";

const courses = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref("");
const selectedCourse = ref(null);
const isModalVisible = ref(false);

const columns = [
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    width: 110,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Instructor",
    dataIndex: "instructor",
    key: "instructor",
  },
  {
    title: "Credits",
    dataIndex: "credits",
    key: "credits",
    width: 90,
  },
  {
    title: "Schedule",
    dataIndex: "schedule",
    key: "schedule",
  },
  {
    title: "Grade",
    key: "grade",
    width: 140,
  },
  {
    title: "Attendance",
    dataIndex: "attendance",
    key: "attendance",
    width: 130,
  },
  {
    title: "Action",
    key: "action",
    width: 110,
  },
];

const fetchCourses = async () => {
  loading.value = true;
  error.value = null;
  try {
    courses.value = await studentService.getCourses();
  } catch (err) {
    error.value = err.message || "error courses";
  } finally {
    loading.value = false;
  }
};

const filteredCourses = computed(() => {
  if (!searchQuery.value) return courses.value;
  const q = searchQuery.value.toLowerCase().trim();
  return courses.value.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.instructor.toLowerCase().includes(q),
  );
});

const openModal = (course) => {
  selectedCourse.value = course;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
  selectedCourse.value = null;
};

onMounted(() => {
  fetchCourses(false);
});
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-xl font-bold text-gray-900">My courses</h1>

    <div v-if="error">
      <a-alert
        type="error"
        show-icon
        message="Ошибка загрузки данных"
        :description="error"
      >
        <template #action>
          <a-button size="small" type="primary" @click="fetchCourses(false)">
            Повторить попытку
          </a-button>
        </template>
      </a-alert>
    </div>

    <div class="mb-4 max-w-md">
      <a-input
        v-model:value="searchQuery"
        placeholder="Search by course title, code and instructor"
        allow-clear
      >
        <template #prefix>
          <SearchOutlined class="text-gray-400" />
        </template>
      </a-input>
    </div>

    <a-table
      :columns="columns"
      :data-source="filteredCourses"
      :row-key="(record) => record.id"
      :loading="loading"
      :pagination="false"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'code'">
          <span
            class="font-mono font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-xs"
          >
            {{ record.code }}
          </span>
        </template>

        <template v-else-if="column.key === 'title'">
          <div class="font-medium">{{ record.title }}</div>
          <div class="text-xs text-gray-500">{{ record.room }}</div>
        </template>

        <template v-else-if="column.key === 'grade'">
          <div class="flex items-center gap-1.5">
            <span class="font-semibold">{{ record.currentGrade }}%</span>
          </div>
        </template>

        <template v-else-if="column.key === 'attendance'">
          <div class="flex items-center gap-1">
            <span class="text-sm font-medium">{{ record.attendance }}%</span>
          </div>
        </template>

        <template v-else-if="column.key === 'action'">
          <a-button size="small" type="link" @click="openModal(record)">
            Open
          </a-button>
        </template>
      </template>
    </a-table>

    <a-modal
      v-model:open="isModalVisible"
      :title="selectedCourse?.title"
      :footer="null"
      @cancel="closeModal"
    >
      <div v-if="selectedCourse" class="space-y-4 py-2">
        <a-descriptions bordered size="small" :column="1">
          <a-descriptions-item label="Code">
            <span class="font-mono font-bold">{{ selectedCourse.code }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="Instructor">
            {{ selectedCourse.instructor }}
          </a-descriptions-item>
          <a-descriptions-item label="Total Credits">
            {{ selectedCourse.credits }} ECTS
          </a-descriptions-item>
          <a-descriptions-item label="Schedule">
            {{ selectedCourse.schedule }}
          </a-descriptions-item>
          <a-descriptions-item label="Auditoriumm">
            {{ selectedCourse.room }}
          </a-descriptions-item>
          <a-descriptions-item label="Current Grade">
            {{ selectedCourse.currentGrade }}%
          </a-descriptions-item>
          <a-descriptions-item label="Attendance">
            {{ selectedCourse.attendance }}%
          </a-descriptions-item>
        </a-descriptions>

        <div class="mt-4 text-right">
          <a-button @click="closeModal">Close</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>
