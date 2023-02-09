<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email" type="text" v-model.trim="email" :class="{ invalid: v$.email.$error }" @focus="v$.email.$reset()">
        <label for="email">Email</label>
        <small v-if="emptyEmail" class="helper-text invalid">Поле Email не должно быть пустым</small>
        <small v-else-if="incorrectEmail" class="helper-text invalid">Введите корректный email</small>
      </div>
      <div class="input-field">
        <input id="password" type="password" v-model="password" :class="{ invalid: v$.password.$error }" @focus="v$.password.$reset()">
        <label for="password">Пароль</label>
        <small v-if="emptyPassword" class="helper-text invalid">Введите пароль</small>
        <small v-else-if="shortPassword" class="helper-text invalid">Пароль должен содержать минимум {{ v$.password.minLength.$params.min }} символов</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import messages from '@/utils/messages'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  setup () {
    return { v$: useVuelidate() }
  },
  computed: {
    emptyEmail () {
      return this.v$.email.$dirty && !this.v$.email.required.$response
    },
    incorrectEmail () {
      return this.v$.email.$dirty && this.v$.email.email.$invalid
    },
    emptyPassword () {
      return this.v$.password.$dirty && !this.v$.password.required.$response
    },
    shortPassword () {
      return this.v$.password.$dirty && this.v$.password.minLength.$invalid
    }
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async onSubmit () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {
        console.log('login/onsubmit', e)
      }
    }
  },
  validations () {
    return {
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  }
}
</script>
