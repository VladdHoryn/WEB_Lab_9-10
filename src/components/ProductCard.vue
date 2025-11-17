<template>
  <div class="card h-100 shadow-sm">
    <img
      :src="product.images[0]"
      class="card-img-top"
      alt="product image"
      style="height: 180px; object-fit: contain"
    />

    <div class="card-body d-flex flex-column">
      <h6 class="card-title">{{ product.title }}</h6>
      <p class="fw-bold mb-2">{{ product.price }}$</p>

      <div class="mt-auto">
        <router-link
          :to="`/product/${product.id}`"
          class="btn btn-sm btn-outline-primary w-100 mb-2"
        >
          Details
        </router-link>

        <button
          class="btn btn-sm btn-success w-100 mb-2"
          @click="addToCart(product)"
        >
          Add to Cart
        </button>

        <button
          class="btn btn-sm w-100"
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

import { defineProps } from "vue";

const props = defineProps<{
  product: Product;
}>();

const cart = useCartStore();
const favorites = useFavoritesStore();

const addToCart = (p: Product) => cart.addToCart(p);
const toggleFavorite = (p: Product) => favorites.toggleFavorite(p);
const isFavorite = (id: number) => favorites.favorites.some((p) => p.id === id);
</script>

