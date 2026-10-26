<script setup>
import { useRouter } from "vue-router";
import { useAuth } from "../../stores/auth";

const router = useRouter();
const { user, logout } = useAuth();

function handleLogout() {
  logout();
  router.push({ name: "home" });
}
</script>

<template>
  <div class="space-y-8">
    <div
      class="border-b border-stone-300 pb-4 flex items-center justify-between"
    >
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-stone-900">
          Author Profile
        </h1>
      </div>

      <button
        type="button"
        @click="handleLogout"
        class="font-mono text-xs uppercase px-3 py-1.5 border border-stone-900 bg-white hover:bg-stone-900 hover:text-white transition-colors cursor-pointer"
      >
        Sign Out
      </button>
    </div>

    <div class="border border-stone-300 bg-white p-6 space-y-4">
      <div class="space-y-3 text-xs">
        <div>
          <div class="text-stone-500">Username</div>
          <div class="text-stone-800">@{{ user?.username }}</div>
        </div>
        <div>
          <div class="text-stone-500">Email</div>
          <div class="text-stone-800">{{ user?.email }}</div>
        </div>
        <div>
          <div class="text-stone-500">Token</div>
          <div class="text-stone-800">{{ user?.token }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
