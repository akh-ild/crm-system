<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>
      <form @submit.prevent="onSubmit">
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
          Создать
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
  name: 'category-create',
  data () {
    return {
      title: '',
      limit: 1
    }
  },
  setup () {
    return { v$: useVuelidate() }
  },
  mounted () {
    window.M.updateTextFields()
  },
  methods: {
    async onSubmit () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        title: this.title,
        limit: this.limit
      }
      try {
        const category = await this.$store.dispatch('createCategory', formData)
        this.title = ''
        this.limit = 1
        this.v$.$reset()
        this.$message('Создана новая категория')
        this.$emit('create', category)
      } catch (e) {
        console.log('createCategory/onSubmit', e)
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
