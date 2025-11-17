<template>
  <header class="navbar navbar-expand-lg navbar-dark bg-primary px-3 shadow-sm">
    <a class="navbar-brand fw-bold" href="/">E-Commerce</a>

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto gap-3">
        <li class="nav-item">
          <a class="nav-link" href="/">Products</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/favorites">Favorites</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/cart">Cart</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
.nav-link {
  font-weight: 500;
  transition: color 0.2s;
}
.nav-link:hover {
  color: #ffd700;
}
</style>
