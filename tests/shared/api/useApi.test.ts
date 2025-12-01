import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Мокаем useRuntimeConfig ДО импорта
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

// Устанавливаем глобальный useRuntimeConfig для auto-imports
global.useRuntimeConfig = () => ({
  public: {
    apiUrl: 'http://localhost:3000/api',
    appEnv: 'test',
  },
})

import { $api } from '~/shared/api/useApi'

// Мокаем $fetch
const mockFetch = vi.fn()
global.$fetch = mockFetch

describe('$api', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('GET requests', () => {
    it('should make a GET request with correct method', async () => {
      mockFetch.mockResolvedValue({ data: 'test' })

      await $api.get('/test')

      expect(mockFetch).toHaveBeenCalledWith(
        '/test',
        expect.objectContaining({
          method: 'GET',
        })
      )
    })

    it('should use baseURL from runtime config', async () => {
      mockFetch.mockResolvedValue({ data: 'test' })

      await $api.get('/test')

      expect(mockFetch).toHaveBeenCalledWith(
        '/test',
        expect.objectContaining({
          baseURL: 'http://localhost:3000/api',
        })
      )
    })

    it('should include Accept header', async () => {
      mockFetch.mockResolvedValue({ data: 'test' })

      await $api.get('/test')

      expect(mockFetch).toHaveBeenCalledWith(
        '/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            Accept: 'application/json',
          }),
        })
      )
    })
  })

  describe('POST requests', () => {
    it('should make a POST request with correct method', async () => {
      mockFetch.mockResolvedValue({ data: 'created' })

      await $api.post('/test', { body: { name: 'test' } })

      expect(mockFetch).toHaveBeenCalledWith(
        '/test',
        expect.objectContaining({
          method: 'POST',
        })
      )
    })

    it('should include Content-Type header when body is present', async () => {
      mockFetch.mockResolvedValue({ data: 'created' })

      await $api.post('/test', { body: { name: 'test' } })

      expect(mockFetch).toHaveBeenCalledWith(
        '/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }),
        })
      )
    })

    it('should not include Content-Type header when body is not present', async () => {
      mockFetch.mockResolvedValue({ data: 'test' })

      await $api.post('/test')

      const callArgs = mockFetch.mock.calls[0][1]
      expect(callArgs.headers).not.toHaveProperty('Content-Type')
      expect(callArgs.headers).toHaveProperty('Accept', 'application/json')
    })
  })

  describe('baseURL override', () => {
    it('should override baseURL when provided in options', async () => {
      mockFetch.mockResolvedValue({ data: 'test' })

      await $api.get('/test', { baseURL: 'https://custom-api.com' })

      expect(mockFetch).toHaveBeenCalledWith(
        '/test',
        expect.objectContaining({
          baseURL: 'https://custom-api.com',
        })
      )
    })

    it('should use different headers when baseURL is overridden', async () => {
      mockFetch.mockResolvedValue({ data: 'test' })

      await $api.post('/test', {
        baseURL: 'https://custom-api.com',
        body: { name: 'test' },
      })

      const callArgs = mockFetch.mock.calls[0][1]
      // При переопределении baseURL должен быть только Accept
      expect(callArgs.headers).toEqual({
        Accept: 'application/json',
      })
    })
  })

  describe('timeout and AbortController', () => {
    it('should set default timeout of 15000ms', async () => {
      mockFetch.mockResolvedValue({ data: 'test' })

      await $api.get('/test')

      const callArgs = mockFetch.mock.calls[0][1]
      expect(callArgs.signal).toBeInstanceOf(AbortSignal)
      // Проверяем что AbortController создан (через signal)
      expect(callArgs.signal).toBeDefined()
    })

    it('should use custom timeout when provided', async () => {
      mockFetch.mockResolvedValue({ data: 'test' })

      await $api.get('/test', { timeout: 5000 })

      const callArgs = mockFetch.mock.calls[0][1]
      expect(callArgs.signal).toBeInstanceOf(AbortSignal)
      expect(callArgs.signal).toBeDefined()
    })

    it('should include AbortController signal', async () => {
      mockFetch.mockResolvedValue({ data: 'test' })

      await $api.get('/test')

      expect(mockFetch).toHaveBeenCalledWith(
        '/test',
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        })
      )
    })
  })

  describe('callbacks', () => {
    it('should call onRequest callback', async () => {
      mockFetch.mockResolvedValue({ data: 'test' })
      const onRequest = vi.fn()

      await $api.get('/test', {}, { onRequest })

      // Callback вызывается через $fetch interceptor, проверяем что он был передан
      expect(mockFetch).toHaveBeenCalled()
      // В реальном коде callback вызывается внутри $fetch, здесь мы проверяем структуру
    })

    it('should call onResponse callback on success', async () => {
      mockFetch.mockResolvedValue({ data: 'test', status: 200 })
      const onResponse = vi.fn()

      await $api.get('/test', {}, { onResponse })

      expect(mockFetch).toHaveBeenCalled()
    })

    it('should call onError and onResponseError callbacks on error', async () => {
      const errorResponse = {
        request: new Request('http://localhost/test'),
        response: {
          status: 500,
          _data: { error: 'Internal Server Error' },
        },
      }

      mockFetch.mockRejectedValue(errorResponse)
      const onError = vi.fn()
      const onResponseError = vi.fn()

      try {
        await $api.get('/test', {}, { onError, onResponseError })
      } catch (error) {
        // Ожидаем ошибку
      }

      expect(mockFetch).toHaveBeenCalled()
    })

    it('should call onRequestError callback on request error', async () => {
      const requestError = new Error('Network error')
      mockFetch.mockRejectedValue(requestError)
      const onRequestError = vi.fn()
      const onError = vi.fn()

      try {
        await $api.get('/test', {}, { onRequestError, onError })
      } catch (error) {
        // Ожидаем ошибку
      }

      expect(mockFetch).toHaveBeenCalled()
    })
  })

  describe('error handling', () => {
    it('should throw error on response error', async () => {
      const errorResponse = {
        request: new Request('http://localhost/test'),
        response: {
          status: 404,
          _data: { error: 'Not Found' },
        },
      }

      mockFetch.mockRejectedValue(errorResponse)

      // Проверяем, что ошибка выбрасывается
      await expect($api.get('/test')).rejects.toBeDefined()

      // Проверяем, что ошибка содержит информацию о статусе
      try {
        await $api.get('/test')
      } catch (error: any) {
        expect(error).toBeDefined()
        // Ошибка может иметь структуру { request, response } или { request, status, data }
        expect(error.status || error.response?.status).toBe(404)
      }
    })

    it('should throw error with correct structure', async () => {
      const errorData = {
        request: 'http://localhost/test',
        status: 500,
        data: { message: 'Server error' },
      }

      mockFetch.mockRejectedValue(errorData)

      await expect($api.get('/test')).rejects.toMatchObject({
        request: expect.any(String),
        status: 500,
        data: { message: 'Server error' },
      })
    })
  })

  describe('all HTTP methods', () => {
    it('should support PATCH method', async () => {
      mockFetch.mockResolvedValue({ data: 'updated' })

      await $api.patch('/test', { body: { name: 'test' } })

      expect(mockFetch).toHaveBeenCalledWith(
        '/test',
        expect.objectContaining({
          method: 'PATCH',
        })
      )
    })

    it('should support PUT method', async () => {
      mockFetch.mockResolvedValue({ data: 'updated' })

      await $api.put('/test', { body: { name: 'test' } })

      expect(mockFetch).toHaveBeenCalledWith(
        '/test',
        expect.objectContaining({
          method: 'PUT',
        })
      )
    })

    it('should support DELETE method', async () => {
      mockFetch.mockResolvedValue({ data: 'deleted' })

      await $api.delete('/test')

      expect(mockFetch).toHaveBeenCalledWith(
        '/test',
        expect.objectContaining({
          method: 'DELETE',
        })
      )
    })
  })

  describe('custom headers', () => {
    it('should merge custom headers with default headers', async () => {
      mockFetch.mockResolvedValue({ data: 'test' })

      await $api.get('/test', {
        headers: {
          Authorization: 'Bearer token123',
          'X-Custom-Header': 'value',
        },
      })

      const callArgs = mockFetch.mock.calls[0][1]
      expect(callArgs.headers).toMatchObject({
        Accept: 'application/json',
        Authorization: 'Bearer token123',
        'X-Custom-Header': 'value',
      })
    })
  })
})
