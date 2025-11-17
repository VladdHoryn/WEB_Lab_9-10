<template>
  <div class="container py-4">
    <h1 class="mb-4 text-center">Products</h1>

    <!-- Filters -->
    <FilterPanel class="mb-4" />

    <!-- Products List -->
    <ProductList :products="store.products" class="mb-4" />

    <!-- Loading & Error -->
    <div v-if="store.loading" class="text-center py-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-if="store.error" class="alert alert-danger">{{ store.error }}</div>

    <!-- Pagination -->
    <Pagination class="d-flex justify-content-center mt-4" />
  </div>
</template>
