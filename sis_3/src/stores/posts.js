import { ref } from "vue";
import api from "../services/api";

const posts = ref([]);
const users = ref([]);
const loading = ref(false);
const error = ref(null);

const LOCAL_STORAGE_CREATED = "devnotes_created_posts";
const LOCAL_STORAGE_UPDATED = "devnotes_updated_posts";
const LOCAL_STORAGE_DELETED = "devnotes_deleted_posts";

function getCreatedPosts() {
  const data = localStorage.getItem(LOCAL_STORAGE_CREATED);
  return data ? JSON.parse(data) : [];
}

function getUpdatedPosts() {
  const data = localStorage.getItem(LOCAL_STORAGE_UPDATED);
  return data ? JSON.parse(data) : {};
}

function getDeletedPostIds() {
  const data = localStorage.getItem(LOCAL_STORAGE_DELETED);
  return data ? JSON.parse(data) : [];
}

export function usePosts() {
  async function fetchUsers() {
    if (users.value.length > 0) return users.value;
    try {
      const response = await api.get("/users");
      users.value = response.data;
      return response.data;
    } catch {
      return [];
    }
  }

  async function fetchPosts() {
    loading.value = true;
    error.value = null;
    try {
      await fetchUsers();
      const response = await api.get("/posts");

      const created = getCreatedPosts();
      const updated = getUpdatedPosts();
      const deletedIds = getDeletedPostIds();

      let combined = [...created, ...response.data];

      combined = combined.filter(
        (post) => !deletedIds.includes(Number(post.id)),
      );

      combined = combined.map((post) => {
        if (updated[post.id]) {
          return { ...post, ...updated[post.id] };
        }
        return post;
      });

      posts.value = combined;
      return combined;
    } catch (err) {
      error.value = err.message || "Failed to load posts";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function fetchPostById(id) {
    loading.value = true;
    error.value = null;
    const numId = Number(id);
    const deletedIds = getDeletedPostIds();

    if (deletedIds.includes(numId)) {
      loading.value = false;
      const notFoundErr = new Error("Post not found (deleted)");
      notFoundErr.status = 404;
      error.value = notFoundErr.message;
      throw notFoundErr;
    }

    const created = getCreatedPosts();
    const foundCreated = created.find((p) => Number(p.id) === numId);
    const updated = getUpdatedPosts();

    if (foundCreated) {
      loading.value = false;
      await fetchUsers();
      const merged = updated[numId]
        ? { ...foundCreated, ...updated[numId] }
        : foundCreated;
      return merged;
    }

    try {
      await fetchUsers();
      const response = await api.get(`/posts/${numId}`);
      let postData = response.data;
      if (updated[numId]) {
        postData = { ...postData, ...updated[numId] };
      }
      return postData;
    } catch (err) {
      error.value = err.message || "Failed to load post";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function fetchPostComments(id) {
    try {
      const response = await api.get(`/posts/${id}/comments`);
      return response.data;
    } catch {
      return [];
    }
  }

  async function createPost(postData) {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.post("/posts", postData);
      const created = getCreatedPosts();
      const newId =
        created.length > 0
          ? Math.max(...created.map((p) => Number(p.id))) + 1
          : 101;
      const newPost = {
        ...response.data,
        id: newId,
        createdAt: new Date().toISOString(),
      };
      created.unshift(newPost);
      localStorage.setItem(LOCAL_STORAGE_CREATED, JSON.stringify(created));
      posts.value.unshift(newPost);
      return newPost;
    } catch (err) {
      error.value = err.message || "Failed to create post";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updatePost(id, updatedFields) {
    loading.value = true;
    error.value = null;
    const numId = Number(id);
    try {
      await api.put(`/posts/${numId > 100 ? 1 : numId}`, updatedFields);

      const created = getCreatedPosts();
      const createdIdx = created.findIndex((p) => Number(p.id) === numId);
      if (createdIdx !== -1) {
        created[createdIdx] = { ...created[createdIdx], ...updatedFields };
        localStorage.setItem(LOCAL_STORAGE_CREATED, JSON.stringify(created));
      } else {
        const updated = getUpdatedPosts();
        updated[numId] = { ...(updated[numId] || {}), ...updatedFields };
        localStorage.setItem(LOCAL_STORAGE_UPDATED, JSON.stringify(updated));
      }

      const postIdx = posts.value.findIndex((p) => Number(p.id) === numId);
      if (postIdx !== -1) {
        posts.value[postIdx] = { ...posts.value[postIdx], ...updatedFields };
      }

      return { id: numId, ...updatedFields };
    } catch (err) {
      error.value = err.message || "Failed to update post";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deletePost(id) {
    loading.value = true;
    error.value = null;
    const numId = Number(id);
    try {
      await api.delete(`/posts/${numId > 100 ? 1 : numId}`);

      const created = getCreatedPosts();
      const filteredCreated = created.filter((p) => Number(p.id) !== numId);
      localStorage.setItem(
        LOCAL_STORAGE_CREATED,
        JSON.stringify(filteredCreated),
      );

      const deletedIds = getDeletedPostIds();
      if (!deletedIds.includes(numId)) {
        deletedIds.push(numId);
        localStorage.setItem(LOCAL_STORAGE_DELETED, JSON.stringify(deletedIds));
      }

      posts.value = posts.value.filter((p) => Number(p.id) !== numId);
      return true;
    } catch (err) {
      error.value = err.message || "Failed to delete post";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function getAuthorName(userId) {
    const user = users.value.find((u) => Number(u.id) === Number(userId));
    return user ? user.name : "Author #" + (userId || 1);
  }

  function getAuthor(userId) {
    return users.value.find((u) => Number(u.id) === Number(userId)) || null;
  }

  return {
    posts,
    users,
    loading,
    error,
    fetchPosts,
    fetchPostById,
    fetchPostComments,
    fetchUsers,
    createPost,
    updatePost,
    deletePost,
    getAuthorName,
    getAuthor,
  };
}
