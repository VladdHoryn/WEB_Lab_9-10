import axios, { AxiosError } from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})


http.interceptors.response.use(
  (response) => {
    return response.data
  },

  (error: AxiosError) => {
    const status = error.response?.status

    const apiError = {
      message: '',
      status: status,
      original: error,
    }

    if (status === 400) {
      apiError.message = 'Некоректний запит до серверу.'
    } else if (status === 404) {
      apiError.message = 'Запитуваний ресурс не знайдено.'
    } else if (status === 500) {
      apiError.message = 'Помилка серверу. Спробуйте пізніше.'
    } else {
      apiError.message = 'Сталася непередбачена помилка.'
    }


    if (import.meta.env.DEV) {
      console.error('API ERROR:', apiError)
    }

    return Promise.reject(apiError)
  },
)

export default http
