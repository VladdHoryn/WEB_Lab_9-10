<template>
  <header class="navbar navbar-expand-lg navbar-dark bg-primary px-3 shadow-sm">
    <a class="navbar-brand fw-bold" href="/">E-Commerce</a>

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto gap-3">

        <li class="nav-item">
          <RouterLink class="nav-link" to="/">Products</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/favorites">Favorites</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/cart">Cart</RouterLink>
        </li>

        <!-- Якщо користувач НЕ авторизований -->
        <li class="nav-item" v-if="!authStore.isAuth">
          <RouterLink to="/login" class="btn btn-warning text-dark fw-bold px-3">
            Login
          </RouterLink>
        </li>

        <!-- Якщо користувач АВТОРИЗОВАНИЙ -->
        <li
          class="nav-item d-flex align-items-center gap-2 text-white"
          v-if="authStore.isAuth"
        >
          👋 Hello, <strong>{{ authStore.user?.name }}</strong>

          <button
            class="btn btn-outline-light btn-sm"
            @click="onLogout"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

function onLogout() {
  authStore.logout();
  router.push("/");
}
</script>

<style scoped>
.nav-link {
  font-weight: 500;
  transition: color 0.2s;
}
.nav-link:hover {
  color: #ffd700;
}
</style>
