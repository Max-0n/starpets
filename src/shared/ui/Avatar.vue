<template lang="pug">
  .avatar
    UIImage(
      v-if="image"
      :image="image"
      :contain="false"
    ).size-46
    UIIcon(v-else name="avatar").avatar-error.size-46
</template>

<script lang="ts" setup>
defineProps<{ image?: string }>()
</script>

<style lang="scss" scoped>
.avatar {
  flex-shrink: 0;
  border-radius: 500px;
  aspect-ratio: 1 / 1;
  min-width: 10px;
  overflow: hidden;
  border: 2.5px solid var(--color-orange-primary);
  padding: 2.5px;

  & > * {
    border-radius: 500px;
    overflow: hidden;
  }

  &-error {
    color: var(--color-error);
  }
}
</style>
