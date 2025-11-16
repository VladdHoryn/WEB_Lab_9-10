<template>
  <div>
    <Header />

    <main class="container my-4">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
</script>
