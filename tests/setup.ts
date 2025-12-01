import { beforeEach, vi } from 'vitest'
import { defineComponent } from 'vue'

// Используем vi.hoisted для моков, которые нужны до импорта
const { mockUseRuntimeConfig } = vi.hoisted(() => {
  const mockFn = () => ({
    public: {
      apiUrl: 'http://localhost:3000/api',
      appEnv: 'test',
    },
  })
  return { mockUseRuntimeConfig: mockFn }
})

// Мокаем Nuxt composables глобально (для auto-imports)
global.useRuntimeConfig = mockUseRuntimeConfig as any

// Мокаем Nuxt composables через #app
vi.mock('#app', () => ({
  useRuntimeConfig: mockUseRuntimeConfig,
  useNuxtApp: vi.fn(() => ({
    $i18n: {
      t: (key: string) => key,
    },
  })),
  navigateTo: vi.fn(),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
  })),
  useRoute: vi.fn(() => ({
    path: '/',
    query: {},
    params: {},
  })),
}))

// Мокаем Nuxt auto-imports
global.defineNuxtConfig = vi.fn()
global.defineNuxtPlugin = vi.fn()
global.definePageMeta = vi.fn()
global.defineComponent = defineComponent

// Мокаем $fetch
global.$fetch = vi.fn()

// Мокаем Pinia defineStore для тестов
global.defineStore = vi.fn((name, setup) => {
  return () => setup()
})

// Мокаем Nuxt auto-imports для stores
global.useProductsStore = vi.fn(() => ({
  setLoading: vi.fn(),
  setError: vi.fn(),
  setProducts: vi.fn(),
  setTotalPages: vi.fn(),
  setTotal: vi.fn(),
  setPage: vi.fn(),
}))

beforeEach(() => {
  vi.clearAllMocks()
})
