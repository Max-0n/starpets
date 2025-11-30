export interface User {
  balance: number
  login: string
  language: string
}

export const useAppStore = defineStore('appStore', () => {
  const user = ref<User | null>(null)

  const setUser = (userData: User) => {
    user.value = userData
  }

  const clearUser = () => {
    user.value = null
  }

  return {
    user,
    setUser,
    clearUser,
  }
})
