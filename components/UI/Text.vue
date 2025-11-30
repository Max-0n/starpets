<template lang="pug">
  component(
    :is="as"
    :class="[`text-color-${color}`, `text-shadow-${shadow}`, `text-transform-${transform}`, `text-weight-${weight}`, `text-size-${size}`, `text-align-${align}`]"
    v-html="$t(text)"
  )
</template>

<script setup lang="ts">
type AsElement = keyof HTMLElementTagNameMap

withDefaults(
  defineProps<{
    text?: string | number
    color?: TextColor
    as?: AsElement
    shadow?: TextShadow
    transform?: TextTransform
    weight?: TextWeight
    size?: TextSize
    align?: TextAlign
  }>(),
  {
    color: TextColor.black,
    as: 'p',
    shadow: TextShadow.none,
    transform: TextTransform.none,
    weight: TextWeight.w500,
    size: TextSize.s18,
  }
)
</script>

