export interface NormalizedApiError {
  message: string
  status?: number
  original?: unknown
}

export function normalizeApiError(error: any): NormalizedApiError {
  if (error?.message && error?.status) {
    return {
      message: error.message,
      status: error.status,
      original: error.original ?? error
    }
  }

  return {
    message: 'Сталася непередбачена помилка.',
    status: undefined,
    original: error
  }
}
