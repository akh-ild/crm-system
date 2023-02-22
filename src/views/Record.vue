<template>
  <div>
    <div class="page-title">
      <h3>{{ $locale('new-record') }}</h3>
    </div>
    <Loader v-if="isLoading" />
    <p class="center" v-else-if="!categories.length">Категорий пока нет <router-link to="/categories">Добавить категорию</router-link></p>
    <form v-else class="form" @submit.prevent="onSubmit">
      <Select
        v-model="current"
        :items="categories"
        label="Выберите категорию"
      />
      <RadioButtons
        :items="radioItems"
        v-model="type"
      />
      <Input
        name="amount"
        type="number"
        v-model.number="amount"
        label="Сумма"
        :isError="v$.amount.$error"
        @resetField="v$.amount.$reset()"
        :errorText="`Введите сумму (минимальное значение {{ v$.amount.minValue.$params.min }})`"
      />
      <Input
        name="description"
        type="text"
        v-model.number="description"
        label="Описание"
        :isError="v$.description.$error"
        @resetField="v$.description.$reset()"
        errorText="Введите описание"
      />
      <Button>Создать</Button>
    </form>
  </div>
</template>

<script>
import { useMeta } from 'vue-meta'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import Loader from '@/components/app/Loader'
import Input from '@/components/form/Input'
import Button from '@/components/form/Button'
import Select from '@/components/form/Select'
import RadioButtons from '@/components/form/RadioButtons'
import { mapGetters } from 'vuex'

export default {
  name: 'record',
  components: {
    Loader, Input, Button, Select, RadioButtons
  },
  data () {
    return {
      current: null,
      type: 'outcome',
      amount: 1,
      description: '',
      radioItems: [
        {
          name: 'type',
          value: 'income',
          label: 'Доход'
        },
        {
          name: 'type',
          value: 'outcome',
          label: 'Расход'
        }
      ]
    }
  },
  setup () {
    useMeta({ title: 'Record' })
    return { v$: useVuelidate() }
  },
  computed: {
    ...mapGetters(['info']),
    isLoading () {
      return this.$store.getters.isLoading
    },
    categories () {
      return this.$store.getters.categories
    },
    canCreateRecord () {
      if (this.type === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  async mounted () {
    await this.$store.dispatch('fetchCategories')
    if (this.categories.length) {
      this.current = this.categories[0].id
    }
    window.M.updateTextFields()
  },
  methods: {
    async onSubmit () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        categoryId: this.current,
        type: this.type,
        amount: this.amount,
        description: this.description,
        date: new Date().toJSON()
      }
      try {
        if (this.canCreateRecord) {
          await this.$store.dispatch('createRecord', formData)
        } else {
          this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`)
        }
        const bill = this.type === 'income' ? this.info.bill + this.amount : this.info.bill - this.amount
        await this.$store.dispatch('updateInfo', { bill })
        this.$message('Запись успешно создана')
        this.v$.$reset()
        this.amount = 1
        this.description = ''
      } catch (e) {
        console.log('record/onSubmit', e)
      }
    }
  },
  validations () {
    return {
      amount: { required, minValue: minValue(1) },
      description: { required }
    }
  }
}
</script>
