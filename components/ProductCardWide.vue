<template lang="pug">
  .product-card-wide
    UIImage(:image="avaImage").size-58

    .product-card-wide__info
      p.text-weight-400.text-size-14 Subtitle
      p.text-weight-600.text-color-black Title
      p.text-weight-700.text-color-black 999,99 $

    .product-card-wide__properties__wrapper
      .product-card-wide__properties
        UIProperty(type="regular")
        UIProperty(type="neon")
        UIProperty(type="mega")
        UIProperty(type="fly")
        UIProperty(type="raid")

    UIButton(appearance="secondary" withoutPadding).size-28.mr8
      UIIcon(name="close").size-12
</template>

<script setup lang="ts">
import avaImage from '~/assets/images/ava.jpg'
</script>

<style lang="scss" scoped>
.product-card-wide {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  background: var(--color-white);
  gap: 14px;
  border: 2px solid #F6F6F6;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto 0;
    height: 40px;
    width: 3px;
    background: #4891FF;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 4px;
    color: #646464;
  }

  &__properties {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    background: #F6F6F6;
    padding: 10px;
    border-radius: 8px;

    &__wrapper {
      display: flex;
      align-items: flex-start;            
      margin: auto 0 auto auto;
      width: 126px;
    }
  }
}
</style>

