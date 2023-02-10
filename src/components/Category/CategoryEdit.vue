<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option v-for="item in categories" :key="item.id" :value="item.id">{{ item.title }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>
        <div class="input-field">
          <input id="name" type="text" v-model="title" :class="{ invalid: v$.title.$error }" @focus="v$.title.$reset()">
          <label for="name">Название</label>
          <span v-if="v$.title.$error" class="helper-text invalid">Введите название</span>
        </div>
        <div class="input-field">
          <input id="limit" type="number" v-model.number="limit" :class="{ invalid: v$.limit.$error }" @focus="v$.limit.$reset()">
          <label for="limit">Лимит</label>
          <span v-if="v$.limit.$error" class="helper-text invalid">Введите лимит (минимальное значение {{ v$.limit.minValue.$params.min }})</span>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'

export default {
  name: 'category-edit',
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      select: null,
      current: null,
      title: '',
      limit: 1
    }
  },
  setup () {
    return { v$: useVuelidate() }
  },
  watch: {
    current (catId) {
      const { title, limit } = this.categories.find(item => item.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  created () {
    const { id, title, limit } = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted () {
    this.select = window.M.FormSelect.init(this.$refs.select)
    window.M.updateTextFields()
  },
  unmounted () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  methods: {
    async onSubmit () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        id: this.current,
        title: this.title,
        limit: this.limit
      }
      try {
        await this.$store.dispatch('updateCategory', formData)
        this.$message('Категория успешно обновлена')
        this.$emit('update')
      } catch (e) {
        console.log('createEdit/onSubmit', e)
      }
    }
  },
  validations () {
    return {
      title: { required },
      limit: { required, minValue: minValue(1) }
    }
  }
}
</script>
