<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>
        <p v-for="value in values" :key="value" class="currency-line">
          <span v-if="getCurrency(value)">{{ currencyFilter(getCurrency(value), value) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currency: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      values: ['USD', 'KZT', 'RUB', 'EUR', 'BTC']
    }
  },
  methods: {
    getCurrency (value) {
      return (this.$store.getters.info.bill * this.currency.rates[value])
    },
    currencyFilter (value, currency = 'USD') {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency
      }).format(value)
    }
  }
}
</script>
