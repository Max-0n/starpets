<template lang="pug">
  .flag(:class="{ 'flag--with-name': name }")
    component.flag__icon(
      v-if="FlagComponent"
      :is="FlagComponent"
    )
    img.flag__icon(
      v-else-if="flagUrl"
      :src="flagUrl"
      :alt="name || code"
    )
    span.flag__name(v-if="name") {{ name }}
</template>

<script setup lang="ts">
import type { ComponentImport } from '~/types/component'

const props = withDefaults(
  defineProps<{
    code?: string
    name?: string
  }>(),
  {}
)

const flags = import.meta.glob('~/assets/flags/*.svg', { eager: false }) as ComponentImport
const FlagComponent = shallowRef<Component | null>(null)
const flagUrl = computed(() => {
  if (!props.code) return null
  return `/assets/flags/${props.code.toLowerCase()}.svg`
})

watch(
  () => props.code,
  async code => {
    if (!code) {
      FlagComponent.value = null
      return
    }

    const path = `/assets/flags/${code.toLowerCase()}.svg`
    const loader = flags[path]
    if (loader) {
      try {
        FlagComponent.value = (await loader()).default
      } catch {
        FlagComponent.value = null
      }
    } else {
      FlagComponent.value = null
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.flag {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &__icon {
    display: block;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    object-fit: contain;
    border-radius: 100px;
    overflow: hidden;
  }

  &__name {
    font-size: 14px;
    line-height: 1.2;
    color: var(--color-text-black);
  }

  &--with-name {
    .flag__icon {
      width: 24px;
      height: 24px;
    }
  }
}
</style>

