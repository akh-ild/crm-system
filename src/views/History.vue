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
      <HistoryTable :records="mapedRecords" />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue'
import Loader from '@/components/app/Loader'

export default {
  name: 'history',
  components: {
    HistoryTable,
    Loader
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
  }
}
</script>
