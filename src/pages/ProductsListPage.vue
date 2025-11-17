<template>
  <Header />

  <div class="container py-4">
    <h1 class="mb-4 text-center text-primary">Products</h1>

    <FilterPanel class="mb-4" />

    <ProductList :products="store.products" class="mb-4" />

    <!-- Loading Spinner -->
    <div v-if="store.loading" class="text-center py-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="store.error" class="alert alert-danger">{{ store.error }}</div>

    <!-- Pagination -->
    <Pagination
      class="d-flex justify-content-center mt-4"
      :current-page="store.page"
      :total-items="store.total"
      :page-size="store.limit"
      @update:page="onPageChange"
    />
  </div>

  <Footer />
</template>

<script setup lang="ts">
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import FilterPanel from "@/components/FilterPanel.vue";
import ProductList from "@/components/ProductList.vue";
import Pagination from "@/components/Pagination.vue";
import { watch } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/store/products.store";

const route = useRoute();
const store = useProductsStore();

// Застосовуємо фільтри з query-параметрів
function applyQueryParams() {
  store.setFilters({
    title: route.query.title ?? "",
    categoryId: route.query.categoryId ? Number(route.query.categoryId) : null,
    price_min: route.query.price_min ? Number(route.query.price_min) : null,
    price_max: route.query.price_max ? Number(route.query.price_max) : null,
  });

  if (route.query.page) {
    store.setPage(Number(route.query.page));
  }

  store.fetchProducts();
}

// Обробка зміни сторінки пагінації
function onPageChange(newPage: number) {
  store.setPage(newPage);
  store.fetchProducts();
}

// Автоматичне застосування query-параметрів при вході та змінах
watch(
  () => route.query,
  () => {
    applyQueryParams();
  },
  { immediate: true }
);
</script>
