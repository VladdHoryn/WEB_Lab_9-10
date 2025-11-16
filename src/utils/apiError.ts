// utils/apiError.ts
export interface NormalizedApiError {
  message: string
  status?: number
  original?: unknown
}

export function normalizeApiError(error: any): NormalizedApiError {
  // Якщо помилка вже у нашому форматі (з інтерцептора)
  if (error?.message && error?.status) {
    return {
      message: error.message,
      status: error.status,
      original: error.original ?? error
    }
  }

  // Невідомий тип помилки
  return {
    message: 'Сталася непередбачена помилка.',
    status: undefined,
    original: error
  }
}
