<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { studentService } from "@/api/studentService";

const route = useRoute();

const navItems = [
  { label: "Home", path: "/" },
  { label: "My courses", path: "/courses" },
  { label: "Classmates", path: "/students" },
  { label: "Profile", path: "/profile" },
];

const profile = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchProfile = async () => {
  loading.value = true;
  error.value = null;
  try {
    const data = await studentService.getStudentProfile(1);
    profile.value = data;
  } catch (err) {
    error.value = err.message || "error profile";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProfile();
});
</script>

<template>
  <header class="backdrop-blur-2xl sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <nav class="flex items-center space-x-4">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="text-sm font-medium transition"
            :class="[
              route.path === item.path
                ? 'text-blue-700'
                : 'text-gray-600 hover:text-gray-900',
            ]"
          >
            {{ item.label }}
          </router-link>
        </nav>

        <div class="flex items-center space-x-3">
          <div v-if="profile" class="flex items-center space-x-3">
            <div class="text-right hidden sm:block">
              <div class="text-xs">{{ profile.name }}</div>
              <div class="text-xs text-gray-500">{{ profile.studentId }}</div>
            </div>
            <a-avatar>
              <router-link to="/profile"> D </router-link>
            </a-avatar>
          </div>

          <div v-else-if="loading" class="flex items-center">
            <a-spin />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
