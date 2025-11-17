<template>
  <Header />

  <div class="container py-4">
    <h1 class="mb-4 text-center text-primary">Products</h1>

    <FilterPanel class="mb-4" />

    <ProductList :products="store.products" class="mb-4" />

    <div v-if="store.loading" class="text-center py-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-if="store.error" class="alert alert-danger">{{ store.error }}</div>

    <Pagination class="d-flex justify-content-center mt-4" />
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

watch(() => store.products, (v) => console.log("PRODUCTS UPDATED:", v), { deep: true });
watch(() => route.query, () => { applyQueryParams(); store.fetchProducts(); }, { immediate: true });
</script>
