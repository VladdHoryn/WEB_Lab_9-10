import { defineStore } from "pinia";
import type { Product } from "@/types/product";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    favorites: [] as Product[],
  }),

  actions: {
    loadFromLocalStorage() {
      const data = localStorage.getItem("favorites");
      if (data) {
        this.favorites = JSON.parse(data);
      }
    },

    saveToLocalStorage() {
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },

    toggleFavorite(product: Product) {
      const exists = this.favorites.find((p) => p.id === product.id);

      if (exists) {
        this.favorites = this.favorites.filter((p) => p.id !== product.id);
      } else {
        this.favorites.push(product);
      }

      this.saveToLocalStorage();
    },
  },
});
