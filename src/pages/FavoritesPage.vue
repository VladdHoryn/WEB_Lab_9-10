<template>
  <div class="container py-4">
    <h1>Favorites</h1>

    <div v-if="favorites.length === 0">No favorites yet</div>

    <FavoritesList :favorites="favorites" />
  </div>
</template>

<script setup lang="ts">
import FavoritesList from "@/components/FavoritesList.vue";
import { useFavoritesStore } from "@/store/favorites.store";

const store = useFavoritesStore();
store.loadFromLocalStorage();

const favorites = store.favorites;
</script>
