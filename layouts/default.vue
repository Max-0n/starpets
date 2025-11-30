<template lang="pug">
  TheHeader

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
  padding-top: 82px;
}
</style>
