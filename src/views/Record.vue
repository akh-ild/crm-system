<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Loader v-if="isLoading" />
    <p class="center" v-else-if="!categories.length">Категорий пока нет <router-link to="/categories">Добавить категорию</router-link></p>
    <form v-else class="form" @submit.prevent="onSubmit">
      <div class="input-field" >
        <select ref="select" v-model="current">
          <option v-for="item in categories" :key="item.id" :value="item.id">{{ item.title }}</option>
        </select>
        <label>Выберите категорию</label>
      </div>
      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type">
          <span>Доход</span>
        </label>
      </p>
      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type">
          <span>Расход</span>
        </label>
      </p>
      <div class="input-field">
        <input id="amount" type="number" v-model.number="amount" :class="{ invalid: v$.amount.$error }" @focus="v$.amount.$reset()">
        <label for="amount">Сумма</label>
        <span v-if="v$.amount.$error" class="helper-text invalid">Введите сумму (минимальное значение {{ v$.amount.minValue.$params.min }})</span>
      </div>
      <div class="input-field">
        <input id="description" type="text" v-model="description" :class="{ invalid: v$.description.$error }" @focus="v$.description.$reset()">
        <label for="description">Описание</label>
        <span v-if="v$.description.$error" class="helper-text invalid">Введите описание</span>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import Loader from '@/components/app/Loader.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'record',
  components: {
    Loader
  },
  data () {
    return {
      select: null,
      current: null,
      type: 'outcome',
      amount: 1,
      description: ''
    }
  },
  setup () {
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
    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select)
    }, 0)
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
