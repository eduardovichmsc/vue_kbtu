<script setup>
import { ref, onMounted, computed } from "vue";
import { studentService } from "@/api/studentService";
import { SearchOutlined } from "@ant-design/icons-vue";

const STUDENTS_PER_PAGE = 4;

const students = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref("");
const selectedStudent = ref(null);
const isDrawerVisible = ref(false);

const columns = [
  {
    title: "Student ID",
    dataIndex: "studentId",
    key: "studentId",
    width: 130,
  },
  {
    title: "Full Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Group",
    dataIndex: "group",
    key: "group",
    width: 110,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
    width: 140,
  },
  {
    title: "GPA",
    dataIndex: "gpa",
    key: "gpa",
    width: 90,
  },
  {
    title: "Status",
    key: "status",
    width: 120,
  },
  {
    title: "Action",
    key: "action",
    width: 90,
  },
];

const fetchStudents = async () => {
  loading.value = true;
  error.value = null;
  try {
    students.value = await studentService.getStudents();
  } catch (err) {
    error.value = err.message || "error students";
  } finally {
    loading.value = false;
  }
};

const filteredStudents = computed(() => {
  if (!searchQuery.value) return students.value;
  const q = searchQuery.value.toLowerCase().trim();
  return students.value.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.studentId.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q),
  );
});

const viewStudent = (student) => {
  selectedStudent.value = student;
  isDrawerVisible.value = true;
};

const closeDrawer = () => {
  isDrawerVisible.value = false;
  selectedStudent.value = null;
};

onMounted(() => {
  fetchStudents();
});
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-xl font-bold text-gray-900">
      Classmates and course students
    </h1>

    <div v-if="error">
      <a-alert
        type="error"
        show-icon
        message="Ошибка запроса к REST API"
        :description="error"
      >
        <template #action>
          <a-button size="small" type="primary" @click="fetchStudents(false)">
            Retry
          </a-button>
        </template>
      </a-alert>
    </div>

    <div class="mb-4 max-w-md">
      <a-input
        v-model:value="searchQuery"
        placeholder="Search by name, email and other"
        allow-clear
      >
        <template #prefix>
          <SearchOutlined class="text-gray-400" />
        </template>
      </a-input>
    </div>

    <a-table
      :columns="columns"
      :data-source="filteredStudents"
      :row-key="(record) => record.id"
      :loading="loading"
      :pagination="{
        pageSize: STUDENTS_PER_PAGE,
        showTotal: (total) => `Total students: ${total}`,
      }"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'studentId'">
          <span class="">
            {{ record.studentId }}
          </span>
        </template>

        <template v-else-if="column.key === 'name'">
          <div class="font-medium">{{ record.name }}</div>
        </template>

        <template v-else-if="column.key === 'gpa'">
          <span class="">{{ record.gpa }}</span>
        </template>

        <template v-else-if="column.key === 'status'">
          <a-tag :color="record.status === 'Honor Roll' ? 'gold' : 'blue'">
            {{ record.status }}
          </a-tag>
        </template>

        <template v-else-if="column.key === 'action'">
          <a-button size="small" type="link" @click="viewStudent(record)">
            Open
          </a-button>
        </template>
      </template>
    </a-table>

    <a-drawer
      v-model:open="isDrawerVisible"
      title="Student Card"
      placement="right"
      width="340"
      @close="closeDrawer"
    >
      <div v-if="selectedStudent" class="space-y-4">
        <div class="text-center">
          <h3 class="text-base font-bold text-gray-900 mt-2 mb-0">
            {{ selectedStudent.name }}
          </h3>
          <p class="text-xs text-gray-500 font-mono">
            {{ selectedStudent.studentId }}
          </p>
        </div>

        <a-descriptions :column="1">
          <a-descriptions-item label="Group">
            {{ selectedStudent.group }}
          </a-descriptions-item>
          <a-descriptions-item label="GPA">
            {{ selectedStudent.gpa }}
          </a-descriptions-item>
          <a-descriptions-item label="Email">
            {{ selectedStudent.email }}
          </a-descriptions-item>
          <a-descriptions-item label="Phone number">
            {{ selectedStudent.phone }}
          </a-descriptions-item>
          <a-descriptions-item label="City">
            {{ selectedStudent.city }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </a-drawer>
  </div>
</template>
