<template>
  <div>
    <div class="page-title">
      <h3>{{ $locale('history-record') }}</h3>
    </div>
    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>
    <Loader v-if="isLoading" />
    <p class="center" v-else-if="!mapedRecords.length">Записей пока нет <router-link to="/record">Добавить запись</router-link></p>
    <section v-else>
      <HistoryTable :records="items" />
      <paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="onPageChange"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        container-class="pagination"
        page-class="waves-effect"
      >
      </paginate>
    </section>
  </div>
</template>

<script>
import { useMeta } from 'vue-meta'
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from '@/components/HistoryTable.vue'
import Loader from '@/components/app/Loader'
import Paginate from 'vuejs-paginate-next'
import { Pie } from 'vue-chartjs'

export default {
  name: 'history',
  extends: Pie,
  mixins: [paginationMixin],
  components: {
    HistoryTable,
    Loader,
    paginate: Paginate
  },
  setup () {
    useMeta({ title: 'History' })
  },
  data () {
    return {
      mapedRecords: []
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters.isLoading
    },
    categories () {
      return this.$store.getters.categories
    },
    records () {
      return this.$store.getters.records
    },
    chatData () {
      return {
        labels: this.categories.map(cat => cat.title),
        datasets: [{
          label: 'Расходы по категориям',
          data: this.categories.map(cat => {
            return this.records.reduce((total, record) => {
              if (record.categoryId === cat.id && record.type === 'outcome') {
                total += +record.amount
              }
              return total
            }, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255 , 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255 , 159, 64, 0.2)'
          ],
          borderWidth: 1
        }]
      }
    }
  },
  async mounted () {
    await this.$store.dispatch('fetchRecords')
    await this.$store.dispatch('fetchCategories')
    this.setup()
  },
  methods: {
    setup () {
      this.mapedRecords = this.records.map(record => {
        return {
          ...record,
          categoryName: this.categories.find(cat => cat.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход'
        }
      })
      this.setupPagination(this.mapedRecords)
      this.renderChart(this.chatData)
    }
  }
}
</script>
