import { beforeEach, vi } from 'vitest'
import { defineComponent } from 'vue'

// Мокаем Nuxt composables
vi.mock('#app', () => ({
  useRuntimeConfig: vi.fn(() => ({
    public: {
      apiUrl: 'http://localhost:3000/api',
      appEnv: 'test',
    },
  })),
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

beforeEach(() => {
  vi.clearAllMocks()
})
