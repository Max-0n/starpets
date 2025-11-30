<template lang="pug">
  .product-card
    UIImage(:image="avaImage").size-78

    .product-card__info.mt4
      p.text-weight-400.text-size-14 Subtitle
      p.text-weight-600.text-color-black Title
      p.text-weight-700.text-color-black 999,99 $

    .product-card__properties__wrapper
      .product-card__properties
        UIProperty(type="regular")
        UIProperty(type="neon")
        UIProperty(type="mega")
        UIProperty(type="fly")
        UIProperty(type="raid")
</template>

<script setup lang="ts">
import avaImage from '~/assets/images/ava.jpg'
</script>

<style lang="scss" scoped>
.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 170px;
  padding: 16px;
  border-radius: 8px;
  background: #fff;
  border: 2px solid #F6F6F6;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 3px;
    width: 40px;
    background: #4891FF;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  &__info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 4px;
    color: #646464;
    text-align: center;
  }

  &__properties {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;

    &__wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
  }
}
</style>

