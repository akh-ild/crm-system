<template>
  <div class="input-field">
    <input
      :id="name"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="{ invalid: isError }"
      @focus="$emit('resetField')"
    >
    <label :for="name">{{ label }}</label>
    <span v-if="isError" class="helper-text invalid">{{ errorText }}</span>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    isError: {
      type: Boolean,
      default: false
    },
    errorText: {
      type: String,
      default: ''
    }
  }
}
</script>
