<template lang="pug">
  header
    .header__left
      NuxtLink(to="/").logo
        UIIcon(name="logo").header__logo-full
        UIImage(:image="logoMiniImage").header__logo-mini

      .header__tabs.text-size-18.text-weight-500
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
      UIButton(v-if="isAuthenticated" appearance="secondary" withoutPadding ghost).header__balance-button
        .header__cart
          .header__cart-info.text-color-black
            p.text-weight-600 {{ formattedBalance }}
            p.text-size-14 Ваш баланс

          UIButton(appearance="primary" withoutPadding).size-48
            p.text-size-32 +
    
      UIButton(appearance="secondary" withoutPadding).size-48
        UIFlag(code="ru").size-24

      UIButton(v-if="isAuthenticated" appearance="secondary" withoutPadding ghost).header__balance-button
        .header__cart
          .header__cart-info.text-color-black.header__cart-info--profile
            p.text-size-14.text-weight-600 {{ userLogin }}
            p.text-size-14 Профиль

          UIAvatar(:image="avaImage").size-56
    
      template(v-if="!isAuthenticated")
        UIButton(appearance="secondary" withoutPadding).size-48
          p $
        UIButton(appearance="secondary" @click="handleAuth" :progress="isLoading")
          p Вход
        UIButton(appearance="primary" @click="handleAuth" :progress="isLoading")
          p Регистрация
          UIIcon(name="arrowFullRight").ml6.size-12

      UIButton(appearance="secondary" withoutPadding @click="isActiveCart = !isActiveCart").header__cart-button
        .header__cart
          UIButton(appearance="primary" withoutPadding).size-48
            UIIcon(name="cart").size-24
            .header__cart-count.text-weight-700(v-show="cartItemsCount > 0") {{ cartItemsCount }}

          .header__cart-info.text-color-black.header__cart-info--cart
            p.text-size-12 К покупке
            p.text-weight-700 {{ formattedCartTotal }}

          UIIcon(name="arrowRight" :class="{ 'active': isActiveCart }").size-18.header__cart-arrow.header__cart-arrow--mobile-hidden

      .header__cart-dropdown(v-show="isActiveCart")
        .header__cart-dropdown__row
          UIBadge(color="orange" size="md")
            UIIcon(name="cartBag").size-32
          p.text-size-18.text-weight-500 {{ cartItemsCount }} предмета в корзине

        .header__cart-dropdown__list
          ProductCardWide(
            v-for="product in appStore.cart"
            :key="product.id"
            :product="product"
            @remove="handleRemoveFromCart"
          )

        .header__cart-dropdown__total.mt10
          p.text-weight-500 Сумма покупки
          p.text-weight-700.text-color-black {{ formattedCartTotal }}

        UIButton(appearance="primary" wide @click="handlePurchase").mt10
          UIIcon(name="cart").size-24
          p Купить

        UIButton(appearance="secondary" wide @click="handleClearCart").mt10
          p Очистить корзину
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import avaImage from '~/assets/images/ava.jpg'
import logoMiniImage from '~/assets/images/logoMini.png'

const route = useRoute()
const isActiveCart = ref(false)
const appStore = useAppStore()
const { login, clearCart, purchaseCart, removeFromCart } = appStore
const { isAuthenticated, isLoading, user, cart, cartTotal } = storeToRefs(appStore)

const isActive = (path: string) => {
  return route.path === path
}

const purchaseAmount = ref('0.00')

const handleAuth = () => {
  login()
}

const formattedBalance = computed(() => {
  if (!user.value?.balance) return '0.00 $'
  return `${user.value.balance.toFixed(2)} $`
})

const userLogin = computed(() => {
  return user.value?.login || 'StarPets LTD'
})

const cartItemsCount = computed(() => {
  return cart.value.length
})

const formattedCartTotal = computed(() => {
  const total = cartTotal.value || 0
  return `${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $`
})

const handleClearCart = () => {
  clearCart()
}

const handlePurchase = () => {
  purchaseCart()
}

const handleRemoveFromCart = (productId: string) => {
  removeFromCart(productId)
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

    &__tabs {
      @media (max-width: 1439px) {
        display: none;
      }
    }

    &__left {
      gap: 80px;
    }
    &__right {
      gap: 24px;
    }

    &__balance-button {
      @media (max-width: 743px) {
        display: none;
      }
    }

    &__cart {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;

      &-button {
        height: 100%;
        padding: 0 16px;
        border-radius: 0;
      }

      &-count {
        position: absolute;
        top: -10px;
        right: -10px;
        min-width: 20px;
        height: 20px;
        border-radius: 6px;
        background: var(--color-white);
        color: var(--color-black);
      }

      &-dropdown {
        position: absolute;
        top: calc(100% + 10px);
        right: 10px;
        width: 450px;
        max-height: 570px;
        padding: 14px;
        background: var(--color-white);
        border-radius: 8px;
        box-shadow: var(--box-shadow-dropdown);

        &__row {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 8px;
        }

        &__list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 20px 0;
          max-height: 280px;
          overflow: auto;
        }

        &__total {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 4px;
          padding: 14px;
          border-radius: 8px;
          color: var(--color-grey-lightest);
          background-color: var(--color-grey-bg-light);
        }
      }

      &-info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        gap: 4px;
        min-width: 60px;

        &--profile {
          @media (max-width: 1440px) {
            display: none;
          }
        }

        &--cart {
          @media (max-width: 1023px) {
            display: none;
          }
        }
      }

      &-arrow {
        transition: transform 0.2s ease-in-out;
        transform: rotate(90deg);
        &.active {
          transform: rotate(270deg);
        }

        &--mobile-hidden {
          @media (max-width: 1023px) {
            display: none;
          }
        }
      }
    }
  }

  .logo {
    margin-left: 28px;
    display: flex;
    align-items: center;
    justify-content: center;

    .header__logo-full {
      width: 201px;
      height: 32px;

      @media (max-width: 1023px) {
        display: none;
      }
    }

    .header__logo-mini {
      display: none;
      width: 52px;
      height: 40px;

      @media (max-width: 1023px) {
        display: block;
      }
    }
  }

  .nav-link {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    color: var(--color-grey-light);
    text-decoration: none;
    padding: 0 8px;

    &.is-active,
    &:hover {
      color: var(--color-black);
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 40px;
        height: 3px;
        background: var(--color-orange-primary);
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

