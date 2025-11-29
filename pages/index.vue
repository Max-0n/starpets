<template lang="pug">
  .pvp
    .pvp__top
      StatTile(
        username="@chill_best"
        amount="+62 TON"
        :amount-color="TextColor.blue"
        game-type="Пред. игра"
        chance="Шанс 62%"
        avatar
      ).card
      StatTile(
        username="@chill_best"
        amount="+6205 TON"
        :amount-color="TextColor.yellow"
        game-type="Топ игра"
        chance="Шанс 92%"
        avatar
      ).card

    .pvp__stats.card.p8
      UIText(text="1гифт")
      UIText(
        text="1.44 TON"
        :color="TextColor.blue"
      )

    .pvp__actions
      UIButton(:appearance="ButtonAppearance.yellow" wide)
        UIText(
          text="+ Добавить PvP"
          :color="TextColor.black"
        )
      UIButton(:appearance="ButtonAppearance.blue" wide)
        UIText(
          text="1.28 TON"
        )

    .pvp__players_list
      .pvp__players_list__header
        UIText(
          text="Игроков: 1"
          :size="TextSize.s16"
        )
        UIText(
          text="Игра #10394637"
          :color="TextColor.grey"
          :size="TextSize.s16"
        )
      PvpPlayerItem(
        :avatar="appStore.user?.avatar"
        :username="appStore.user?.username || ''"
        amount="+0 TON"
        :amount-color="TextColor.white"
        game-type="Игра"
        chance="Шанс 0%"
      )

</template>

<script lang="ts" setup>
const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.pvp {
  flex: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  margin: 20px auto;
  max-width: 600px;
  padding: 0 8px;

  &__top {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 8px;
  }

  &__stats {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }

  &__rulette {
    max-width: 500px;
    width: 100%;
    margin: 10px auto;
    animation: rotate 40s linear infinite;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
    margin-bottom: 10px;
  }

  &__players_list {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;

    &__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
