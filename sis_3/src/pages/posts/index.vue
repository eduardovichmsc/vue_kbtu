<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePosts } from "../../stores/posts";
import LoadingSpinner from "../../components/common/loading-spinner.vue";
import ErrorMessage from "../../components/common/error-message.vue";

const route = useRoute();
const router = useRouter();
const { posts, users, loading, error, fetchPosts, getAuthorName } = usePosts();

const searchQuery = ref(route.query.q || "");
const selectedAuthor = ref(route.query.author || "");
const sortBy = ref("newest");
const currentPage = ref(1);
const perPage = 10;

onMounted(async () => {
  if (posts.value.length === 0) {
    try {
      await fetchPosts();
    } catch {}
  }
});

watch(
  () => route.query.q,
  (newQ) => {
    searchQuery.value = newQ || "";
  },
);

const filteredPosts = computed(() => {
  let list = [...posts.value];

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(
      (p) =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.body && p.body.toLowerCase().includes(q)),
    );
  }

  if (selectedAuthor.value) {
    list = list.filter(
      (p) => String(p.userId) === String(selectedAuthor.value),
    );
  }

  if (sortBy.value === "newest") {
    list.sort((a, b) => Number(b.id) - Number(a.id));
  } else if (sortBy.value === "oldest") {
    list.sort((a, b) => Number(a.id) - Number(b.id));
  } else if (sortBy.value === "title") {
    list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  }

  return list;
});

const totalPages = computed(
  () => Math.ceil(filteredPosts.value.length / perPage) || 1,
);

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredPosts.value.slice(start, start + perPage);
});

function setPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function resetFilters() {
  searchQuery.value = "";
  selectedAuthor.value = "";
  sortBy.value = "newest";
  currentPage.value = 1;
  router.replace({ name: "posts" });
}
</script>

<template>
  <div class="space-y-6">
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-stone-900">
          Articles Directory
        </h1>
      </div>

      <router-link
        to="/posts/new"
        class="inline-flex items-center justify-center font-mono text-xs uppercase px-4 py-2 border border-stone-900 bg-stone-900 text-white hover:bg-stone-800 transition-colors"
      >
        + New Article
      </router-link>
    </div>

    <div class="border border-stone-300 bg-white p-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
        <div class="md:col-span-2">
          <label class="block font-mono text-stone-600 mb-1">Search text</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Filter by keyword..."
            class="w-full px-3 py-2 border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
          />
        </div>

        <div>
          <label class="block font-mono text-stone-600 mb-1">Author</label>
          <select
            v-model="selectedAuthor"
            class="w-full px-3 py-2 border border-stone-300 focus:outline-none focus:border-stone-900 bg-white cursor-pointer"
          >
            <option value="">All authors</option>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
        </div>

        <div>
          <label class="block font-mono text-stone-600 mb-1">Sort order</label>
          <select
            v-model="sortBy"
            class="w-full px-3 py-2 border border-stone-300 focus:outline-none focus:border-stone-900 bg-white cursor-pointer"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="title">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      <div
        class="mt-3 pt-3 border-t border-stone-200 flex items-center justify-between font-mono text-xs text-stone-500"
      >
        <div>
          Found
          <span class="font-bold text-stone-900">{{
            filteredPosts.length
          }}</span>
          articles
        </div>
        <button
          v-if="searchQuery || selectedAuthor || sortBy !== 'newest'"
          type="button"
          @click="resetFilters"
          class="text-stone-900 underline hover:text-stone-600 cursor-pointer"
        >
          Reset filters
        </button>
      </div>
    </div>

    <LoadingSpinner
      v-if="loading && posts.length === 0"
      text="Loading articles directory..."
    />
    <ErrorMessage
      v-else-if="error && posts.length === 0"
      :message="error"
      @retry="fetchPosts"
    />

    <div
      v-else-if="filteredPosts.length === 0"
      class="border border-stone-300 bg-white p-12 text-center"
    >
      <p class="font-mono text-sm text-stone-600">
        No articles match your search criteria.
      </p>
      <button
        type="button"
        @click="resetFilters"
        class="mt-4 font-mono text-xs uppercase px-4 py-2 border border-stone-900 bg-stone-900 text-white"
      >
        Clear filters
      </button>
    </div>

    <div
      v-else
      class="border border-stone-300 bg-white divide-y divide-stone-200"
    >
      <div
        v-for="post in paginatedPosts"
        :key="post.id"
        class="p-5 hover:bg-stone-50 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4"
      >
        <div class="space-y-1.5 flex-grow">
          <div class="flex items-center gap-3 font-mono text-xs text-stone-500">
            <span class="font-bold text-stone-900">#{{ post.id }}</span>
            <span>&bull;</span>
            <span>{{ getAuthorName(post.userId) }}</span>
            <span v-if="post.createdAt" class="text-stone-400">
              &bull; {{ new Date(post.createdAt).toLocaleDateString() }}
            </span>
          </div>

          <h2 class="text-base font-bold text-stone-900 capitalize">
            <router-link :to="`/posts/${post.id}`" class="hover:underline">
              {{ post.title }}
            </router-link>
          </h2>

          <p
            class="text-xs text-stone-600 line-clamp-2 max-w-3xl leading-relaxed"
          >
            {{ post.body }}
          </p>
        </div>

        <div
          class="flex items-center gap-2 self-start sm:self-center font-mono text-xs"
        >
          <router-link
            :to="`/posts/${post.id}`"
            class="px-3 py-1.5 border border-stone-300 bg-white hover:border-stone-900 text-stone-800"
          >
            Read
          </router-link>
        </div>
      </div>
    </div>

    <div
      v-if="totalPages > 1"
      class="border border-stone-300 bg-white p-4 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs"
    >
      <div>
        Page <span class="font-bold">{{ currentPage }}</span> of
        <span class="font-bold">{{ totalPages }}</span>
      </div>

      <div class="flex items-center gap-1">
        <button
          type="button"
          :disabled="currentPage === 1"
          @click="setPage(currentPage - 1)"
          class="px-3 py-1.5 border border-stone-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-stone-900"
        >
          &larr; Prev
        </button>

        <span
          class="px-3 py-1.5 border border-stone-900 bg-stone-900 text-white"
        >
          {{ currentPage }}
        </span>

        <button
          type="button"
          :disabled="currentPage === totalPages"
          @click="setPage(currentPage + 1)"
          class="px-3 py-1.5 border border-stone-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-stone-900"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  </div>
</template>
