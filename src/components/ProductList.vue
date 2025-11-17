<template>
  <div class="row">
    <div
      v-for="p in products"
      :key="p.id"
      class="col-md-3 mb-3"
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
