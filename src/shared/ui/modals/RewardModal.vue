<template lang="pug">
  .modal-reward
    UIImage(
      :compressed="$cdn.url('rewards/monster_share.webp')"
      :image="$cdn.url('rewards/monster_share.png')"
    ).modal-reward-image


    p.text-size-24(v-html="$t('modal.your_reward')")
    .modal-reward-sparks
      p.text-size-32.text-weight-500 {{ reward }}
      UIIcon(name="coin").size-28.color-yellow

    p.text-weight-500.mt40(v-html="$t('modal.tap_continue')")
</template>

<script setup lang="ts">
withDefaults(defineProps<{ reward?: string | number }>(), {
  reward: 0,
})
// appStore.config?.rewardForShare
</script>

<style lang="scss" scoped>
.modal-reward {
  position: relative;
  display: flex;
  width: 300px;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  pointer-events: none;

  &-image {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0px 0px 25px var(--color-orange2));
  }

  &-sparks {
    display: flex;
  }
}
</style>
