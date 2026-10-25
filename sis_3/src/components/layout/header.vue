<script setup>
import { useRouter, useRoute } from "vue-router";
import { useAuth } from "../../stores/auth";

const router = useRouter();
const route = useRoute();
const { user, isAuthenticated, logout } = useAuth();

function handleLogout() {
  logout();
  router.push({ name: "home" });
}

function isActive(path) {
  if (path === "/") return route.path === "/";
  return route.path.startsWith(path);
}
</script>

<template>
  <header class="border-b border-stone-300 bg-white">
    <div
      class="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between"
    >
      <nav class="flex items-center space-x-1">
        <router-link
          to="/"
          class="px-3 py-1.5 text-xs uppercase tracking-wider transition-colors border"
          :class="
            isActive('/') && route.path === '/'
              ? 'bg-stone-900 text-white border-stone-900'
              : 'text-stone-700 hover:text-stone-900 border-transparent hover:border-stone-300'
          "
        >
          Home
        </router-link>
        <router-link
          to="/posts"
          class="px-3 py-1.5 text-xs uppercase tracking-wider transition-colors border"
          :class="
            isActive('/posts') && route.name !== 'post-create'
              ? 'bg-stone-900 text-white border-stone-900'
              : 'text-stone-700 hover:text-stone-900 border-transparent hover:border-stone-300'
          "
        >
          Articles
        </router-link>
        <router-link
          to="/posts/new"
          class="px-3 py-1.5 text-xs uppercase tracking-wider transition-colors border"
          :class="
            route.name === 'post-create'
              ? 'bg-stone-900 text-white border-stone-900'
              : 'text-stone-700 hover:text-stone-900 border-transparent hover:border-stone-300'
          "
        >
          + Write
        </router-link>
      </nav>

      <div class="flex items-center gap-2">
        <template v-if="isAuthenticated">
          <router-link
            to="/profile"
            class="text-xs uppercase px-2.5 py-1 border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-800"
          >
            {{ user?.name || user?.username }}
          </router-link>
          <button
            type="button"
            @click="handleLogout"
            class="text-xs uppercase px-2.5 py-1 border border-stone-900 bg-white hover:bg-stone-900 hover:text-white transition-colors cursor-pointer"
          >
            Sign out
          </button>
        </template>
        <template v-else>
          <router-link
            to="/login"
            class="text-xs uppercase px-3 py-1.5 border border-stone-900 bg-stone-900 text-white hover:bg-stone-800 transition-colors"
          >
            Sign in
          </router-link>
        </template>
      </div>
    </div>
  </header>
</template>
