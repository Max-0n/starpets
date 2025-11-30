<template lang="pug">
  .product-purchased(:style="{ backgroundImage: `url(${backgroundImage})` }")
    UIImage(:image="product.imageUri").product-purchased__image.size-78
    .product-purchased__content
      .product-purchased__price.text-weight-700.text-size-18 {{ formattedPrice }}
      .product-purchased__name.text-weight-500.text-size-14 {{ product.name }}
</template>

<script setup lang="ts">
import { computed } from 'vue'
// Импортируем все изображения фонов
import commonBg from '~/assets/images/last_buy/common.png'
import legendaryBg from '~/assets/images/last_buy/legendary.png'
import rareBg from '~/assets/images/last_buy/rare.png'
import ultraRareBg from '~/assets/images/last_buy/ultra_rare.png'
import uncommonBg from '~/assets/images/last_buy/uncommon.png'
import type { Product } from '~/types/product'

const props = defineProps<{
  product: Product
}>()

const rarity = computed(() => {
  // Используем product.rare если есть, иначе product.rarity, иначе 'common' по умолчанию
  return (props.product as any).rare || props.product.rarity || 'common'
})

const backgroundImage = computed(() => {
  const rarityValue = rarity.value

  const backgrounds: Record<string, string> = {
    common: commonBg,
    uncommon: uncommonBg,
    rare: rareBg,
    ultra_rare: ultraRareBg,
    legendary: legendaryBg,
  }

  return backgrounds[rarityValue] || commonBg
})

const formattedPrice = computed(() => {
  const price = props.product.price || 0
  const currency = props.product.currency || 'usd'

  // Форматирование валюты
  let symbol = '₽'
  if (currency === 'usd') {
    symbol = '$'
  } else if (currency === 'eur') {
    symbol = '€'
  } else if (currency === 'rub') {
    symbol = '₽'
  } else {
    symbol = currency.toUpperCase()
  }

  // Форматирование числа с запятой как разделителем дробной части
  const formattedNumber = price.toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return `${formattedNumber} ${symbol}`
})
</script>

<style lang="scss" scoped>
.product-purchased {
  position: relative;
  width: 160px;
  height: 125px;
  padding: 24px 20px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;

  &__image {
    position: absolute;
    top: 10px;
    right: 2px;
  }

  &__content {
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
  }
  
  &__price {
    color: var(--color-text-black);
    margin-bottom: 6px;
  }
  
  &__name {
    color: var(--color-grey-medium);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }
}
</style>

