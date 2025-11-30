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
        UIInput(v-model="searchQuery" placeholder="Быстрый поиск")

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


</template>

<script lang="ts" setup>
import { ref } from 'vue'

const appStore = useAppStore()
const isTransportOpen = ref(false)
const isSortOpen = ref(false)
const searchQuery = ref('')
</script>

<style lang="scss" scoped>
.market {
  width: 100%;

  &__search {
    width: 300px;
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

}
</style>
