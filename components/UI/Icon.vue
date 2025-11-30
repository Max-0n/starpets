<template lang="pug">
  component(v-if="IconComponent" :is="IconComponent")
</template>

<script setup lang="ts">
import type { ComponentImport } from '~/types/component'

const props = defineProps<{ name?: string }>()

const icons = import.meta.glob('~/assets/svg/*.svg') as ComponentImport
const IconComponent = shallowRef<Component | null>(null)

watch(
  () => props.name,
  async name => {
    if (!name) {
      IconComponent.value = null
      return
    }

    const path = `/assets/svg/${name}.svg`
    const loader = icons[path]
    IconComponent.value = loader ? (await loader()).default : null
  },
  { immediate: true }
)
</script>
