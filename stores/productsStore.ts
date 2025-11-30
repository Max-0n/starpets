import { computed } from 'vue'
import type { FetchProductsRequest, FetchProductsResponse, Product, ProductLevel, ProductRarity } from '~/types/product'

// Маппинг цветов на значения бэкенда
const RARITY_MAP: Record<string, ProductRarity> = {
  blue: 'common',
  purple: 'uncommon',
  green: 'rare',
  red: 'ultra_rare',
  grey: 'legendary',
}

// Маппинг свойств UI на значения бэкенда
const PROPERTY_MAP: Record<string, 'default' | 'neon' | 'mega_neon' | 'flyable' | 'rideable'> = {
  regular: 'default',
  neon: 'neon',
  mega: 'mega_neon',
  fly: 'flyable',
  raid: 'rideable',
}

export const useProductsStore = defineStore('productsStore', () => {
  const products = ref<Product[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const totalPages = ref(1)
  const total = ref(0)

  // Фильтры
  const selectedRarityIndices = ref<number[]>([])
  const selectedProperties = ref<string[]>([])

  const selectedRarities = computed<ProductRarity[]>(() => {
    const rarityColors = ['blue', 'purple', 'green', 'red', 'grey']
    return selectedRarityIndices.value
      .map(index => rarityColors[index])
      .filter((color): color is string => Boolean(color))
      .map(color => RARITY_MAP[color])
      .filter((rarity): rarity is ProductRarity => Boolean(rarity))
  })

  // Преобразование выбранных свойств в levels и properties для запроса
  const selectedLevels = computed<ProductLevel[]>(() => {
    return selectedProperties.value
      .map(prop => PROPERTY_MAP[prop])
      .filter((value): value is ProductLevel => value === 'default' || value === 'neon' || value === 'mega_neon')
  })

  const selectedPropertiesFilter = computed(() => {
    const hasFlyable = selectedProperties.value.some(prop => PROPERTY_MAP[prop] === 'flyable')
    const hasRideable = selectedProperties.value.some(prop => PROPERTY_MAP[prop] === 'rideable')

    if (!hasFlyable && !hasRideable) {
      return undefined
    }

    return {
      missing: false,
      ...(hasFlyable && { flyable: true }),
      ...(hasRideable && { rideable: true }),
    }
  })

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

  // Методы управления фильтрами
  const toggleRarity = (index: number) => {
    const idx = selectedRarityIndices.value.indexOf(index)
    if (idx > -1) {
      selectedRarityIndices.value.splice(idx, 1)
    } else {
      selectedRarityIndices.value.push(index)
    }
    // Автоматически обновляем продукты при изменении фильтров
    fetchProducts()
  }

  const clearRarities = () => {
    selectedRarityIndices.value = []
    fetchProducts()
  }

  const toggleProperty = (type: string) => {
    const idx = selectedProperties.value.indexOf(type)
    if (idx > -1) {
      selectedProperties.value.splice(idx, 1)
    } else {
      selectedProperties.value.push(type)
    }
    // Автоматически обновляем продукты при изменении фильтров
    fetchProducts()
  }

  const clearProperties = () => {
    selectedProperties.value = []
    fetchProducts()
  }

  // Параметры запроса по умолчанию
  const getRequestParams = (): FetchProductsRequest => {
    const baseTypes = [
      { type: 'transport' as const },
      { type: 'pet' as const },
      { type: 'egg' as const },
      { type: 'potion' as const },
    ]

    // Формируем фильтры для каждого типа
    const types = baseTypes.map(type => {
      const typeFilter: any = { ...type }

      // Добавляем редкости, если выбраны
      if (selectedRarities.value.length > 0) {
        typeFilter.rarities = selectedRarities.value
      }

      // Добавляем уровни, если выбраны
      if (selectedLevels.value.length > 0) {
        typeFilter.levels = selectedLevels.value
      }

      // Добавляем свойства, если выбраны
      if (selectedPropertiesFilter.value) {
        typeFilter.properties = selectedPropertiesFilter.value
      }

      return typeFilter
    })

    return {
      filter: {
        types,
      },
      page: currentPage.value,
      amount: 72,
      currency: 'usd',
      sort: { price: 'desc' },
    }
  }

  // Метод для выполнения запроса
  const fetchProducts = async () => {
    isLoading.value = true
    error.value = null

    try {
      const requestParams = getRequestParams()
      const response = (await $api.post('https://market.apineural.com/api/store/items/all', {
        body: requestParams,
        baseURL: '', // Override baseURL to use full URL
      })) as FetchProductsResponse

      // Сохраняем продукты в store
      if (response.items) {
        setProducts(response.items)
      }

      if (response.totalPages) {
        setTotalPages(response.totalPages)
      }

      if (response.total !== undefined) {
        setTotal(response.total)
      }

      if (response.page) {
        setPage(response.page)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка загрузки продуктов'
      setError(errorMessage)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    products,
    isLoading,
    error,
    currentPage,
    totalPages,
    total,
    selectedRarityIndices,
    selectedRarities,
    selectedProperties,
    setProducts,
    addProducts,
    clearProducts,
    setPage,
    setTotalPages,
    setTotal,
    setError,
    setLoading,
    toggleRarity,
    clearRarities,
    toggleProperty,
    clearProperties,
    fetchProducts,
  }
})
