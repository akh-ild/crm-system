<template>
  <div>
    <div class="page-title">
      <h3>{{ $locale('profile-title') }}</h3>
    </div>
    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input id="description" type="text" v-model="name" :class="{ invalid: v$.name.$error }" @focus="v$.name.$reset()">
        <label for="description">{{ $locale('placeholder-name')}}</label>
        <span v-if="v$.name.$error" class="helper-text invalid">Введите имя</span>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{ $locale('button-refresh') }}
        <i class="material-icons right">send</i>
      </button>
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRu" @change="onChange">
          <span class="lever"></span>
          Русский
        </label>
      </div>
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
      isRu: true
    }
  },
  setup () {
    return { v$: useVuelidate() }
  },
  computed: {
    ...mapGetters(['info'])
  },
  mounted () {
    setTimeout(() => {
      window.M.updateTextFields()
      this.name = this.info.name
      this.isRu = this.info.lang === 'ru'
    }, 0)
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
          lang: this.isRu ? 'ru' : 'en'
        })
      } catch (e) {
        console.log('profile/onsubmit', e)
      }
    },
    async onChange () {
      try {
        await this.updateInfo({
          lang: this.isRu ? 'ru' : 'en'
        })
      } catch (e) {
        console.log('profile/onchange', e)
      }
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
  margin-top: 2rem;
}
</style>
