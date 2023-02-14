<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>
    <div class="history-chart">
      <canvas></canvas>
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
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from '@/components/HistoryTable.vue'
import Loader from '@/components/app/Loader'
import Paginate from 'vuejs-paginate-next'

export default {
  name: 'history',
  mixins: [paginationMixin],
  components: {
    HistoryTable,
    Loader,
    paginate: Paginate
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
    }
  },
  async mounted () {
    await this.$store.dispatch('fetchRecords')
    await this.$store.dispatch('fetchCategories')
    this.mapedRecords = this.records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(cat => cat.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход'
      }
    })
    this.setupPagination(this.mapedRecords)
  }
}
</script>
