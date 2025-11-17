<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center mt-4">
      <li class="page-item" :class="{ disabled: page <= 1 }">
        <button class="page-link">Prev</button>
      </li>

      <li class="page-item active">
        <span class="page-link">{{ page }}</span>
      </li>

      <li class="page-item">
        <button class="page-link">Next</button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useProductsStore } from "@/store/products.store";

const store = useProductsStore();
const route = useRoute();
const router = useRouter();

const page = store.page;

function next() {
  store.setPage(store.page + 1);
  apply();
}

function prev() {
  if (store.page > 1) {
    store.setPage(store.page - 1);
    apply();
  }
}

function apply() {
  router.push({
    path: "/",
    query: { ...route.query, page: store.page },
  });
}
</script>
