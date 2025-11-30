<template lang="pug">
  .product-card(@click="handleClick")
    UIImage(:image="product.imageUri").size-78.mb10

    .product-card__info.mt4
      p.product-card__subtitle.text-weight-400.text-size-14 {{ formattedType }}
      p.product-card__name.text-weight-600.text-color-black {{ product.name }}
      p.text-weight-700.text-color-black {{ formattedPrice }}

    .product-card__properties__wrapper
      .product-card__properties
        UIProperty(v-if="product.level === 'default' || !product.level" type="regular")
        UIProperty(v-if="product.level === 'neon'" type="neon")
        UIProperty(v-if="product.level === 'mega_neon'" type="mega")
        UIProperty(v-if="product.flyable" type="fly")
        UIProperty(v-if="product.rideable" type="raid")

    .product-card__buy
      UIButton(appearance="primary" withoutPadding @click.stop="handleAddToCart").size-28
        UIIcon(name="cartPlus").size-18
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '~/types/product'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  addToCart: [product: Product]
}>()

const formattedType = computed(() => {
  const type = props.product.type || ''
  return type.charAt(0).toUpperCase() + type.slice(1)
})

const formattedPrice = computed(() => {
  const price = props.product.price || 0
  const currency = props.product.currency || 'usd'
  const symbol = currency === 'usd' ? '$' : currency.toUpperCase()
  return `${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${symbol}`
})

const handleClick = () => {
  // Можно добавить логику для открытия детальной страницы
}

const handleAddToCart = () => {
  emit('addToCart', props.product)
}
</script>

<style lang="scss" scoped>
.product-card {
  cursor: pointer;
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
    text-align: left;
  }

  &__subtitle,
  &__name {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

  &__buy {
    position: absolute;
    bottom: 10px;
    right: 10px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  &:hover {
    .product-card__buy {
      opacity: 1;
    }
  }
}
</style>

