export const useAppStore = defineStore('appStore', () => {
  const user = ref<{ id: number }>()

  return {
    user,
  }
})
