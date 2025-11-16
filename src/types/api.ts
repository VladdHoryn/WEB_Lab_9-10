// types/api.ts
export interface ApiErrorResponse {
  message: string
  status?: number
  original?: unknown
}

export interface ApiResponse<T> {
  data: T
  error?: ApiErrorResponse
}
