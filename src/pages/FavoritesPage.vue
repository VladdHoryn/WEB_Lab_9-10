<template>
  <Header />

  <div class="container py-4">
    <h1 class="mb-4 text-center text-primary">Favorites</h1>

    <div v-if="favorites.length === 0" class="text-center text-muted">
      No favorites yet
    </div>

    <FavoritesList :favorites="favorites" class="row g-3 mt-3" />
  </div>

  <Footer />
</template>

<script setup lang="ts">
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import FavoritesList from "@/components/FavoritesList.vue";
import { useFavoritesStore } from "@/store/favorites.store";

const store = useFavoritesStore();
store.loadFromLocalStorage();

const favorites = store.favorites;
</script>
