<template>
  <div class="container py-4">
    <h1>Cart</h1>

    <div v-if="items.length === 0">Cart is empty</div>

    <div
      class="card mb-3 p-3"
      v-for="i in items"
      :key="i.product.id"
    >
      <h5>{{ i.product.title }}</h5>
      <p>{{ i.product.price }}$</p>

      <input
        type="number"
        class="form-control w-25"
        v-model.number="i.quantity"
        @change="updateQuantity(i.product.id, i.quantity)"
      />

      <button
        class="btn btn-danger mt-2"
        @click="removeFromCart(i.product.id)"
      >
        Remove
      </button>
    </div>

    <button
      v-if="items.length"
      class="btn btn-warning"
      @click="clearCart"
    >
      Clear Cart
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/store/cart.store";

const store = useCartStore();
store.loadFromLocalStorage();

const { items } = store;

const removeFromCart = store.removeFromCart;
const updateQuantity = store.updateQuantity;
const clearCart = store.clearCart;
</script>
