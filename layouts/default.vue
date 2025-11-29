<template lang="pug">
  main
    NuxtPage

  TheFooter

  ModalsLayout
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
footer {
  position: fixed;
  bottom: 10px;
}

main {
  display: flex;
  padding-bottom: 20px;
  min-height: 100vh;
}
</style>
