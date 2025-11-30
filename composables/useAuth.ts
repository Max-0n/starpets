import { useMutation } from '@tanstack/vue-query'
import { computed } from 'vue'

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

export const useAuth = () => {
  const appStore = useAppStore()

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<LoginResponse> => {
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

      return response
    },
    onSuccess: data => {
      // Сохраняем данные пользователя в store
      appStore.setUser({
        balance: data.balance,
        login: data.login,
        language: data.language,
      })
    },
  })

  const login = () => {
    loginMutation.mutate({
      email: '',
      password: '',
      code2fa: '',
    })
  }

  const isAuthenticated = computed(() => !!appStore.user)
  const isLoading = computed(() => loginMutation.isPending.value)

  return {
    login,
    loginMutation,
    isAuthenticated,
    isLoading,
  }
}
