<template lang="pug">
nav.nav(:class="{ 'nav--open': isOpen }")
  .nav__header
    .nav__adopt-me(@click="isAdoptMeOpen = !isAdoptMeOpen")
      .nav__adopt-me-icon
        UIIcon(name="monster").size-24
      p.text-size-16.text-weight-500 Adopt Me
      UIIcon(name="arrowRight" :class="{ 'active': isAdoptMeOpen }").size-18.nav__arrow
  
  .nav__content
    .nav__menu
      NuxtLink(
        to="/"
        @click="close"
        :class="{ 'active': route.path === '/' }"
      ).nav__menu-item
        UIBadge(color="orange" size="md")
          UIIcon(name="cart").size-24
        p.text-size-16.text-weight-500 Магазин
      
      NuxtLink(
        to="/products"
        @click="close"
        :class="{ 'active': route.path === '/products' }"
      ).nav__menu-item
        UIBadge(color="blue" size="md")
          UIIcon(name="tag").size-24
        p.text-size-16.text-weight-500 Предметы
      
      NuxtLink(
        to="/sale"
        @click="close"
        :class="{ 'active': route.path === '/sale' }"
      ).nav__menu-item
        UIBadge(color="purple" size="md")
          UIIcon(name="quest").size-24
        p.text-size-16.text-weight-500 Продажа
      
      NuxtLink(
        to="/currency"
        @click="close"
        :class="{ 'active': route.path === '/currency' }"
      ).nav__menu-item
        UIBadge(color="pink" size="md")
          UIIcon(name="coin").size-24
        p.text-size-16.text-weight-500 Робуксы
      
      NuxtLink(
        to="/help"
        @click="close"
        :class="{ 'active': route.path === '/help' }"
      ).nav__menu-item
        UIBadge(color="green" size="md")
          UIIcon(name="question").size-24
        p.text-size-16.text-weight-500 Помощь
  
  .nav__footer
    p.text-size-12.text-color-grey © 2020-2023 STARPETS.GG All Rights Reserved
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  isOpen?: boolean
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  close: []
}>()

const route = useRoute()
const isAdoptMeOpen = ref(false)

const close = () => {
  emit('update:isOpen', false)
  emit('close')
}
</script>

<style lang="scss" scoped>
nav.nav {
  position: fixed;
  top: 82px;
  left: 0;
  width: 100%;
  max-width: 360px;
  height: calc(100% - 82px);
  background: var(--color-white);
  display: flex;
  flex-direction: column;
  overflow: auto;
  z-index: 101;
  transform: translateX(-100%);
  transition: transform 0.3s ease;

  &--open {
    transform: translateX(0);
  }
}

.nav__header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-grey-bg);
}

.nav__adopt-me {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: var(--color-grey-bg);
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: var(--color-grey-bg-light);
  }

  p {
    flex: 1;
    color: var(--color-text-black);
  }
}

.nav__adopt-me-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--color-purple-primary);
  color: var(--color-white);
  flex-shrink: 0;
}

.nav__arrow {
  transition: transform 0.2s ease;
  transform: rotate(90deg);
  color: var(--color-grey-medium);

  &.active {
    transform: rotate(-90deg);
  }
}

.nav__content {
  flex: 1;
  padding: 24px;
}

.nav__menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav__menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.2s ease;
  cursor: pointer;

  &:hover {
    background: var(--color-grey-bg-light);
  }

  &.active {
    background: var(--color-grey-bg);
  }

  p {
    color: var(--color-text-black);
  }
}

.nav__footer {
  padding: 20px 24px;
  text-align: center;
  border-top: 1px solid var(--color-grey-bg);
}

.text-color-grey {
  color: var(--color-grey-lightest);
}

// На разрешениях >= 1024px - nav скрыт
@media (min-width: 1024px) {
  nav.nav {
    display: none;
  }
}
</style>

