<template lang="pug">
  button(
    :class="{ wide, round, ghost, 'with-press': !withoutPress, active }"
    :appearance="appearance"
    :disabled="disabled || progress"
  )
    slot()

    template(v-if="progress")
      .progress
      UIIcon(name="progress").progress-icon.size-12
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    disabled?: boolean
    active?: boolean
    progress?: boolean
    wide?: boolean
    round?: boolean
    ghost?: boolean
    appearance?: ButtonAppearance
    withoutPress?: boolean
  }>(),
  {
    disabled: false,
    active: false,
    progress: false,
    wide: false,
    round: false,
    ghost: false,
    withoutPress: false,
  }
)
</script>

<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  background: var(--color-main);
  padding: 8px 16px;
  border-radius: 6px;
  //box-shadow: var(--box-shadow-button);
  border: none;
  transition: all ease-in-out 0.1s;

  &[disabled] {
    filter: grayscale(0.7);
  }

  &[appearance="secondary"] {
    background: var(--color-button-secondary);
  }

  &[appearance="tertiary"] {
    background: var(--color-green-faded);
  }

  &[appearance="danger"] {
    background: var(--color-danger);
  }

  &[appearance="blue"] {
    background: var(--color-button-blue);
  }

  &[appearance="orange"] {
    background: var(--color-orange3);
  }

  &[appearance="yellow"] {
    background: var(--color-yellow);
  }

  .progress {
    position: absolute;
    width: 100%;
    height: 100%;
    background: inherit;
    box-shadow: inherit;
    border-radius: 18px;
    opacity: 0.95;

    &-icon {
      position: absolute;
    }
  }

  .prepend,
  .postend {
    display: flex;
    margin: auto 0 auto 0;
  }

  &.wide {
    width: 100%;
  }

  &.round {
    border-radius: 120px;
  }

  &.ghost {
    background: transparent;
    padding: 0;
    box-shadow: none;
  }

  &.with-press:not([disabled]):active,
  &.active {
    filter: brightness(1.4);
    transform: scale(0.98);
  }
}
</style>
