export interface User {
  balance: number
  login: string
  language: string
}

export interface LoginRequest {
  email: string
  password: string
  code2fa: string
}

export interface LoginResponse {
  balance: number
  login: string
  language: string
}

export const useAppStore = defineStore('appStore', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

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

  const isAuthenticated = computed(() => !!user.value)

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    setUser,
    clearUser,
    login,
  }
})
