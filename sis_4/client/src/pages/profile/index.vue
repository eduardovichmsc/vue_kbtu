<script setup>
import { ref, reactive, onMounted } from "vue";
import { studentService } from "@/api/studentService";
import { message } from "ant-design-vue";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HomeOutlined,
} from "@ant-design/icons-vue";

const profile = ref(null);
const loading = ref(true);
const error = ref(null);
const saving = ref(false);

const formState = reactive({
  name: "",
  email: "",
  phone: "",
  website: "",
  address: "",
});

const fetchProfile = async () => {
  loading.value = true;
  error.value = null;
  try {
    const data = await studentService.getStudentProfile(1);
    profile.value = data;
    formState.name = data.name;
    formState.email = data.email;
    formState.phone = data.phone;
    formState.website = data.website;
    formState.address = data.address;
  } catch (err) {
    error.value = err.message || "error profile";
  } finally {
    loading.value = false;
  }
};

const onSave = async () => {
  saving.value = true;
  try {
    await studentService.updateStudentProfile(1, {
      ...profile.value,
      ...formState,
    });
    profile.value = {
      ...profile.value,
      ...formState,
    };
    message.success("profile changed succesfully");
  } catch (err) {
    message.error("error while save changes: " + err.message);
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  fetchProfile(false);
});
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col">
      <h1 class="text-xl font-bold text-gray-900 m-0">Profile</h1>
    </div>

    <div v-if="error">
      <a-alert
        type="error"
        show-icon
        message="Couldn't load profile"
        :description="error"
      >
        <template #action>
          <a-button size="small" type="primary" @click="fetchProfile(false)">
            Retry
          </a-button>
        </template>
      </a-alert>
    </div>

    <div v-if="loading" class="p-6">
      <a-skeleton active avatar :paragraph="{ rows: 6 }" />
    </div>

    <div v-else-if="profile" class="space-y-6">
      <a-row :gutter="[16, 16]">
        <a-col :xs="24" :md="8">
          <a-card
            :bordered="true"
            class="border-gray-200 shadow-none text-center"
          >
            <a-avatar
              :size="80"
              style="background-color: #1d4ed8; font-size: 32px"
            >
              {{ profile.name.charAt(0) }}
            </a-avatar>
            <h2 class="text-lg font-bold text-gray-900 mt-3 mb-0">
              {{ profile.name }}
            </h2>
            <p class="text-xs text-gray-500">
              {{ profile.studentId }}
            </p>

            <a-tag color="blue">{{ profile.year }} course </a-tag>
            <a-tag color="green">{{ profile.academicStatus }}</a-tag>

            <a-descriptions
              bordered
              :column="1"
              align="left"
              style="margin-top: 1rem"
              layout="vertical"
            >
              <a-descriptions-item label="Faculty">
                {{ profile.faculty }}
              </a-descriptions-item>
              <a-descriptions-item label="GPA">
                {{ profile.major }}
              </a-descriptions-item>
              <a-descriptions-item label="Email">
                {{ profile.advisor }}
              </a-descriptions-item>
              <a-descriptions-item label="Phone number">
                {{ profile.gpa }}
              </a-descriptions-item>
            </a-descriptions>
          </a-card>
        </a-col>

        <a-col :xs="24" :md="16">
          <h1 class="pb-4">Edit contacts</h1>
          <a-form layout="vertical" @submit.prevent="onSave">
            <a-row :gutter="16">
              <a-col :xs="24" :sm="12">
                <a-form-item label="Full name">
                  <a-input v-model:value="formState.name">
                    <template #prefix
                      ><UserOutlined class="text-gray-400"
                    /></template>
                  </a-input>
                </a-form-item>
              </a-col>

              <a-col :xs="24" :sm="12">
                <a-form-item label="Email">
                  <a-input v-model:value="formState.email">
                    <template #prefix
                      ><MailOutlined class="text-gray-400"
                    /></template>
                  </a-input>
                </a-form-item>
              </a-col>

              <a-col :xs="24" :sm="12">
                <a-form-item label="Contacts">
                  <a-input v-model:value="formState.phone">
                    <template #prefix
                      ><PhoneOutlined class="text-gray-400"
                    /></template>
                  </a-input>
                </a-form-item>
              </a-col>

              <a-col :xs="24" :sm="12">
                <a-form-item label="Webpage">
                  <a-input v-model:value="formState.website">
                    <template #prefix
                      ><GlobalOutlined class="text-gray-400"
                    /></template>
                  </a-input>
                </a-form-item>
              </a-col>

              <a-col :span="24">
                <a-form-item label="Adress">
                  <a-input v-model:value="formState.address">
                    <template #prefix
                      ><HomeOutlined class="text-gray-400"
                    /></template>
                  </a-input>
                </a-form-item>
              </a-col>
            </a-row>

            <div class="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <a-button @click="fetchProfile(false)">Cancel</a-button>
              <a-button type="primary" html-type="submit" :loading="saving">
                Save changes
              </a-button>
            </div>
          </a-form>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
