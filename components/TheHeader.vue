<template lang="pug">
  header
    .header__left
      UIIcon(name="logo").logo

      .header__tabs
        NavLink(to="/")
          UIText(text="Логин" :size="TextSize.s14")
        NavLink(to="/")
          UIText(text="header.login" :size="TextSize.s14")
        NavLink(to="/")

    .header__right

</template>

<script setup lang="ts">
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
}
</style>

