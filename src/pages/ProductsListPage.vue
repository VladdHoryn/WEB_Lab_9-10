<template>
  <div class="container py-4">
    <h1 class="mb-4">Products</h1>

    <!-- Filters -->
    <FilterPanel />

    <!-- Loading -->
    <div v-if="loading" class="text-center py-4">Loading...</div>

    <!-- Error -->
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <!-- Products List -->
    <ProductList :products="products" />

    <!-- Pagination -->
    <Pagination />
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/store/products.store";

import FilterPanel from "@/components/FilterPanel.vue";
import ProductList from "@/components/ProductList.vue";
import Pagination from "@/components/Pagination.vue";

const route = useRoute();
const store = useProductsStore();

const { products, loading, error } = store;

// читання query params
function applyQueryParams() {
  store.setFilters({
    title: route.query.title ?? "",
    categoryId: route.query.categoryId ? Number(route.query.categoryId) : undefined,
    price_min: route.query.price_min ? Number(route.query.price_min) : undefined,
    price_max: route.query.price_max ? Number(route.query.price_max) : undefined,
  });

  if (route.query.page) {
    store.setPage(Number(route.query.page));
  }
}

// виклик API при зміні query
watch(
  () => route.query,
  () => {
    applyQueryParams();
    store.fetchProducts();
  },
  { immediate: true }
);
</script>
