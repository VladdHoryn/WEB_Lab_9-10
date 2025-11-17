export interface ProductFilters {
  title?: string        // пошук за назвою
  price_min?: number    // мінімальна ціна
  price_max?: number    // максимальна ціна
  categoryId?: number   // ID категорії
  offset?: number       // пагінація (початок)
  limit?: number        // пагінація (кількість)
}
