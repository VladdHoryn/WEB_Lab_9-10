<template>
  <div class="container py-4">
    <h1 class="mb-4">Products</h1>

    <div v-if="loading" class="text-center">Loading...</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div class="row">
      <div
        v-for="p in products"
        :key="p.id"
        class="col-md-3 mb-3"
      >
        <ProductCard :product="p" />
      </div>
    </div>

    <!-- Pagination -->
    <nav>
      <ul class="pagination justify-content-center mt-4">
        <li class="page-item" :class="{ disabled: page === 1 }">
          <button class="page-link" @click="prevPage">Prev</button>
        </li>

        <li class="page-item">
          <span class="page-link">{{ page }}</span>
        </li>

        <li class="page-item">
          <button class="page-link" @click="nextPage">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useProductsStore } from "@/store/products.store";
import { watch } from "vue";
import ProductCard from "@/components/ProductCard.vue";

const route = useRoute();
const router = useRouter();
const store = useProductsStore();

const { products, loading, error, page } = store;

// читання query params
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

// пагінація
function nextPage() {
  store.setPage(store.page + 1);
  updateUrl();
}

function prevPage() {
  if (store.page > 1) {
    store.setPage(store.page - 1);
    updateUrl();
  }
}

function updateUrl() {
  router.push({
    path: "/",
    query: {
      ...route.query,
      page: store.page,
    },
  });
}
</script>
