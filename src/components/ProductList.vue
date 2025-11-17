<template>
  <div class="row">
    <div
      v-for="p in products"
      :key="p.id"
      class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
    >
      <ProductCard :product="p" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "@/types/product";
import ProductCard from "./ProductCard.vue";

defineProps<{
  products: Product[];
}>();
</script>
