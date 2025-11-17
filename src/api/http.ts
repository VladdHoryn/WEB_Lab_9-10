// src/api/http.ts
import axios from "axios";
import type { AxiosError, AxiosResponse } from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // має бути: https://api.escuelajs.co/api/v1
  timeout: 10000,
});

// 🔵 Повертаємо ЧИСТЕ response.data всюди
http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },

  (error: AxiosError) => {
    const status = error.response?.status;

    const apiError = {
      message: "",
      status,
      original: error,
    };

    if (status === 400) apiError.message = "Некоректний запит до серверу.";
    else if (status === 404) apiError.message = "Запитуваний ресурс не знайдено.";
    else if (status === 500) apiError.message = "Помилка серверу.";
    else apiError.message = "Сталася непередбачена помилка.";

    if (import.meta.env.DEV) console.error("API ERROR:", apiError);

    return Promise.reject(apiError);
  }
);

export default http;
