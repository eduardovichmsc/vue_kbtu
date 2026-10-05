<script setup>
import {
  PanelLeftClose,
  Inbox,
  Reply,
  MessageSquare,
  Plus,
  ChevronDown,
  LayoutDashboard,
} from "lucide-vue-next";
import { spacesStore, tasksStore } from "../../store/index.js";
import dbData from "../../data/db.json";

const navItems = [
  { name: "Inbox", icon: Inbox },
  { name: "Replies", icon: Reply },
  { name: "Comments", icon: MessageSquare },
];
</script>

<template>
  <aside
    class="min-w-[260px] h-screen bg-[#151419] flex flex-col text-[#9CA3AF] shrink-0"
  >
    <!-- Logo  -->
    <div class="h-16 flex items-center justify-between px-4 shrink-0">
      <div class="flex items-center gap-2 text-white font-semibold text-lg">
        <div
          class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center"
        >
          <LayoutDashboard class="w-5 h-5 text-white" />
        </div>
        Taskly
      </div>
      <button class="text-gray-400 hover:text-white transition-colors">
        <PanelLeftClose class="w-5 h-5 cursor-pointer" />
      </button>
    </div>

    <!-- Scrollable -->
    <div
      class="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-6 custom-scrollbar"
    >
      <!-- Primary Nav -->
      <nav class="flex flex-col gap-1">
        <a
          v-for="item in navItems"
          :key="item.name"
          href="#"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors"
        >
          <component :is="item.icon" class="w-4 h-4 text-gray-400" />
          {{ item.name }}
        </a>
      </nav>

      <!-- Spaces -->
      <div>
        <div
          class="flex items-center justify-between px-3 mb-2 group cursor-pointer"
        >
          <h3 class="text-sm font-semibold text-white">Spaces</h3>
          <button
            class="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-white"
          >
            <Plus class="w-4 h-4" />
          </button>
        </div>

        <div class="flex flex-col gap-1">
          <a
            v-for="space in spacesStore.spaces"
            :key="space.id"
            href="#"
            @click.prevent="spacesStore.setActiveSpace(space.id)"
            class="flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors"
            :class="
              spacesStore.activeSpaceId === space.id
                ? 'bg-indigo-600/10 text-indigo-400'
                : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'
            "
          >
            <span class="truncate">{{ space.name }}</span>
            <span
              class="text-xs font-medium px-1.5 py-0.5 rounded-md"
              :class="spacesStore.activeSpaceId === space.id ? 'bg-indigo-600 text-white' : 'bg-white/10'"
            >
              {{ tasksStore.getTaskCountForSpace(space.id) }}
            </span>
          </a>
        </div>
      </div>
    </div>

    <!-- User Profile -->
    <div class="p-3 shrink-0">
      <button
        class="w-full flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 shrink-0 border border-white/10"
          ></div>
          <div class="flex flex-col items-start overflow-hidden">
            <span
              class="text-sm font-semibold text-white truncate max-w-[140px]"
              >{{ dbData.currentUser.name }}</span
            >
            <span class="text-xs text-gray-500 truncate max-w-[140px]"
              >{{ dbData.currentUser.email}}</span
            >
          </div>
        </div>
        <ChevronDown class="w-4 h-4 text-gray-500 shrink-0" />
      </button>
    </div>
  </aside>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 4px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #4b5563;
}
</style>
