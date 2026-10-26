import { ref, computed } from "vue";

const storedUser = localStorage.getItem("devnotes_auth");
const user = ref(storedUser ? JSON.parse(storedUser) : null);

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value);

  function login(username, email) {
    const newUser = {
      id: 1,
      name: username || "Alex Mercer",
      username: (username || "alex").toLowerCase().replace(/\s+/g, "_"),
      email: email || "alex@devnotes.io",
      token: Date.now(),
    };
    user.value = newUser;
    localStorage.setItem("devnotes_auth", JSON.stringify(newUser));
    return newUser;
  }

  function logout() {
    user.value = null;
    localStorage.removeItem("devnotes_auth");
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
}
