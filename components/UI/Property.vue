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
    color: #B5B5B5;
    border: 1px solid #B5B5B5;
  }

  &--neon {
    background: #40BB18;
    color: white;
    border-radius: 50px;
  }

  &--mega {
    background: #7E10D4;
    color: white;
  }

  &--fly {
    background: #108ED4;
    color: white;
    border-radius: 50px;
  }

  &--raid {
    background: #D41057;
    color: white;
    border-radius: 50px;
  }
}
</style>

