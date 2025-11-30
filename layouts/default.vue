<template lang="pug">
  TheHeader

  main
    TheAside
    NuxtPage

  //TheFooter

  ModalsLayout
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
aside {
  position: fixed;
  top: 82px;
  left: 0;
  max-width: 360px;
  height: calc(100% - 82px);
}
// aside {
//   flex: 0 1 auto;
//   max-width: 360px;
// }

main {
  display: flex;
  padding-top: 82px;

  padding-left: 360px;
}
</style>
