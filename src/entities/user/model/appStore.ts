import type { Product } from '~/shared/types/product'
import type { LoginRequest, User } from '~/shared/types/user'
import { userApi } from '../api'

export const useAppStore = defineStore('appStore', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const cart = ref<Product[]>([])
  const isAsideOpen = ref(false)
  const isNavOpen = ref(false)

  const setUser = (userData: User) => {
    user.value = userData
  }

  const clearUser = () => {
    user.value = null
  }

  const login = async (credentials?: LoginRequest) => {
    isLoading.value = true
    error.value = null

    try {
      // Генерируем рандомные данные для запроса
      const randomEmail = `user${Math.floor(Math.random() * 10000)}@example.com`
      const randomPassword = Math.random().toString(36).slice(-12)
      const randomCode2fa = Math.floor(100000 + Math.random() * 900000).toString()

      const response = await userApi.login({
        email: randomEmail,
        password: randomPassword,
        code2fa: randomCode2fa,
      })

      setUser({
        balance: response.balance,
        login: response.login,
        language: response.language,
      })
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка входа'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const addToCart = (product: Product) => {
    cart.value.push(product)
  }

  const removeFromCart = (productId: string) => {
    const index = cart.value.findIndex(p => p.id === productId)
    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }

  const clearCart = () => {
    cart.value = []
  }

  const cartTotal = computed(() => {
    return cart.value.reduce((sum, product) => sum + product.price, 0)
  })

  const purchaseCart = () => {
    if (!user.value) {
      alert('Необходимо войти в систему')
      return false
    }

    const total = cartTotal.value
    if (user.value.balance < total) {
      alert('Недостаточно средств на балансе')
      return false
    }

    user.value.balance -= total

    // Сохраняем покупки в localStorage
    if (process.client && cart.value.length > 0) {
      const STORAGE_KEY = 'last-purchases'
      try {
        const existingPurchases = localStorage.getItem(STORAGE_KEY)
        const purchases: Product[] = existingPurchases ? JSON.parse(existingPurchases) : []

        // Добавляем новые покупки в начало массива
        const newPurchases = [...cart.value, ...purchases]

        // Ограничиваем количество (например, последние 50)
        const limitedPurchases = newPurchases.slice(0, 50)

        localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedPurchases))

        // Отправляем кастомное событие для обновления компонента на текущей вкладке
        window.dispatchEvent(new Event('purchase-completed'))
      } catch (error) {
        console.error('Error saving purchases to localStorage:', error)
      }
    }

    clearCart()
    return true
  }

  const isAuthenticated = computed(() => !!user.value)

  const openAside = () => {
    isAsideOpen.value = true
  }

  const closeAside = () => {
    // На больших экранах (1440px+) aside нельзя закрыть
    if (typeof window !== 'undefined' && window.innerWidth >= 1440) {
      return
    }
    isAsideOpen.value = false
  }

  const toggleAside = () => {
    if (isAsideOpen.value) {
      closeAside()
    } else {
      openAside()
    }
  }

  const openNav = () => {
    isNavOpen.value = true
  }

  const closeNav = () => {
    isNavOpen.value = false
  }

  const toggleNav = () => {
    if (isNavOpen.value) {
      closeNav()
    } else {
      openNav()
    }
  }

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    cart,
    cartTotal,
    isAsideOpen,
    isNavOpen,
    setUser,
    clearUser,
    login,
    addToCart,
    removeFromCart,
    clearCart,
    purchaseCart,
    openAside,
    closeAside,
    toggleAside,
    openNav,
    closeNav,
    toggleNav,
  }
})
