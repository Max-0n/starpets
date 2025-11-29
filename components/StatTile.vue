<template lang="pug">
.stat-tile
  .stat-tile__block
    .stat-tile__user
      UIAvatar(
        v-if="avatar"
        :image="avatarImage"
      ).size-12
      UIText(
        :text="username"
        :size="usernameSize"
      )
    UIText(
      :text="amount"
      :size="amountSize"
      :color="amountColor"
    )
  .stat-tile__block
    UIText(
      :text="gameType"
      :size="gameTypeSize"
      :color="TextColor.grey"
      :weight="TextWeight.w400"
      :transform="TextTransform.uppercase"
    )
    UIText(
      :text="chance"
      :size="chanceSize"
      :color="TextColor.grey"
      :weight="TextWeight.w400"
      :transform="TextTransform.uppercase"
    )
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { StatTileSize } from '~/types/statTile'
import { TextColor, TextSize, TextTransform, TextWeight } from '~/types/text'

const props = withDefaults(
  defineProps<{
    avatar?: boolean
    avatarImage?: string
    username: string
    amount: string
    amountColor?: TextColor
    gameType: string
    chance: string
    size?: StatTileSize
  }>(),
  {
    amountColor: TextColor.white,
    size: StatTileSize.s,
  }
)

const usernameSize = computed(() => {
  return props.size === StatTileSize.s ? TextSize.s12 : TextSize.s14
})

const amountSize = computed(() => {
  return props.size === StatTileSize.s ? TextSize.s12 : TextSize.s14
})

const gameTypeSize = computed(() => {
  return props.size === StatTileSize.s ? TextSize.s10 : TextSize.s12
})

const chanceSize = computed(() => {
  return props.size === StatTileSize.s ? TextSize.s10 : TextSize.s12
})
</script>

<style lang="scss" scoped>
.stat-tile {
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;

  &__block {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  &__user {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}
</style>

