<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>
    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input id="description" type="text" v-model="name" :class="{ invalid: v$.name.$error }" @focus="v$.name.$reset()">
        <label for="description">Имя</label>
        <span v-if="v$.name.$error" class="helper-text invalid">Введите имя</span>
      </div>
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRu" @change="onChange">
          <span class="lever"></span>
          Русский
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  data () {
    return {
      name: '',
      isRu: true,
      lang: 'ru'
    }
  },
  setup () {
    return { v$: useVuelidate() }
  },
  computed: {
    ...mapGetters(['info'])
  },
  mounted () {
    this.name = this.info.name
    this.lang = this.info.lang === 'ru'
    setTimeout(() => window.M.updateTextFields(), 0)
  },
  methods: {
    ...mapActions(['updateInfo']),
    async onSubmit () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      try {
        await this.updateInfo({
          name: this.name,
          lang: this.lang
        })
      } catch (e) {
        console.log('profile/onsubmit', e)
      }
    },
    onChange () {
      this.lang = this.isRu ? 'ru' : 'en'
      console.log(this.lang)
    }
  },
  validations () {
    return {
      name: { required }
    }
  }
}
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
