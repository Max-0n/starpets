<template lang="pug">
  .last-purchases-section
    .last-purchases-section__left
      ProductsTotalPurchases(:wide="isWide" :transactionsCount="purchasesCount" :onlineUsersCount="3415")
    .last-purchases-section__right
      .last-purchases-section__scroll
        ProductPurchased(
          v-for="product in purchases"
          :key="product.id"
          :product="product"
        )
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { Product } from '~/types/product'

const STORAGE_KEY = 'last-purchases'
const purchases = ref<Product[]>([])
const windowWidth = ref(0)

const purchasesCount = computed(() => purchases.value.length + 4513613)
const isWide = computed(() => windowWidth.value >= 1440)

const loadPurchases = () => {
  if (process.client) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        purchases.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Error loading purchases from localStorage:', error)
    }
  }
}

// Обработчики событий
const handleStorageChange = (e: StorageEvent) => {
  if (e.key === STORAGE_KEY) {
    loadPurchases()
  }
}

const handlePurchaseCompleted = () => {
  loadPurchases()
}

const updateWindowWidth = () => {
  if (process.client) {
    windowWidth.value = window.innerWidth
  }
}

// Загружаем покупки при монтировании
onMounted(() => {
  loadPurchases()
  updateWindowWidth()

  // Слушаем изменения в localStorage (на случай если покупка произошла в другой вкладке)
  if (process.client) {
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('resize', updateWindowWidth)

    // Также слушаем события на текущей вкладке через кастомное событие
    window.addEventListener('purchase-completed', handlePurchaseCompleted)
  }
})

// Очищаем слушатели при размонтировании
onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('storage', handleStorageChange)
    window.removeEventListener('resize', updateWindowWidth)
    window.removeEventListener('purchase-completed', handlePurchaseCompleted)
  }
})
</script>

<style lang="scss" scoped>
.last-purchases-section {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
  padding: 4px;
  background: var(--color-white);
  border-radius: 8px;
  width: 100%;
  overflow: hidden;

  &__left {
    flex: 0 0 auto;
  }

  &__right {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    gap: 8px;

    :deep(.product-purchased) {
      flex: 1 0 auto;
    }
  }

  &__scroll {
    display: flex;
    flex-direction: row;
    gap: 10px;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: var(--color-grey-bg) transparent;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-grey-bg);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: var(--color-grey-medium);
    }
  }
}
</style>

