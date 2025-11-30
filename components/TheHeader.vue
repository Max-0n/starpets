<template lang="pug">
  header
    .header__left
      NuxtLink(to="/").logo
        UIIcon(name="logo")

      .header__tabs.text-size-18
        NuxtLink(to="/").nav-link
          p Маркет
        NuxtLink(to="/products").nav-link
          p Предметы
        NuxtLink(to="/sale").nav-link
          p Продажа
        NuxtLink(to="/currency").nav-link
          p R$
        NuxtLink(to="/help").nav-link
          p Помощь

    .header__right
      
</template>

<script setup lang="ts">
const route = useRoute()

const isActive = (path: string) => {
  return route.path === path
}

const purchaseAmount = ref('0.00')

const handleLogin = () => {
  // TODO: Implement login logic
}

const handleRegistration = () => {
  // TODO: Implement registration logic
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 82px;
  background: var(--color-white);

  .header {
    &__left,
    &__right,
    &__tabs {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 100%;
    }

    &__left {
      gap: 80px;
    }
  }

  .logo {
    margin-left: 28px;
    width: 201px;
    height: 32px;
  }

  .nav-link {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    color: #838383;
    text-decoration: none;
    padding: 0 8px;

    &.is-active,
    &:hover {
      color: #000000;
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: calc(80% - 16px);
        height: 3px;
        background: #FE9920;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      }
    }

    &:not(.is-active) {
      cursor: pointer;
    }
    &.is-active {
      cursor: default;
    }
  }
}
</style>

