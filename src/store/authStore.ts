// src/store/authStore.ts
import { defineStore } from "pinia";
import { login as apiLogin, logout as apiLogout, getProfile } from "@/api/auth";
import type { User } from "@/types/User";
import type { AuthProfile } from "@/types/AuthProfile";
import http from "@/api/http";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem(AUTH_TOKEN_KEY) || null,
    isAuth: !!localStorage.getItem(AUTH_TOKEN_KEY),
  }),

  actions: {
    setUser(user: User) {
      this.user = user;
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    },

    async login(email: string, password: string) {
      const loginData = await apiLogin(email, password);

      this.token = loginData.access_token;
      this.isAuth = true;

      localStorage.setItem(AUTH_TOKEN_KEY, loginData.access_token);

      http.defaults.headers.common["Authorization"] =
        `Bearer ${loginData.access_token}`;

      // getProfile() повертає ЧИСТИЙ профіль (бо інтерцептор)
      const profile: AuthProfile = await getProfile();

      const userData: User = {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        token: loginData.access_token,
      };

      this.setUser(userData);
    },

    logout() {
      apiLogout();

      this.user = null;
      this.token = null;
      this.isAuth = false;

      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);

      delete http.defaults.headers.common["Authorization"];
    },

    restoreSession() {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      const user = localStorage.getItem(AUTH_USER_KEY);

      if (token) {
        this.token = token;
        this.isAuth = true;
        http.defaults.headers.common["Authorization"] =
          `Bearer ${token}`;
      }

      if (user) {
        this.user = JSON.parse(user);
      }
    },
  },
});
