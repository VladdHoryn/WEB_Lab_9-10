<template>
  <div class="card p-3 mb-4 shadow-sm">
    <h5 class="mb-3">Filters</h5>

    <div class="row g-3">
      <!-- Title -->
      <div class="col-md-4">
        <label class="form-label">Search</label>
        <input
          type="text"
          class="form-control"
          v-model="filters.title"
          @input="updateQuery"
        />
      </div>

      <!-- Min -->
      <div class="col-md-2">
        <label class="form-label">Min Price</label>
        <input
          type="number"
          class="form-control"
          v-model.number="filters.price_min"
          @input="updateQuery"
        />
      </div>

      <!-- Max -->
      <div class="col-md-2">
        <label class="form-label">Max Price</label>
        <input
          type="number"
          class="form-control"
          v-model.number="filters.price_max"
          @input="updateQuery"
        />
      </div>

      <!-- Category -->
      <div class="col-md-3">
        <label class="form-label">Category</label>
        <select
          class="form-select"
          v-model.number="filters.categoryId"
          @change="updateQuery"
        >
          <option value="">All</option>
          <option
            v-for="c in categoriesStore.categories"
            :key="c.id"
            :value="c.id"
          >
            {{ c.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { ProductFilters } from "@/types/filters";
import { useCategoriesStore } from "@/store/categories.store";

const route = useRoute();
const router = useRouter();
const categoriesStore = useCategoriesStore();

categoriesStore.fetchCategories();

// LOCAL reactive copy (не ламає URL поки юзер вводить)
const filters = reactive<ProductFilters>({
  title: (route.query.title as string) || "",
  price_min: route.query.price_min ? Number(route.query.price_min) : undefined,
  price_max: route.query.price_max ? Number(route.query.price_max) : undefined,
  categoryId: route.query.categoryId ? Number(route.query.categoryId) : undefined,
});

// оновити URL → викликає fetchProducts()
function updateQuery() {
  router.push({
    path: "/",
    query: {
      ...route.query,
      title: filters.title || undefined,
      price_min: filters.price_min || undefined,
      price_max: filters.price_max || undefined,
      categoryId: filters.categoryId || undefined,
      page: 1, // reset page
    },
  });
}
</script>
