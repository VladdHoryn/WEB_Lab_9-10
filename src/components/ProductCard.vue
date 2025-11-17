<template>
  <div class="card h-100 shadow-sm hover-shadow transition">
    <img
      :src="product.images[0]"
      class="card-img-top p-3"
      alt="product image"
      style="height: 180px; object-fit: contain"
    />

    <div class="card-body d-flex flex-column">
      <h6 class="card-title text-truncate">{{ product.title }}</h6>
      <p class="fw-bold mb-2">{{ product.price }}$</p>

      <div class="mt-auto d-grid gap-2">
        <router-link
          :to="`/product/${product.id}`"
          class="btn btn-outline-primary btn-sm"
        >
          Details
        </router-link>

        <button
          class="btn btn-success btn-sm"
          @click="addToCart(product)"
        >
          Add to Cart
        </button>

        <button
          class="btn"
          :class="isFavorite(product.id) ? 'btn-danger' : 'btn-outline-danger'"
          @click="toggleFavorite(product)"
        >
          ❤️
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "@/types/product";
import { useCartStore } from "@/store/cart.store";
import { useFavoritesStore } from "@/store/favorites.store";

const props = defineProps<{ product: Product }>();

const cart = useCartStore();
const favorites = useFavoritesStore();

const addToCart = (p: Product) => cart.addToCart(p);
const toggleFavorite = (p: Product) => favorites.toggleFavorite(p);
const isFavorite = (id: number) => favorites.favorites.some((p) => p.id === id);
</script>

<style scoped>
.hover-shadow:hover {
  box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
  transition: all 0.3s ease-in-out;
}
</style>
