import http from "./http";
import type { Category } from "@/types/category";

export const categoriesApi = {
  async getCategories(): Promise<Category[]> {
    return http.get<Category[]>("/categories");
  },

  async getCategoryById(id: number): Promise<Category> {
    return http.get<Category>(`/categories/${id}`);
  },
};
