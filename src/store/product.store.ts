import { defineStore } from "pinia";
import { productsApi } from "@/api/products";
import type { Product } from "@/types/product";

export const useProductStore = defineStore("product", {
  state: () => ({
    product: null as Product | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchProductById(id: number) {
      this.loading = true;
      this.error = null;

      try {
        this.product = await productsApi.getProductById(id);
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
