import { useQuery } from '@tanstack/vue-query'
import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import type { FetchProductsRequest, FetchProductsResponse } from '~/types/product'

export const useProducts = (requestParams: MaybeRefOrGetter<FetchProductsRequest>) => {
  const productsStore = useProductsStore()

  const params = computed(() => toValue(requestParams))

  return useQuery({
    queryKey: computed(() => ['products', params.value]),
    queryFn: async (): Promise<FetchProductsResponse> => {
      const currentParams = params.value
      productsStore.setLoading(true)
      productsStore.setError(null)

      try {
        const response = (await $api.post('https://market.apineural.com/api/store/items/all', {
          body: currentParams,
          baseURL: '', // Override baseURL to use full URL
        })) as FetchProductsResponse

        // Сохраняем продукты в store
        if (response.items) {
          productsStore.setProducts(response.items)
        }

        if (response.totalPages) {
          productsStore.setTotalPages(response.totalPages)
        }

        if (response.total !== undefined) {
          productsStore.setTotal(response.total)
        }

        if (response.page) {
          productsStore.setPage(response.page)
        }

        return response
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ошибка загрузки продуктов'
        productsStore.setError(errorMessage)
        throw err
      } finally {
        productsStore.setLoading(false)
      }
    },
  })
}
