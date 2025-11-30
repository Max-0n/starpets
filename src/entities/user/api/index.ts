import type { LoginRequest, LoginResponse } from '~/shared/types/user'

export const userApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    return await $fetch<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: credentials,
    })
  },
}
