<template>
  <div class="container mt-4" style="max-width: 420px;">
    <h3 class="mb-3 text-center">Login</h3>

    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <form @submit.prevent="onSubmit">
      <!-- Email -->
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          required
        />
      </div>

      <!-- Password -->
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          required
        />
      </div>

      <!-- Submit -->
      <button
        class="btn btn-primary w-100"
        :disabled="loading"
      >
        <span v-if="!loading">Sign In</span>
        <span v-else>Loading...</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const loading = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const onSubmit = async () => {
  errorMessage.value = "";
  loading.value = true;

  try {
    await authStore.login(email.value, password.value);

    // redirect після логіну
    router.push("/");
  } catch (error: any) {
    errorMessage.value = "Invalid email or password";
  } finally {
    loading.value = false;
  }
};
</script>
