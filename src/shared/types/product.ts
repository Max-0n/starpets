export type ProductType = 'transport' | 'pet' | 'egg' | 'potion'
export type ProductRarity = string
export type ProductLevel = 'default' | 'neon' | 'mega_neon'
export type ProductProperty = 'flyable' | 'rideable'
export type SortType = 'price' | 'popularity' | 'profit'

export interface ProductFilterType {
  type: ProductType
  rarities?: ProductRarity[]
  levels?: ProductLevel[]
  properties?: {
    missing: boolean
    flyable?: boolean
    rideable?: boolean
  }
}

export interface ProductFilters {
  types: ProductFilterType[]
}

export interface ProductSort {
  [key: string]: 'asc' | 'desc'
}

export interface FetchProductsRequest {
  filter: ProductFilters
  page: number
  amount: number
  currency: string
  sort: ProductSort
}

export interface Product {
  id: string
  name: string
  title?: string // Для обратной совместимости
  subtitle?: string
  price: number
  currency: string
  imageUri?: string
  image?: string // Для обратной совместимости
  type: ProductType
  rarity?: ProductRarity
  level?: ProductLevel
  flyable?: boolean
  rideable?: boolean
  [key: string]: any
}

export interface FetchProductsResponse {
  items: Product[]
  total?: number
  page?: number
  totalPages?: number
}
