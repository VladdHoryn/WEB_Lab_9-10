// api/products.ts
import http from '@/http'
import { normalizeApiError } from '@/utils/apiError'
import type { Product } from '@/types/product'

export async function getProducts(params?: Record<string, never>): Promise<Product[]> {
  try {
    return await http.get('/products', { params })
  } catch (error) {
    throw normalizeApiError(error)
  }
}

export async function getProductById(id: number | string): Promise<Product> {
  try {
    return await http.get(`/products/${id}`)
  } catch (error) {
    throw normalizeApiError(error)
  }
}
