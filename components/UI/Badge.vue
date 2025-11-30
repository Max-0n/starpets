<template lang="pug">
  .badge(:class="[`badge--${color}`, { [`size-${size}`]: size }]")
    slot
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?: 'orange' | 'blue' | 'red' | 'green'
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
    background: rgba(254, 153, 32, 0.1);
    color: rgba(254, 153, 32, 1);
  }

  &--blue {
    background: rgba(72, 145, 255, 0.1);
    color: rgba(72, 145, 255, 1);
  }

  &--green {
    background: rgba(64, 187, 24, 0.1);
    color: rgba(64, 187, 24, 1);
  }

  &--red {
    background: rgba(235, 61, 61, 0.1);
    color: rgba(235, 61, 61, 1);
  }
}
</style>

