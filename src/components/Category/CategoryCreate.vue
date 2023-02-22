<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>
      <form @submit.prevent="onSubmit">
        <Input
          name="name"
          type="text"
          v-model="title"
          label="Название"
          :isError="v$.title.$error"
          @resetField="v$.title.$reset()"
          errorText="Введите название"
        />
        <Input
          name="limit"
          type="number"
          v-model.number="limit"
          label="Лимит"
          :isError="v$.limit.$error"
          @resetField="v$.limit.$reset()"
          :errorText="`Введите лимит (минимальное значение {{ v$.limit.minValue.$params.min }})`"
        />
        <Button>Создать</Button>
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import Button from '@/components/form/Button'
import Input from '@/components/form/Input'

export default {
  name: 'category-create',
  components: {
    Button, Input
  },
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
