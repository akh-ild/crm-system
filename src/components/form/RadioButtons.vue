<template>
  <div>
    <p v-for="item in items" :key="item.value">
      <label>
        <input class="with-gap" :name="item.name" type="radio" :value="item.value" @input="$emit('update:item.value', item.value)">
        <span>{{ item.label }}</span>
        <span>{{ typeof modelValue }}</span>
      </label>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      required: true
    },
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>
