import { defineStore } from "pinia";
import { getProducts } from "@/api/products";
import type { Product } from "@/types/product";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [] as Product[],
    loading: false,
    error: null as string | null,

    filters: {
      title: "",
      categoryId: null as number | null,
      price_min: null as number | null,
      price_max: null as number | null,
    },

    page: 1,
    limit: 12,
  }),

  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;

      try {
        const params = {
          title: this.filters.title || undefined,
          categoryId: this.filters.categoryId || undefined,
          price_min: this.filters.price_min || undefined,
          price_max: this.filters.price_max || undefined,
          offset: (this.page - 1) * this.limit,
          limit: this.limit,
        };

        this.products = await getProducts(params);
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    setFilters(filters: any) {
      this.filters = { ...this.filters, ...filters };
      this.page = 1;
    },

    setPage(page: number) {
      this.page = page;
    },
  },
});
