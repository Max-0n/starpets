<template lang="pug">
  .products-total-purchases(:class="{ 'wide': wide }")
    UIIcon(name="totalPurchases").products-total-purchases__icon
    .products-total-purchases__content
      p.products-total-purchases__title(v-if="wide") Сделок за все время
      p.products-total-purchases__transactions.text-weight-700.text-size-18(:class="{ 'mb24': wide }") {{ formattedTransactions }}
      p.products-total-purchases__online-users.text-weight-500.text-size-10.mb10(v-if="!wide") Сделок за все время
      p.products-total-purchases__title.text-weight-500.text-size-14.products-total-purchases_indicator {{ formattedOnlineUsers }} {{ wide ? 'в сети' : '' }}
      p.products-total-purchases__online-users.text-weight-500.text-size-10(v-if="!wide") Пользователей в сети

</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    transactionsCount?: number
    onlineUsersCount?: number
    wide?: boolean
  }>(),
  {
    transactionsCount: 0,
    onlineUsersCount: 0,
    wide: false,
  }
)

const formattedTransactions = computed(() => {
  return props.transactionsCount.toLocaleString('ru-RU')
})

const formattedOnlineUsers = computed(() => {
  return props.onlineUsersCount.toLocaleString('ru-RU')
})
</script>

<style lang="scss" scoped>
.products-total-purchases {
  position: relative;
  width: 160px;
  height: 125px;
  padding: 24px 20px;
  border-radius: 8px;
  overflow: hidden;

  &.wide {
    width: 400px;
  }

  &__title {
    color: var(--color-grey-medium);
    margin-bottom: 6px;
  }

  &__icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  &__content {
    position: absolute;
    z-index: 1;
    top: 0px;
    bottom: 0;
    margin: auto;
    right: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }
  
  &__transactions {
    color: var(--color-text-black);
    margin-bottom: 6px;
    &.mb24 {
      margin-bottom: 24px;
    }
  }
  
  &__online-users {
    color: var(--color-grey-medium);
    max-width: 100%;
    margin-top: 10px;
  }

  &_indicator {
    position: relative;

    &::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: -16px;
        bottom: 0;
        margin: auto;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 2px solid #daf1d1;
        background: #40BB18;
    }
  }
  

  &:not(.wide) {
    padding-left: 10px;
    .products-total-purchases__icon {
      transform: rotate(190deg) scale(0.4) translate(-120px, 150px);
    }
    .products-total-purchases__content {
      right: auto;
      left: 10px;
      align-items: flex-start;
      text-align: left;
    }
    .products-total-purchases_indicator {
      margin-left: 16px;
    }

    .products-total-purchases__online-users {
        margin-top: 0;
    }
  }
}
</style>

