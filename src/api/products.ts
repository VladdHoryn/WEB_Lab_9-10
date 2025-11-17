// api/products.ts
import http from '@/api/http'
import { normalizeApiError } from '@/utils/apiError'
import type { Product } from '@/types/product'

export async function getProducts(params?: ProductsQuery): Promise<Product[]> {
  console.log("GET PRODUCTS PARAMS:", params)

  try {
    const res = await http.get('/products', { params })
    console.log("GET PRODUCTS RESPONSE:", res)
    return res
  } catch (error) {
    console.error(error)
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

export interface ProductsQuery {
  title?: string
  categoryId?: number
  price_min?: number
  price_max?: number
  offset?: number
  limit?: number
}
