import { createRouter, createWebHistory } from "vue-router";

import ProductsListPage from "@/pages/ProductsListPage.vue";
import ProductDetailPage from "@/pages/ProductDetailPage.vue";
import CartPage from "@/pages/CartPage.vue";
import FavoritesPage from "@/pages/FavoritesPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import LoginPage from "@/pages/LoginPage.vue";

import { useAuthStore } from "@/store/authStore";

export const router = createRouter({
  history: createWebHistory("/WEB_Lab_9-10/"),

  routes: [
    { path: "/", component: ProductsListPage },
    { path: "/login", component: LoginPage },
    { path: "/product/:id", component: ProductDetailPage, props: true },
    { path: "/cart", component: CartPage },
    { path: "/favorites", component: FavoritesPage },
    { path: "/404", component: NotFoundPage },
    { path: "/:pathMatch(.*)*", redirect: "/404" },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});


router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  const protectedRoutes = ["/favorites", "/cart"];

  if (protectedRoutes.includes(to.path) && !auth.isAuth) {
    return next("/login");
  }

  next();
});
