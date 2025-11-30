<template lang="pug">
  .product-card-wide(:class="`product-card-wide--${product.rare}`")
    UIImage(:image="productImage").size-58

    .product-card-wide__info
      p.text-weight-400.text-size-14 {{ formattedType }}
      p.text-weight-600.text-color-black {{ product.name }}
      p.text-weight-700.text-color-black {{ formattedPrice }}

    .product-card-wide__properties__wrapper(v-show="hasProperties")
      .product-card-wide__properties
        UIProperty(v-if="product.level === 'neon'" type="neon")
        UIProperty(v-if="product.level === 'mega_neon'" type="mega")
        UIProperty(v-if="product.flyable" type="fly")
        UIProperty(v-if="product.rideable" type="raid")

    UIButton(appearance="secondary" withoutPadding @click="handleRemove").size-28.mr8
      UIIcon(name="close").size-12
</template>

<script setup lang="ts">
import { computed } from 'vue'
import avaImage from '~/shared/assets/images/ava.jpg'
import type { Product } from '~/shared/types/product'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  remove: [productId: string]
}>()

const productImage = computed(() => {
  return props.product.imageUri || props.product.image || avaImage
})

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

const hasProperties = computed(() => {
  return (
    props.product.level === 'neon' ||
    props.product.level === 'mega_neon' ||
    props.product.flyable ||
    props.product.rideable
  )
})

const handleRemove = () => {
  emit('remove', props.product.id)
}
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
  border: 2px solid var(--color-grey-bg);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto 0;
    height: 40px;
    width: 3px;
    background: var(--color-blue-primary);
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  &--common {
    &::after {
      background: var(--color-blue-primary);
    }
  }

  &--uncommon {
    &::after {
      background: var(--color-purple-primary);
    }
  }

  &--rare {
    &::after {
      background: var(--color-green-rare);
    }
  }

  &--ultra_rare {
    &::after {
      background: var(--color-red-primary);
    }
  }

  &--legendary {
    &::after {
      background: var(--color-grey-dark);
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 4px;
    color: var(--color-grey-medium);
    margin: auto auto auto 0;
  }

  &__properties {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    background: var(--color-grey-bg);
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

