<template>
  <div class="container py-4">
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="product">
      <h2>{{ product.title }}</h2>
      <img :src="product.thumbnail" class="img-fluid mb-3" />

      <p>{{ product.description }}</p>
      <p><b>Price:</b> {{ product.price }}$</p>

      <button class="btn btn-success" @click="addToCart(product)">Add to Cart</button>
      <button class="btn btn-outline-danger ms-2" @click="toggleFavorite(product)">❤️</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import { useProductStore } from "@/store/product.store";
import { useCartStore } from "@/store/cart.store";
import { useFavoritesStore } from "@/store/favorites.store";

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

function addToCart(product: any) {
  cartStore.addToCart(product);
}

function toggleFavorite(product: any) {
  favoritesStore.toggleFavorite(product);
}

onMounted(() => {
  productStore.fetchProductById(Number(route.params.id));
});
</script>
