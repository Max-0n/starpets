<template lang="pug">
  TheHeader
  // Overlay для затемнения фона при открытом aside на разрешениях < 1440px
  .aside-overlay(
    v-if="shouldShowOverlay"
    @click="appStore.closeAside"
    :class="{ 'aside-overlay--visible': appStore.isAsideOpen }"
  )
  // Overlay для затемнения фона при открытом nav на разрешениях < 1024px
  .nav-overlay(
    v-if="shouldShowNavOverlay"
    @click="appStore.closeNav"
    :class="{ 'nav-overlay--visible': appStore.isNavOpen, 'nav-overlay--open': appStore.isNavOpen }"
  )

  main
  
    TheAside(:is-open="appStore.isAsideOpen" @update:is-open="handleAsideUpdate" @close="appStore.closeAside" :class="{ 'aside-open': appStore.isAsideOpen }")
    TheNav(:is-open="appStore.isNavOpen" @update:is-open="handleNavUpdate" @close="appStore.closeNav")
    NuxtPage



  ModalsLayout
</template>

<script setup lang="ts">
const appStore = useAppStore()
const { openAside, closeAside, closeNav } = appStore

const screenWidth = ref(0)

// На больших экранах (1440px+) aside всегда открыт и не может быть закрыт
onMounted(() => {
  const checkScreenSize = () => {
    screenWidth.value = window.innerWidth
    if (window.innerWidth >= 1440) {
      appStore.openAside()
    }
  }

  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)

  onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize)
  })
})

// Показывать overlay только на разрешениях < 1440px
const shouldShowOverlay = computed(() => {
  return screenWidth.value > 0 && screenWidth.value < 1440
})

// Показывать overlay для nav только на разрешениях < 1024px
const shouldShowNavOverlay = computed(() => {
  return screenWidth.value > 0 && screenWidth.value < 1024
})

// Предотвращаем закрытие aside на больших экранах
const handleAsideUpdate = (value: boolean) => {
  if (window.innerWidth >= 1440) {
    appStore.openAside()
  } else {
    if (value) {
      appStore.openAside()
    } else {
      appStore.closeAside()
    }
  }
}

// Обработчик для nav
const handleNavUpdate = (value: boolean) => {
  if (value) {
    appStore.openNav()
  } else {
    appStore.closeNav()
  }
}
</script>

<style lang="scss" scoped>
:deep(aside) {
  position: fixed;
  top: 82px;
  left: 0;
  max-width: 360px;
  height: calc(100% - 82px);
  transform: translateX(0);
  transition: transform 0.3s ease;
}

main {
  display: flex;
  padding-top: 82px;
  padding-left: 360px;
  transition: padding-left 0.3s ease;
}

// От 1440px до 744px - aside выезжает сбоку, высота 100%, отступ сверху 0
@media (max-width: 1439px) {
  :deep(aside) {
    top: 0;
    height: 100%;
    transform: translateX(-100%);
  }

  :deep(aside.aside-open) {
    transform: translateX(0);
  }

  main {
    padding-left: 0;
  }
}

// До 744px - aside на всю ширину, также выезжает сбоку
@media (max-width: 743px) {
  :deep(aside) {
    max-width: 100%;
    width: 100%;
  }
}

// Overlay для затемнения фона
.aside-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-black-050);
  z-index: 101;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  cursor: pointer;

  &--visible {
    opacity: 1;
    visibility: visible;
  }
}

// Overlay показывается только на разрешениях < 1440px
@media (min-width: 1440px) {
  .aside-overlay {
    display: none;
  }
}

// Overlay для nav
.nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-black-050);
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  cursor: pointer;

  &--visible {
    opacity: 1;
    visibility: visible;
  }

  &--open {
    z-index: 99;
  }
}

// Overlay для nav показывается только на разрешениях < 1024px
@media (min-width: 1024px) {
  .nav-overlay {
    display: none;
  }
}

// Nav скрывается на разрешениях >= 1024px
@media (min-width: 1024px) {
  :deep(nav.nav) {
    display: none;
  }
}
</style>
