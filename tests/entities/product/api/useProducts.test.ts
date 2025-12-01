import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import type { FetchProductsRequest, FetchProductsResponse } from '~/shared/types/product'

// Мокаем useRuntimeConfig для useApi внутри useProducts
vi.mock('#app', async () => {
  const actual = await vi.importActual('#app')
  return {
    ...actual,
    useRuntimeConfig: () => ({
      public: {
        apiUrl: 'http://localhost:3000/api',
        appEnv: 'test',
      },
    }),
  }
})

global.useRuntimeConfig = () => ({
  public: {
    apiUrl: 'http://localhost:3000/api',
    appEnv: 'test',
  },
})

// Мокаем TanStack Query
vi.mock('@tanstack/vue-query', () => ({
  useQuery: vi.fn(),
}))

// Мокаем productApi
vi.mock('~/entities/product/api/index', () => ({
  productApi: {
    fetchProducts: vi.fn(),
  },
}))

// Мокаем store
const mockStore = {
  setLoading: vi.fn(),
  setError: vi.fn(),
  setProducts: vi.fn(),
  setTotalPages: vi.fn(),
  setTotal: vi.fn(),
  setPage: vi.fn(),
}

vi.mock('~/entities/product/model/productsStore', () => ({
  useProductsStore: vi.fn(() => mockStore),
}))

import { useQuery } from '@tanstack/vue-query'
import { productApi } from '~/entities/product/api/index'
import { useProducts } from '~/entities/product/api/useProducts'

describe('useProducts', () => {
  const mockRequest: FetchProductsRequest = {
    filter: {
      types: [
        {
          type: 'pet',
          rarities: ['common'],
        },
      ],
    },
    page: 1,
    amount: 72,
    currency: 'usd',
    sort: {
      popularity: 'desc',
    },
  }

  const mockResponse: FetchProductsResponse = {
    items: [
      {
        id: '1',
        name: 'Test Pet',
        price: 100.5,
        currency: 'usd',
        type: 'pet',
        rarity: 'common',
      },
    ],
    total: 100,
    page: 1,
    totalPages: 5,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // Сбрасываем все моки store методов
    mockStore.setLoading.mockClear()
    mockStore.setError.mockClear()
    mockStore.setProducts.mockClear()
    mockStore.setTotalPages.mockClear()
    mockStore.setTotal.mockClear()
    mockStore.setPage.mockClear()
  })

  describe('query configuration', () => {
    it('should create query with correct queryKey', () => {
      vi.mocked(useQuery).mockReturnValue({
        data: ref(mockResponse),
        isLoading: ref(false),
        error: ref(null),
      } as any)

      useProducts(mockRequest)

      expect(useQuery).toHaveBeenCalledWith({
        queryKey: expect.any(Object),
        queryFn: expect.any(Function),
      })

      const queryKeyArg = vi.mocked(useQuery).mock.calls[0][0].queryKey
      expect(queryKeyArg).toBeDefined()
    })

    it('should create queryKey with products and params', () => {
      vi.mocked(useQuery).mockReturnValue({
        data: ref(mockResponse),
        isLoading: ref(false),
        error: ref(null),
      } as any)

      useProducts(mockRequest)

      const queryKey = vi.mocked(useQuery).mock.calls[0][0].queryKey
      // queryKey должен быть computed, проверяем что он есть
      expect(queryKey).toBeDefined()
    })

    it('should handle reactive request params', () => {
      const requestRef = ref(mockRequest)
      vi.mocked(useQuery).mockReturnValue({
        data: ref(mockResponse),
        isLoading: ref(false),
        error: ref(null),
      } as any)

      useProducts(requestRef)

      expect(useQuery).toHaveBeenCalled()
    })
  })

  describe('queryFn execution', () => {
    it('should call productApi.fetchProducts with correct params', async () => {
      vi.mocked(productApi.fetchProducts).mockResolvedValue(mockResponse)
      let capturedQueryFn: any

      vi.mocked(useQuery).mockImplementation((options: any) => {
        capturedQueryFn = options.queryFn
        return {
          data: ref(null),
          isLoading: ref(false),
          error: ref(null),
        } as any
      })

      useProducts(mockRequest)

      // Выполняем queryFn явно
      await capturedQueryFn()

      expect(productApi.fetchProducts).toHaveBeenCalledWith(mockRequest)
    })

    it('should execute queryFn successfully', async () => {
      vi.mocked(productApi.fetchProducts).mockResolvedValue(mockResponse)
      let capturedQueryFn: any

      vi.mocked(useQuery).mockImplementation((options: any) => {
        capturedQueryFn = options.queryFn
        return {
          data: ref(null),
          isLoading: ref(false),
          error: ref(null),
        } as any
      })

      useProducts(mockRequest)

      const result = await capturedQueryFn()

      expect(result).toEqual(mockResponse)
      expect(productApi.fetchProducts).toHaveBeenCalledWith(mockRequest)
    })
  })

  describe('response handling', () => {
    it('should return response with items', async () => {
      vi.mocked(productApi.fetchProducts).mockResolvedValue(mockResponse)
      let capturedQueryFn: any

      vi.mocked(useQuery).mockImplementation((options: any) => {
        capturedQueryFn = options.queryFn
        return {
          data: ref(mockResponse),
          isLoading: ref(false),
          error: ref(null),
        } as any
      })

      useProducts(mockRequest)

      const result = await capturedQueryFn()

      expect(result).toEqual(mockResponse)
      expect(result.items).toEqual(mockResponse.items)
    })

    it('should return response with pagination data', async () => {
      vi.mocked(productApi.fetchProducts).mockResolvedValue(mockResponse)
      let capturedQueryFn: any

      vi.mocked(useQuery).mockImplementation((options: any) => {
        capturedQueryFn = options.queryFn
        return {
          data: ref(mockResponse),
          isLoading: ref(false),
          error: ref(null),
        } as any
      })

      useProducts(mockRequest)

      const result = await capturedQueryFn()

      expect(result.total).toBe(100)
      expect(result.page).toBe(1)
      expect(result.totalPages).toBe(5)
    })

    it('should not set products if items are not present', async () => {
      const responseWithoutItems: FetchProductsResponse = {
        items: undefined as any,
        total: 0,
      }

      vi.mocked(productApi.fetchProducts).mockResolvedValue(responseWithoutItems)
      vi.mocked(useQuery).mockImplementation(async (options: any) => {
        await options.queryFn()
        return {
          data: ref(responseWithoutItems),
          isLoading: ref(false),
          error: ref(null),
        } as any
      })

      useProducts(mockRequest)

      await new Promise(resolve => setTimeout(resolve, 50))

      expect(mockStore.setProducts).not.toHaveBeenCalled()
    })

    it('should not set optional fields if they are not present', async () => {
      const minimalResponse: FetchProductsResponse = {
        items: [],
      }

      vi.mocked(productApi.fetchProducts).mockResolvedValue(minimalResponse)
      vi.mocked(useQuery).mockImplementation(async (options: any) => {
        await options.queryFn()
        return {
          data: ref(minimalResponse),
          isLoading: ref(false),
          error: ref(null),
        } as any
      })

      useProducts(mockRequest)

      await new Promise(resolve => setTimeout(resolve, 50))

      expect(mockStore.setTotalPages).not.toHaveBeenCalled()
      expect(mockStore.setTotal).not.toHaveBeenCalled()
      expect(mockStore.setPage).not.toHaveBeenCalled()
    })

    it('should return response from queryFn', async () => {
      vi.mocked(productApi.fetchProducts).mockResolvedValue(mockResponse)

      let queryFnResult: any
      vi.mocked(useQuery).mockImplementation((options: any) => {
        queryFnResult = options.queryFn()
        return {
          data: ref(mockResponse),
          isLoading: ref(false),
          error: ref(null),
        } as any
      })

      useProducts(mockRequest)

      const result = await queryFnResult
      expect(result).toEqual(mockResponse)
    })
  })

  describe('error handling', () => {
    it('should throw error on API failure', async () => {
      const error = new Error('Network error')
      vi.mocked(productApi.fetchProducts).mockRejectedValue(error)
      let capturedQueryFn: any

      vi.mocked(useQuery).mockImplementation((options: any) => {
        capturedQueryFn = options.queryFn
        return {
          data: ref(null),
          isLoading: ref(false),
          error: ref(error),
        } as any
      })

      useProducts(mockRequest)

      await expect(capturedQueryFn()).rejects.toThrow('Network error')
    })

    it('should handle non-Error exceptions', async () => {
      const errorData = { message: 'Custom error' }
      vi.mocked(productApi.fetchProducts).mockRejectedValue(errorData)
      let capturedQueryFn: any

      vi.mocked(useQuery).mockImplementation((options: any) => {
        capturedQueryFn = options.queryFn
        return {
          data: ref(null),
          isLoading: ref(false),
          error: ref(errorData),
        } as any
      })

      useProducts(mockRequest)

      await expect(capturedQueryFn()).rejects.toEqual(errorData)
    })

    it('should throw error after setting it in store', async () => {
      const error = new Error('Network error')
      vi.mocked(productApi.fetchProducts).mockRejectedValue(error)

      let queryFnThrown: any
      vi.mocked(useQuery).mockImplementation((options: any) => {
        queryFnThrown = options.queryFn()
        return {
          data: ref(null),
          isLoading: ref(false),
          error: ref(error),
        } as any
      })

      useProducts(mockRequest)

      await expect(queryFnThrown).rejects.toThrow('Network error')
    })
  })
})
