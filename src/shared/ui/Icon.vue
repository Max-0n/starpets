<template lang="pug">
  component(v-if="IconComponent" :is="IconComponent")
</template>

<script setup lang="ts">
import type { ComponentImport } from '~/shared/types/component'

const props = defineProps<{ name?: string }>()

// При srcDir: 'src' используем путь относительно src/
// import.meta.glob возвращает ключи в формате '/shared/assets/svg/name.svg'
const icons = import.meta.glob('~/shared/assets/svg/*.svg', { eager: false }) as ComponentImport
const IconComponent = shallowRef<Component | null>(null)

watch(
  () => props.name,
  async name => {
    if (!name) {
      IconComponent.value = null
      return
    }

    // Правильный формат ключа: '/shared/assets/svg/name.svg'
    const path = `/shared/assets/svg/${name}.svg`
    const loader = icons[path]
    IconComponent.value = loader ? (await loader()).default : null
  },
  { immediate: true }
)
</script>
