<template lang="pug">
  .market
    .market__filters
      .market__filter-button
        UIButton(appearance="white" @click="isTransportOpen = !isTransportOpen").market__button
          p.text-weight-500 Транспорт
          UIIcon(name="arrowRight" :class="{ 'active': isTransportOpen }").ml6.size-18.market__arrow

        .market__dropdown(v-show="isTransportOpen")
          UIButton(appearance="secondary" ghost)
            .market__button
              p.text-weight-500 Яйцо

          UIButton(appearance="secondary" ghost)
            .market__button
              p.text-weight-500 Питомец

          UIButton(appearance="secondary" ghost)
            .market__button
              p.text-weight-500 Зелье

      UIButton(appearance="white").market__button
        p.text-weight-500 Яйцо

      UIButton(appearance="white").market__button
        p.text-weight-500 Питомец

      UIButton(appearance="white").market__button
        p.text-weight-500 Зелье

    .market__filters
      UIButton(appearance="white" withoutPadding).size-46
        UIIcon(name="filters").size-24

      .market__search
        .market__search-wrapper
          UIInput(
            v-model="searchQuery"
            placeholder="Быстрый поиск"
            @focus="isSearchHistoryOpen = true"
            @blur="handleSearchBlur"
            @keydown.enter="handleSearchEnter"
          )
          .market__search-dropdown(v-show="isSearchHistoryOpen && searchHistory.length > 0")
            .market__search-header
              p.text-weight-500 История запросов
              button.market__search-clear(@click="clearAllHistory")
                p Удалить все
            .market__search-list
              .market__search-item(
                v-for="(item, index) in searchHistory"
                :key="index"
                @mousedown.prevent="selectHistoryItem(item)"
              )
                p {{ item }}
                button.market__search-item-delete(@mousedown.stop.prevent="deleteHistoryItem(index)")
                  UIIcon(name="close").size-12

      .market__filter-button
        UIButton(appearance="white" @click="isSortOpen = !isSortOpen")
          UIBadge(color="blue").size-32.mt-8.ml-14.mb-8.mr8
            UIIcon(name="star").size-24
          p.text-weight-500 Популярность
          UIIcon(name="arrowRight" :class="{ 'active': isSortOpen }").ml6.size-18.market__arrow

        .market__dropdown(v-show="isSortOpen")
          UIButton(appearance="secondary" wide ghost)
            .market__button
              UIBadge(color="orange").size-32.mt-4.ml-8.mb-4.mr8
                UIIcon(name="tag").size-24
              p.text-weight-500 Выгода

          UIButton(appearance="secondary" wide ghost)
            .market__button
              UIBadge(color="green").size-32.mt-4.ml-8.mb-4.mr8
                UIIcon(name="sortAsc").size-24
              p.text-weight-500 Цена

          UIButton(appearance="secondary" wide ghost)
            .market__button
              UIBadge(color="red").size-32.mt-4.ml-8.mb-4.mr8
                UIIcon(name="sortDesc").size-24
              p.text-weight-500 Цена

      UIButton(appearance="white")
        p.text-weight-500 Цена
        UIIcon(name="close").size-12.ml8

    .market__list
      ProductCard(
        v-for="product in productsStore.products"
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
      )
      .market__loading(v-if="productsStore.isLoading")
        p Загрузка...
      .market__error(v-if="productsStore.error")
        p {{ productsStore.error }}

</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import type { Product } from '~/types/product'

const appStore = useAppStore()
const productsStore = useProductsStore()
const isTransportOpen = ref(false)
const isSortOpen = ref(false)
const searchQuery = ref('')
const isSearchHistoryOpen = ref(false)
const searchHistory = ref<string[]>([])

const STORAGE_KEY = 'search-history'

// Загрузка истории из localStorage
const loadSearchHistory = () => {
  if (process.client) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        searchHistory.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Error loading search history:', error)
    }
  }
}

// Сохранение истории в localStorage
const saveSearchHistory = () => {
  if (process.client) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory.value))
    } catch (error) {
      console.error('Error saving search history:', error)
    }
  }
}

// Добавление запроса в историю
const addToHistory = (query: string) => {
  if (!query || !query.trim()) return

  const trimmedQuery = query.trim()

  // Удаляем дубликаты
  searchHistory.value = searchHistory.value.filter(item => item !== trimmedQuery)

  // Добавляем в начало
  searchHistory.value.unshift(trimmedQuery)

  // Ограничиваем количество (например, последние 10)
  if (searchHistory.value.length > 10) {
    searchHistory.value = searchHistory.value.slice(0, 10)
  }

  saveSearchHistory()
}

// Удаление элемента из истории
const deleteHistoryItem = (index: number) => {
  searchHistory.value.splice(index, 1)
  saveSearchHistory()
}

// Очистка всей истории
const clearAllHistory = () => {
  searchHistory.value = []
  saveSearchHistory()
}

// Выбор элемента из истории
const selectHistoryItem = (item: string) => {
  searchQuery.value = item
  isSearchHistoryOpen.value = false
  // Можно добавить триггер поиска здесь, если нужно
}

// Обработка blur
const handleSearchBlur = () => {
  // Сохраняем запрос в историю, если он есть
  if (searchQuery.value.trim()) {
    addToHistory(searchQuery.value)
  }

  // Используем nextTick чтобы дать время на клик по элементу истории
  nextTick(() => {
    setTimeout(() => {
      isSearchHistoryOpen.value = false
    }, 200)
  })
}

// Обработка Enter
const handleSearchEnter = () => {
  if (searchQuery.value.trim()) {
    addToHistory(searchQuery.value)
    isSearchHistoryOpen.value = false
  }
}

// Дебаунс для поискового запроса
const debouncedSearchQuery = useDebounce(searchQuery, 300)

// Загрузка истории при монтировании
onMounted(() => {
  loadSearchHistory()
  // Загружаем продукты при монтировании компонента
  productsStore.fetchProducts()
})

// Обработчик добавления в корзину
const handleAddToCart = (product: Product) => {
  appStore.addToCart(product)
}
</script>

<style lang="scss" scoped>
.market {
  width: 100%;

  &__search {
    width: 300px;
    position: relative;

    &-wrapper {
      position: relative;
      width: 100%;
    }

    &-dropdown {
      position: absolute;
      top: calc(100% + 2px);
      left: 0;
      right: 0;
      max-height: 400px;
      padding: 12px;
      background: var(--color-white);
      border-radius: 8px;
      box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.03);
      z-index: 100;
    }

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      padding-bottom: 8px;
      border-bottom: 1px solid #F6F6F6;

      p {
        margin: 0;
        color: #646464;
        font-size: 16px;
      }
    }

    &-clear {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      color: #646464;
      font-size: 14px;
      transition: color 0.15s ease-in-out;

      &:hover {
        color: #000;
      }

      p {
        margin: 0;
      }
    }

    &-list {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.15s ease-in-out;

      &:hover {
        background: #F6F6F6;
      }

      p {
        margin: 0;
        color: #000;
        font-size: 14px;
        flex: 1;
      }
    }

    &-item-delete {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #646464;
      transition: color 0.15s ease-in-out;
      margin-left: 8px;

      &:hover {
        color: #000;
      }
    }
  }

  &__filters {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 16px;
    margin: 20px 16px;

    & > .size-46 {
      flex: 0 0 auto;
    }
  }

  &__filter-button {
    position: relative;
  }

  &__button {
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 100%;
    border-radius: 4px;
    background: #fff;
    text-align: left;
    padding: 8px 14px;

    &:hover {
      background: #F6F6F6;
    }

    &__inner {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      background: #fff;
      border: 2px solid #F6F6F6;
      border-radius: 8px;
      padding: 10px 16px;
    }
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    max-height: 570px;
    padding: 4px;
    background: var(--color-white);
    border-radius: 8px;
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.03);
    z-index: 100;

    & > *,
    .market__button {
      width: 100%;
    }
  }

  &__arrow {
    transition: transform 0.2s ease-in-out;
    transform: rotate(90deg);
    &.active {
      transform: rotate(270deg);
    }
  }

  &__list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 10px;
    margin: 16px;
  }

  &__loading,
  &__error {
    width: 100%;
    padding: 20px;
    text-align: center;
    color: #646464;
  }

  &__error {
    color: #ff0000;
  }
}
</style>
