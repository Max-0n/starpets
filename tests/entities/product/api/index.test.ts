import { beforeEach, describe, expect, it, vi } from 'vitest'
import { productApi } from '~/entities/product/api/index'
import type { FetchProductsRequest, FetchProductsResponse } from '~/shared/types/product'

// Мокаем $api
vi.mock('~/shared/api/useApi', () => ({
  $api: {
    post: vi.fn(),
  },
}))

import { $api } from '~/shared/api/useApi'

describe('productApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchProducts', () => {
    const mockRequest: FetchProductsRequest = {
      filter: {
        types: [
          {
            type: 'pet',
            rarities: ['common', 'rare'],
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
        {
          id: '2',
          name: 'Test Pet 2',
          price: 200.0,
          currency: 'usd',
          type: 'pet',
          rarity: 'rare',
        },
      ],
      total: 2,
      page: 1,
      totalPages: 1,
    }

    it('should call $api.post with correct URL and body', async () => {
      vi.mocked($api.post).mockResolvedValue(mockResponse)

      const result = await productApi.fetchProducts(mockRequest)

      expect($api.post).toHaveBeenCalledWith('https://market.apineural.com/api/store/items/all', {
        body: mockRequest,
        baseURL: '',
      })
      expect(result).toEqual(mockResponse)
    })

    it('should override baseURL with empty string', async () => {
      vi.mocked($api.post).mockResolvedValue(mockResponse)

      await productApi.fetchProducts(mockRequest)

      expect($api.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          baseURL: '',
        })
      )
    })

    it('should return FetchProductsResponse type', async () => {
      vi.mocked($api.post).mockResolvedValue(mockResponse)

      const result = await productApi.fetchProducts(mockRequest)

      expect(result).toHaveProperty('items')
      expect(result).toHaveProperty('total')
      expect(result).toHaveProperty('page')
      expect(result).toHaveProperty('totalPages')
      expect(Array.isArray(result.items)).toBe(true)
    })

    it('should handle request with multiple filter types', async () => {
      const complexRequest: FetchProductsRequest = {
        filter: {
          types: [
            {
              type: 'pet',
              rarities: ['common'],
              levels: ['neon', 'mega_neon'],
            },
            {
              type: 'egg',
              rarities: ['rare'],
            },
          ],
        },
        page: 2,
        amount: 50,
        currency: 'usd',
        sort: {
          price: 'asc',
        },
      }

      vi.mocked($api.post).mockResolvedValue(mockResponse)

      await productApi.fetchProducts(complexRequest)

      expect($api.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: complexRequest,
        })
      )
    })

    it('should handle request with properties filter', async () => {
      const requestWithProperties: FetchProductsRequest = {
        filter: {
          types: [
            {
              type: 'pet',
              properties: {
                missing: false,
                flyable: true,
                rideable: true,
              },
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

      vi.mocked($api.post).mockResolvedValue(mockResponse)

      await productApi.fetchProducts(requestWithProperties)

      expect($api.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: requestWithProperties,
        })
      )
    })

    it('should handle empty items response', async () => {
      const emptyResponse: FetchProductsResponse = {
        items: [],
        total: 0,
        page: 1,
        totalPages: 0,
      }

      vi.mocked($api.post).mockResolvedValue(emptyResponse)

      const result = await productApi.fetchProducts(mockRequest)

      expect(result.items).toEqual([])
      expect(result.total).toBe(0)
    })

    it('should handle response without optional fields', async () => {
      const minimalResponse: FetchProductsResponse = {
        items: [
          {
            id: '1',
            name: 'Test',
            price: 100,
            currency: 'usd',
            type: 'pet',
          },
        ],
      }

      vi.mocked($api.post).mockResolvedValue(minimalResponse)

      const result = await productApi.fetchProducts(mockRequest)

      expect(result.items).toHaveLength(1)
      expect(result.total).toBeUndefined()
      expect(result.page).toBeUndefined()
      expect(result.totalPages).toBeUndefined()
    })

    it('should propagate errors from $api.post', async () => {
      const error = new Error('Network error')
      vi.mocked($api.post).mockRejectedValue(error)

      await expect(productApi.fetchProducts(mockRequest)).rejects.toThrow('Network error')
    })

    it('should handle API error responses', async () => {
      const apiError = {
        request: 'https://market.apineural.com/api/store/items/all',
        status: 500,
        data: { error: 'Internal Server Error' },
      }

      vi.mocked($api.post).mockRejectedValue(apiError)

      await expect(productApi.fetchProducts(mockRequest)).rejects.toMatchObject({
        status: 500,
        data: { error: 'Internal Server Error' },
      })
    })

    it('should use correct endpoint URL', async () => {
      vi.mocked($api.post).mockResolvedValue(mockResponse)

      await productApi.fetchProducts(mockRequest)

      expect($api.post).toHaveBeenCalledWith('https://market.apineural.com/api/store/items/all', expect.any(Object))
    })
  })
})
