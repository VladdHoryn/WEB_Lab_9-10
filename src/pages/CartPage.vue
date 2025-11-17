<template>
  <div class="container py-4">
    <h1 class="mb-4 text-center">Cart</h1>

    <div v-if="items.length === 0" class="alert alert-info text-center">
      Cart is empty
    </div>

    <div class="list-group mb-3">
      <CartItem
        v-for="i in items"
        :key="i.product.id"
        :item="i"
        :update="updateQuantity"
        :remove="removeFromCart"
        class="list-group-item mb-2"
      />
    </div>

    <div class="text-center">
      <button
        v-if="items.length"
        class="btn btn-warning mt-3"
        @click="clearCart"
      >
        Clear Cart
      </button>
    </div>
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
