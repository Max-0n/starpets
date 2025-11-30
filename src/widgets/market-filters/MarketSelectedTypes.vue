<template lang="pug">
  span.market-selected-types(v-if="productsStore.selectedTypes.length > 0")
    UIButton(
      v-for="type in selectedTypesDisplay"
      :key="type.value"
      appearance="white"
    ).market__button
      p.text-weight-500 {{ type.label }}
      UIIcon(
        name="close"
        @click.stop="handleTypeRemove(type.value)"
      ).size-12.ml8
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const productsStore = useProductsStore()

// Маппинг типов для отображения
const typeLabels: Record<'egg' | 'pet' | 'potion', string> = {
  egg: 'Яйцо',
  pet: 'Питомец',
  potion: 'Зелье',
}

// Отображение выбранных типов
const selectedTypesDisplay = computed(() => {
  return productsStore.selectedTypes.map(type => ({
    value: type,
    label: typeLabels[type],
  }))
})

// Обработчик удаления типа
const handleTypeRemove = (type: 'egg' | 'pet' | 'potion') => {
  productsStore.removeType(type)
}
</script>

<style lang="scss" scoped>
.market-selected-types {
  display: inline-flex;
  gap: 16px;

  @media (max-width: 1023px) {
    display: none;
  }
}

.market__button {
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 100%;
  border-radius: 4px;
  background: var(--color-white);
  text-align: left;
  padding: 8px 14px;

  &:hover {
    background: var(--color-grey-bg);
  }
}
</style>
