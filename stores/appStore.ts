import type { Product } from '~/types/product'
import type { LoginRequest, LoginResponse, User } from '~/types/user'

export const useAppStore = defineStore('appStore', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const cart = ref<Product[]>([])
  const isAsideOpen = ref(false)

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

      const response = await $fetch<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: {
          email: randomEmail,
          password: randomPassword,
          code2fa: randomCode2fa,
        },
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

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    cart,
    cartTotal,
    isAsideOpen,
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
  }
})
