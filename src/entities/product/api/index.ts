import { $api } from '~/shared/api/useApi'
import type { FetchProductsRequest, FetchProductsResponse } from '~/shared/types/product'

export const productApi = {
  fetchProducts: async (params: FetchProductsRequest): Promise<FetchProductsResponse> => {
    return (await $api.post('https://market.apineural.com/api/store/items/all', {
      body: params,
      baseURL: '', // Override baseURL to use full URL
    })) as FetchProductsResponse
  },
}
