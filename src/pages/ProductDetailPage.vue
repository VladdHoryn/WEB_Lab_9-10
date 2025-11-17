<template>
  <div class="container py-4">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="product" class="row g-4">
      <!-- Image -->
      <div class="col-md-5">
        <img
          :src="product.images[0]"
          class="img-fluid rounded shadow-sm"
          alt="Product image"
        />
      </div>

      <!-- Info -->
      <div class="col-md-7">
        <h2 class="mb-3">{{ product.title }}</h2>
        <p class="text-muted">{{ product.description }}</p>
        <h4 class="fw-bold my-3">{{ product.price }}$</h4>

        <div class="d-flex gap-2 mb-3">
          <button class="btn btn-success" @click="addToCart(product)">
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

        <p><b>Category:</b> {{ product.category.name }}</p>
        <p>
          <small class="text-muted">
            Created: {{ product.creationAt }} • Updated: {{ product.updatedAt }}
          </small>
        </p>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import { useProductStore } from "@/store/product.store";
import { useCartStore } from "@/store/cart.store";
import { useFavoritesStore } from "@/store/favorites.store";
import type { Product } from "@/types/product";

const route = useRoute();

const productStore = useProductStore();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

function addToCart(product: Product) {
  cartStore.addToCart(product);
}

function toggleFavorite(product: Product) {
  favoritesStore.toggleFavorite(product);
}

function isFavorite(id: number) {
  return favoritesStore.favorites.some((p) => p.id === id);
}

onMounted(() => {
  productStore.fetchProductById(Number(route.params.id));
});

const product = productStore.$state.product;
const loading = productStore.$state.loading;
const error = productStore.$state.error;
</script>
