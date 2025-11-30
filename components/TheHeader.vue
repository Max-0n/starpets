<template lang="pug">
  header
    .header__left
      NuxtLink(to="/").logo
        UIIcon(name="logo")

      //- .header__tabs.text-size-18.text-weight-500
      //-   NuxtLink(to="/").nav-link
      //-     p Маркет
      //-   NuxtLink(to="/products").nav-link
      //-     p Предметы
      //-   NuxtLink(to="/sale").nav-link
      //-     p Продажа
      //-   NuxtLink(to="/currency").nav-link
      //-     p R$
      //-   NuxtLink(to="/help").nav-link
      //-     p Помощь

    .header__right
      UIButton(appearance="secondary" withoutPadding ghost)
        .header__cart
          .header__cart-info.text-color-black
            p.text-weight-600 1 415.61 $
            p.text-size-14 Ваш баланс

          UIButton(appearance="primary" withoutPadding).size-48
            p.text-size-32 +
    
      UIButton(appearance="secondary" withoutPadding).size-48
        UIFlag(code="ru").size-24

      UIButton(appearance="secondary" withoutPadding ghost)
        .header__cart
          .header__cart-info.text-color-black
            p.text-size-14.text-weight-600  StarPets LTD
            p.text-size-14 Профиль

          UIAvatar(:image="avaImage").size-56

      UIButton(appearance="secondary" withoutPadding).size-48
        p $
    
      UIButton(appearance="secondary")
        p Вход
      UIButton(appearance="primary")
        p Регистрация
        UIIcon(name="arrowFullRight").ml6.size-12

      UIButton(appearance="secondary" withoutPadding @click="isActiveCart = !isActiveCart").header__cart-button
        .header__cart
          UIButton(appearance="primary" withoutPadding).size-48
            UIIcon(name="cart").size-24

          .header__cart-info.text-color-black
            p.text-size-12 К покупке
            p.text-weight-700 0 $

          UIIcon(name="arrowRight" :class="{ 'active': isActiveCart }").size-18.header__cart-arrow
</template>

<script setup lang="ts">
import { ref } from 'vue'
import avaImage from '~/assets/images/ava.jpg'

const route = useRoute()
const isActiveCart = ref(false)

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
    &__right {
      gap: 24px;
    }

    &__cart {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;

      &-button {
        height: 100%;
        padding: 0 16px;
        border-radius: 0;
      }

      &-info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        gap: 4px;
        min-width: 60px;
      }

      &-arrow {
        transition: transform 0.2s ease-in-out;
        transform: rotate(90deg);
        &.active {
          transform: rotate(270deg);
        }
      }
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

