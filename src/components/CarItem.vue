<template>
  <div class="card mb-3 p-3 shadow-sm d-flex flex-column flex-md-row align-items-center justify-content-between">
    <div class="me-3">
      <h5>{{ item.product.title }}</h5>
      <p class="fw-bold mb-1">{{ item.product.price }}$</p>
    </div>

    <input
      type="number"
      min="1"
      class="form-control w-25 mb-2 mb-md-0"
      v-model.number="item.quantity"
      @change="update(item.product.id, item.quantity)"
    />

    <button class="btn btn-danger mt-2 mt-md-0" @click="remove(item.product.id)">
      Remove
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "@/types/product";

interface CartItem {
  product: Product;
  quantity: number;
}

defineProps<{
  item: CartItem;
  update: (id: number, qty: number) => void;
  remove: (id: number) => void;
}>();
</script>
