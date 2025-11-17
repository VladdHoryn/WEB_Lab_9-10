<template>
  <div class="row">
    <div
      class="col-md-3 mb-3"
      v-for="p in favorites"
      :key="p.id"
    >
      <ProductCard :product="p" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "@/types/product";
import ProductCard from "./ProductCard.vue";

defineProps<{
  favorites: Product[];
}>();
</script>
