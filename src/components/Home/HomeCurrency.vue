<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>Валюта</th>
            <th>Курс</th>
            <th>Дата</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="value in values" :key="value">
            <td>{{ value }}</td>
            <td>{{ rates[value].toFixed(2) }}</td>
            <td>{{ date }}</td>
          </tr>
          </tbody>
        </table>
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
  computed: {
    rates () {
      return this.currency.rates
    },
    date () {
      return this.currency.date.split('-').reverse().join('.')
    }
  }
}
</script>
