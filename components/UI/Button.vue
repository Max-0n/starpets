<template lang="pug">
  button(
    :class="{ wide, round, ghost, 'with-press': !withoutPress, active, [`size-${size}`]: size }"
    :appearance="appearance"
    :disabled="disabled || progress"
  )
    span.button-content
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
    size?: 'default' | 'xl'
  }>(),
  {
    disabled: false,
    active: false,
    progress: false,
    wide: false,
    round: false,
    ghost: false,
    withoutPress: false,
    size: 'default',
  }
)
</script>

<style lang="scss" scoped>
button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  background: var(--color-main);
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
  cursor: pointer;
  transition: all ease-in-out 0.15s;
  white-space: nowrap;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  // Primary appearance (default)
  &[appearance="main"],
  &[appearance="primary"],
  &:not([appearance]) {
    background: var(--color-main);
    color: var(--color-white);
    
    &:hover:not([disabled]) {
      background: var(--color-main-light);
    }
  }

  // Secondary appearance
  &[appearance="secondary"] {
    background: var(--color-button-secondary);
    color: var(--color-white);
    
    &:hover:not([disabled]) {
      background: var(--color-button-secondary-light);
    }
  }

  &[appearance="tertiary"] {
    background: var(--color-green-faded);
    color: var(--color-white);
  }

  &[appearance="danger"] {
    background: var(--color-danger);
    color: var(--color-white);
  }

  &[appearance="blue"] {
    background: var(--color-button-blue);
    color: var(--color-white);
  }

  &[appearance="orange"] {
    background: var(--color-orange3);
    color: var(--color-white);
  }

  &[appearance="yellow"] {
    background: var(--color-yellow);
    color: var(--color-text-black);
  }

  // Size variants
  &.size-default {
    padding: 12px 24px;
    font-size: 16px;
  }

  &.size-xl {
    padding: 16px 32px;
    font-size: 18px;
    font-weight: 600;
    border-radius: 10px;
  }

  // Button content with text ellipsis
  .button-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .progress {
    position: absolute;
    width: 100%;
    height: 100%;
    background: inherit;
    box-shadow: inherit;
    border-radius: inherit;
    opacity: 0.95;
    top: 0;
    left: 0;

    &-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
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
    transform: scale(0.97);
    filter: brightness(0.95);
  }

  &.with-press:not([disabled]):hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
}
</style>
