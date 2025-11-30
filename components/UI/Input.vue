<template lang="pug">
  label.input-container(
    :class="{ [`size-${size}`]: size, [`contrast-${contrast}`]: contrast, disabled }"
    :for="inputId"
  )
    UIIcon(name="search").icon-search.size-18
    input.input(
      :id="inputId"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      :readonly="readonly"
      :autocomplete="autocomplete"
      @input="$emit('update:modelValue', $event.target.value)"
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
  background: #fff;
  border-radius: 8px;
  border: 1px solid #F6F6F6;
  transition: all ease-in-out 0.15s;
  cursor: text;

  .icon-search {
    position: absolute;
    top: 0;
    left: 12px;
    bottom: 0;
    margin: auto 0;
    color: #646464;
  }

  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  // Size variants
  &.size-default {
    padding: 4px 16px 4px 40px;
    min-height: 48px;

    .input {
      font-size: 16px;
    }
  }
}

.input {
  flex: 1;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: #000;
  font-weight: 500;
  line-height: 1.5;
  padding: 0;

  &::placeholder {
    color: #646464;
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

