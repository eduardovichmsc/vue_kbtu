<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../../stores/auth'

const router = useRouter()
const route = useRoute()
const { login } = useAuth()

const username = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

function handleLogin() {
  if (!username.value.trim()) {
    error.value = 'Please enter a username'
    return
  }

  login(username.value.trim(), email.value.trim())
  
  const redirectTo = route.query.redirect || '/profile'
  router.push(redirectTo)
}
</script>

<template>
  <div class="max-w-md mx-auto my-12">
    <div class="border border-stone-300 bg-white p-6 sm:p-8 space-y-6">
      <div class="border-b border-stone-200 pb-4">
        <h1 class="text-2xl font-bold tracking-tight text-stone-900">Sign In</h1>
        <p class="text-xs font-mono text-stone-500 mt-1">Authenticate to access author tools & publishing</p>
      </div>

      <div v-if="route.query.redirect" class="border border-amber-600 bg-amber-50 p-3 font-mono text-xs text-amber-900">
        You must be signed in to access <span class="font-bold">{{ route.query.redirect }}</span>.
      </div>

      <div v-if="error" class="border border-red-600 bg-red-50 p-3 font-mono text-xs text-red-900">
        {{ error }}
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4 text-xs">
        <div>
          <label class="block font-mono uppercase font-bold text-stone-700 mb-1">Username</label>
          <input
            v-model="username"
            type="text"
            required
            placeholder="e.g. alex_mercer"
            class="w-full px-3 py-2 text-sm border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
          />
        </div>

        <div>
          <label class="block font-mono uppercase font-bold text-stone-700 mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="e.g. alex@devnotes.io"
            class="w-full px-3 py-2 text-sm border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
          />
        </div>

        <div>
          <label class="block font-mono uppercase font-bold text-stone-700 mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full px-3 py-2 text-sm border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
          />
        </div>

        <button
          type="submit"
          class="w-full py-2.5 font-mono uppercase tracking-wider text-xs border border-stone-900 bg-stone-900 text-white hover:bg-stone-800 transition-colors cursor-pointer"
        >
          Sign In
        </button>
      </form>

      <div class="pt-4 border-t border-stone-200 font-mono text-[11px] text-stone-500">
        Credentials are stored in browser session state and guarded by Vue Router.
      </div>
    </div>
  </div>
</template>
