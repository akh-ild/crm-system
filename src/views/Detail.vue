<template>
  <div>
    <div>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{ $locale('history') }}</router-link>
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
import { useMeta } from 'vue-meta'
// TODO add check id
export default {
  name: 'detail',
  setup () {
    useMeta({ title: 'Detail' })
  },
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
      this.categoryName = this.$route.query.categoryName
      this.amount = this.$route.query.amount
      this.date = this.$route.query.date
      this.description = this.$route.query.description
      this.typeText = this.$route.query.typeText
      this.typeClass = this.$route.query.typeClass
      this.id = this.$route.query.id
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
