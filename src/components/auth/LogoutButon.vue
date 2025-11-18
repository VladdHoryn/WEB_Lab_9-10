<template>
  <button class="btn btn-outline-danger" @click="logout">
    Logout
  </button>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  window.location.reload(); // оновити header
};
</script>
