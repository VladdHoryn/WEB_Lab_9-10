// api/categories.ts
import http from '@/api/http'
import { normalizeApiError } from '@/utils/apiError'
import type { Category } from '@/types/category'

export async function getCategories(): Promise<Category[]> {
  try {
    return await http.get('/categories')
  } catch (error) {
    throw normalizeApiError(error)
  }
}
