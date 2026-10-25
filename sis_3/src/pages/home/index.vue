<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePosts } from "../../stores/posts";
import LoadingSpinner from "../../components/common/loading-spinner.vue";
import ErrorMessage from "../../components/common/error-message.vue";

const router = useRouter();
const { posts, users, loading, error, fetchPosts, getAuthorName } = usePosts();
const searchQuery = ref("");

onMounted(async () => {
  if (posts.value.length === 0) {
    try {
      await fetchPosts();
    } catch {}
  }
});

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({ name: "posts", query: { q: searchQuery.value.trim() } });
  } else {
    router.push({ name: "posts" });
  }
}

const recentPosts = computed(() => posts.value.slice(0, 6));
</script>

<template>
  <div class="space-y-10">
    <section class="border border-stone-300 bg-white p-6 sm:px-10">
      <form
        @submit.prevent="handleSearch"
        class="mt-6 flex flex-col sm:flex-row gap-2"
      >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search articles by title or keyword..."
          class="flex-grow px-3 py-2 text-sm border border-stone-400 focus:outline-none focus:border-stone-900 bg-white"
        />
        <button
          type="submit"
          class="px-5 py-2 text-xs uppercase tracking-wider bg-stone-900 text-white hover:bg-stone-800 transition-colors cursor-pointer"
        >
          Search
        </button>
      </form>

      <div
        class="mt-6 pt-6 border-t border-stone-200 flex flex-wrap items-center gap-6 font-mono text-xs text-stone-600"
      >
        <div>
          <span class="text-stone-900 font-bold">{{ posts.length }}</span>
          articles available
        </div>
        <div>
          <span class="text-stone-900 font-bold">{{ users.length || 10 }}</span>
          contributors
        </div>
        <div>
          <router-link
            to="/posts/new"
            class="text-stone-900 underline font-medium hover:text-stone-600"
          >
            Create an article &rarr;
          </router-link>
        </div>
      </div>
    </section>

    <section>
      <div
        class="flex items-baseline justify-between mb-4 border-b border-stone-300 pb-2"
      >
        <h2
          class="font-mono text-sm uppercase tracking-wider font-bold text-stone-900"
        >
          Recent Articles
        </h2>
        <router-link
          to="/posts"
          class="font-mono text-xs text-stone-600 hover:text-stone-900 underline"
        >
          View all ({{ posts.length }}) &rarr;
        </router-link>
      </div>

      <LoadingSpinner
        v-if="loading && posts.length === 0"
        text="Fetching latest articles from API..."
      />
      <ErrorMessage
        v-else-if="error && posts.length === 0"
        :message="error"
        @retry="fetchPosts"
      />

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <article
          v-for="post in recentPosts"
          :key="post.id"
          class="border border-stone-300 bg-white p-5 flex flex-col justify-between hover:border-stone-900 transition-colors"
        >
          <div>
            <div
              class="flex items-center justify-between text-xs font-mono text-stone-500 mb-2"
            >
              <span>#{{ post.id }}</span>
              <span>{{ getAuthorName(post.userId) }}</span>
            </div>
            <h3
              class="font-bold text-base text-stone-900 capitalize line-clamp-2 leading-snug"
            >
              <router-link :to="`/posts/${post.id}`" class="hover:underline">
                {{ post.title }}
              </router-link>
            </h3>
            <p class="mt-2 text-xs text-stone-600 line-clamp-3 leading-relaxed">
              {{ post.body }}
            </p>
          </div>

          <div
            class="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between font-mono text-xs"
          >
            <span class="text-stone-400">REST API</span>
            <router-link
              :to="`/posts/${post.id}`"
              class="text-stone-900 hover:underline font-medium"
            >
              Read &rarr;
            </router-link>
          </div>
        </article>
      </div>
    </section>

    <section class="border border-stone-300 bg-white p-6">
      <h2
        class="font-mono text-sm uppercase tracking-wider font-bold text-stone-900 mb-4"
      >
        Contributing Authors
      </h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <div
          v-for="author in users"
          :key="author.id"
          class="border border-stone-200 p-3 bg-stone-50 text-xs hover:border-stone-400"
        >
          <div class="font-bold text-stone-900 truncate">{{ author.name }}</div>
          <div class="font-mono text-stone-500 text-[11px] truncate">
            @{{ author.username }}
          </div>
          <div class="mt-2 text-stone-500 text-[11px] truncate">
            {{ author.company?.name || "DevNotes" }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
