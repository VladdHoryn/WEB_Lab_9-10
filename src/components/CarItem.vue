<template>
  <div class="card mb-3 p-3">
    <h5>{{ item.product.title }}</h5>
    <p>{{ item.product.price }}$</p>

    <input
      type="number"
      min="1"
      class="form-control w-25"
      v-model.number="item.quantity"
      @change="update(item.product.id, item.quantity)"
    />

    <button
      class="btn btn-danger mt-2"
      @click="remove(item.product.id)"
    >
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

const props = defineProps<{
  item: CartItem;
  update: (id: number, qty: number) => void;
  remove: (id: number) => void;
}>();
</script>
