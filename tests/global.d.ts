import { vi } from 'vitest'

declare global {
  function useRuntimeConfig(): {
    public: {
      apiUrl: string
      appEnv: string
    }
  }
  function useProductsStore(): any
  function defineStore(name: string, setup: any): any
  var $fetch: typeof fetch
  var defineNuxtConfig: any
  var defineNuxtPlugin: any
  var definePageMeta: any
}
