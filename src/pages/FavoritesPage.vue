<template>
  <div class="container py-4">
    <h1>Favorites</h1>

    <div v-if="favorites.length === 0">No favorites yet</div>

    <div class="row">
      <div
        class="col-md-3 mb-3"
        v-for="p in favorites"
        :key="p.id"
      >
        <ProductCard :product="p" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from "@/store/favorites.store";
import ProductCard from "@/components/ProductCard.vue";

const store = useFavoritesStore();
store.loadFromLocalStorage();

const favorites = store.favorites;
</script>
