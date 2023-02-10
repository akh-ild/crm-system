import { createStore } from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'

export default createStore({
  state: {
    error: null,
    currency: null,
    isLoading: true
  },
  getters: {
    error: state => state.error,
    currency: state => state.currency,
    isLoading: state => state.isLoading
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    },
    setCurrency (state, currency) {
      state.currency = currency
    },
    setIsLoading (state, bool) {
      state.isLoading = bool
    }
  },
  actions: {
    async fetchCurrency () {
      this.commit('setIsLoading', true)
      const key = process.env.VUE_APP_FIXER
      const myHeaders = new Headers()
      myHeaders.append('apikey', key)

      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      }

      fetch('https://api.apilayer.com/exchangerates_data/latest?symbols=USD%2CKZT%2CRUB%2CEUR%2CBTC&base=USD', requestOptions)
        .then(response => response.text())
        .then(result => this.commit('setCurrency', JSON.parse(result)))
        .then(() => this.commit('setIsLoading', false))
        .catch(error => console.log('error', error))
    }
  },
  modules: {
    auth,
    info,
    category
  }
})
