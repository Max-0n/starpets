<template lang="pug">
aside.aside
  .aside__panel
    // Header
    .aside__header
      p.text-size-18.text-weight-500 Фильтры
      .aside__header-actions
        UIButton(appearance="secondary" ghost withoutPadding @click="resetFilters")
          p.text-size-14 Сбросить
        UIButton(appearance="secondary" ghost withoutPadding @click="close")
          UIIcon(name="close").size-18
    
    .aside__content
      // Price Section
      .aside__section
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
      
      // Rarity Section
      .aside__section
        .aside__section-header(@click="toggleRarity")
          p.aside__section-title.text-size-16.text-weight-500 Редкость
          UIIcon(name="arrowRight" :class="{ 'active': isRarityOpen }").size-18.aside__arrow
        .aside__section-content(v-show="isRarityOpen")
          .aside__rarity-swatches
            .aside__rarity-swatch(
              v-for="(rarity, index) in rarities"
              :key="index"
              :class="[{ 'active': selectedRarities.includes(index) }, `aside__rarity-swatch--${rarity.color}`]"
              @click="toggleRarity(index)"
            )
      
      // Properties Section
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
    
    // Footer
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

const toggleRarity = (index?: number) => {
  if (index !== undefined) {
    const idx = selectedRarities.value.indexOf(index)
    if (idx > -1) {
      selectedRarities.value.splice(idx, 1)
    } else {
      selectedRarities.value.push(index)
    }
  } else {
    isRarityOpen.value = !isRarityOpen.value
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
.aside {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  // pointer-events: none;
  transition: opacity 0.3s ease;

  &__panel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 400px;
    height: 100%;
    background: var(--color-white);
    box-shadow: -4px 0 18px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid #F6F6F6;

    &-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
  }

  &__content {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
  }

  &__section {
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    margin-bottom: 16px;
  }

  &__section-title {
    color: #B5B5B5;
  }

  &__section-content {
    margin-top: 16px;
  }

  &__arrow {
    transition: transform 0.2s ease;
    transform: rotate(90deg);
    color: #646464;

    &.active {
      transform: rotate(-90deg);
    }
  }

  // Price Section
  &__price-range {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__price-input {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: #fff;
    border: 1px solid #F6F6F6;
    border-radius: 8px;
  }

  &__price-field {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    font-weight: 500;
    color: var(--color-text-black);
    max-width: 100px;

    &::placeholder {
      color: #646464;
      opacity: 1;
    }
  }

  &__price-currency {
    color: #646464;
    font-weight: 500;
  }

  &__price-separator {
    color: #B5B5B5;
    font-weight: 500;
  }

  // Rarity Section
  &__rarity-swatches {
    display: flex;
    gap: 12px;
  }

  &__rarity-swatch {
    flex: 1;
    aspect-ratio: 1;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid transparent;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 6px;
      opacity: 0;
      transition: opacity 0.2s ease;
      box-shadow: inset 0 0 0 2px var(--color-white);
    }

    &.active {
      border-color: var(--color-black);
      transform: scale(1.05);

      &::after {
        opacity: 1;
      }
    }

    &--blue {
      background: linear-gradient(to top, #1a4d7a, #4a9eff);
    }

    &--purple {
      background: linear-gradient(to top, #5a1a7a, #a855f7);
    }

    &--green {
      background: linear-gradient(to top, #1a5a3a, #4ade80);
    }

    &--red {
      background: linear-gradient(to top, #7a1a1a, #f87171);
    }

    &--grey {
      background: linear-gradient(to top, #1a1a1a, #9ca3af);
    }
  }

  // Properties Section
  &__properties {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__property-item {
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

  &__property-checkbox {
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

  &__footer {
    padding: 20px 24px;
    border-top: 1px solid #F6F6F6;
    text-align: center;
  }
}

.text-color-grey {
  color: #B5B5B5;
}
</style>
