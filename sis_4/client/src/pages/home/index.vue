<script setup>
import { ref, onMounted } from "vue";
import { studentService } from "@/api/studentService";

const profile = ref(null);
const profileLoading = ref(true);
const profileError = ref(null);

const assignments = ref([]);
const assignmentsLoading = ref(true);
const assignmentsError = ref(null);

const announcements = ref([]);
const announcementsLoading = ref(true);
const announcementsError = ref(null);

const loadProfile = async () => {
  profileLoading.value = true;
  profileError.value = null;
  try {
    profile.value = await studentService.getStudentProfile(1);
  } catch (err) {
    profileError.value = err.message || "error profile";
  } finally {
    profileLoading.value = false;
  }
};

const loadAssignments = async () => {
  assignmentsLoading.value = true;
  assignmentsError.value = null;
  try {
    assignments.value = await studentService.getAssignments(1);
  } catch (err) {
    assignmentsError.value = err.message || "error assignments";
  } finally {
    assignmentsLoading.value = false;
  }
};

const loadAnnouncements = async () => {
  announcementsLoading.value = true;
  announcementsError.value = null;
  try {
    announcements.value = await studentService.getAnnouncements(4);
  } catch (err) {
    announcementsError.value = err.message || "error news";
  } finally {
    announcementsLoading.value = false;
  }
};

onMounted(() => {
  loadProfile();
  loadAssignments();
  loadAnnouncements();
});
</script>

<template>
  <div class="space-y-6">
    <div v-if="profileLoading" class="py-4 text-center h-full">
      <a-spin />
    </div>

    <div v-else class="">
      <div v-if="profileError">
        <a-alert type="error" show-icon :message="profileError" class="mb-3">
          <template #action>
            <a-button size="small" type="primary" @click="loadProfile">
              Повторить
            </a-button>
          </template>
        </a-alert>
      </div>

      <div v-else class="flex flex-col">
        <div>
          <h1 class="text-xl font-bold text-gray-900">Darzhan Eduardovich</h1>
          <p class="text-sm">
            <span>{{ profile.studentId }}</span>
            / {{ profile.faculty }}
          </p>
        </div>
        <div>
          <a-tag color="blue">Semester: {{ profile.semester }}</a-tag>
          <a-tag color="blue">Degree: {{ profile.degree }}</a-tag>
        </div>
      </div>
    </div>

    <a-row :gutter="[16, 16]">
      <a-col :xs="24" :sm="12" :lg="6">
        <a-card :bordered="true" class="shadow-none border-gray-200">
          <a-statistic
            title="Current GPA"
            :value="profile?.gpa || 0"
            :precision="2"
            :value-style="{ color: '#1d4ed8', fontWeight: 400 }"
          >
            <template #suffix>
              <span class="text-xs text-gray-500 font-normal">/ 4.00</span>
            </template>
          </a-statistic>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :lg="6">
        <a-card :bordered="true" class="shadow-none border-gray-200">
          <a-statistic
            title="Credits closed"
            :value="profile?.creditsCompleted || 0"
            :value-style="{ color: '#1d4ed8', fontWeight: 400 }"
          >
            <template #suffix>
              <span class="text-xs text-gray-500 font-normal"
                >/ {{ profile?.totalCredits || 0 }} ECTS</span
              >
            </template>
          </a-statistic>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :lg="6">
        <a-card :bordered="true" class="shadow-none border-gray-200">
          <a-statistic
            title="Active courses"
            :value="6"
            :value-style="{ color: '#1d4ed8', fontWeight: 400 }"
          >
            <template #suffix>
              <span class="text-xs text-gray-500 font-normal">disciplines</span>
            </template>
          </a-statistic>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :lg="6">
        <a-card :bordered="true" class="shadow-none border-gray-200">
          <a-statistic
            title="Attendance"
            :value="0"
            :precision="1"
            :value-style="{ color: '#1d4ed8', fontWeight: 400 }"
          >
            <template #suffix>
              <span class="text-xs text-gray-500 font-normal">%</span>
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]">
      <a-col :xs="24">
        <a-card :bordered="true" title="News from Dean's office" class="">
          <div v-if="announcementsLoading" class="py-4">
            <a-skeleton active :paragraph="{ rows: 4 }" />
          </div>

          <div v-else-if="announcementsError" class="py-4">
            <a-alert
              type="error"
              show-icon
              message="Error while loading announcements"
            >
            </a-alert>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="post in announcements"
              :key="post.id"
              class="py-1 border-b border-gray-100"
            >
              <div class="flex items-center justify-between gap-2 mb-1">
                <a-tag color="blue">{{ post.category }}</a-tag>
                <span class="text-xs text-gray-400">{{ post.date }}</span>
              </div>
              <h4 class="text-sm font-semibold text-gray-900 capitalize mb-1">
                {{ post.title }}
              </h4>
              <p class="text-xs text-gray-600 line-clamp-2 m-0">
                {{ post.body }}
              </p>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
