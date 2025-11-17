<template>
  <Header />

  <div class="container py-4 d-flex justify-content-center">
    <div v-if="store.loading" class="text-center py-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-if="store.error" class="alert alert-danger">
      {{ store.error }}
    </div>

    <div
      v-if="store.product"
      class="card shadow-sm hover-shadow mx-auto"
      style="max-width: 400px;"
    >
      <!-- Product Image -->
      <img
        :src="store.product.images[0]"
        class="card-img-top p-3"
        alt="product image"
        style="height: 250px; object-fit: contain;"
      />

      <!-- Product Info -->
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-truncate">{{ store.product.title }}</h5>
        <p class="fw-bold mb-2 text-primary">{{ store.product.price }}$</p>
        <p class="card-text">{{ store.product.description }}</p>

        <!-- Buttons -->
        <div class="mt-auto d-grid gap-2">
          <button
            class="btn btn-primary"
            @click="addToCart(store.product)"
          >
            Add to Cart
          </button>

          <button
            class="btn"
            :class="isFavorite(store.product.id) ? 'btn-danger' : 'btn-outline-danger'"
            @click="toggleFavorite(store.product)"
          >
            ❤️ Favorite
          </button>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "@/store/product.store";
import { useCartStore } from "@/store/cart.store";
import { useFavoritesStore } from "@/store/favorites.store";

import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

const route = useRoute();
const store = useProductStore();
const cart = useCartStore();
const favorites = useFavoritesStore();

// Load product by ID from route
async function loadProduct() {
  const id = Number(route.params.id);
  if (!isNaN(id)) {
    await store.fetchProductById(id);
  }
}

onMounted(loadProduct);
watch(() => route.params.id, () => loadProduct());

// Cart and favorites methods
const addToCart = (product: any) => cart.addToCart(product);
const toggleFavorite = (product: any) => favorites.toggleFavorite(product);
const isFavorite = (id: number) => favorites.favorites.some((p) => p.id === id);
</script>

<style scoped>
.hover-shadow:hover {
  box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.25);
  transition: all 0.3s ease-in-out;
}
</style>
