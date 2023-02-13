<template>
  <div>
    <div>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a class="breadcrumb">
          {{ typeText }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="typeClass">
            <div class="card-content white-text">
              <p v-if="description">{{ `Описание: ${description}` }}</p>
              <p v-if="amount">{{ `Сумма: ${currencyFilter(amount)}` }}</p>
              <p v-if="categoryName">{{ `Категория: ${categoryName}` }}</p>
              <small v-if="date">{{ new Date(date).toLocaleString() }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// TODO add check id
export default {
  name: 'detail',
  data () {
    return {
      categoryName: '',
      amount: '',
      date: '',
      description: '',
      typeText: '',
      typeClass: '',
      id: '',
      correctId: false
    }
  },
  computed: {
    records () {
      return this.$store.getters.records
    }
  },
  async mounted () {
    if (!this.records) {
      await this.$store.dispatch('fetchRecords')
    }
    this.setParams()
  },
  methods: {
    setParams () {
      const params = (new URL(document.location)).searchParams
      this.categoryName = params.get('categoryName')
      this.amount = params.get('amount')
      this.date = params.get('date')
      this.description = params.get('description')
      this.typeText = params.get('typeText')
      this.typeClass = params.get('typeClass')
      this.id = params.get('id')
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
