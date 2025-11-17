<template>
  <span v-if="authStore.isAuth" class="ms-2">
    👋 Hello, <strong>{{ authStore.user?.name }}</strong>
  </span>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();
</script>
