<template lang="pug">
  button(
    :class="{ wide, round, ghost, 'with-press': !withoutPress, 'without-padding': withoutPadding, active, [`size-${size}`]: size }"
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
    withoutPadding?: boolean
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
    withoutPadding: false,
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
  padding: 14px 30px;
  border-radius: 8px;
  border: none;
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
    background: var(--button-primary-solid-background-default);
    color: #fff;
    
    &:hover:not([disabled]) {
      background: var(--button-primary-solid-background-hover);
    }

    &:active:not([disabled]),
    &.active:not([disabled]) {
      background: var(--button-primary-solid-background-pressed);
    }

    &[disabled] {
      background: var(--button-primary-solid-background-disabled);
    }
  }

  // Secondary appearance
  &[appearance="secondary"] {
    background: var(--button-secondary-solid-background-default);
    color: var(--button-secondary-solid-text-default);
    
    &:hover:not([disabled]) {
      background: var(--button-secondary-solid-background-hover);
      color: var(--button-secondary-solid-text-hover);
    }

    &:active:not([disabled]),
    &.active:not([disabled]) {
      background: var(--button-secondary-solid-background-pressed);
      color: var(--button-secondary-solid-text-pressed);
    }

    &[disabled] {
      background: var(--button-secondary-solid-background-disabled);
      color: var(--button-secondary-solid-text-disabled);
    }
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

  &.without-padding {
    padding: 0;
  }

  &.with-press:not([disabled]):active,
  &.active {
    transform: scale(0.97);
  }
}
</style>
