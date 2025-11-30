<template lang="pug">
  .market__filters
    .market__filter-button
      UIButton(appearance="white" @click="isTransportOpen = !isTransportOpen").market__button
        p.text-weight-500 Транспорт
        UIIcon(name="arrowRight" :class="{ 'active': isTransportOpen }").ml6.size-18.market__arrow

      .market__dropdown(v-show="isTransportOpen")
        UIButton(
          appearance="secondary" 
          ghost
          @click="handleTypeClick('egg')"
        )
          .market__button
            p.text-weight-500 Яйцо

        UIButton(
          appearance="secondary" 
          ghost
          @click="handleTypeClick('pet')"
        )
          .market__button
            p.text-weight-500 Питомец

        UIButton(
          appearance="secondary" 
          ghost
          @click="handleTypeClick('potion')"
        )
          .market__button
            p.text-weight-500 Зелье

    UIButton(
      appearance="white" 
      @click="handleTypeClick('egg')"
      :class="{ 'active': productsStore.selectedTypes.includes('egg') }"
    ).market__button
      p.text-weight-500 Яйцо

    UIButton(
      appearance="white" 
      @click="handleTypeClick('pet')"
      :class="{ 'active': productsStore.selectedTypes.includes('pet') }"
    ).market__button
      p.text-weight-500 Питомец

    UIButton(
      appearance="white" 
      @click="handleTypeClick('potion')"
      :class="{ 'active': productsStore.selectedTypes.includes('potion') }"
    ).market__button
      p.text-weight-500 Зелье
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const productsStore = useProductsStore()
const isTransportOpen = ref(false)

// Обработчик клика на тип
const handleTypeClick = (type: 'egg' | 'pet' | 'potion') => {
  productsStore.toggleType(type)
  isTransportOpen.value = false
}
</script>

<style lang="scss" scoped>
.market__filters {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
  margin: 20px 16px;

  & > .size-46 {
    flex: 0 0 auto;
  }
}

.market__filter-button {
  position: relative;
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

.market__dropdown {
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  max-height: 570px;
  padding: 4px;
  background: var(--color-white);
  border-radius: 8px;
  box-shadow: var(--box-shadow-dropdown);
  z-index: 100;

  & > *,
  .market__button {
    width: 100%;
  }
}

.market__arrow {
  transition: transform 0.2s ease-in-out;
  transform: rotate(90deg);
  &.active {
    transform: rotate(270deg);
  }
}
</style>
