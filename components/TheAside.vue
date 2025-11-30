<template lang="pug">
aside
  .aside__header
    p.text-size-18.text-weight-500 Фильтры
    .aside__header-actions
      UIButton(appearance="secondary" ghost withoutPadding @click="resetFilters")
        p.text-size-14 Сбросить
      UIButton(appearance="secondary" ghost withoutPadding @click="close")
        UIIcon(name="close").size-18
  
  .aside__content
    .aside__section
      .aside__section-header
        p.aside__section-title.text-size-16.text-weight-500 Цена
      .aside__price-range
        .aside__price-input
          span.aside__price-currency $
          input.aside__price-field(
            v-model="priceMin"
            type="number"
            placeholder="0.00"
          )
        span.aside__price-separator —
        .aside__price-input
          span.aside__price-currency $
          input.aside__price-field(
            v-model="priceMax"
            type="number"
            placeholder="∞"
          )

    .aside__section
      .aside__section-header(@click="isRarityOpen = !isRarityOpen")
        p.aside__section-title.text-size-16.text-weight-500 Редкость
        UIIcon(name="arrowRight" :class="{ 'active': isRarityOpen }").size-18.aside__arrow
      .aside__section-content(v-show="isRarityOpen")
        .aside__rarity-swatches
          .aside__rarity-swatch.size-40(
            v-for="(rarity, index) in rarities"
            :key="index"
            :class="[{ 'active': selectedRarities.includes(index) }, `aside__rarity-swatch--${rarity.color}`]"
            @click="toggleRarity(index)"
          )

    .aside__section
      .aside__section-header(@click="toggleProperties")
        p.aside__section-title.text-size-16.text-weight-500 Свойства
        UIIcon(name="arrowRight" :class="{ 'active': isPropertiesOpen }").size-18.aside__arrow
      .aside__section-content(v-show="isPropertiesOpen")
        .aside__properties
          .aside__property-item(
            v-for="property in properties"
            :key="property.type"
            :class="{ 'active': selectedProperties.includes(property.type) }"
            @click="toggleProperty(property.type)"
          )
            .aside__property-checkbox(:class="{ 'active': selectedProperties.includes(property.type) }")
            UIProperty(:type="property.type")
            p.text-size-14 {{ property.label }}
  
  .aside__footer
    p.text-size-12.text-color-grey © 2020-2023 STARPETS.GG All Rights Reserved
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  isOpen?: boolean
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  close: []
}>()

const isRarityOpen = ref(true)
const isPropertiesOpen = ref(true)
const priceMin = ref('0.00')
const priceMax = ref('∞')
const selectedRarities = ref<number[]>([])
const selectedProperties = ref<string[]>([])

const rarities = [{ color: 'blue' }, { color: 'purple' }, { color: 'green' }, { color: 'red' }, { color: 'grey' }]

const properties = [
  { type: 'regular', label: 'Обычный' },
  { type: 'neon', label: 'Неон' },
  { type: 'mega', label: 'Мега-неон' },
  { type: 'fly', label: 'Флай' },
  { type: 'raid', label: 'Райд' },
]

const toggleRarity = (index: number) => {
  const idx = selectedRarities.value.indexOf(index)
  if (idx > -1) {
    selectedRarities.value.splice(idx, 1)
  } else {
    selectedRarities.value.push(index)
  }
}

const toggleProperties = () => {
  isPropertiesOpen.value = !isPropertiesOpen.value
}

const toggleProperty = (type: string) => {
  const idx = selectedProperties.value.indexOf(type)
  if (idx > -1) {
    selectedProperties.value.splice(idx, 1)
  } else {
    selectedProperties.value.push(type)
  }
}

const resetFilters = () => {
  priceMin.value = '0.00'
  priceMax.value = '∞'
  selectedRarities.value = []
  selectedProperties.value = []
}

const close = () => {
  emit('update:isOpen', false)
  emit('close')
}
</script>

<style lang="scss" scoped>
aside {
  position: fixed;
  top: 82px;
  left: 0;
  max-width: 360px;
  height: calc(100% - 82px);
  background: var(--color-white);
  display: flex;
  flex-direction: column;
  overflow: auto;
  z-index: 100;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.aside__header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #F6F6F6;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);

  &-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

.aside__content {
  padding: 24px;
}

.aside__section {
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
}

.aside__section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 16px;
}

.aside__section-title {
  color: #B5B5B5;
}

.aside__section-content {
  margin-top: 16px;
}

.aside__arrow {
  transition: transform 0.2s ease;
  transform: rotate(90deg);
  color: #646464;

  &.active {
    transform: rotate(-90deg);
  }
}

// Price Section
.aside__price-range {
  display: flex;
  align-items: center;
  gap: 12px;
}

.aside__price-input {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #fff;
  border: 1px solid #F6F6F6;
  border-radius: 8px;
}

.aside__price-field {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text-black);
  max-width: 80px;

  &::placeholder {
    color: #646464;
    opacity: 1;
  }
}

.aside__price-currency {
  color: #646464;
  font-weight: 500;
}

.aside__price-separator {
  color: #B5B5B5;
  font-weight: 500;
}

// Rarity Section
.aside__rarity-swatches {
  display: flex;
  gap: 14px;
}

.aside__rarity-swatch {
  aspect-ratio: 1;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: translate(-50%, -60%) rotate(45deg);
    opacity: 0;
    transition: opacity 0.2s ease;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 6px;
    transform: translateY(26px);
    transition: transform 0.3s ease-in-out;
  }

  &:hover {
    &::after {
      transform: translateY(6px);
    }
  }

  &.active {
    &::after {
      transform: translateY(0);
    }

    &::before {
      opacity: 1;
    }
  }

  &--blue {
    background: #4891FF4D;
    &::after {
      background: #4891FF;
    }
  }

  &--purple {
    background: #7E10D44D;
    &::after {
      background: #7E10D4;
    }
  }

  &--green {
    background: #c6ebba;
    &::after {
      background: #57be37;
    }
  }

  &--red {
    background: #f7bbc0;
    &::after {
      background: #e33948;
    }
  }

  &--grey {
    background: #bbbbbb;
    &::after {
      background: #1e1e1e;
    }
  }
}

// Properties Section
.aside__properties {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.aside__property-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #FAFAFA;
  }

  &.active {
    background: #F6F6F6;
  }
}

.aside__property-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #B5B5B5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
  position: relative;

  &.active {
    background: var(--button-primary-solid-background-default);
    border-color: var(--button-primary-solid-background-default);
    
    &::after {
      content: '';
      position: absolute;
      left: 5px;
      top: 1px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
}

.aside__footer {
  padding: 20px 24px;
  text-align: center;
}

.text-color-grey {
  color: #B5B5B5;
}
</style>
