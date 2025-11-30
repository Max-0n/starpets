<template lang="pug">
  .badge(:class="[`badge--${color}`, { [`size-${size}`]: size }]")
    slot
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?: 'orange' | 'blue' | 'red' | 'green' | 'purple' | 'pink'
    size?: 'sm' | 'md'
  }>(),
  {
    color: 'orange',
    size: 'sm',
  }
)
</script>

<style lang="scss" scoped>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  flex-shrink: 0;

  // Размеры
  &.size-sm {
    width: 32px;
    height: 32px;
  }

  &.size-md {
    width: 42px;
    height: 42px;
  }

  // Цвета
  &--orange {
    background: var(--color-orange-primary-light);
    color: var(--color-orange-primary);
  }

  &--blue {
    background: var(--color-blue-primary-light);
    color: var(--color-blue-primary);
  }

  &--green {
    background: var(--color-green-primary-light);
    color: var(--color-green-primary);
  }

  &--red {
    background: var(--color-red-primary-light);
    color: var(--color-red-primary);
  }

  &--purple {
    background: var(--color-purple-primary-light);
    color: var(--color-purple-primary);
  }

  &--pink {
    background: var(--color-pink-primary-light);
    color: var(--color-pink-primary);
  }
}
</style>

