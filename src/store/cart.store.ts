import { defineStore } from "pinia";
import type { Product } from "@/types/product";

interface CartItem {
  product: Product;
  quantity: number;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
  }),

  actions: {
    loadFromLocalStorage() {
      const data = localStorage.getItem("cart");
      if (data) {
        this.items = JSON.parse(data);
      }
    },

    saveToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.items));
    },

    addToCart(product: Product) {
      const existing = this.items.find((i) => i.product.id === product.id);

      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ product, quantity: 1 });
      }

      this.saveToLocalStorage();
    },

    removeFromCart(id: number) {
      this.items = this.items.filter((i) => i.product.id !== id);
      this.saveToLocalStorage();
    },

    updateQuantity(id: number, qty: number) {
      const item = this.items.find((i) => i.product.id === id);
      if (item) {
        item.quantity = qty;
      }
      this.saveToLocalStorage();
    },

    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    },
  },
});
