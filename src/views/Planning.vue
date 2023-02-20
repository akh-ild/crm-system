<template>
  <div>
    <div class="page-title">
      <h3>{{ $locale('planning') }}</h3>
      <h4>{{ currencyFilter(info.bill) }}</h4>
    </div>
    <Loader v-if="isLoading" />
    <p class="center" v-else-if="!categories.length">Категорий пока нет <router-link to="/categories">Добавить категорию</router-link></p>
    <section v-else>
      <div v-for="cat in extendedCategories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}</strong>
          {{ `${currencyFilter(cat.spend)} из ${currencyFilter(cat.limit)}` }}
        </p>
        <div class="progress" v-tooltip:[value]="cat.tooltip">
          <div class="determinate" :style="{width:`${cat.progressPercent}%`}" :class="cat.progressColor"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useMeta } from 'vue-meta'
import Loader from '@/components/app/Loader'
import { mapGetters } from 'vuex'

export default {
  name: 'planning',
  components: {
    Loader
  },
  setup () {
    useMeta({ title: 'Planning' })
  },
  data () {
    return {
      extendedCategories: null
    }
  },
  computed: {
    ...mapGetters(['info']),
    isLoading () {
      return this.$store.getters.isLoading
    },
    categories () {
      return this.$store.getters.categories
    },
    records () {
      return this.$store.getters.records
    }
  },
  async mounted () {
    await this.$store.dispatch('fetchRecords')
    await this.$store.dispatch('fetchCategories')
    this.filterCategories()
  },
  methods: {
    currencyFilter (value, currency = 'USD') {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency
      }).format(value)
    },
    filterCategories () {
      this.extendedCategories = this.categories.map(cat => {
        const spend = this.records.filter(record => record.categoryId === cat.id)
          .filter(record => record.type === 'outcome')
          .reduce((total, record) => {
            total += record.amount
            return total
          }, 0)
        const percent = 100 * spend / cat.limit
        const progressPercent = percent > 100 ? 100 : percent
        const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

        const tooltipValue = cat.limit - spend
        const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${this.currencyFilter(Math.abs(tooltipValue))}`
        return {
          ...cat,
          progressPercent,
          progressColor,
          spend,
          tooltip
        }
      })
    }
  }
}
</script>
