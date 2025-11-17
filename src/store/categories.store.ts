import { defineStore } from "pinia";
import { getCategories } from "../api/categories";
import type { Category } from "@/types/category";

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    categories: [] as Category[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchCategories() {
      this.loading = true;
      this.error = null;

      try {
        this.categories = await getCategories();
      } catch (err: never) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
