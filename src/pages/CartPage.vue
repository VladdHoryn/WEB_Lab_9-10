<template>
  <div class="container py-4">
    <h1>Cart</h1>

    <div v-if="items.length === 0">Cart is empty</div>

    <CartItem
      v-for="i in items"
      :key="i.product.id"
      :item="i"
      :update="updateQuantity"
      :remove="removeFromCart"
    />

    <button
      v-if="items.length"
      class="btn btn-warning mt-3"
      @click="clearCart"
    >
      Clear Cart
    </button>
  </div>
</template>

<script setup lang="ts">
import CartItem from "@/components/CarItem.vue";
import { useCartStore } from "@/store/cart.store";

const store = useCartStore();
store.loadFromLocalStorage();

const items = store.items;

const updateQuantity = store.updateQuantity;
const removeFromCart = store.removeFromCart;
const clearCart = store.clearCart;
</script>
