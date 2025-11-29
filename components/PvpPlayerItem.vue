<template lang="pug">
.pvp__player_item
  UIAvatar(:image="avatar").size-24
  StatTile(
    :username="username"
    :amount="amount"
    :amount-color="amountColor"
    :game-type="gameType"
    :chance="chance"
    :size="StatTileSize.m"
  )
</template>

<script setup lang="ts">
import { StatTileSize } from '~/types/statTile'
import { TextColor } from '~/types/text'

withDefaults(
  defineProps<{
    avatar?: string
    username: string
    amount: string
    amountColor?: TextColor
    gameType: string
    chance: string
  }>(),
  {
    amountColor: TextColor.white,
  }
)
</script>

<style lang="scss" scoped>
.pvp__player_item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  background: var(--color-grey2);
  border-radius: 4px;
  padding: 12px;

  :deep(.stat-tile) {
    background: transparent;
    padding: 0;
    flex: 1;
  }
}
</style>

