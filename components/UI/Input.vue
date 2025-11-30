<template lang="pug">
  label.input-container(
    :class="{ [`size-${size}`]: size, [`contrast-${contrast}`]: contrast, disabled }"
    :for="inputId"
  )
    input.input(
      :id="inputId"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      :readonly="readonly"
      :autocomplete="autocomplete"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    )
    slot(name="prepend")
    slot(name="append")
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { InputContrast, InputSize } from '~/types/input'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
    placeholder?: string
    disabled?: boolean
    required?: boolean
    readonly?: boolean
    autocomplete?: string
    size?: InputSize
    contrast?: InputContrast
    id?: string
  }>(),
  {
    modelValue: '',
    type: 'text',
    placeholder: '',
    disabled: false,
    required: false,
    readonly: false,
    autocomplete: undefined,
    size: InputSize.default,
    contrast: InputContrast.default,
    id: undefined,
  }
)

defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const inputId = computed(() => props.id || `input-${Math.random().toString(36).substr(2, 9)}`)
</script>

<style lang="scss" scoped>
.input-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background: var(--color-main-dark);
  border-radius: var(--border-radius);
  border: 1px solid var(--color-main-light);
  transition: all ease-in-out 0.15s;
  cursor: text;

  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  // Size variants
  &.size-default {
    padding: 12px 16px;
    min-height: 48px;

    .input {
      font-size: 16px;
    }
  }

  &.size-xl {
    padding: 16px 20px;
    min-height: 56px;
    border-radius: 12px;

    .input {
      font-size: 18px;
      font-weight: 500;
    }
  }

  // Contrast variants
  &.contrast-default {
    background: var(--color-main-dark);
    border-color: var(--color-main-light);
  }

  &.contrast-contrast {
    background: var(--color-grey2);
    border-color: var(--color-grey-light);
  }

  &:focus-within {
    border-color: var(--color-main);
    box-shadow: 0 0 0 2px rgba(var(--color-main), 0.2);
  }
}

.input {
  flex: 1;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: var(--color-white);
  font-family: var(--font-family);
  font-weight: 500;
  line-height: 1.5;
  padding: 0;

  &::placeholder {
    color: var(--color-white-03);
    opacity: 1;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &[readonly] {
    cursor: default;
  }
}
</style>

