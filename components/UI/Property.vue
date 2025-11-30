<template lang="pug">
  .property(:class="[`property--${type}`]").size-18.text-size-12 {{ text }}
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    type?: 'regular' | 'neon' | 'mega' | 'fly' | 'raid'
  }>(),
  {
    type: 'regular',
  }
)

const text = computed(() => {
  const texts: Record<string, string> = {
    regular: '-',
    neon: 'N',
    mega: 'M',
    fly: 'F',
    raid: 'R',
  }
  return texts[props.type] || '-'
})
</script>

<style lang="scss" scoped>
.property {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  flex-shrink: 0;
  font-weight: 600;
  text-transform: uppercase;


  // Типы отображения
  &--regular {
    background: transparent;
    color: var(--color-grey-lightest);
    border: 1px solid var(--color-grey-lightest);
  }

  &--neon {
    background: var(--color-green-primary);
    color: white;
    border-radius: 50px;
  }

  &--mega {
    background: var(--color-purple-primary);
    color: white;
  }

  &--fly {
    background: var(--color-blue-fly);
    color: white;
    border-radius: 50px;
  }

  &--raid {
    background: var(--color-pink-primary);
    color: white;
    border-radius: 50px;
  }
}
</style>

