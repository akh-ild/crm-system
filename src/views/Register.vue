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
      <div class="input-field">
        <input id="name" type="text" v-model.trim="name" :class="{ invalid: v$.name.$error }" @focus="v$.name.$reset()">
        <label for="name">Имя</label>
        <small v-if="emptyName" class="helper-text invalid">Введите имя</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree">
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

export default {
  name: 'register',
  data () {
    return {
      email: '',
      password: '',
      name: '',
      agree: false
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
    },
    emptyName () {
      return this.v$.name.$dirty && !this.v$.name.required.$response
    }
  },
  methods: {
    onSubmit () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      console.log(formData)
      this.$router.push('/')
    }
  },
  validations () {
    return {
      email: { required, email },
      password: { required, minLength: minLength(6) },
      name: { required },
      agree: { checked: v => v }
    }
  }
}
</script>
