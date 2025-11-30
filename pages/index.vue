<template lang="pug">
  .market
    .market__filters
      .market__filter-button
        UIButton(appearance="secondary" withoutPadding @click="isActiveCart = !isActiveCart" ghost).market__button
          .market__button__inner
            p.text-weight-500 Транспорт
            UIIcon(name="arrowRight" :class="{ 'active': isActiveCart }").size-18.market__arrow

        .market__dropdown(v-show="isActiveCart")

      UIButton(appearance="secondary" withoutPadding).market__button
        .market__button__inner
          p.text-weight-500 Яйцо

      UIButton(appearance="secondary" withoutPadding).market__button
        .market__button__inner
          p.text-weight-500 Питомец

      UIButton(appearance="secondary" withoutPadding).market__button
        .market__button__inner
          p.text-weight-500 Зелье


</template>

<script lang="ts" setup>
import { ref } from 'vue'

const appStore = useAppStore()
const isActiveCart = ref(false)
</script>

<style lang="scss" scoped>
.market {
  &__filters {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    margin: 20px 16px;
  }

  &__filter-button {
    position: relative;
  }

  &__button {
    height: 100%;
    padding: 0 16px;
    border-radius: 0;
    

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
      padding: 14px;
      background: var(--color-white);
      border-radius: 8px;
      box-shadow: 0px 4px 18px 0px rgba(0, 0, 0, 0.03);
      z-index: 100;
  }

  &__arrow {
    transition: transform 0.2s ease-in-out;
    transform: rotate(90deg);
    &.active {
      transform: rotate(270deg);
    }
  }

}
</style>
