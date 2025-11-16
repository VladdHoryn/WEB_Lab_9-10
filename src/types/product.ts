// types/product.ts
export interface ProductCategory {
  id: number
  name: string
  image: string
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  images: string[]
  creationAt: string
  updatedAt: string
  category: ProductCategory
}
