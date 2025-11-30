import type { FetchProductsRequest, Product } from '~/types/product'

export const useProductsStore = defineStore('productsStore', () => {
  const products = ref<Product[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const totalPages = ref(1)
  const total = ref(0)

  const setProducts = (items: Product[]) => {
    products.value = items
  }

  const addProducts = (items: Product[]) => {
    products.value = [...products.value, ...items]
  }

  const clearProducts = () => {
    products.value = []
  }

  const setPage = (page: number) => {
    currentPage.value = page
  }

  const setTotalPages = (pages: number) => {
    totalPages.value = pages
  }

  const setTotal = (count: number) => {
    total.value = count
  }

  const setError = (err: string | null) => {
    error.value = err
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  return {
    products,
    isLoading,
    error,
    currentPage,
    totalPages,
    total,
    setProducts,
    addProducts,
    clearProducts,
    setPage,
    setTotalPages,
    setTotal,
    setError,
    setLoading,
  }
})
