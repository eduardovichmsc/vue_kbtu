<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePosts } from "../../stores/posts";
import { useAuth } from "../../stores/auth";
import LoadingSpinner from "../../components/common/loading-spinner.vue";
import ErrorMessage from "../../components/common/error-message.vue";

const route = useRoute();
const router = useRouter();
const {
  fetchPostById,
  fetchPostComments,
  deletePost,
  getAuthorName,
  getAuthor,
} = usePosts();
const { isAuthenticated } = useAuth();

const post = ref(null);
const author = ref(null);
const comments = ref([]);
const loading = ref(true);
const commentsLoading = ref(false);
const error = ref(null);
const isDeleting = ref(false);
const showDeleteConfirm = ref(false);

const newCommentAuthor = ref("");
const newCommentBody = ref("");

async function loadData() {
  loading.value = true;
  error.value = null;
  try {
    const postData = await fetchPostById(route.params.id);
    post.value = postData;
    author.value = getAuthor(postData.userId);

    commentsLoading.value = true;
    try {
      comments.value = await fetchPostComments(route.params.id);
    } finally {
      commentsLoading.value = false;
    }
  } catch (err) {
    error.value = err.message || "Article could not be loaded";
  } finally {
    loading.value = false;
  }
}

onMounted(loadData);

watch(
  () => route.params.id,
  () => {
    if (route.params.id) {
      loadData();
    }
  },
);

async function handleDelete() {
  isDeleting.value = true;
  try {
    await deletePost(post.value.id);
    router.push({ name: "posts" });
  } catch (err) {
    error.value = err.message || "Failed to delete article";
    isDeleting.value = false;
    showDeleteConfirm.value = false;
  }
}

function handleAddComment() {
  if (!newCommentBody.value.trim()) return;
  const commentObj = {
    id: Date.now(),
    name: newCommentAuthor.value.trim() || "Anonymous Reader",
    email: "reader@devnotes.io",
    body: newCommentBody.value.trim(),
  };
  comments.value.unshift(commentObj);
  newCommentBody.value = "";
  newCommentAuthor.value = "";
}
</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between font-mono text-xs">
      <router-link
        to="/posts"
        class="text-stone-600 hover:text-stone-900 underline"
      >
        &larr; Back to articles
      </router-link>

      <div class="flex items-center gap-2">
        <router-link
          :to="`/posts/${route.params.id}/edit`"
          class="px-3 py-1.5 border border-stone-400 bg-white hover:border-stone-900 text-stone-900"
        >
          Edit
        </router-link>
        <button
          type="button"
          @click="showDeleteConfirm = true"
          class="px-3 py-1.5 border border-red-300 bg-white hover:border-red-700 text-red-700 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>

    <div
      v-if="showDeleteConfirm"
      class="border border-red-700 bg-red-50 p-5 font-mono text-xs text-red-950"
    >
      <p class="font-bold uppercase tracking-wider mb-2">Confirm Delete</p>
      <p class="mb-4">
        Are you sure you want to permanently delete article #{{ post?.id }}?
        This executes an HTTP DELETE request via axios.
      </p>
      <div class="flex items-center gap-3">
        <button
          type="button"
          :disabled="isDeleting"
          @click="handleDelete"
          class="px-4 py-2 border border-red-900 bg-red-900 text-white hover:bg-red-800 disabled:opacity-50 cursor-pointer"
        >
          {{ isDeleting ? "Deleting..." : "Yes, Delete" }}
        </button>
        <button
          type="button"
          @click="showDeleteConfirm = false"
          class="px-4 py-2 border border-stone-400 bg-white hover:bg-stone-100 cursor-pointer text-stone-900"
        >
          Cancel
        </button>
      </div>
    </div>

    <LoadingSpinner v-if="loading" text="Loading article content from API..." />
    <ErrorMessage v-else-if="error" :message="error" @retry="loadData" />

    <div v-else-if="post" class="space-y-8">
      <article class="border border-stone-300 bg-white p-6 sm:p-10 space-y-6">
        <div class="border-b border-stone-200 pb-4">
          <div
            class="flex flex-wrap items-center gap-3 font-mono text-xs text-stone-500 mb-3"
          >
            <span class="border border-stone-300 px-2 py-0.5 text-stone-900"
              >ID: #{{ post.id }}</span
            >
            <span>Author: {{ getAuthorName(post.userId) }}</span>
            <span v-if="post.createdAt"
              >&bull; Published
              {{ new Date(post.createdAt).toLocaleDateString() }}</span
            >
          </div>
          <h1
            class="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 capitalize leading-tight"
          >
            {{ post.title }}
          </h1>
        </div>

        <div
          class="text-stone-800 text-sm sm:text-base leading-relaxed whitespace-pre-line"
        >
          {{ post.body }}
        </div>

        <div
          v-if="author"
          class="mt-8 pt-6 border-t border-stone-200 bg-stone-50 p-4 border text-xs"
        >
          <p class="font-mono uppercase font-bold text-stone-600 mb-2">
            Author Information
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <span class="font-mono text-stone-500">Name:</span>
              {{ author.name }}
            </div>
            <div>
              <span class="font-mono text-stone-500">Username:</span> @{{
                author.username
              }}
            </div>
            <div>
              <span class="font-mono text-stone-500">Email:</span>
              {{ author.email }}
            </div>
            <div>
              <span class="font-mono text-stone-500">Company:</span>
              {{ author.company?.name }}
            </div>
            <div>
              <span class="font-mono text-stone-500">Website:</span>
              {{ author.website }}
            </div>
            <div>
              <span class="font-mono text-stone-500">City:</span>
              {{ author.address?.city }}
            </div>
          </div>
        </div>
      </article>

      <section class="border border-stone-300 bg-white p-6 sm:p-8 space-y-6">
        <div
          class="flex items-center justify-between border-b border-stone-200 pb-3"
        >
          <h2 class="font-mono text-sm uppercase font-bold text-stone-900">
            Comments ({{ comments.length }})
          </h2>
          <span class="text-xs font-mono text-stone-400"
            >api/posts/{{ post.id }}/comments</span
          >
        </div>

        <form
          @submit.prevent="handleAddComment"
          class="space-y-3 bg-stone-50 p-4 border border-stone-200"
        >
          <p class="font-mono text-xs uppercase font-bold text-stone-700">
            Leave a response
          </p>
          <input
            v-model="newCommentAuthor"
            type="text"
            placeholder="Your name or handle..."
            class="w-full px-3 py-1.5 text-xs border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
          />
          <textarea
            v-model="newCommentBody"
            rows="3"
            required
            placeholder="Write your thoughts..."
            class="w-full px-3 py-2 text-xs border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
          ></textarea>
          <button
            type="submit"
            class="font-mono text-xs uppercase px-4 py-1.5 border border-stone-900 bg-stone-900 text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Post Comment
          </button>
        </form>

        <LoadingSpinner v-if="commentsLoading" text="Loading comments..." />

        <div
          v-else-if="comments.length === 0"
          class="text-xs font-mono text-stone-500 text-center py-4"
        >
          No comments yet on this article.
        </div>

        <div v-else class="divide-y divide-stone-200 space-y-4 pt-2">
          <div
            v-for="c in comments"
            :key="c.id"
            class="pt-4 first:pt-0 space-y-1"
          >
            <div class="flex items-baseline justify-between text-xs">
              <span class="font-bold text-stone-900 capitalize">{{
                c.name
              }}</span>
              <span class="font-mono text-stone-500 text-[11px]">{{
                c.email
              }}</span>
            </div>
            <p class="text-xs text-stone-700 leading-relaxed">{{ c.body }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
