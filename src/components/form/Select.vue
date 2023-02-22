<template>
  <div class="input-field" >
    <select ref="select" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
      <option v-for="item in items" :key="item.id" :value="item.id">{{ item.title }}</option>
    </select>
    <label>{{ label }}</label>
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
    },
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      select: null
    }
  },
  mounted () {
    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select)
    }, 0)
  },
  unmounted () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
